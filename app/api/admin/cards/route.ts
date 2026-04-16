export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { cards as staticCards } from "@/data/cards";
import {
  getCardOverrides,
  upsertCardOverride,
  deleteCardOverride,
  checkCardReferences,
} from "@/lib/admin-storage";
import type { Card, Region, Network } from "@/types";
import { revalidatePath } from "next/cache";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD ?? "admin2026";
  return authHeader === `Bearer ${password}`;
}

function ok(data: unknown) {
  return NextResponse.json({ success: true, data });
}
function err(message: string, status = 500) {
  return NextResponse.json({ success: false, error: message }, { status });
}

/**
 * GET /api/admin/cards
 * 静的カードと Supabase オーバーライドをマージして返す。
 * 管理画面は常に全カードを表示 (isVisible=false も含む)。
 */
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return err("Unauthorized", 401);

  try {
    const overrides = await getCardOverrides();

    const pick = <T>(v: unknown, fallback: T): T =>
      v !== undefined && v !== null ? (v as T) : fallback;

    // 静的カードにオーバーライドをマージ
    const staticMerged = staticCards.map((card) => {
      const ov = overrides.find((o) => o.slug === card.slug);
      const fees = (ov?.fees ?? {}) as Record<string, unknown>;

      return {
        id: card.id,
        slug: card.slug,
        name: ov?.name ?? card.name,
        shortDescription: ov?.description ?? card.shortDescription,
        longDescription: pick<string>(fees.longDescription, card.longDescription ?? ""),
        cardImage: ov?.image ?? card.cardImage ?? card.image ?? "",
        isVisible: ov?.visible ?? true,
        isDbOnly: false,
        tags: ov?.tags ?? card.tags ?? [],
        network: pick<Network>(fees.network, card.network),
        keyStrength: pick<string>(fees.keyStrength, card.keyStrength ?? ""),
        priorityRank: pick<number>(fees.priorityRank, card.priorityRank ?? 99),
        referralUrl: pick<string>(fees.referralUrl, card.referralUrl ?? ""),
        fxFee: pick<string>(fees.fxFee, card.fxFee ?? ""),
        cashbackRate: pick<string>(fees.cashbackRate, card.cashbackRate ?? ""),
        cashbackDetails: pick<string>(fees.cashbackDetails, card.cashbackDetails ?? ""),
        issuanceFee: pick<string>(fees.issuanceFee, card.issuanceFee ?? ""),
        monthlyFee: pick<string>(fees.monthlyFee, card.monthlyFee ?? ""),
        annualFee: pick<string>(fees.annualFee, card.annualFee ?? ""),
        atmFee: pick<string>(fees.atmFee, card.atmFee ?? ""),
        spendingLimit: pick<string>(fees.spendingLimit, card.spendingLimit ?? ""),
        applePay: pick<boolean>(fees.applePay, card.applePay),
        googlePay: pick<boolean>(fees.googlePay, card.googlePay),
        physicalCard: pick<boolean>(fees.physicalCard, card.physicalCard),
        virtualCard: pick<boolean>(fees.virtualCard, card.virtualCard),
        stablecoinSupport: pick<boolean>(fees.stablecoinSupport, card.stablecoinSupport),
        regionAvailability: pick<Region[]>(fees.regionAvailability, card.regionAvailability ?? []),
        topupMethods: pick<string[]>(fees.topupMethods, card.topupMethods ?? []),
        supportedAssets: pick<string[]>(fees.supportedAssets, card.supportedAssets ?? []),
        supportedChains: pick<string[]>(fees.supportedChains, card.supportedChains ?? []),
        pros: pick<string[]>(fees.pros, card.pros ?? []),
        cons: pick<string[]>(fees.cons, card.cons ?? []),
        useCases: pick<string[]>(fees.useCases, card.useCases ?? []),
        custodyType: pick<Card["custodyType"]>(fees.custodyType, card.custodyType),
        kycLevel: pick<Card["kycLevel"]>(fees.kycLevel, card.kycLevel),
      };
    });

    // DB 専用カード (is_db_only=true かつ静的カードに存在しない)
    const staticSlugs = new Set(staticCards.map((c) => c.slug));
    const dbOnlyCards = overrides
      .filter((o) => o.is_db_only === true && !staticSlugs.has(o.slug))
      .map((ov) => {
        const fees = (ov.fees ?? {}) as Record<string, unknown>;
        return {
          id: ov.slug,
          slug: ov.slug,
          name: ov.name ?? ov.slug,
          shortDescription: ov.description ?? "",
          longDescription: pick<string>(fees.longDescription, ""),
          cardImage: ov.image ?? "",
          isVisible: ov.visible ?? true,
          isDbOnly: true,
          tags: (ov.tags as string[]) ?? [],
          network: pick<Network>(fees.network, "Visa"),
          keyStrength: pick<string>(fees.keyStrength, ""),
          priorityRank: pick<number>(fees.priorityRank, 99),
          referralUrl: pick<string>(fees.referralUrl, ""),
          fxFee: pick<string>(fees.fxFee, "—"),
          cashbackRate: pick<string>(fees.cashbackRate, "—"),
          cashbackDetails: pick<string>(fees.cashbackDetails, ""),
          issuanceFee: pick<string>(fees.issuanceFee, "—"),
          monthlyFee: pick<string>(fees.monthlyFee, "—"),
          annualFee: pick<string>(fees.annualFee, ""),
          atmFee: pick<string>(fees.atmFee, "—"),
          spendingLimit: pick<string>(fees.spendingLimit, "—"),
          applePay: pick<boolean>(fees.applePay, false),
          googlePay: pick<boolean>(fees.googlePay, false),
          physicalCard: pick<boolean>(fees.physicalCard, true),
          virtualCard: pick<boolean>(fees.virtualCard, true),
          stablecoinSupport: pick<boolean>(fees.stablecoinSupport, false),
          regionAvailability: pick<Region[]>(fees.regionAvailability, []),
          topupMethods: pick<string[]>(fees.topupMethods, []),
          supportedAssets: pick<string[]>(fees.supportedAssets, []),
          supportedChains: pick<string[]>(fees.supportedChains, []),
          pros: pick<string[]>(fees.pros, []),
          cons: pick<string[]>(fees.cons, []),
          useCases: pick<string[]>(fees.useCases, []),
          custodyType: pick<Card["custodyType"]>(fees.custodyType, "custodial"),
          kycLevel: pick<Card["kycLevel"]>(fees.kycLevel, "standard"),
        };
      });

    return ok([...staticMerged, ...dbOnlyCards]);
  } catch (e) {
    return err(`カード読み込み失敗: ${e instanceof Error ? e.message : String(e)}`);
  }
}

