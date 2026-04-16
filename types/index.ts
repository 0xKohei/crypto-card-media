// ============================================================
// 型定義 — CryptoCardNavi
// ============================================================

export type Region =
  | "japan"
  | "asia"
  | "eu"
  | "usa"
  | "global"
  | "latam"
  | "mena";

export type CardType =
  | "prepaid"
  | "debit"
  | "credit"
  | "virtual-only"
  | "cex-linked";

export type IssuerType = "fintech" | "cex" | "defi" | "neobank" | "traditional";

export type CustodyType = "custodial" | "non-custodial" | "hybrid";

export type KycLevel = "none" | "basic" | "standard" | "enhanced";

export type Network = "Visa" | "Mastercard" | "Both" | "Other";

export type AvailabilityStatus = "available" | "waitlist" | "coming-soon" | "region-limited";

export type RewardType = "cashback-fiat" | "cashback-crypto" | "points" | "apy" | "none";
export type JapanAvailability = boolean | "unknown";
export type CardImageSourceType =
  | "official-site"
  | "official-docs"
  | "official-blog"
  | "app-store"
  | "third-party"
  | "review-site";

export interface CardFAQ {
  question: string;
  answer: string;
}

export interface CardFees {
  issuance: string;
  annual: string;
  fx: string;
  atm: string;
}

export interface CardCashback {
  rate: string;
  condition: string;
}

export interface CardAtm {
  available: boolean;
  limit: string;
}

export interface CardAvailability {
  countries: string[];
  japan: JapanAvailability;
}

export interface CardSource {
  url: string;
  section: string;
}

export interface Card {
  id: string;
  name: string;
  slug: string;
  logo: string;            // emoji or path
  coverColor: string;      // Tailwind gradient classes
  description: string;
  fees: CardFees;
  cashback: CardCashback;
  atm: CardAtm;
  availability: CardAvailability;
  source: CardSource;
  shortDescription: string;
  longDescription: string;
  issuer: string;
  issuerType: IssuerType;
  provider: string;        // 発行母体
  network: Network;
  regionAvailability: Region[];
  supportedCountries: string[];
  cardType: CardType;
  custodyType: CustodyType;
  kycRequired: boolean;
  kycLevel: KycLevel;
  physicalCard: boolean;
  virtualCard: boolean;
  applePay: boolean;
  googlePay: boolean;
  cashbackRate: string;        // 表示用 e.g. "最大4%"
  cashbackDetails: string;
  rewardType: RewardType;
  rewardToken?: string;
  stakingRequired: boolean;
  stakingDetails?: string;
  subscriptionRequired: boolean;
  subscriptionDetails?: string;
  issuanceFee: string;
  deliveryFee?: string;
  monthlyFee: string;
  annualFee?: string;
  fxFee: string;
  atmFee: string;
  foreignTransactionFee?: string;
  topupMethods: string[];
  spendingLimit: string;
  atmWithdrawalLimit?: string;
  supportedAssets: string[];
  supportedFiatCurrencies: string[];
  supportedChains: string[];
  settlementMethod: string;
  stablecoinSupport: boolean;
  spendFrom: string;
  rechargeModel: string;
  referralProgram: boolean;
  signupBonus?: string;
  availabilityStatus: AvailabilityStatus;
  waitlist: boolean;
  appRating?: string;
  bestFor: string[];
  useCases: string[];
  pros: string[];
  cons: string[];
  faq: CardFAQ[];
  relatedGuides: string[];
  relatedComparisons: string[];
  relatedTopPicks: string[];
  tags: string[];
  officialUrl: string;
  referralUrl?: string;
  isEditorsPick: boolean;
  isFeatured: boolean;
  isSponsor: boolean;
  image?: string;             // カード券面画像パス（/public/cards/*.svg|webp）
  cardImage?: string;
  cardImageSourceUrl?: string;
  cardImageSourceType?: CardImageSourceType;
  isPriority: boolean;        // 優先掲載カード（リファラルあり）
  priorityRank?: number;      // 優先表示順（1〜6）
  keyStrength?: string;       // ランキング表示用の強みワード（例：「出金に強い」）
  lastReviewed: string;
  lastUpdated: string;
  reviewNote?: string;
}

// ============================================================
// 記事 / ブログ
// ============================================================
export type ArticleCategory =
  | "beginner-guide"
  | "comparison"
  | "review"
  | "opinion"
  | "payment-infra"
  | "stablecoin"
  | "kyc-security"
  | "fund-transfer"
  | "overseas-usage"
  | "ecosystem";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  tags: string[];
  relatedCardSlugs: string[];
  relatedComparisonSlugs: string[];
  relatedTopPickSlugs: string[];
  relatedArticleSlugs: string[];
  publishedAt: string;
  updatedAt: string;
  author: string;
  readingTime: number;
  featured: boolean;
}

// ============================================================
// Top Picks / ランキング
// ============================================================
export type TopPickCategory =
  | "overall"
  | "high-cashback"
  | "overseas"
  | "beginner"
  | "japan-users"
  | "virtual-card"
  | "withdrawal"
  | "usdt"
  | "no-kyc"
  | "defi";

export interface TopPickEntry {
  rank: number;
  cardSlug: string;
  reason: string;
  keyStrength?: string;       // 1〜3位の強みワード
}

export interface TopPick {
  id: string;
  slug: string;
  category: TopPickCategory;
  title: string;
  description: string;
  rankingNote: string;         // 「当サイト内での注目度・掲載状況をもとに表示」など
  entries: TopPickEntry[];
  relatedArticleSlugs: string[];
  relatedComparisonSlugs: string[];
  updatedAt: string;
}

// ============================================================
// 比較ページ
// ============================================================
export interface ComparisonMeta {
  slug: string;
  title: string;
  description: string;
  cardSlugs: string[];
  relatedArticleSlugs: string[];
  updatedAt: string;
}

// ============================================================
// Finder フィルター
// ============================================================
export interface FinderFilters {
  region?: Region[];
  kycLevel?: KycLevel[];
  hasPhysical?: boolean;
  hasVirtual?: boolean;
  hasCashback?: boolean;
  hasApplePay?: boolean;
  hasGooglePay?: boolean;
  stablecoinSupport?: boolean;
  custodyType?: CustodyType[];
  availabilityStatus?: AvailabilityStatus[];
  issuerType?: IssuerType[];
  network?: Network[];
}
