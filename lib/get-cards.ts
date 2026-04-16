import { cards as staticCards } from "@/data/cards";
import {
  getCardOverrides,
  getRankings,
  getHomepageFeaturedSlots,
} from "@/lib/admin-storage";
import type { Card, Region, Network } from "@/types";

// ─── 公開型 ──────────────────────────────────────────────────────

export interface AdminRankingEntry {
  rank: number;
  cardSlug: string;
  reason: string;
  shortReason?: string;
  keyStrength?: string;
}

export interface HomepageFeaturedSlot {
  slot: number;
  card: Card & { isVisible?: boolean };
  shortReason: string;
}

// ─── 内部ヘルパー ─────────────────────────────────────────────────

/**
 * Supabase cards テーブルのオーバーライド行と静的カードをマージする。
 * fees JSONB に格納された各フィールドは静的データより優先される。
 */
function mergeCardOverride(
  card: Card,
  override: Awaited<ReturnType<typeof getCardOverrides>>[number] | undefined,
): Card & { isVisible?: boolean } {
  if (!override) return { ...card, isVisible: true };

  const fees = (override.fees ?? {}) as Record<string, unknown>;

  const pick = <T>(v: unknown, fallback: T): T =>
    v !== undefined && v !== null ? (v as T) : fallback;

  return {
    ...card,
    // top-level columns
    ...(override.name != null && { name: override.name }),
    ...(override.description != null && {
      shortDescription: override.description,
      description: override.description,
    }),
    ...(override.image != null && { cardImage: override.image, image: override.image }),
    ...(override.tags != null && { tags: override.tags }),
    // fees JSONB fields
    ...(fees.longDescription != null && { longDescription: fees.longDescription as string }),
    ...(fees.referralUrl != null && { referralUrl: fees.referralUrl as string }),
    ...(fees.network != null && { network: fees.network as Network }),
    ...(fees.keyStrength != null && { keyStrength: fees.keyStrength as string }),
    ...(fees.priorityRank != null && { priorityRank: fees.priorityRank as number }),
    ...(fees.fxFee != null && { fxFee: fees.fxFee as string }),
    ...(fees.cashbackRate != null && { cashbackRate: fees.cashbackRate as string }),
    ...(fees.cashbackDetails != null && { cashbackDetails: fees.cashbackDetails as string }),
    ...(fees.issuanceFee != null && { issuanceFee: fees.issuanceFee as string }),
    ...(fees.monthlyFee != null && { monthlyFee: fees.monthlyFee as string }),
    ...(fees.annualFee != null && { annualFee: fees.annualFee as string }),
    ...(fees.atmFee != null && { atmFee: fees.atmFee as string }),
    ...(fees.spendingLimit != null && { spendingLimit: fees.spendingLimit as string }),
    applePay: pick(fees.applePay, card.applePay),
    googlePay: pick(fees.googlePay, card.googlePay),
    physicalCard: pick(fees.physicalCard, card.physicalCard),
    virtualCard: pick(fees.virtualCard, card.virtualCard),
    stablecoinSupport: pick(fees.stablecoinSupport, card.stablecoinSupport),
    ...(fees.regionAvailability != null && {
      regionAvailability: fees.regionAvailability as Region[],
    }),
    ...(fees.topupMethods != null && { topupMethods: fees.topupMethods as string[] }),
    ...(fees.supportedAssets != null && { supportedAssets: fees.supportedAssets as string[] }),
    ...(fees.supportedChains != null && { supportedChains: fees.supportedChains as string[] }),
    ...(fees.pros != null && { pros: fees.pros as string[] }),
    ...(fees.cons != null && { cons: fees.cons as string[] }),
    ...(fees.useCases != null && { useCases: fees.useCases as string[] }),
    ...(fees.custodyType != null && { custodyType: fees.custodyType as Card["custodyType"] }),
    ...(fees.kycLevel != null && { kycLevel: fees.kycLevel as Card["kycLevel"] }),
    isVisible: override.visible ?? true,
  } as unknown as Card & { isVisible?: boolean };
}

// ─── 公開 API ─────────────────────────────────────────────────────

/**
 * 全カードを返す。
 * Supabase cards テーブルのオーバーライドを静的データにマージし、
 * isVisible=false のカードを除外する。
 */
export async function getCards(): Promise<(Card & { isVisible?: boolean })[]> {
  const overrides = await getCardOverrides();
  return staticCards
    .map((card) => {
      const override = overrides.find((o) => o.slug === card.slug);
      return mergeCardOverride(card, override);
    })
    .filter((card) => card.isVisible !== false);
}

export async function getCardBySlug(
  slug: string,
): Promise<(Card & { isVisible?: boolean }) | undefined> {
  const cards = await getCards();
  return cards.find((c) => c.slug === slug);
}

export async function getPriorityCards(): Promise<(Card & { isVisible?: boolean })[]> {
  const cards = await getCards();
  return cards
    .filter((c) => c.isPriority && c.priorityRank != null)
    .sort((a, b) => (a.priorityRank ?? 99) - (b.priorityRank ?? 99));
}

/**
 * ランキングエントリーを取得。
 * rankings テーブルから取得し、存在しない card_slug があれば console.error で出力。
 */
export async function getRankingEntries(category: string): Promise<AdminRankingEntry[]> {
  const [dbEntries, allCards] = await Promise.all([
    getRankings(category),
    getCards(),
  ]);

  return dbEntries
    .sort((a, b) => a.rank - b.rank)
    .map((e) => {
      const card = allCards.find((c) => c.slug === e.card_slug);
      if (!card) {
        console.error(
          `[get-cards] getRankingEntries("${category}"): card_slug="${e.card_slug}" が見つかりません (rank=${e.rank})`,
        );
      }
      return {
        rank: e.rank,
        cardSlug: e.card_slug,
        reason: e.reason ?? "",
        shortReason: e.short_reason ?? undefined,
      };
    });
}

/**
 * トップページ掲載枠を取得 (slot 1〜3)。
 * homepage_featured テーブルから取得。
 * テーブルが空の場合は data/top-picks.ts の overall エントリーにフォールバック。
 */
export async function getHomepageFeatured(): Promise<HomepageFeaturedSlot[]> {
  const [dbSlots, allCards] = await Promise.all([
    getHomepageFeaturedSlots(),
    getCards(),
  ]);

  const visibleSlots = dbSlots
    .filter((s) => s.is_visible !== false)
    .sort((a, b) => a.slot - b.slot);

  if (visibleSlots.length > 0) {
    return visibleSlots
      .map((s) => {
        const card = allCards.find((c) => c.slug === s.card_slug);
        if (!card) {
          console.error(
            `[get-cards] getHomepageFeatured: slot=${s.slot} の card_slug="${s.card_slug}" が見つかりません`,
          );
          return null;
        }
        return { slot: s.slot, card, shortReason: s.short_reason ?? "" };
      })
      .filter((s): s is HomepageFeaturedSlot => s !== null);
  }

  // フォールバック: data/top-picks.ts の overall エントリーを使用
  const { topPicks } = await import("@/data/top-picks");
  const overall = topPicks.find((tp) => tp.slug === "overall");
  if (!overall) return [];

  return overall.entries
    .slice(0, 3)
    .map((e, i) => {
      const card = allCards.find((c) => c.slug === e.cardSlug);
      if (!card) return null;
      return {
        slot: i + 1,
        card,
        shortReason: e.shortReason ?? e.reason,
      };
    })
    .filter((s): s is HomepageFeaturedSlot => s !== null);
}