/**
 * POST /api/admin/cards
 * AdminCard オブジェクトを受け取り、Supabase cards テーブルに upsert する。
 * slug が必須。top-level カラムと fees JSONB に分けて保存。
 */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return err("Unauthorized", 401);

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return err("リクエストの解析に失敗しました", 400);
  }

  const slug = typeof body.slug === "string" ? body.slug : (body.id as string | undefined);
  if (!slug) return err("slug が必要です", 400);

  const fees: Record<string, unknown> = {};
  const feeFields = [
    "longDescription", "referralUrl", "network", "keyStrength", "priorityRank",
    "fxFee", "cashbackRate", "cashbackDetails", "issuanceFee", "monthlyFee",
    "annualFee", "atmFee", "spendingLimit",
    "applePay", "googlePay", "physicalCard", "virtualCard", "stablecoinSupport",
    "regionAvailability", "topupMethods", "supportedAssets", "supportedChains",
    "pros", "cons", "useCases", "custodyType", "kycLevel",
  ];
  for (const f of feeFields) {
    if (body[f] !== undefined) fees[f] = body[f];
  }

  try {
    await upsertCardOverride({
      slug,
      name: (body.name as string) ?? null,
      description: (body.shortDescription as string) ?? null,
      image: (body.cardImage as string) || null,
      visible: body.isVisible !== undefined ? Boolean(body.isVisible) : true,
      is_db_only: body.is_db_only === true,
      tags: Array.isArray(body.tags) ? (body.tags as string[]) : null,
      fees,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    // is_db_only カラム未適用を 503 + 明示エラーで返す (500 禁止)
    if (msg.toLowerCase().includes("is_db_only")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "マイグレーション v3 が未適用です。supabase-migration-v3.sql を Supabase SQL Editor で実行してください。",
          migrationRequired: true,
          migration: "supabase-migration-v3.sql",
        },
        { status: 503 },
      );
    }
    return err(`保存失敗: ${msg}`);
  }

  try {
    revalidatePath("/");
    revalidatePath("/cards");
    revalidatePath(`/cards/${slug}`);
    revalidatePath("/top-picks/overall");
  } catch {
    // non-critical
  }

  return ok(null);
}

/**
 * DELETE /api/admin/cards?slug=xxx
 * DB 専用カード (is_db_only=true) を削除する。
 * 静的カードのオーバーライドはこのエンドポイントでは削除できない (visible=false で非公開にすること)。
 * rankings / homepage_featured から参照されている場合は 409 を返す。
 */
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return err("Unauthorized", 401);

  const slug = req.nextUrl.searchParams.get("slug") ?? req.nextUrl.searchParams.get("id");
  if (!slug) return err("slug が必要です", 400);

  // 参照チェック
  try {
    const refs = await checkCardReferences(slug);
    if (refs.length > 0) {
      const detail = refs.map((r) => r.detail).join("、");
      return NextResponse.json(
        {
          success: false,
          error: `このカードは ${detail} で参照されています。先に参照を解除してください。`,
          blocked: true,
          refs,
        },
        { status: 409 },
      );
    }
  } catch (e) {
    return err(`参照チェック失敗: ${e instanceof Error ? e.message : String(e)}`);
  }

  try {
    await deleteCardOverride(slug);
  } catch (e) {
    return err(`削除失敗: ${e instanceof Error ? e.message : String(e)}`);
  }

  try {
    revalidatePath("/");
    revalidatePath("/cards");
  } catch {
    // non-critical
  }

  return ok(null);
}
