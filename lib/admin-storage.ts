/**
 * Edge-safe admin storage module.
 * No top-level Node.js imports (fs, path) — Supabase reads/writes via fetch.
 * Used by /api/admin/* routes (Edge Runtime on Cloudflare Pages).
 *
 * Write requires Supabase. Read falls back to empty overrides when Supabase
 * is unconfigured (admin still loads all static cards via merged GET).
 */
import { getSupabaseClient, OVERRIDES_ROW_ID } from "@/lib/supabase";
import type { AdminOverrides } from "@/lib/get-cards";

export type { AdminOverrides };
export type { AdminCardOverride, AdminRankingEntry } from "@/lib/get-cards";

export async function readOverrides(): Promise<AdminOverrides> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    // No Supabase — try local JSON file (only works in Node.js runtime, not Edge)
    try {
      // webpackIgnore prevents Edge bundler from trying to resolve fs/path at build time.
      // require() will still throw at runtime in Edge — caught below.
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require(/* webpackIgnore: true */ "fs") as typeof import("fs");
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const path = require(/* webpackIgnore: true */ "path") as typeof import("path");
      const filePath = path.join(process.cwd(), "data", "admin-overrides.json");
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw) as AdminOverrides;
    } catch {
      // Edge Runtime or file missing — return empty (admin will still show static cards)
      return { cards: [], rankings: {} };
    }
  }

  const { data, error } = await supabase
    .from("admin_overrides")
    .select("data")
    .eq("id", OVERRIDES_ROW_ID)
    .single();

  if (error || !data) return { cards: [], rankings: {} };
  return data.data as AdminOverrides;
}

export async function writeOverrides(overrides: AdminOverrides): Promise<void> {
  const supabase = getSupabaseClient();

  // ── Supabase write ───────────────────────────────────────────────────────
  if (supabase) {
    const { error } = await supabase.from("admin_overrides").upsert({
      id: OVERRIDES_ROW_ID,
      data: overrides,
    });
    if (error) {
      throw new Error(
        `Supabase 書き込みエラー: ${error.message} ` +
        "(テーブルが存在するか supabase-schema.sql を実行したか確認してください)",
      );
    }
    return;
  }

  // ── Node.js fallback (local dev without Supabase) ────────────────────────
  let savedToFile = false;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require(/* webpackIgnore: true */ "fs") as typeof import("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require(/* webpackIgnore: true */ "path") as typeof import("path");
    const filePath = path.join(process.cwd(), "data", "admin-overrides.json");
    fs.writeFileSync(filePath, JSON.stringify(overrides, null, 2), "utf-8");
    savedToFile = true;
  } catch {
    // fs not available — likely Edge Runtime
  }

  if (savedToFile) return;

  // ── Neither storage worked ───────────────────────────────────────────────
  throw new Error(
    "保存できません: Supabase が設定されていません。" +
    ".env.local (ローカル開発) または Cloudflare Pages の環境変数に " +
    "SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください。" +
    "設定後 supabase-schema.sql を Supabase SQL エディタで実行してください。",
  );
}
