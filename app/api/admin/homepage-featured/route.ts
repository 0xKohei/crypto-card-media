export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getHomepageFeaturedSlots, setHomepageFeatured } from "@/lib/admin-storage";
import type { DbHomepageFeatured } from "@/lib/admin-storage";
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
 * GET /api/admin/homepage-featured
 * slot 順にソートして返す。
 */
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return err("Unauthorized", 401);

  try {
    const data = await getHomepageFeaturedSlots();
    return ok(data);
  } catch (e) {
    return err(`読み込み失敗: ${e instanceof Error ? e.message : String(e)}`);
  }
}

/**
 * POST /api/admin/homepage-featured
 * Body: { slots: DbHomepageFeatured[] }
 * slot 1〜3 を一括 upsert する。
 */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return err("Unauthorized", 401);

  let body: { slots: DbHomepageFeatured[] };
  try {
    body = (await req.json()) as { slots: DbHomepageFeatured[] };
  } catch {
    return err("リクエストの解析に失敗しました", 400);
  }

  if (!Array.isArray(body?.slots)) {
    return err("slots 配列が必要です", 400);
  }

  const invalid = body.slots.find((s) => s.slot < 1 || s.slot > 3);
  if (invalid) {
    return err(`slot は 1〜3 の整数である必要があります (slot=${invalid.slot})`, 400);
  }

  try {
    await setHomepageFeatured(body.slots);
  } catch (e) {
    return err(`保存失敗: ${e instanceof Error ? e.message : String(e)}`);
  }

  try {
    revalidatePath("/");
  } catch {
    // non-critical
  }

  return ok(null);
}
