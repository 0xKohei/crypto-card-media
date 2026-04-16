import { createClient } from "@supabase/supabase-js";

/**
 * Supabase サービスロールクライアントを返す。
 * 環境変数が不足している場合は null を返す。
 *
 * 読む環境変数:
 *   URL  : SUPABASE_URL または NEXT_PUBLIC_SUPABASE_URL (どちらか一方で OK)
 *   KEY  : SUPABASE_SERVICE_ROLE_KEY (NEXT_PUBLIC_ 経由では絶対に渡さないこと)
 */
export function getSupabaseClient() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    undefined;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || undefined;

  if (!url || !key) return null;
  return createClient(url, key);
}

/**
 * 設定状態を診断して返す。
 * 値そのものは返さず、存在/不在フラグのみ。
 */
export function diagnoseSupabaseEnv() {
  const hasUrl = !!(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  );
  const hasKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { hasUrl, hasKey, nodeEnv: process.env.NODE_ENV };
}

export const OVERRIDES_ROW_ID = "admin_overrides";
