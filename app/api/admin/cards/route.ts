/**
 * Admin API — card overrides
 *
 * runtime = "edge" は Cloudflare Pages 向け。
 * Edge Runtime では fs が使えないため、保存は Supabase 必須。
 * ローカル開発で Supabase なしに保存したい場合は、この行を削除すると
 * Node.js runtime になり data/admin-overrides.json へのフォールバックが有効になる。
 */
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { cards as staticCards } from "@/data/cards";
import { readOverrides, writeOverrides } from "@/lib/admin-storage";
import type { AdminCardOverride } from "@/lib/admin-storage";
import { revalidatePath } from "next/cache";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD ?? "admin2026";
  return authHeader === `Bearer ${password}`;
}

/**
 * GET /api/admin/cards
 * Static cards (data/cards.ts) merged with overrides — admin always sees all cards.
 */
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const overrides = await readOverrides();
    const merged = staticCards.map((card) => {
      const ov = overrides.cards.find((c) => c.id === card.id);
      if (!ov) return { ...card, isVisible: true };
      return { ...card, ...ov };
    });
    return NextResponse.json(merged);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `カード読み込み失敗: ${message}` },
      { status: 500 },
    );
  }
}

/**
 * POST /api/admin/cards
 * Upsert a card override. Body must include id.
 */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "リクエストの解析に失敗しました (JSON形式が正しくありません)" }, { status: 400 });
  }

  if (!body.id || typeof body.id !== "string") {
    return NextResponse.json({ error: "id が不足しています" }, { status: 400 });
  }

  try {
    const data = await readOverrides();
    const idx = data.cards.findIndex((c) => c.id === body.id);
    if (idx >= 0) {
      data.cards[idx] = { ...data.cards[idx], ...body };
    } else {
      data.cards.push(body as unknown as AdminCardOverride);
    }
    await writeOverrides(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `保存失敗: ${message}` }, { status: 500 });
  }

  try {
    revalidatePath("/");
    revalidatePath("/cards");
    revalidatePath(`/cards/${body.id}`);
    revalidatePath("/top-picks/overall");
  } catch {
    // revalidatePath failure is non-critical — data is saved, cache will expire naturally
  }

  return NextResponse.json({ ok: true });
}

/**
 * DELETE /api/admin/cards?id=xxx
 * Remove a card override (restores static default).
 */
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id が不足しています" }, { status: 400 });
  }

  try {
    const data = await readOverrides();
    data.cards = data.cards.filter((c) => c.id !== id);
    await writeOverrides(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `削除失敗: ${message}` }, { status: 500 });
  }

  try {
    revalidatePath("/");
    revalidatePath("/cards");
  } catch {
    // non-critical
  }

  return NextResponse.json({ ok: true });
}
