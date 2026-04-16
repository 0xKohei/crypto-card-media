/**
 * Admin storage — Supabase のみ、fs フォールバックなし
 *
 * 3テーブル構成:
 *   cards             — カードオーバーライド (slug キー)
 *   rankings          — ランキング (category + rank キー)
 *   homepage_featured — トップページ掲載枠 (slot 1〜3)
 *
 * 環境変数が不足している場合:
 *   - 読み取り関数: 空配列を返す (ビルド・表示を壊さない)
 *   - 書き込み関数: 具体的なエラーをスローする
 */
import { getSupabaseClient, requireSupabaseClient, diagnoseSupabaseEnv } from "@/lib/supabase";

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
  is_db_only?: boolean | null;  // true = data/cards.ts に存在しない DB 専用カード
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

// ─── 書き込み共通ヘルパー ─────────────────────────────────────────

/**
 * 書き込み操作の前に呼ぶ。
 * 未設定なら診断ログを出してから具体的な Error をスローする。
 */
function requireWrite() {
  const diag = diagnoseSupabaseEnv();
  console.log("[admin-storage] write env check", {
    hasUrl: diag.hasUrl,
    hasServiceRoleKey: diag.hasServiceRoleKey,
    missing: diag.missing,
    nodeEnv: diag.nodeEnv,
  });
  return requireSupabaseClient();
}

// ─── cards テーブル ───────────────────────────────────────────────

/**
 * カードオーバーライド一覧を取得。
 * Supabase 未設定時は空配列を返す (ビルド・表示を壊さない)。
 */
export async function getCardOverrides(): Promise<DbCardOverride[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const diag = diagnoseSupabaseEnv();
    console.log("[admin-storage] getCardOverrides: Supabase 未設定のため空配列を返します", {
      missing: diag.missing,
    });
    return [];
  }
  const { data, error } = await supabase.from("cards").select("*");
  if (error) {
    console.error("[admin-storage] getCardOverrides error:", error.message);
    return [];
  }
  return (data ?? []) as DbCardOverride[];
}

/**
 * カードオーバーライドを upsert (slug が一致すれば更新、なければ挿入)。
 */
export async function upsertCardOverride(row: DbCardOverride): Promise<void> {
  const supabase = requireWrite();
  const { id: _id, updated_at: _ts, ...rest } = row;
  const { error } = await supabase
    .from("cards")
    .upsert({ ...rest, updated_at: new Date().toISOString() }, { onConflict: "slug" });
  if (error) throw new Error(`cards upsert 失敗: ${error.message}`);
}

/**
 * カードオーバーライドを削除。
 * is_db_only=true のカードのみ対象。静的カードのオーバーライド削除は deleteCardOverride ではなく
 * upsertCardOverride で visible=false を設定すること。
 */
export async function deleteCardOverride(slug: string): Promise<void> {
  const supabase = requireWrite();
  const { error } = await supabase.from("cards").delete().eq("slug", slug);
  if (error) throw new Error(`cards delete 失敗: ${error.message}`);
}

/**
 * 指定 slug のカードが rankings または homepage_featured から参照されているか確認する。
 * 参照がある場合は参照元情報の配列を返す。空配列なら削除可能。
 */
export async function checkCardReferences(
  slug: string,
): Promise<Array<{ table: string; detail: string }>> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const results: Array<{ table: string; detail: string }> = [];

  const [{ data: rankingRefs }, { data: featuredRefs }] = await Promise.all([
    supabase.from("rankings").select("category, rank").eq("card_slug", slug),
    supabase.from("homepage_featured").select("slot").eq("card_slug", slug),
  ]);

  for (const r of rankingRefs ?? []) {
    const row = r as { category: string; rank: number };
    results.push({
      table: "rankings",
      detail: `ランキング「${row.category}」の ${row.rank} 位`,
    });
  }
  for (const r of featuredRefs ?? []) {
    const row = r as { slot: number };
    results.push({
      table: "homepage_featured",
      detail: `トップ掲載スロット ${row.slot}`,
    });
  }

  return results;
}

// ─── rankings テーブル ────────────────────────────────────────────

/**
 * ランキングエントリーを取得 (rank 順)。
 * Supabase 未設定時は空配列を返す。
 */
export async function getRankings(category = "overall"): Promise<DbRankingEntry[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("rankings")
    .select("*")
    .eq("category", category)
    .order("rank");
  if (error) {
    console.error("[admin-storage] getRankings error:", error.message);
    return [];
  }
  return (data ?? []) as DbRankingEntry[];
}

/**
 * ランキングを一括更新。
 *
 * 旧実装 (delete → insert) はネットワーク断/INSERT失敗時にデータ全消失するリスクがあった。
 * 新実装: upsert → prune の2段階で原子性を確保する。
 *   1. upsert: 既存行を上書き + 新規行を挿入 (失敗しても既存データは残る)
 *   2. prune : 新リストにない rank 行を削除 (失敗しても余分な行が残るだけ — データ消失なし)
 *
 * 空配列は誤操作防止のためエラーにする。
 */
export async function setRankings(
  category: string,
  entries: Omit<DbRankingEntry, "id">[],
): Promise<void> {
  if (entries.length === 0) {
    throw new Error(
      "ランキングエントリーが 0 件です。誤操作防止のため保存を中止しました。エントリーを 1 件以上指定してください。",
    );
  }

  const supabase = requireWrite();
  const rows = entries.map((e) => ({ ...e, category }));

  // Step 1: upsert — 失敗しても既存データは一切消えない
  const { error: upsertErr } = await supabase
    .from("rankings")
    .upsert(rows, { onConflict: "category,rank" });
  if (upsertErr) throw new Error(`rankings upsert 失敗: ${upsertErr.message}`);

  // Step 2: prune — 新リストにない rank 行を削除
  // 失敗しても旧行が残るだけ (データ消失なし) なので console.error で記録のみ
  const newRanks = entries.map((e) => e.rank);
  const { error: pruneErr } = await supabase
    .from("rankings")
    .delete()
    .eq("category", category)
    .not("rank", "in", `(${newRanks.join(",")})`);
  if (pruneErr) {
    console.error("[admin-storage] setRankings prune 失敗 (非致命的):", pruneErr.message);
  }
}

// ─── homepage_featured テーブル ───────────────────────────────────

/**
 * トップページ掲載枠を取得 (slot 順)。
 * Supabase 未設定時は空配列を返す。
 */
export async function getHomepageFeaturedSlots(): Promise<DbHomepageFeatured[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("homepage_featured")
    .select("*")
    .order("slot");
  if (error) {
    console.error("[admin-storage] getHomepageFeaturedSlots error:", error.message);
    return [];
  }
  return (data ?? []) as DbHomepageFeatured[];
}

/**
 * トップページ掲載枠を一括 upsert (slot をキーに更新)。
 */
export async function setHomepageFeatured(
  slots: Omit<DbHomepageFeatured, "id">[],
): Promise<void> {
  const supabase = requireWrite();
  for (const slot of slots) {
    const { id: _id, ...rest } = slot as DbHomepageFeatured;
    const { error } = await supabase
      .from("homepage_featured")
      .upsert(rest, { onConflict: "slot" });
    if (error) {
      throw new Error(`homepage_featured upsert (slot ${slot.slot}) 失敗: ${error.message}`);
    }
  }
}
