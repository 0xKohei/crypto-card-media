export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { cards as staticCards } from "@/data/cards";
import { readOverrides, writeOverrides } from "@/lib/admin-storage";
import type { AdminCardOverride } from "@/lib/get-cards";
import { revalidatePath } from "next/cache";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD ?? "admin2026";
  return authHeader === `Bearer ${password}`;
}

/**
 * GET /api/admin/cards
 * Returns ALL cards — static data from data/cards.ts merged with admin overrides.
 * This ensures admin always sees all cards (never 0 due to empty Supabase).
 */
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const overrides = await readOverrides();

  const merged = staticCards.map((card) => {
    const ov = overrides.cards.find((c) => c.id === card.id);
    if (!ov) return { ...card, isVisible: true };
    return { ...card, ...ov };
  });

  return NextResponse.json(merged);
}

/**
 * POST /api/admin/cards
 * Upsert a card override. Accepts full card data — all editable fields.
 */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as AdminCardOverride;
  if (!body.id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const data = await readOverrides();
  const idx = data.cards.findIndex((c) => c.id === body.id);
  if (idx >= 0) {
    data.cards[idx] = { ...data.cards[idx], ...body };
  } else {
    data.cards.push(body);
  }
  await writeOverrides(data);

  revalidatePath("/");
  revalidatePath("/cards");
  revalidatePath(`/cards/${body.id}`);
  revalidatePath("/top-picks/overall");

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
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const data = await readOverrides();
  data.cards = data.cards.filter((c) => c.id !== id);
  await writeOverrides(data);

  revalidatePath("/");
  revalidatePath("/cards");

  return NextResponse.json({ ok: true });
}
