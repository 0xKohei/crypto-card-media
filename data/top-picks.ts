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
        shortReason: "総合バランスが最も高い担保型カード。",
        reason:
          "国際カード規約でカード発行費・FX・ATM関連手数料が明示されている担保型カード。Virtual / Plastic / Metalの3種が用意されています。",
        keyStrength: "担保型カード",
      },
      {
        rank: 2,
        cardSlug: "kast",
        shortReason: "料金表の透明性が高く、USD決済0%が明確。",
        reason:
          "公式ヘルプセンターで料金表・ATM条件・利用上限が公開されており、USD建てカード決済0%が明確なステーブルコイン系カードです。",
        keyStrength: "料金表公開",
      },
      {
        rank: 3,
        cardSlug: "bitget-wallet-card",
        shortReason: "申込条件と0-fee benefitが分かりやすい。",
        reason:
          "地域別の申込条件と0-fee benefitの仕組みがヘルプセンターで確認できるVisaデビットカード。Apple Pay / Google Payに対応します。",
        keyStrength: "0-fee benefit",
      },
      {
        rank: 4,
        cardSlug: "redotpay",
        shortReason: "低コストで始めやすく、条件の見通しが良い。",
        reason:
          "発行手数料、月額・年会費なし、ATM出金、Apple Pay対応などの条件が公式ヘルプセンターで確認でき、情報の見通しが良いカードです。",
        keyStrength: "低コスト発行",
      },
      {
        rank: 5,
        cardSlug: "jupiter-global",
        shortReason: "USDC専用で、利用条件を追いやすいデジタルカード。",
        reason:
          "FAQでUSDC-only、年会費0、物理カードなし、発行体別のFX条件まで明示されたJupiter Globalのデジタルカードです。",
        keyStrength: "USDC only",
      },
      {
        rank: 6,
        cardSlug: "tevau",
        shortReason: "API情報はある一方、利用者向け料金表が見えにくい。",
        reason:
          "公開APIドキュメントでカード作成やKYC、手数料照会エンドポイントは確認できますが、利用者向け料金表は公開確認できませんでした。",
        keyStrength: "料金非開示",
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
        cardSlug: "bitget-wallet-card",
        reason:
          "APAC向けの公式ヘルプ記事で日本居住者が申込対象国に含まれています。",
        keyStrength: "日本を明記",
      },
      {
        rank: 2,
        cardSlug: "jupiter-global",
        reason:
          "Jupiter IDのFAQでAPACは proof of address を含むKYC要件が明示されており、地域別ルールが確認しやすいです。",
        keyStrength: "APAC KYC明示",
      },
      {
        rank: 3,
        cardSlug: "redotpay",
        reason:
          "日本対応の明記はありませんが、非対応国リスト方式で利用可否を確認できるため、申込判断がしやすい設計です。",
        keyStrength: "対象外リスト方式",
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
          "リンクしたウォレットのデジタル資産を担保に使う構造が規約で明示されており、DeFi寄りの利用モデルが確認できます。",
        keyStrength: "担保型",
      },
      {
        rank: 2,
        cardSlug: "bitget-wallet-card",
        reason:
          "ウォレット連携と0-fee benefitが公式ヘルプで整理されており、Web3ウォレット文脈で使いやすい構成です。",
        keyStrength: "ウォレット連携",
      },
      {
        rank: 3,
        cardSlug: "jupiter-global",
        reason:
          "USDC-onlyのデジタルVisaデビットカードとしてFAQが整備されており、Jupiterアプリ内での利用条件を追いやすいです。",
        keyStrength: "USDC only",
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
          "ステーブルコイン入金が1:1でUSD残高化され、USD建てカード決済0%が公式ヘルプに明記されています。",
        keyStrength: "USD決済0%",
      },
      {
        rank: 2,
        cardSlug: "jupiter-global",
        reason:
          "USDC-onlyのカードとして残高管理方法と発行体別FX条件がFAQに整理されています。",
        keyStrength: "USDC only",
      },
      {
        rank: 3,
        cardSlug: "redotpay",
        reason:
          "USD / HKDカードの考え方と暗号資産変換・FX手数料がヘルプセンターで確認できます。",
        keyStrength: "手数料が明確",
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
        cardSlug: "redotpay",
        reason:
          "利用可能場所、ATM出金、Apple Pay、非対応国の考え方が公式ヘルプセンターに揃っており、海外利用条件を追いやすいです。",
        keyStrength: "利用条件が明確",
      },
      {
        rank: 2,
        cardSlug: "tria",
        reason:
          "米国外向けの国際カード規約があり、FX・ATM関連手数料が明示されています。",
        keyStrength: "国際規約あり",
      },
      {
        rank: 3,
        cardSlug: "kast",
        reason:
          "外貨手数料とATM出金条件が公開されているため、海外利用時のコストを把握しやすいカードです。",
        keyStrength: "コスト把握しやすい",
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
