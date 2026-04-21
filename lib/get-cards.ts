import { cards as staticCards } from "@/data/cards";
import {
  getCardOverrides,
  getRankings,
  getHomepageFeaturedSlots,
} from "@/lib/admin-storage";
import type {
  Card,
  Region,
  Network,
  CardType,
  CustodyType,
  KycLevel,
  IssuerType,
  RewardType,
  AvailabilityStatus,
  CardFAQ,
} from "@/types";

// ─── 公開型 ──────────────────────────────────────────────────────

export interface AdminRankingEntry {
  rank: number;
  cardSlug: string;
  reason: string;
  shortReason?: string;
  keyStrength?: string;
}

/** DB rankings + cards join 済みエントリー (表示用) */
export interface RankingEntry {
  rank: number;
  card: Card & { isVisible?: boolean };
  reason: string;
  shortReason: string;
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
    ...(fees.officialUrl != null && { officialUrl: fees.officialUrl as string }),
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

// ─── DB 専用カードビルダー ──────────────────────────────────────────

/**
 * Supabase cards テーブルの is_db_only=true 行から完全な Card オブジェクトを構築する。
 * fees JSONB に格納されたフィールドを使用し、存在しない場合はデフォルト値を適用する。
 */
function buildDbOnlyCard(
  override: Awaited<ReturnType<typeof getCardOverrides>>[number],
): Card & { isVisible?: boolean; isDbOnly?: boolean } {
  const fees = (override.fees ?? {}) as Record<string, unknown>;

  const pick = <T>(v: unknown, fallback: T): T =>
    v !== undefined && v !== null ? (v as T) : fallback;

  const today = new Date().toISOString().split("T")[0];

  return {
    id: override.slug,
    slug: override.slug,
    name: override.name ?? override.slug,
    logo: pick(fees.logo, "💳"),
    coverColor: pick(fees.coverColor, "from-slate-600 to-slate-700"),
    description: override.description ?? "",
    fees: {
      issuance: pick(fees.issuanceFee, "—") as string,
      annual: pick(fees.annualFee, "—") as string,
      fx: pick(fees.fxFee, "—") as string,
      atm: pick(fees.atmFee, "—") as string,
    },
    cashback: {
      rate: pick(fees.cashbackRate, "—") as string,
      condition: pick(fees.cashbackDetails, "—") as string,
    },
    atm: { available: true, limit: pick(fees.spendingLimit, "—") as string },
    availability: { countries: [], japan: "unknown" as const },
    source: { url: pick(fees.officialUrl, "") as string, section: "" },
    shortDescription: override.description ?? "",
    longDescription: pick(fees.longDescription, "") as string,
    issuer: pick(fees.issuer, override.name ?? override.slug) as string,
    issuerType: pick(fees.issuerType, "fintech") as IssuerType,
    provider: pick(fees.provider, "") as string,
    network: pick(fees.network, "Visa") as Network,
    regionAvailability: pick(fees.regionAvailability, []) as Region[],
    supportedCountries: pick(fees.supportedCountries, []) as string[],
    cardType: pick(fees.cardType, "prepaid") as CardType,
    custodyType: pick(fees.custodyType, "custodial") as CustodyType,
    kycRequired: pick(fees.kycRequired, true) as boolean,
    kycLevel: pick(fees.kycLevel, "standard") as KycLevel,
    physicalCard: pick(fees.physicalCard, true) as boolean,
    virtualCard: pick(fees.virtualCard, true) as boolean,
    applePay: pick(fees.applePay, false) as boolean,
    googlePay: pick(fees.googlePay, false) as boolean,
    cashbackRate: pick(fees.cashbackRate, "—") as string,
    cashbackDetails: pick(fees.cashbackDetails, "") as string,
    rewardType: pick(fees.rewardType, "none") as RewardType,
    stakingRequired: pick(fees.stakingRequired, false) as boolean,
    subscriptionRequired: pick(fees.subscriptionRequired, false) as boolean,
    issuanceFee: pick(fees.issuanceFee, "—") as string,
    monthlyFee: pick(fees.monthlyFee, "—") as string,
    annualFee: pick(fees.annualFee, undefined) as string | undefined,
    fxFee: pick(fees.fxFee, "—") as string,
    atmFee: pick(fees.atmFee, "—") as string,
    spendingLimit: pick(fees.spendingLimit, "—") as string,
    topupMethods: pick(fees.topupMethods, []) as string[],
    supportedAssets: pick(fees.supportedAssets, []) as string[],
    supportedFiatCurrencies: pick(fees.supportedFiatCurrencies, []) as string[],
    supportedChains: pick(fees.supportedChains, []) as string[],
    settlementMethod: pick(fees.settlementMethod, "") as string,
    stablecoinSupport: pick(fees.stablecoinSupport, false) as boolean,
    spendFrom: pick(fees.spendFrom, "") as string,
    rechargeModel: pick(fees.rechargeModel, "") as string,
    referralProgram: pick(fees.referralProgram, false) as boolean,
    availabilityStatus: pick(fees.availabilityStatus, "available") as AvailabilityStatus,
    waitlist: pick(fees.waitlist, false) as boolean,
    bestFor: pick(fees.bestFor, []) as string[],
    useCases: pick(fees.useCases, []) as string[],
    pros: pick(fees.pros, []) as string[],
    cons: pick(fees.cons, []) as string[],
    faq: pick(fees.faq, []) as CardFAQ[],
    relatedGuides: pick(fees.relatedGuides, []) as string[],
    relatedComparisons: pick(fees.relatedComparisons, []) as string[],
    relatedTopPicks: pick(fees.relatedTopPicks, []) as string[],
    tags: (override.tags as string[]) ?? [],
    officialUrl: pick(fees.officialUrl, "") as string,
    referralUrl: pick(fees.referralUrl, undefined) as string | undefined,
    isEditorsPick: pick(fees.isEditorsPick, false) as boolean,
    isFeatured: pick(fees.isFeatured, true) as boolean,
    isSponsor: pick(fees.isSponsor, false) as boolean,
    image: override.image ?? undefined,
    cardImage: override.image ?? undefined,
    isPriority: pick(fees.isPriority, false) as boolean,
    priorityRank: pick(fees.priorityRank, undefined) as number | undefined,
    keyStrength: pick(fees.keyStrength, undefined) as string | undefined,
    lastReviewed: pick(fees.lastReviewed, today) as string,
    lastUpdated: pick(fees.lastUpdated, today) as string,
    isVisible: override.visible ?? true,
    isDbOnly: true,
  } as unknown as Card & { isVisible?: boolean; isDbOnly?: boolean };
}

// ─── 公開 API ─────────────────────────────────────────────────────

/**
 * 全カードを返す。
 * 1. Supabase cards テーブルのオーバーライドを静的データにマージ
 * 2. is_db_only=true の行は buildDbOnlyCard() で独立したカードとして構築
 * 3. isVisible=false のカードを除外する
 */
export async function getCards(): Promise<(Card & { isVisible?: boolean; isDbOnly?: boolean })[]> {
  const overrides = await getCardOverrides();

  // 静的カードにオーバーライドをマージ
  const staticMerged = staticCards
    .map((card) => {
      const override = overrides.find((o) => o.slug === card.slug);
      return mergeCardOverride(card, override);
    })
    .filter((card) => card.isVisible !== false);

  // DB 専用カード (is_db_only=true かつ staticCards に存在しないもの)
  const staticSlugs = new Set(staticCards.map((c) => c.slug));
  const dbOnlyCards = overrides
    .filter((o) => o.is_db_only === true && !staticSlugs.has(o.slug) && o.visible !== false)
    .map(buildDbOnlyCard);

  return [...staticMerged, ...dbOnlyCards];
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
 * ランキングエントリーをカード情報込みで返す。
 * DB に該当カテゴリーのデータがない場合は data/top-picks.ts の静的データにフォールバック。
 */
export async function getRankingWithCards(category: string): Promise<RankingEntry[]> {
  const [dbEntries, allCards] = await Promise.all([
    getRankings(category),
    getCards(),
  ]);

  if (dbEntries.length > 0) {
    return dbEntries
      .sort((a, b) => a.rank - b.rank)
      .map((e) => {
        const card = allCards.find((c) => c.slug === e.card_slug);
        if (!card) {
          console.error(
            `[get-cards] getRankingWithCards("${category}"): card_slug="${e.card_slug}" が見つかりません`,
          );
          return null;
        }
        return {
          rank: e.rank,
          card,
          reason: e.reason ?? "",
          shortReason: e.short_reason ?? "",
        };
      })
      .filter((e): e is RankingEntry => e !== null);
  }

  // フォールバック: data/top-picks.ts の静的エントリーを使用
  const { topPicks } = await import("@/data/top-picks");
  const tp = topPicks.find((t) => t.slug === category);
  if (!tp) return [];

  return tp.entries
    .map((e) => {
      const card = allCards.find((c) => c.slug === e.cardSlug);
      if (!card) return null;
      return {
        rank: e.rank,
        card,
        reason: e.reason ?? "",
        shortReason: e.shortReason ?? e.reason ?? "",
      };
    })
    .filter((e): e is RankingEntry => e !== null);
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
