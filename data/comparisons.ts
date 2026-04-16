import type { ComparisonMeta } from "@/types";

export const comparisons: ComparisonMeta[] = [
  {
    slug: "tria-vs-kast",
    title: "Tria vs Kast 比較",
    description:
      "非カストディのTriaとUSDC特化のKastを、手数料・対応資産・利用シーンの観点で比較します。",
    cardSlugs: ["tria", "kast"],
    relatedArticleSlugs: ["how-to-choose-crypto-card", "stablecoin-daily-payment"],
    updatedAt: "2026-04-16",
  },
  {
    slug: "tria-vs-bitget-wallet-card",
    title: "Tria vs Bitget Wallet Card 比較",
    description:
      "どちらも非カストディ志向の2枚を、対応地域・手数料設計・ウォレット連携の違いから比較します。",
    cardSlugs: ["tria", "bitget-wallet-card"],
    relatedArticleSlugs: ["what-is-non-custodial-card", "what-is-crypto-card"],
    updatedAt: "2026-04-16",
  },
  {
    slug: "tria-vs-jupiter-global",
    title: "Tria vs Jupiter Global 比較",
    description:
      "マルチトークン対応のTriaとSolana特化のJupiter Globalを、DeFi活用と日常決済の観点で比較します。",
    cardSlugs: ["tria", "jupiter-global"],
    relatedArticleSlugs: ["what-is-non-custodial-card", "stablecoin-daily-payment"],
    updatedAt: "2026-04-16",
  },
  {
    slug: "kast-vs-redotpay",
    title: "Kast vs RedotPay 比較",
    description:
      "ステーブルコイン中心で使いたいユーザー向けに、KastとRedotPayの費用感と使いやすさを比較します。",
    cardSlugs: ["kast", "redotpay"],
    relatedArticleSlugs: ["stablecoin-daily-payment", "how-to-choose-crypto-card"],
    updatedAt: "2026-04-16",
  },
  {
    slug: "tevau-vs-redotpay",
    title: "Tevau vs RedotPay 比較",
    description:
      "グローバル利用を重視する2枚を、発行費用・対応地域・アプリ機能の観点で比較します。",
    cardSlugs: ["tevau", "redotpay"],
    relatedArticleSlugs: ["overseas-usage-guide", "how-to-choose-crypto-card"],
    updatedAt: "2026-04-16",
  },
  {
    slug: "bitget-wallet-card-vs-jupiter-global",
    title: "Bitget Wallet Card vs Jupiter Global 比較",
    description:
      "2つの非カストディ型バーチャルカードを、対応地域・ウォレット連携・手数料モデルで比較します。",
    cardSlugs: ["bitget-wallet-card", "jupiter-global"],
    relatedArticleSlugs: ["what-is-non-custodial-card", "stablecoin-daily-payment"],
    updatedAt: "2026-04-16",
  },
  {
    slug: "stablecoin-3way",
    title: "Kast vs RedotPay vs Tevau 3枚比較",
    description:
      "USDC・USDT中心で使いやすい3枚を、手数料・物理カード・グローバル利用性の観点で並べて比較します。",
    cardSlugs: ["kast", "redotpay", "tevau"],
    relatedArticleSlugs: ["stablecoin-daily-payment", "overseas-usage-guide"],
    updatedAt: "2026-04-16",
  },
];

export function getComparisonBySlug(slug: string): ComparisonMeta | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getComparisonsForCard(cardSlug: string): ComparisonMeta[] {
  return comparisons.filter((c) => c.cardSlugs.includes(cardSlug));
}
