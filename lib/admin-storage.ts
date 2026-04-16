/**
 * Edge-safe admin storage module.
 * No Node.js built-ins (fs, path) — only Supabase via fetch.
 * Used by /api/admin/* routes which run under Edge Runtime on Cloudflare Pages.
 */
import { getSupabaseClient, OVERRIDES_ROW_ID } from "@/lib/supabase";
import type { AdminOverrides } from "@/lib/get-cards";

export type { AdminOverrides };
export type { AdminCardOverride, AdminRankingEntry } from "@/lib/get-cards";

export async function readOverrides(): Promise<AdminOverrides> {
  const supabase = getSupabaseClient();
  if (!supabase) return { cards: [], rankings: {} };
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
  if (!supabase) {
    throw new Error(
      "Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  const { error } = await supabase.from("admin_overrides").upsert({
    id: OVERRIDES_ROW_ID,
    data: overrides,
  });
  if (error) throw new Error(`Supabase write error: ${error.message}`);
}
