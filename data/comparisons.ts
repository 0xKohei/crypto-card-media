import type { ComparisonMeta } from "@/types";

export const comparisons: ComparisonMeta[] = [
  {
    slug: "tria-vs-gomining",
    title: "Tria vs GoMining Card 徹底比較",
    description:
      "総合1位のTriaと高還元が魅力のGoMining Cardを手数料・還元率・対応地域・KYCなどの観点で比較します。",
    cardSlugs: ["tria", "gomining-card"],
    relatedArticleSlugs: ["how-to-choose-crypto-card", "what-is-cashback-in-crypto"],
    updatedAt: "2026-04-01",
  },
  {
    slug: "tria-vs-swissborg",
    title: "Tria vs SwissBorg Card 比較",
    description:
      "非カストディのTriaとスイス発の高信頼性SwissBorgを比較。DeFiユーザーと$BORG保有者それぞれの最適解を探ります。",
    cardSlugs: ["tria", "swissborg-card"],
    relatedArticleSlugs: ["what-is-non-custodial-card"],
    updatedAt: "2026-04-01",
  },
  {
    slug: "tria-vs-pexx",
    title: "Tria vs PEXX Card 比較【出金性重視】",
    description:
      "出金性重視のユーザーが比較すべき2枚。Triaの広い対応範囲とPEXXのUSDT特化設計を詳しく比較します。",
    cardSlugs: ["tria", "pexx-card"],
    relatedArticleSlugs: ["fund-transfer-basics", "stablecoin-daily-payment"],
    updatedAt: "2026-04-01",
  },
  {
    slug: "gomining-vs-swissborg",
    title: "GoMining vs SwissBorg 高還元カード比較",
    description:
      "BTC還元のGoMiningと$BORG還元のSwissBorgを還元率・条件・リスクの観点で比較します。",
    cardSlugs: ["gomining-card", "swissborg-card"],
    relatedArticleSlugs: ["what-is-cashback-in-crypto"],
    updatedAt: "2026-04-01",
  },
  {
    slug: "tria-vs-etherfi",
    title: "Tria vs EtherFi×MEXC Card 比較【DeFiカード】",
    description:
      "非カストディ型同士の比較。Triaのマルチトークン対応とEtherFiのETHステーキング連携を詳しく見ます。",
    cardSlugs: ["tria", "etherfi-mexc-card"],
    relatedArticleSlugs: ["what-is-non-custodial-card"],
    updatedAt: "2026-04-01",
  },
  {
    slug: "zeal-vs-picnic",
    title: "Zeal vs Picnic Card 低コストカード比較",
    description:
      "どちらも0.3%の超低FX手数料を持つ2枚を、還元率・IBANの有無・APYなどで詳細比較します。",
    cardSlugs: ["zeal-card", "picnic-card"],
    relatedArticleSlugs: ["how-to-choose-crypto-card"],
    updatedAt: "2026-04-01",
  },
  {
    slug: "tria-vs-zeal",
    title: "Tria vs Zeal Card 比較",
    description:
      "グローバル対応のTriaとEU向け低コスト設計のZealを比較。日本ユーザーへの相性も含めて検討します。",
    cardSlugs: ["tria", "zeal-card"],
    relatedArticleSlugs: ["how-to-choose-crypto-card"],
    updatedAt: "2026-04-01",
  },
  {
    slug: "tria-3way",
    title: "Tria vs GoMining vs PEXX 3枚比較",
    description:
      "総合・高還元・出金性という3つの特徴を持つカードを一度に比較します。",
    cardSlugs: ["tria", "gomining-card", "pexx-card"],
    relatedArticleSlugs: ["how-to-choose-crypto-card", "fund-transfer-basics"],
    updatedAt: "2026-04-01",
  },
];

export function getComparisonBySlug(slug: string): ComparisonMeta | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getComparisonsForCard(cardSlug: string): ComparisonMeta[] {
  return comparisons.filter((c) => c.cardSlugs.includes(cardSlug));
}
