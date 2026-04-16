/**
 * Admin storage — Supabase のみ、fs フォールバックなし
 *
 * 3テーブル構成:
 *   cards            — カードオーバーライド (slug キー)
 *   rankings         — ランキング (category + rank キー)
 *   homepage_featured — トップページ掲載枠 (slot 1〜3)
 *
 * Supabase 未設定 (env vars なし) の場合:
 *   - 読み取りは空配列を返す (ビルド・表示を壊さない)
 *   - 書き込みは Error をスローする
 */
import { getSupabaseClient, diagnoseSupabaseEnv } from "@/lib/supabase";

// ─── 型定義 ──────────────────────────────────────────────────────

export interface DbCardOverride {
  id?: string;
  slug: string;
  name?: string | null;
  description?: string | null;  // shortDescription に対応
  image?: string | null;         // cardImage に対応
  fees?: Record<string, unknown> | null;  // 手数料・機能・その他の上書き値
  tags?: string[] | null;
  visible?: boolean | null;
  updated_at?: string;
}

export interface DbRankingEntry {
  id?: string;
  category: string;
  rank: number;
  card_slug: string;
  short_reason?: string | null;
  reason?: string | null;
  is_visible?: boolean | null;
}

export interface DbHomepageFeatured {
  id?: string;
  slot: number;
  card_slug: string;
  short_reason?: string | null;
  is_visible?: boolean | null;
}

// ─── ヘルパー ─────────────────────────────────────────────────────

function requireSupabase() {
  const { hasUrl, hasKey, nodeEnv } = diagnoseSupabaseEnv();

  // 診断ログ — 値そのものは出力しない
  console.log("[admin-storage] env check", { hasUrl, hasKey, nodeEnv });

  const client = getSupabaseClient();
  if (!client) {
    const missing: string[] = [];
    if (!hasUrl) missing.push("SUPABASE_URL (または NEXT_PUBLIC_SUPABASE_URL)");
    if (!hasKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");

    const detail =
      missing.length > 0
        ? `不足している環境変数: ${missing.join(", ")}`
        : "URL/KEY は存在しますが createClient が失敗しました (値が空白か不正な可能性)";

    throw new Error(
      `Supabase 未設定: ${detail}。` +
      "プロジェクトルートの .env.local に設定し、next dev を再起動してください。",
    );
  }
  return client;
}

// ─── cards テーブル ───────────────────────────────────────────────

/** カードオーバーライド一覧を取得。Supabase 未設定時は空配列を返す。 */
export async function getCardOverrides(): Promise<DbCardOverride[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from("cards").select("*");
  if (error) {
    console.error("[admin-storage] getCardOverrides:", error.message);
    return [];
  }
  return (data ?? []) as DbCardOverride[];
}

/** カードオーバーライドを upsert (slug が一致すれば更新、なければ挿入)。 */
export async function upsertCardOverride(row: DbCardOverride): Promise<void> {
  const supabase = requireSupabase();
  const { id: _id, updated_at: _ts, ...rest } = row;
  const { error } = await supabase
    .from("cards")
    .upsert({ ...rest, updated_at: new Date().toISOString() }, { onConflict: "slug" });
  if (error) throw new Error(`cards upsert 失敗: ${error.message}`);
}

/** カードオーバーライドを削除 (静的データのデフォルトに戻る)。 */
export async function deleteCardOverride(slug: string): Promise<void> {
  const supabase = requireSupabase();
  const { error } = await supabase.from("cards").delete().eq("slug", slug);
  if (error) throw new Error(`cards delete 失敗: ${error.message}`);
}

// ─── rankings テーブル ────────────────────────────────────────────

/** ランキングエントリーを取得 (rank 順)。Supabase 未設定時は空配列。 */
export async function getRankings(category = "overall"): Promise<DbRankingEntry[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("rankings")
    .select("*")
    .eq("category", category)
    .order("rank");
  if (error) {
    console.error("[admin-storage] getRankings:", error.message);
    return [];
  }
  return (data ?? []) as DbRankingEntry[];
}

/** ランキングを一括更新 (既存エントリーを削除して再挿入)。 */
export async function setRankings(category: string, entries: Omit<DbRankingEntry, "id">[]): Promise<void> {
  const supabase = requireSupabase();
  const { error: delErr } = await supabase
    .from("rankings")
    .delete()
    .eq("category", category);
  if (delErr) throw new Error(`rankings delete 失敗: ${delErr.message}`);
  if (entries.length === 0) return;
  const rows = entries.map((e) => ({ ...e, category }));
  const { error: insErr } = await supabase.from("rankings").insert(rows);
  if (insErr) throw new Error(`rankings insert 失敗: ${insErr.message}`);
}

// ─── homepage_featured テーブル ───────────────────────────────────

/** トップページ掲載枠を取得 (slot 順)。Supabase 未設定時は空配列。 */
export async function getHomepageFeaturedSlots(): Promise<DbHomepageFeatured[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("homepage_featured")
    .select("*")
    .order("slot");
  if (error) {
    console.error("[admin-storage] getHomepageFeaturedSlots:", error.message);
    return [];
  }
  return (data ?? []) as DbHomepageFeatured[];
}

/** トップページ掲載枠を一括 upsert (slot をキーに更新)。 */
export async function setHomepageFeatured(slots: Omit<DbHomepageFeatured, "id">[]): Promise<void> {
  const supabase = requireSupabase();
  for (const slot of slots) {
    const { id: _id, ...rest } = slot as DbHomepageFeatured;
    const { error } = await supabase
      .from("homepage_featured")
      .upsert(rest, { onConflict: "slot" });
    if (error) throw new Error(`homepage_featured upsert (slot ${slot.slot}) 失敗: ${error.message}`);
  }
}
