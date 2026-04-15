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

export interface CardScore {
  overall: number;           // 0-10
  beginnerFriendly: number;  // 0-10
  japanCompatibility: number;// 0-10
  cashback: number;          // 0-10
  fees: number;              // 0-10 (高いほど手数料が低い)
  accessibility: number;     // 0-10
  usdtUsability: number;     // 0-10
  withdrawal: number;        // 0-10
  security: number;          // 0-10
}

export interface CardFAQ {
  question: string;
  answer: string;
}

export interface Card {
  id: string;
  name: string;
  slug: string;
  logo: string;            // emoji or path
  coverColor: string;      // Tailwind bg color class
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
  scores: CardScore;
  bestFor: string[];
  useCases: string[];
  pros: string[];
  cons: string[];
  faq: CardFAQ[];
  relatedGuides: string[];     // guide slugs
  relatedComparisons: string[];// comparison slugs
  relatedTopPicks: string[];   // top-picks slugs
  tags: string[];
  officialUrl: string;
  referralUrl?: string;
  isEditorsPick: boolean;
  isFeatured: boolean;
  isSponsor: boolean;
  lastReviewed: string;        // ISO date
  lastUpdated: string;         // ISO date
  reviewNote?: string;         // 調査メモ
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
  content: string;           // Markdown or HTML
  category: ArticleCategory;
  tags: string[];
  relatedCardSlugs: string[];
  relatedComparisonSlugs: string[];
  relatedTopPickSlugs: string[];
  relatedArticleSlugs: string[];
  publishedAt: string;
  updatedAt: string;
  author: string;
  readingTime: number;       // 分
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
  highlightScore?: number;
  highlightLabel?: string;
}

export interface TopPick {
  id: string;
  slug: string;
  category: TopPickCategory;
  title: string;
  description: string;
  selectionCriteria: string;
  scoringMethod: string;
  entries: TopPickEntry[];
  relatedArticleSlugs: string[];
  relatedComparisonSlugs: string[];
  updatedAt: string;
}

// ============================================================
// 比較ページ
// ============================================================
export interface ComparisonMeta {
  slug: string;             // e.g. "tria-vs-gomining"
  title: string;
  description: string;
  cardSlugs: string[];      // 2〜4枚
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
