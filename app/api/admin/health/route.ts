export const runtime = "edge";

/**
 * GET /api/admin/health
 *
 * Supabase 接続・テーブル到達性を診断する軽量 API。
 * パスワード不要 (env 情報は存在フラグのみ返す — 値は一切含まない)。
 *
 * レスポンス例 (正常):
 * {
 *   "success": true,
 *   "env": { "hasUrl": true, "hasServiceRoleKey": true, "missing": [] },
 *   "database": {
 *     "connected": true,
 *     "cardsTableReachable": true,
 *     "rankingsTableReachable": true,
 *     "homepageFeaturedTableReachable": true
 *   }
 * }
 *
 * レスポンス例 (env 不足):
 * {
 *   "success": false,
 *   "env": { "hasUrl": false, "hasServiceRoleKey": false, "missing": ["SUPABASE_URL...", "SUPABASE_SERVICE_ROLE_KEY"] },
 *   "database": null,
 *   "error": "Supabase is not configured. Missing: ..."
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

  // env が不足していたらここで終了
  if (!diag.hasUrl || !diag.hasServiceRoleKey) {
    const missingStr = diag.missing.join(", ");
    return NextResponse.json(
      {
        success: false,
        env: envResult,
        database: null,
        error: `Supabase is not configured. Missing: ${missingStr}. .env.local を作成して NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください。`,
      },
      { status: 503 },
    );
  }

  // 各テーブルに対して limit 1 の軽いクエリを実行
  const supabase = getSupabaseClient()!;

  async function pingTable(table: string): Promise<{ reachable: boolean; error?: string }> {
    try {
      const { error } = await supabase.from(table).select("*").limit(1);
      if (error) return { reachable: false, error: error.message };
      return { reachable: true };
    } catch (e) {
      return { reachable: false, error: e instanceof Error ? e.message : String(e) };
    }
  }

  const [cardsResult, rankingsResult, featuredResult] = await Promise.all([
    pingTable("cards"),
    pingTable("rankings"),
    pingTable("homepage_featured"),
  ]);

  const allReachable =
    cardsResult.reachable && rankingsResult.reachable && featuredResult.reachable;

  const dbErrors = [
    !cardsResult.reachable && `cards: ${cardsResult.error}`,
    !rankingsResult.reachable && `rankings: ${rankingsResult.error}`,
    !featuredResult.reachable && `homepage_featured: ${featuredResult.error}`,
  ].filter(Boolean);

  return NextResponse.json(
    {
      success: allReachable,
      env: envResult,
      database: {
        connected: allReachable || cardsResult.reachable || rankingsResult.reachable || featuredResult.reachable,
        cardsTableReachable: cardsResult.reachable,
        rankingsTableReachable: rankingsResult.reachable,
        homepageFeaturedTableReachable: featuredResult.reachable,
        ...(dbErrors.length > 0 && { errors: dbErrors }),
      },
      ...(dbErrors.length > 0 && {
        error:
          "一部のテーブルに接続できませんでした。supabase-schema.sql を Supabase SQL エディタで実行してください。",
      }),
    },
    { status: allReachable ? 200 : 503 },
  );
}
