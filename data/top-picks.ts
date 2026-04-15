import type { TopPick } from "@/types";

export const topPicks: TopPick[] = [
  {
    id: "overall",
    slug: "overall",
    category: "overall",
    title: "総合おすすめクリプトカード【2026年版】",
    description:
      "手数料・還元率・対応地域・日本ユーザーとの相性・信頼性を総合的に評価したランキングです。",
    selectionCriteria:
      "対応地域の広さ、FX手数料の低さ、KYC要件の適切さ、キャッシュバック還元率、日本ユーザーへの対応度、サービスの信頼性を総合的にスコアリングしました。",
    scoringMethod:
      "編集部が設定した9項目のスコアを重み付け平均して算出。最終スコアは10点満点。",
    entries: [
      {
        rank: 1,
        cardSlug: "tria",
        reason:
          "1,000以上のトークン対応・150カ国以上利用可能・非カストディ・Apple Pay対応と、あらゆる面でバランスが取れた現時点での総合最優秀カード。",
        highlightScore: 9.2,
        highlightLabel: "総合スコア",
      },
      {
        rank: 2,
        cardSlug: "gomining-card",
        reason: "最大5%の高還元と1 THボーナスが魅力。BTC保有者にとって長期的な価値が高い。",
        highlightScore: 7.8,
        highlightLabel: "総合スコア",
      },
      {
        rank: 3,
        cardSlug: "etherfi-mexc-card",
        reason: "非カストディ型でETH保有者に最適。4%還元と10% APRの組み合わせが強力。",
        highlightScore: 7.8,
        highlightLabel: "総合スコア",
      },
      {
        rank: 4,
        cardSlug: "zeal-card",
        reason: "0.3%の超低FX手数料と4%還元のコスパ最強の組み合わせ。EU圏での利用に最適。",
        highlightScore: 7.6,
        highlightLabel: "総合スコア",
      },
      {
        rank: 5,
        cardSlug: "swissborg-card",
        reason: "スイス拠点の高信頼性と最大90%還元。$BORG保有者には特に有利。",
        highlightScore: 7.5,
        highlightLabel: "総合スコア",
      },
    ],
    relatedArticleSlugs: ["how-to-choose-crypto-card", "what-is-crypto-card"],
    relatedComparisonSlugs: ["tria-vs-gomining", "tria-vs-swissborg"],
    updatedAt: "2026-04-01",
  },
  {
    id: "high-cashback",
    slug: "high-cashback",
    category: "high-cashback",
    title: "高還元クリプトカードランキング【キャッシュバック最大化】",
    description:
      "キャッシュバック率・APY・還元の実現しやすさを重視してランキング化しました。",
    selectionCriteria:
      "最大還元率だけでなく、通常利用での現実的な還元率、還元形式の安定性、条件の達成しやすさを総合評価。",
    scoringMethod:
      "キャッシュバックスコア（10点満点）を主軸に、条件の達成難易度を加味して算出。",
    entries: [
      {
        rank: 1,
        cardSlug: "gomining-card",
        reason: "最大5%のBTCキャッシュバック。VIPティアが現実的に達成可能な設計。",
        highlightScore: 9.0,
        highlightLabel: "還元スコア",
      },
      {
        rank: 2,
        cardSlug: "swissborg-card",
        reason: "最大90%還元（$BORG形式）。$BORG大量保有者には圧倒的な優位性。",
        highlightScore: 8.5,
        highlightLabel: "還元スコア",
      },
      {
        rank: 3,
        cardSlug: "picnic-card",
        reason: "最大5%キャッシュバック＋0.3%の低FX手数料。コスパ重視の最上位候補。",
        highlightScore: 8.5,
        highlightLabel: "還元スコア",
      },
      {
        rank: 4,
        cardSlug: "tria",
        reason: "最大4%還元＋1,000以上のトークン対応でトータル価値は最高水準。",
        highlightScore: 8.5,
        highlightLabel: "還元スコア",
      },
      {
        rank: 5,
        cardSlug: "zeal-card",
        reason: "4%還元＋5〜6% APYで複合的な利回りを最大化できる。",
        highlightScore: 8.0,
        highlightLabel: "還元スコア",
      },
    ],
    relatedArticleSlugs: ["what-is-cashback-in-crypto", "how-to-choose-crypto-card"],
    relatedComparisonSlugs: ["gomining-vs-swissborg", "tria-vs-gomining"],
    updatedAt: "2026-04-01",
  },
  {
    id: "overseas",
    slug: "overseas",
    category: "overseas",
    title: "海外利用向けクリプトカードランキング",
    description:
      "対応国数・FX手数料・ATM利便性・現地での使いやすさを重視した海外利用特化ランキングです。",
    selectionCriteria:
      "対応国数の多さ、海外でのATM利便性、FX手数料の低さ、現地での使いやすさを評価。",
    scoringMethod: "海外利用スコアを主軸に、FX手数料とATM対応を加味して算出。",
    entries: [
      {
        rank: 1,
        cardSlug: "tria",
        reason:
          "150カ国以上対応で世界1.3億店舗で利用可能。海外利用向けとして最も広い対応範囲。",
        highlightScore: 8.8,
        highlightLabel: "海外適性スコア",
      },
      {
        rank: 2,
        cardSlug: "zeal-card",
        reason: "0.3%の超低FX手数料で海外での通貨変換コストを最小化。",
        highlightScore: 7.5,
        highlightLabel: "海外適性スコア",
      },
      {
        rank: 3,
        cardSlug: "picnic-card",
        reason: "0.3%のFX手数料＋個人IBANで欧州での利用に特に強い。",
        highlightScore: 7.5,
        highlightLabel: "海外適性スコア",
      },
      {
        rank: 4,
        cardSlug: "kosh-card",
        reason: "USD/EUR/AEDの3通貨対応で中東圏でも使いやすい。",
        highlightScore: 7.0,
        highlightLabel: "海外適性スコア",
      },
    ],
    relatedArticleSlugs: ["overseas-usage-guide", "how-to-choose-crypto-card"],
    relatedComparisonSlugs: ["tria-vs-zeal"],
    updatedAt: "2026-04-01",
  },
  {
    id: "beginner",
    slug: "beginner",
    category: "beginner",
    title: "初心者向けクリプトカードランキング",
    description:
      "クリプトカードを初めて使う方向けに、入手のしやすさ・操作のシンプルさ・サポート体制を重視したランキングです。",
    selectionCriteria:
      "KYCの簡便さ、発行のしやすさ、アプリのわかりやすさ、サポート対応を評価。",
    scoringMethod: "初心者適性スコアを主軸に、KYC難易度と発行スピードを加味して算出。",
    entries: [
      {
        rank: 1,
        cardSlug: "tria",
        reason: "日本語対応・直感的なUI・Apple Pay対応で初心者でも使いやすい設計。",
        highlightScore: 7.8,
        highlightLabel: "初心者適性スコア",
      },
      {
        rank: 2,
        cardSlug: "picnic-card",
        reason: "無料登録・シンプルなチャージ・わかりやすい料金体系が初心者に向いている。",
        highlightScore: 8.0,
        highlightLabel: "初心者適性スコア",
      },
      {
        rank: 3,
        cardSlug: "pexx-card",
        reason: "USDT中心のシンプルな設計で、クリプト初心者でも理解しやすい。",
        highlightScore: 7.5,
        highlightLabel: "初心者適性スコア",
      },
    ],
    relatedArticleSlugs: ["what-is-crypto-card", "how-to-choose-crypto-card"],
    relatedComparisonSlugs: ["tria-vs-pexx"],
    updatedAt: "2026-04-01",
  },
  {
    id: "japan-users",
    slug: "japan-users",
    category: "japan-users",
    title: "日本ユーザー向けクリプトカードランキング",
    description:
      "日本からの申し込みしやすさ・日本語対応・日本のVisa加盟店での使いやすさを重視したランキングです。",
    selectionCriteria:
      "日本からの申し込み可否、日本語サポートの有無、日本のVisa/MC加盟店での使いやすさを評価。",
    scoringMethod:
      "日本ユーザー適性スコアを主軸に、対応地域とKYC要件を加味して算出。",
    entries: [
      {
        rank: 1,
        cardSlug: "tria",
        reason:
          "日本語サイト（tria.so/ja）を提供し、150カ国以上対応。日本ユーザーへの親和性が最も高い。",
        highlightScore: 8.5,
        highlightLabel: "日本適性スコア",
      },
      {
        rank: 2,
        cardSlug: "pexx-card",
        reason: "シンガポール拠点でアジア向けに設計。日本からのアクセスが比較的スムーズ。",
        highlightScore: 7.0,
        highlightLabel: "日本適性スコア",
      },
      {
        rank: 3,
        cardSlug: "etherfi-mexc-card",
        reason: "グローバル対応でETH保有の日本人ユーザーに相性が良い。",
        highlightScore: 6.5,
        highlightLabel: "日本適性スコア",
      },
    ],
    relatedArticleSlugs: ["how-to-choose-crypto-card", "what-is-kyc"],
    relatedComparisonSlugs: ["tria-vs-pexx"],
    updatedAt: "2026-04-01",
  },
  {
    id: "withdrawal",
    slug: "withdrawal",
    category: "withdrawal",
    title: "出金性重視クリプトカードランキング",
    description:
      "クリプト資産を効率よく現実世界で活用（出金）するための、上限・手数料・対応資産を重視したランキングです。",
    selectionCriteria:
      "日次・月次の利用上限、FX手数料の低さ、USDT/USDCへの対応、ATM利用可否を評価。",
    scoringMethod: "出金スコアを主軸に、上限額とFX手数料を加味して算出。",
    entries: [
      {
        rank: 1,
        cardSlug: "tria",
        reason: "最大$1M/日の上限・1,000以上のトークン対応で出金ルートとして最大の柔軟性。",
        highlightScore: 9.0,
        highlightLabel: "出金スコア",
      },
      {
        rank: 2,
        cardSlug: "pexx-card",
        reason: "$50,000の日次上限とUSDT特化設計。出金ルートとしての実績を重視する方に。",
        highlightScore: 8.5,
        highlightLabel: "出金スコア",
      },
      {
        rank: 3,
        cardSlug: "kosh-card",
        reason: "複数通貨口座とIBANで、多様な出金経路を確保できる。",
        highlightScore: 7.5,
        highlightLabel: "出金スコア",
      },
    ],
    relatedArticleSlugs: ["fund-transfer-basics", "stablecoin-daily-payment"],
    relatedComparisonSlugs: ["tria-vs-pexx"],
    updatedAt: "2026-04-01",
  },
  {
    id: "usdt",
    slug: "usdt",
    category: "usdt",
    title: "USDT活用向けクリプトカードランキング",
    description:
      "USDTでのチャージ・決済・出金を中心に活用したいユーザー向けのランキングです。",
    selectionCriteria:
      "USDTへの対応、USDTでのチャージのしやすさ、USDT関連手数料の低さを評価。",
    scoringMethod: "USDT活用スコアを主軸に、手数料とチャージ方法を加味。",
    entries: [
      {
        rank: 1,
        cardSlug: "tria",
        reason: "USDT・USDC含む1,000以上のトークンに対応し、USDT活用の自由度が最高。",
        highlightScore: 9.5,
        highlightLabel: "USDT適性スコア",
      },
      {
        rank: 2,
        cardSlug: "pexx-card",
        reason: "USDT特化設計でシンプル。$50,000の高上限でUSDT出金にも使いやすい。",
        highlightScore: 9.0,
        highlightLabel: "USDT適性スコア",
      },
      {
        rank: 3,
        cardSlug: "zeal-card",
        reason: "USDT対応＋0.3%低手数料でUSDTのコスト効率が高い。",
        highlightScore: 7.5,
        highlightLabel: "USDT適性スコア",
      },
    ],
    relatedArticleSlugs: ["stablecoin-daily-payment", "fund-transfer-basics"],
    relatedComparisonSlugs: ["tria-vs-pexx"],
    updatedAt: "2026-04-01",
  },
  {
    id: "defi",
    slug: "defi",
    category: "defi",
    title: "DeFiユーザー向けクリプトカードランキング",
    description:
      "非カストディ型・マルチチェーン対応・オンチェーン連携を重視したDeFiユーザー向けランキングです。",
    selectionCriteria:
      "非カストディか否か、対応チェーンの多さ、オンチェーン利回りとの連携を評価。",
    scoringMethod: "セキュリティスコアとUSDT活用スコアを組み合わせてDeFi適性を算出。",
    entries: [
      {
        rank: 1,
        cardSlug: "tria",
        reason:
          "非カストディ型で1,000以上のトークン・マルチチェーン対応。DeFiとリアル決済を最高水準で統合。",
        highlightScore: 9.2,
        highlightLabel: "DeFi適性スコア",
      },
      {
        rank: 2,
        cardSlug: "etherfi-mexc-card",
        reason: "非カストディ型でETHステーキング収益を決済に活用できる。",
        highlightScore: 8.0,
        highlightLabel: "DeFi適性スコア",
      },
      {
        rank: 3,
        cardSlug: "kosh-card",
        reason: "非カストディ型でマルチ通貨口座を持つDeFiユーザー向け設計。",
        highlightScore: 7.5,
        highlightLabel: "DeFi適性スコア",
      },
    ],
    relatedArticleSlugs: ["what-is-non-custodial-card", "stablecoin-daily-payment"],
    relatedComparisonSlugs: ["tria-vs-etherfi"],
    updatedAt: "2026-04-01",
  },
];

export function getTopPickBySlug(slug: string): TopPick | undefined {
  return topPicks.find((tp) => tp.slug === slug);
}
