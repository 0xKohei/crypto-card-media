/**
 * Supabase サーバー専用クライアント
 *
 * このファイルは API ルート・Server Components からのみ使用すること。
 * クライアントコンポーネント (use client) から直接インポートしないこと。
 * service role key が client bundle に漏れるリスクがある。
 *
 * 読む環境変数:
 *   URL : SUPABASE_URL || NEXT_PUBLIC_SUPABASE_URL (どちらか一方で OK)
 *   KEY : SUPABASE_SERVICE_ROLE_KEY のみ (NEXT_PUBLIC_ 経由では絶対に読まない)
 */
import { createClient } from "@supabase/supabase-js";

// ─── 環境変数の読取 ───────────────────────────────────────────────

function resolveEnv() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "";
  // service role key は NEXT_PUBLIC_ 側からは絶対に読まない
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return { url, serviceRoleKey };
}

// ─── 診断 ─────────────────────────────────────────────────────────

export interface SupabaseEnvDiag {
  hasUrl: boolean;
  hasServiceRoleKey: boolean;
  missing: string[];
  nodeEnv: string;
}

/**
 * 環境変数の設定状態を診断する。
 * 値そのものは含まない — 存在フラグと欠如リストのみ。
 */
export function diagnoseSupabaseEnv(): SupabaseEnvDiag {
  const { url, serviceRoleKey } = resolveEnv();
  const hasUrl = url.trim().length > 0;
  const hasServiceRoleKey = serviceRoleKey.trim().length > 0;

  const missing: string[] = [];
  if (!hasUrl) missing.push("SUPABASE_URL (または NEXT_PUBLIC_SUPABASE_URL)");
  if (!hasServiceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");

  return {
    hasUrl,
    hasServiceRoleKey,
    missing,
    nodeEnv: process.env.NODE_ENV ?? "unknown",
  };
}

// ─── クライアント ─────────────────────────────────────────────────

/**
 * Supabase サービスロールクライアントを返す。
 * 環境変数が不足している場合は null を返す。
 * 呼び出し元で null チェックすること。
 */
export function getSupabaseClient() {
  const { url, serviceRoleKey } = resolveEnv();
  if (!url.trim() || !serviceRoleKey.trim()) return null;
  return createClient(url.trim(), serviceRoleKey.trim(), {
    global: {
      // Next.js が fetch をラップしてキャッシュするため、
      // Supabase の全リクエストを明示的に no-store にする。
      // これにより admin 保存後の変更が即時反映される。
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

/**
 * Supabase クライアントを返す。
 * 環境変数が不足している場合は具体的な Error をスローする。
 */
export function requireSupabaseClient() {
  const diag = diagnoseSupabaseEnv();

  // 診断ログ — 値そのものは出力しない
  console.log("[supabase] env check", {
    hasUrl: diag.hasUrl,
    hasServiceRoleKey: diag.hasServiceRoleKey,
    missing: diag.missing,
    nodeEnv: diag.nodeEnv,
  });

  const client = getSupabaseClient();
  if (!client) {
    const missingStr =
      diag.missing.length > 0
        ? diag.missing.join(", ")
        : "URL または KEY の値が空白か不正";

    throw new Error(
      `Supabase is not configured. Missing: ${missingStr}. ` +
      ".env.local を作成して必要な環境変数を設定し、next dev を再起動してください。",
    );
  }
  return client;
}

// レガシー互換 (v1 schema で使用していた定数 — 削除可)
export const OVERRIDES_ROW_ID = "admin_overrides";
