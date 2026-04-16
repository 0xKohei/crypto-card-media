export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { readOverrides, writeOverrides } from "@/lib/admin-storage";
import type { AdminCardOverride } from "@/lib/admin-storage";
import { revalidatePath } from "next/cache";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD ?? "admin2026";
  return authHeader === `Bearer ${password}`;
}

// GET /api/admin/cards - list all card overrides
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await readOverrides();
  return NextResponse.json(data.cards);
}

// POST /api/admin/cards - update a card override (upsert by id)
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

// DELETE /api/admin/cards?id=xxx - remove a card override
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
