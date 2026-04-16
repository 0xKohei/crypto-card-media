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

  try {
    const category = req.nextUrl.searchParams.get("category") ?? "overall";
    const data = await readOverrides();
    return NextResponse.json(data.rankings[category] ?? []);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `ランキング読み込み失敗: ${message}` },
      { status: 500 },
    );
  }
}

// POST /api/admin/rankings — body: { category: string, entries: AdminRankingEntry[] }
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { category: string; entries: AdminRankingEntry[] };
  try {
    body = (await req.json()) as { category: string; entries: AdminRankingEntry[] };
  } catch {
    return NextResponse.json({ error: "リクエストの解析に失敗しました" }, { status: 400 });
  }

  const { category, entries } = body;
  if (!category || !Array.isArray(entries)) {
    return NextResponse.json(
      { error: "category と entries が必要です" },
      { status: 400 },
    );
  }

  try {
    const data = await readOverrides();
    data.rankings[category] = entries;
    await writeOverrides(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `保存失敗: ${message}` }, { status: 500 });
  }

  try {
    revalidatePath("/");
    revalidatePath("/top-picks/overall");
    revalidatePath(`/top-picks/${category}`);
  } catch {
    // non-critical
  }

  return NextResponse.json({ ok: true });
}
