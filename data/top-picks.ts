import type { TopPick } from "@/types";

export const topPicks: TopPick[] = [
  {
    id: "overall",
    slug: "overall",
    category: "overall",
    title: "クリプトカード 総合ランキング【2026年版】",
    description:
      "当サイトが厳選した6つのクリプトカードを、特徴・対応地域・手数料をもとに掲載しています。",
    rankingNote: "当サイト内での注目度・掲載状況をもとに表示しています。",
    entries: [
      {
        rank: 1,
        cardSlug: "tria",
        reason:
          "1,000以上のトークン対応・150カ国以上利用可能・非カストディ・Apple Pay対応。最大6%キャッシュバックを提供するグローバル対応カード。",
        keyStrength: "マルチトークン対応",
      },
      {
        rank: 2,
        cardSlug: "kast",
        reason:
          "USDC決済でFX手数料0%。シーズン制キャッシュバックで最大8%＋$MOVEトークンの追加報酬。ステーブルコイン活用に最適。",
        keyStrength: "FX手数料0%",
      },
      {
        rank: 3,
        cardSlug: "bitget-wallet-card",
        reason:
          "非カストディ型で月$400まで手数料実質無料。KYC完了で5 USDCボーナス。EU・アジア圏に対応。",
        keyStrength: "非カストディ",
      },
      {
        rank: 4,
        cardSlug: "jupiter-global",
        reason:
          "SolanaベースのDEX発行カード。USD取引0%・最大4%キャッシュバック予定。紹介で双方$100の強力プログラム。",
        keyStrength: "USD取引0%",
      },
      {
        rank: 5,
        cardSlug: "tevau",
        reason:
          "180カ国以上・26万ユーザー超の実績あるグローバルカード。ウォレット・Earn・レンディングを統合したマネーアプリ。",
        keyStrength: "180カ国対応",
      },
      {
        rank: 6,
        cardSlug: "redotpay",
        reason:
          "バーチャルカード$10から発行できるシンプルな設計。シンプルなクリプト決済を始めたい方向け。",
        keyStrength: "低コスト発行",
      },
    ],
    relatedArticleSlugs: ["how-to-choose-crypto-card", "what-is-crypto-card"],
    relatedComparisonSlugs: [],
    updatedAt: "2026-04-16",
  },
  {
    id: "japan-users",
    slug: "japan-users",
    category: "japan-users",
    title: "日本ユーザー向けクリプトカードランキング【2026年版】",
    description:
      "日本語対応・日本からの申し込みやすさ・Visa加盟店での利便性を重視した日本ユーザー向けランキングです。",
    rankingNote: "当サイト内での注目度・掲載状況をもとに表示しています。",
    entries: [
      {
        rank: 1,
        cardSlug: "tria",
        reason:
          "日本語サイト（tria.so/ja）を提供。150カ国以上対応で日本からの申し込み可能性が最も高いカード。",
        keyStrength: "日本語対応あり",
      },
      {
        rank: 2,
        cardSlug: "kast",
        reason:
          "グローバル展開でUSDC利用ならFX手数料0%。日本ユーザーにとっても使いやすいシンプルな設計。",
        keyStrength: "FX手数料0%",
      },
      {
        rank: 3,
        cardSlug: "tevau",
        reason:
          "180カ国以上の広いカバレッジ。アジア圏での実績もあり日本ユーザーとの相性が良い。",
        keyStrength: "アジア実績あり",
      },
    ],
    relatedArticleSlugs: ["how-to-choose-crypto-card"],
    relatedComparisonSlugs: [],
    updatedAt: "2026-04-16",
  },
  {
    id: "defi",
    slug: "defi",
    category: "defi",
    title: "DeFiユーザー向けクリプトカードランキング【2026年版】",
    description:
      "非カストディ型・マルチチェーン対応・オンチェーン連携を重視したDeFiユーザー向けランキングです。",
    rankingNote: "当サイト内での注目度・掲載状況をもとに表示しています。",
    entries: [
      {
        rank: 1,
        cardSlug: "tria",
        reason:
          "非カストディ型で1,000以上のトークン・マルチチェーン対応。DeFiとリアル決済を最高水準で統合。",
        keyStrength: "マルチチェーン",
      },
      {
        rank: 2,
        cardSlug: "jupiter-global",
        reason:
          "Solana最大DEXアグリゲーター発の非カストディカード。SolanaエコシステムのDeFiユーザーに最適。",
        keyStrength: "Solana特化",
      },
      {
        rank: 3,
        cardSlug: "bitget-wallet-card",
        reason:
          "Bitget Wallet連携の非カストディ型。EU・アジアのDeFiユーザーに対応。",
        keyStrength: "非カストディ",
      },
    ],
    relatedArticleSlugs: ["what-is-crypto-card"],
    relatedComparisonSlugs: [],
    updatedAt: "2026-04-16",
  },
  {
    id: "usdt",
    slug: "usdt",
    category: "usdt",
    title: "USDT・ステーブルコイン活用向けランキング【2026年版】",
    description:
      "USDTやUSDCでのチャージ・決済を中心に活用したいユーザー向けのランキングです。",
    rankingNote: "当サイト内での注目度・掲載状況をもとに表示しています。",
    entries: [
      {
        rank: 1,
        cardSlug: "kast",
        reason:
          "USDC決済ならFX手数料0%。ステーブルコイン特化の設計で最もコストを抑えられる。",
        keyStrength: "USDC手数料0%",
      },
      {
        rank: 2,
        cardSlug: "tria",
        reason:
          "USDT・USDC含む1,000以上のトークンに対応。ステーブルコイン活用の自由度が最高水準。",
        keyStrength: "マルチトークン",
      },
      {
        rank: 3,
        cardSlug: "jupiter-global",
        reason:
          "USDCを軸にSolanaチェーンで運用。USD建て取引は手数料0%。",
        keyStrength: "USD取引0%",
      },
    ],
    relatedArticleSlugs: ["stablecoin-daily-payment"],
    relatedComparisonSlugs: [],
    updatedAt: "2026-04-16",
  },
  {
    id: "overseas",
    slug: "overseas",
    category: "overseas",
    title: "海外・グローバル利用向けランキング【2026年版】",
    description:
      "対応国数・FX手数料・グローバルでの使いやすさを重視した海外利用特化ランキングです。",
    rankingNote: "当サイト内での注目度・掲載状況をもとに表示しています。",
    entries: [
      {
        rank: 1,
        cardSlug: "tevau",
        reason:
          "180カ国以上の広いカバレッジ。26万ユーザー超の実績を持つグローバルカード。",
        keyStrength: "180カ国対応",
      },
      {
        rank: 2,
        cardSlug: "tria",
        reason:
          "150カ国以上・1.3億店舗以上で利用可能。BestPath AIで最安コストの海外利用が可能。",
        keyStrength: "150カ国対応",
      },
      {
        rank: 3,
        cardSlug: "kast",
        reason:
          "グローバルなVisa加盟店対応。USD取引ならFX手数料0%で海外コストを最小化。",
        keyStrength: "FX手数料0%",
      },
    ],
    relatedArticleSlugs: ["overseas-usage-guide"],
    relatedComparisonSlugs: [],
    updatedAt: "2026-04-16",
  },
];

export function getTopPickBySlug(slug: string): TopPick | undefined {
  return topPicks.find((tp) => tp.slug === slug);
}
