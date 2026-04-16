export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getRankings, setRankings } from "@/lib/admin-storage";
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

// フロントの camelCase ↔ DB snake_case 変換
interface FrontendRankingEntry {
  rank: number;
  cardSlug: string;
  reason?: string;
  shortReason?: string;
  keyStrength?: string;
}

function toFrontend(e: Awaited<ReturnType<typeof getRankings>>[number]): FrontendRankingEntry {
  return {
    rank: e.rank,
    cardSlug: e.card_slug,
    reason: e.reason ?? "",
    shortReason: e.short_reason ?? "",
    keyStrength: "",
  };
}

/**
 * GET /api/admin/rankings?category=overall
 * ランキングエントリーを camelCase で返す。
 */
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return err("Unauthorized", 401);

  try {
    const category = req.nextUrl.searchParams.get("category") ?? "overall";
    const entries = await getRankings(category);
    return ok(entries.map(toFrontend));
  } catch (e) {
    return err(`ランキング読み込み失敗: ${e instanceof Error ? e.message : String(e)}`);
  }
}

/**
 * POST /api/admin/rankings
 * Body: { category: string, entries: FrontendRankingEntry[] }
 * camelCase を受け取り snake_case で保存。
 */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return err("Unauthorized", 401);

  let body: { category: string; entries: FrontendRankingEntry[] };
  try {
    body = (await req.json()) as { category: string; entries: FrontendRankingEntry[] };
  } catch {
    return err("リクエストの解析に失敗しました", 400);
  }

  const { category, entries } = body;
  if (!category || !Array.isArray(entries)) {
    return err("category と entries が必要です", 400);
  }

  try {
    const dbEntries = entries.map((e) => ({
      category,
      rank: e.rank,
      card_slug: e.cardSlug,
      short_reason: e.shortReason ?? null,
      reason: e.reason ?? null,
      is_visible: true,
    }));
    await setRankings(category, dbEntries);
  } catch (e) {
    return err(`保存失敗: ${e instanceof Error ? e.message : String(e)}`);
  }

  try {
    revalidatePath("/");
    revalidatePath("/top-picks/overall");
    revalidatePath(`/top-picks/${category}`);
  } catch {
    // non-critical
  }

  return ok(null);
}
