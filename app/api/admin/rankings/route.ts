export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { readOverrides, writeOverrides } from "@/lib/admin-storage";
import type { AdminRankingEntry } from "@/lib/admin-storage";
import { revalidatePath } from "next/cache";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD ?? "admin2026";
  return authHeader === `Bearer ${password}`;
}

// GET /api/admin/rankings?category=overall
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const category = req.nextUrl.searchParams.get("category") ?? "overall";
  const data = await readOverrides();
  return NextResponse.json(data.rankings[category] ?? []);
}

// POST /api/admin/rankings - save ranking for a category
// body: { category: string, entries: AdminRankingEntry[] }
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as { category: string; entries: AdminRankingEntry[] };
  const { category, entries } = body;
  if (!category || !Array.isArray(entries)) {
    return NextResponse.json({ error: "category and entries required" }, { status: 400 });
  }

  const data = await readOverrides();
  data.rankings[category] = entries;
  await writeOverrides(data);

  revalidatePath("/");
  revalidatePath("/top-picks/overall");
  revalidatePath(`/top-picks/${category}`);

  return NextResponse.json({ ok: true });
}
