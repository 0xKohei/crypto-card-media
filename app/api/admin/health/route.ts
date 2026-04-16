export const runtime = "edge";

/**
 * GET /api/admin/health
 *
 * Supabase 接続・テーブル・カラム・Storage バケットを診断する。
 * 認証不要 (値は一切含まない — 存在フラグのみ)。
 *
 * レスポンス例 (正常):
 * {
 *   "success": true,
 *   "missing": [],
 *   "database": { "connected": true, "cardsTableReachable": true, ... },
 *   "schema": { "isDbOnlyColumnExists": true, "bucketExists": true }
 * }
 *
 * レスポンス例 (未セットアップ):
 * {
 *   "success": false,
 *   "missing": ["column:cards.is_db_only", "bucket:card-images"],
 *   "database": { ... },
 *   "schema": { "isDbOnlyColumnExists": false, "bucketExists": false },
 *   "dashboard": {
 *     "sqlUrl": "https://supabase.com/dashboard/project/xxx/sql",
 *     "storageUrl": "https://supabase.com/dashboard/project/xxx/storage/buckets"
 *   }
 * }
 */

import { NextResponse } from "next/server";
import { diagnoseSupabaseEnv, getSupabaseClient } from "@/lib/supabase";

export async function GET() {
  const diag = diagnoseSupabaseEnv();
  const envResult = {
    hasUrl: diag.hasUrl,
    hasServiceRoleKey: diag.hasServiceRoleKey,
    missing: diag.missing,
    nodeEnv: diag.nodeEnv,
  };

  // env 不足時は即終了
  if (!diag.hasUrl || !diag.hasServiceRoleKey) {
    return NextResponse.json(
      {
        success: false,
        env: envResult,
        database: null,
        schema: null,
        missing: diag.missing.map((m) => `env:${m}`),
        error: `Supabase が未設定です。Missing: ${diag.missing.join(", ")}`,
      },
      { status: 503 },
    );
  }

  const supabase = getSupabaseClient()!;

  // ─── テーブル到達確認 ─────────────────────────────────────────
  async function pingTable(table: string): Promise<{ reachable: boolean; error?: string }> {
    try {
      const { error } = await supabase.from(table).select("*").limit(1);
      if (error) return { reachable: false, error: error.message };
      return { reachable: true };
    } catch (e) {
      return { reachable: false, error: e instanceof Error ? e.message : String(e) };
    }
  }

  // ─── is_db_only カラム存在確認 ─────────────────────────────────
  async function checkIsDbOnlyColumn(): Promise<boolean> {
    try {
      const { error } = await supabase.from("cards").select("is_db_only").limit(1);
      if (!error) return true;
      // カラムが存在しないときのエラーメッセージ例:
      // "Could not find the 'is_db_only' column of 'cards' in the schema cache"
      if (error.message.toLowerCase().includes("is_db_only")) return false;
      // その他のエラー (テーブル自体がない等) は false 扱い
      return false;
    } catch {
      return false;
    }
  }

  // ─── Storage バケット存在確認 ──────────────────────────────────
  async function checkBucket(name: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage.getBucket(name);
      return error === null;
    } catch {
      return false;
    }
  }

  // 並列実行
  const [cardsResult, rankingsResult, featuredResult, isDbOnlyExists, bucketExists] =
    await Promise.all([
      pingTable("cards"),
      pingTable("rankings"),
      pingTable("homepage_featured"),
      checkIsDbOnlyColumn(),
      checkBucket("card-images"),
    ]);

  const tablesOk =
    cardsResult.reachable && rankingsResult.reachable && featuredResult.reachable;

  // missing リスト (管理画面の警告 UI が参照)
  const missing: string[] = [];
  if (!cardsResult.reachable) missing.push("table:cards");
  if (!rankingsResult.reachable) missing.push("table:rankings");
  if (!featuredResult.reachable) missing.push("table:homepage_featured");
  if (!isDbOnlyExists) missing.push("column:cards.is_db_only");
  if (!bucketExists) missing.push("bucket:card-images");

  // Supabase ダッシュボード URL (project ref は URL から抽出)
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const projectRef = supabaseUrl
    .replace("https://", "")
    .replace(".supabase.co", "")
    .split(".")[0];
  const dashboardBase = projectRef
    ? `https://supabase.com/dashboard/project/${projectRef}`
    : null;

  const success = tablesOk && isDbOnlyExists && bucketExists;

  return NextResponse.json(
    {
      success,
      env: envResult,
      database: {
        connected: cardsResult.reachable || rankingsResult.reachable || featuredResult.reachable,
        cardsTableReachable: cardsResult.reachable,
        rankingsTableReachable: rankingsResult.reachable,
        homepageFeaturedTableReachable: featuredResult.reachable,
        isDbOnlyColumnExists: isDbOnlyExists,
        bucketExists,
        ...(cardsResult.error && { cardsError: cardsResult.error }),
        ...(rankingsResult.error && { rankingsError: rankingsResult.error }),
        ...(featuredResult.error && { featuredError: featuredResult.error }),
      },
      schema: {
        isDbOnlyColumnExists: isDbOnlyExists,
        bucketExists,
      },
      missing,
      ...(dashboardBase && {
        dashboard: {
          sqlUrl: `${dashboardBase}/sql`,
          storageUrl: `${dashboardBase}/storage/buckets`,
        },
      }),
      ...(!success && {
        error: `${missing.length}件のセットアップが未完了です: ${missing.join(", ")}`,
      }),
    },
    { status: success ? 200 : 503 },
  );
}
