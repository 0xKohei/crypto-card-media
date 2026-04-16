import type { Card } from "@/types";

// ============================================================
// カードデータ — 掲載6カード
// ※ 情報は公式ソースをもとに調査。変更の可能性あり。
// ============================================================

export const cards: Card[] = [

  // ============================================================
  // 1. Tria
  // ============================================================
  {
    id: "tria",
    name: "Tria",
    slug: "tria",
    logo: "✦",
    coverColor: "from-violet-600 to-indigo-700",
    shortDescription:
      "1,000以上のトークンに対応し、150カ国以上で使えるセルフカストディ型クリプトカード。最大6%キャッシュバック。",
    longDescription:
      "Triaは、セルフカストディ（自己管理）を維持したまま日常決済に使えるクリプトカードです。2025年11月にパブリックベータ開始後、2026年4月時点で累計取引額$100M超・ユーザー25万人以上を達成。AIによるBestPathルーティングで1,000種類以上のトークンを最安経路で決済に変換します。Virtual（$25）・Signature（$109）・Premium（$250）の3ティアを用意。Apple Pay・Google Pay対応で、日々の決済に自然に組み込めます。発行はNimbus LLC（デラウェア）。",
    issuer: "Tria",
    issuerType: "defi",
    provider: "Nimbus LLC（Delaware）",
    network: "Visa",
    regionAvailability: ["global", "asia", "eu", "usa"],
    supportedCountries: ["150カ国以上（日本含む申込可能性あり）"],
    cardType: "prepaid",
    custodyType: "non-custodial",
    kycRequired: true,
    kycLevel: "basic",
    physicalCard: true,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "最大6%",
    cashbackDetails:
      "ティア別：Virtual 1.5%、Signature 最大4.5%、Premium 最大6%。キャッシュバックはUSD表示で、Triaトークン（TGE後3ヶ月以降に交換可能）。紹介プログラムで被紹介者のポイント10%を獲得。",
    rewardType: "cashback-crypto",
    rewardToken: "Triaトークン",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "Virtual：$25 / Signature：$109 / Premium：$250",
    monthlyFee: "$0",
    fxFee: "公式情報未公開（BestPathで最安経路を自動選択）",
    atmFee: "公式情報未公開",
    topupMethods: ["USDT", "USDC", "ETH", "BTC", "SOL", "1,000以上のトークン", "クロスチェーン対応"],
    spendingLimit: "公式情報未公開",
    atmWithdrawalLimit: "公式情報未公開",
    supportedAssets: ["USDT", "USDC", "ETH", "BTC", "SOL", "AVAX", "1,000以上のトークン"],
    supportedFiatCurrencies: ["USD", "EUR", "JPY", "その他多数"],
    supportedChains: ["Ethereum", "Solana", "Arbitrum", "Base", "Avalanche", "Aptos", "その他多数"],
    settlementMethod: "BestPath AIによる最安経路でオンチェーン資産を決済時に変換",
    stablecoinSupport: true,
    spendFrom: "ウォレット内トークン（決済時に自動変換）",
    rechargeModel: "残高チャージ型（マルチトークン対応）",
    referralProgram: true,
    signupBonus: "紹介コードで被紹介者のポイント10%を獲得",
    availabilityStatus: "available",
    waitlist: false,
    appRating: "公式情報未公開",
    bestFor: ["マルチトークン活用", "非カストディ重視", "グローバル利用", "Apple Pay対応"],
    useCases: [
      "1,000以上のトークンを日常決済に使いたい方",
      "セルフカストディを維持しながら使いたい方",
      "Apple Pay / Google Payで手軽に使いたい方",
      "海外・150カ国以上での利用が多い方",
    ],
    pros: [
      "1,000以上のトークンに対応。多様な資産から直接決済できる",
      "セルフカストディ型で資産の自己管理を維持",
      "BestPath AIが最安スワップルートを自動選択",
      "Apple Pay / Google Pay 対応",
      "累計$100M超の取引実績（2026年4月時点）",
    ],
    cons: [
      "手数料の詳細は公式情報未公開",
      "キャッシュバックはTGE後3ヶ月以降に交換可能（即時受取不可）",
      "Virtual以外は発行費用がかかる（$109〜$250）",
    ],
    faq: [
      {
        question: "Triaカードは日本から申し込めますか？",
        answer:
          "Triaは150カ国以上をカバーしており、日本からの申し込みが可能な可能性があります。最新の対応状況は公式サイト（tria.so）でご確認ください。",
      },
      {
        question: "キャッシュバックはどのように受け取れますか？",
        answer:
          "キャッシュバックはUSD表示で積み立てられ、Triaトークンのトークン生成イベント（TGE）後3ヶ月以降に交換可能になります。",
      },
      {
        question: "セルフカストディとは何ですか？",
        answer:
          "セルフカストディとは、資産の秘密鍵をユーザー自身が管理する方式です。Triaの場合、決済が完了するまで資産はあなたのウォレットに留まります。",
      },
    ],
    relatedGuides: ["how-to-choose-crypto-card", "what-is-crypto-card"],
    relatedComparisons: [],
    relatedTopPicks: ["overall", "usdt", "japan-users"],
    tags: ["セルフカストディ", "マルチチェーン", "USDT", "Apple Pay", "グローバル", "DeFi"],
    image: "/cards/tria.svg",
    officialUrl: "https://www.tria.so/ja",
    referralUrl: "https://www.tria.so/ja",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: true,
    isPriority: true,
    priorityRank: 1,
    keyStrength: "マルチトークン対応",
    lastReviewed: "2026-04-16",
    lastUpdated: "2026-04-16",
    reviewNote: "公式サイト（tria.so/ja）および公開情報をもとに調査。",
  },

  // ============================================================
  // 2. Kast
  // ============================================================
  {
    id: "kast",
    name: "Kast",
    slug: "kast",
    logo: "K",
    coverColor: "from-blue-600 to-cyan-600",
    shortDescription:
      "ステーブルコイン特化の決済カード。USDCをそのまま使えばFX手数料0%。スタンダードで2%キャッシュバック。",
    longDescription:
      "Kastは、ステーブルコイン（主にUSDC）での決済に特化したグローバル対応カードです。USD建て取引にはFX手数料0%で使えるのが最大の特徴。キャッシュバックはシーズン制を採用しており、2025〜2026年シーズン5ではKASTポイント（Standard 2%、Premium/Limited 5%、Luxe 8%）に加えて$MOVEトークンを4%追加獲得できます。カードはVisa加盟店でグローバルに利用可能。",
    issuer: "Kast",
    issuerType: "fintech",
    provider: "Kast（公式：kast.xyz）",
    network: "Visa",
    regionAvailability: ["global", "asia", "eu", "usa"],
    supportedCountries: ["グローバル（詳細は公式サイト参照）"],
    cardType: "prepaid",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "2〜8%（ティア別）",
    cashbackDetails:
      "シーズン5（2025/12〜2026/3）基準。Standard：KASTポイント2%、Premium/Limited：5%、Luxe：8%。加えて対象消費で$MOVE 4%を追加獲得。",
    rewardType: "cashback-crypto",
    rewardToken: "KASTポイント / $MOVEトークン",
    stakingRequired: false,
    subscriptionRequired: true,
    subscriptionDetails: "Premium $1,000/年、Limited $5,000（一括）、Luxe $10,000/年",
    issuanceFee: "Standard：$0",
    monthlyFee: "Standard：$0",
    annualFee: "Premium：$1,000 / Limited：$5,000（一括） / Luxe：$10,000",
    fxFee: "USD取引：0%、非USD：0.5〜1.75%",
    atmFee: "$3 + 2% + ATM事業者手数料",
    topupMethods: ["USDC（手数料無料）", "ACH（$2）", "FedWire（$15）"],
    spendingLimit: "公式情報未公開",
    atmWithdrawalLimit: "$250/回、$750/24時間（最大3回）",
    supportedAssets: ["USDC", "その他ステーブルコイン"],
    supportedFiatCurrencies: ["USD", "EUR", "その他多数"],
    supportedChains: ["Ethereum", "その他"],
    settlementMethod: "USDC残高からリアルタイム変換",
    stablecoinSupport: true,
    spendFrom: "USDCプリペイド残高",
    rechargeModel: "USDC事前チャージ型",
    referralProgram: true,
    signupBonus: "公式サイト参照",
    availabilityStatus: "available",
    waitlist: false,
    bestFor: ["USDC活用", "ステーブルコイン決済", "シーズン報酬狙い"],
    useCases: [
      "USDCをFX手数料なしで使いたい方",
      "ステーブルコインで日常決済したい方",
      "$MOVEトークンを獲得したい方",
    ],
    pros: [
      "USD取引はFX手数料0%（USDC決済時）",
      "Standard無料から使い始められる",
      "シーズン制キャッシュバックで最大8%+4%$MOVE",
      "グローバルなVisa加盟店で利用可能",
    ],
    cons: [
      "ATM手数料は$3+2%とやや高め",
      "高ティア（Premium以上）は年会費が高額",
      "非活動手数料：12ヶ月後に$1/月",
    ],
    faq: [
      {
        question: "USDCで支払うと手数料は本当に0%ですか？",
        answer:
          "USD建て取引にUSDCを使う場合、FX変換が発生しないため手数料0%です。非USD建て取引には0.5〜1.75%のFX手数料がかかります。",
      },
      {
        question: "KASTポイントは何に使えますか？",
        answer:
          "KASTポイントの詳細な使用方法は公式サイト（kast.xyz）でご確認ください。シーズンごとに条件が変わる場合があります。",
      },
    ],
    relatedGuides: ["how-to-choose-crypto-card", "stablecoin-daily-payment"],
    relatedComparisons: [],
    relatedTopPicks: ["overall", "usdt", "high-cashback"],
    tags: ["USDC", "ステーブルコイン", "シーズン報酬", "$MOVE", "FX手数料0%"],
    image: "/cards/kast.svg",
    officialUrl: "https://www.kast.xyz",
    referralUrl: "https://www.kast.xyz",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: true,
    isPriority: true,
    priorityRank: 2,
    keyStrength: "FX手数料0%",
    lastReviewed: "2026-04-16",
    lastUpdated: "2026-04-16",
    reviewNote: "kast.xyz公式サイト、cryptoslate.com、kkinvesting.ioのレビュー記事をもとに調査。",
  },

  // ============================================================
  // 3. RedotPay
  // ============================================================
  {
    id: "redotpay",
    name: "RedotPay",
    slug: "redotpay",
    logo: "R",
    coverColor: "from-red-500 to-rose-600",
    shortDescription:
      "シンプルなクリプト決済カード。バーチャル$10、物理カード$100。世界中のVisa加盟店で利用可能。",
    longDescription:
      "RedotPayは、シンプルな料金体系と使いやすさを重視したクリプト決済カードです。バーチャルカードは$10から発行でき、物理カードは$100。USD取引の実質コストは1%（クリプト変換1%）、非USD取引は2.2%（1%+FX1.2%）。常設のキャッシュバックプログラムはなく（公式情報未公開）、期間限定プロモーションを定期的に実施しています（例：2026年2月に最初の3回の日次取引で1.5%キャッシュバック）。",
    issuer: "RedotPay",
    issuerType: "fintech",
    provider: "RedotPay（公式：redotpay.com）",
    network: "Visa",
    regionAvailability: ["global", "asia"],
    supportedCountries: ["グローバル対応（詳細は公式サイト参照）"],
    cardType: "prepaid",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "なし（期間限定キャンペーンあり）",
    cashbackDetails:
      "常設キャッシュバックプログラムなし。期間限定キャンペーンを随時実施（例：2026/2月、毎日最初の3取引で1.5%）。※変更の可能性あり",
    rewardType: "none",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "バーチャル：$10 / 物理カード：$100",
    monthlyFee: "$0",
    fxFee: "1.2%（FX手数料）",
    atmFee: "2〜3%",
    topupMethods: ["BTC", "ETH", "USDT", "USDC", "その他"],
    spendingLimit: "公式ヘルプセンター参照",
    supportedAssets: ["BTC", "ETH", "USDT", "USDC", "その他"],
    supportedFiatCurrencies: ["USD", "EUR", "その他多数"],
    supportedChains: ["Ethereum", "Tron", "BNB Chain", "その他"],
    settlementMethod: "クリプト残高からリアルタイム変換",
    stablecoinSupport: true,
    spendFrom: "プリペイド残高",
    rechargeModel: "事前チャージ型",
    referralProgram: true,
    availabilityStatus: "available",
    waitlist: false,
    bestFor: ["シンプルなクリプト決済", "バーチャルカード利用"],
    useCases: [
      "シンプルにクリプトを決済に使いたい方",
      "低コストでバーチャルカードを発行したい方",
      "グローバルなVisa加盟店で使いたい方",
    ],
    pros: [
      "バーチャルカードが$10から発行できる",
      "シンプルな料金体系で予測しやすい",
      "グローバルなVisa加盟店で利用可能",
      "Apple Pay / Google Pay 対応",
    ],
    cons: [
      "常設キャッシュバックなし",
      "物理カードの発行費用が$100とやや高め",
      "特定加盟店（Facebook Ads等）には追加1.5%手数料（月3回まで免除）",
    ],
    faq: [
      {
        question: "RedotPayのキャッシュバックはありますか？",
        answer:
          "常設のキャッシュバックプログラムはありません。期間限定キャンペーンを随時実施しているため、公式サイトで最新情報をご確認ください。",
      },
      {
        question: "USD取引の実質コストはいくらですか？",
        answer:
          "USD建て取引は1%のクリプト変換手数料のみです。非USD建て取引は変換1%＋FX1.2%で合計2.2%となります。",
      },
    ],
    relatedGuides: ["how-to-choose-crypto-card"],
    relatedComparisons: [],
    relatedTopPicks: ["overall"],
    tags: ["シンプル", "USDT", "バーチャルカード", "グローバル"],
    image: "/cards/redotpay.svg",
    officialUrl: "https://www.redotpay.com",
    referralUrl: "https://www.redotpay.com",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: true,
    isPriority: true,
    priorityRank: 3,
    keyStrength: "低コスト発行",
    lastReviewed: "2026-04-16",
    lastUpdated: "2026-04-16",
    reviewNote: "redotpay.com公式ヘルプセンターおよびcryptoslate.comレビューをもとに調査。",
  },

  // ============================================================
  // 4. Tevau
  // ============================================================
  {
    id: "tevau",
    name: "Tevau",
    slug: "tevau",
    logo: "T",
    coverColor: "from-emerald-500 to-teal-600",
    shortDescription:
      "180カ国以上・26万ユーザー超のグローバルクリプトカード。カード＋ウォレット＋Earnを統合したマネーアプリ。",
    longDescription:
      "Tevauは、クリプトカードからウォレット、法定通貨ランプ、Earn、レンディング、B2Bレールまでを統合したオールインワンのマネーアプリに進化したサービスです。2025年時点で26万ユーザー以上・180カ国以上に展開。バーチャルカードは$10、物理カード（メタルカード）は$80（通常$100。公式の割引コード適用時）から発行可能です。チャージには最低$10・1%の手数料が発生します。VISA HKとの提携による発行体制を持ちます。",
    issuer: "Tevau",
    issuerType: "fintech",
    provider: "Tevau（公式：tevau.io）",
    network: "Visa",
    regionAvailability: ["global", "asia"],
    supportedCountries: ["180カ国以上"],
    cardType: "prepaid",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: false,
    googlePay: false,
    cashbackRate: "公式情報未公開",
    cashbackDetails:
      "ロイヤルティ・リワードプログラムあり。詳細な還元率は公式サイト参照。",
    rewardType: "cashback-crypto",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "バーチャル：$10 / 物理カード：$80〜$100（割引コード適用で$80）",
    monthlyFee: "$0",
    fxFee: "公式情報未公開",
    atmFee: "公式情報未公開",
    topupMethods: ["USDT", "USDC", "BTC", "ETH", "その他"],
    spendingLimit: "公式情報未公開",
    supportedAssets: ["USDT", "USDC", "BTC", "ETH"],
    supportedFiatCurrencies: ["USD", "EUR", "その他多数"],
    supportedChains: ["Ethereum", "Tron", "BNB Chain", "その他"],
    settlementMethod: "クリプト残高からリアルタイム変換",
    stablecoinSupport: true,
    spendFrom: "プリペイド残高",
    rechargeModel: "事前チャージ型（最低$10・1%手数料）",
    referralProgram: true,
    availabilityStatus: "available",
    waitlist: false,
    appRating: "4.0（App Store）",
    bestFor: ["グローバル利用", "マネーアプリ統合", "メタルカード"],
    useCases: [
      "180カ国以上でグローバルに使いたい方",
      "カード・ウォレット・Earnを一元管理したい方",
      "メタルカードを持ちたい方",
    ],
    pros: [
      "180カ国以上に対応するグローバルなカバレッジ",
      "26万ユーザー超の実績",
      "ウォレット・Earn・レンディングを統合",
      "メタルカード（物理カード）あり",
    ],
    cons: [
      "チャージした残高をウォレットに引き戻せない",
      "Apple Pay / Google Pay の対応状況は要確認",
      "手数料の詳細は公式情報未公開",
    ],
    faq: [
      {
        question: "Tevauはどの国で使えますか？",
        answer:
          "180カ国以上のVisa加盟店で利用可能です。対応国の最新一覧は公式サイト（tevau.io）でご確認ください。",
      },
      {
        question: "チャージした資産を引き出すことはできますか？",
        answer:
          "カードにチャージした残高はウォレットに引き戻せません。利用分のみをチャージする運用を推奨します。",
      },
    ],
    relatedGuides: ["how-to-choose-crypto-card"],
    relatedComparisons: [],
    relatedTopPicks: ["overall", "overseas"],
    tags: ["グローバル", "マネーアプリ", "メタルカード", "USDT", "Earn"],
    image: "/cards/tevau.svg",
    officialUrl: "https://tevau.io",
    referralUrl: "https://tevau.io",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: true,
    isPriority: true,
    priorityRank: 4,
    keyStrength: "180カ国対応",
    lastReviewed: "2026-04-16",
    lastUpdated: "2026-04-16",
    reviewNote: "tevau.io公式サイト、MEXC News、Trustpilotレビューをもとに調査。",
  },

  // ============================================================
  // 5. Bitget Wallet Card
  // ============================================================
  {
    id: "bitget-wallet-card",
    name: "Bitget Wallet Card",
    slug: "bitget-wallet-card",
    logo: "B",
    coverColor: "from-sky-500 to-blue-700",
    shortDescription:
      "非カストディ型。月額$400 USDのFX手数料が実質無料になる補助が魅力。1.7%の固定費用体系。",
    longDescription:
      "Bitget Wallet Cardは、Bitget Walletが提供する非カストディ型のクリプト決済カードです。最大の特徴は、毎月最初の$400 USDT相当の支出に対してFXおよびコンバージョン手数料が全額還付される月額補助制度。通常の手数料は1.7%のみで年会費・チャージ手数料は$0。KYC完了で5 USDCのボーナスもあり。EU・UK圏ではMastercard、アジア圏ではVisaで発行。Apple Pay・Google Pay対応。",
    issuer: "Bitget Wallet",
    issuerType: "defi",
    provider: "Bitget Wallet（非カストディ型）",
    network: "Both",
    regionAvailability: ["eu", "asia", "latam"],
    supportedCountries: ["EEA（欧州経済領域）", "UK", "中南米", "アジア太平洋", "中国"],
    cardType: "prepaid",
    custodyType: "non-custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: false,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "月$400まで実質手数料0%",
    cashbackDetails:
      "月最初の$400 USDT支出のFX・変換手数料を全額還付。KYC完了で5 USDCボーナス。USDC最大8% APYのステーキング対応。",
    rewardType: "cashback-fiat",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "$0",
    monthlyFee: "$0",
    fxFee: "1.7%（月$400まで全額還付）",
    atmFee: "公式情報未公開",
    topupMethods: ["USDC", "USDT", "ETH", "BTC", "その他"],
    spendingLimit: "公式情報未公開",
    supportedAssets: ["USDC", "USDT", "ETH", "BTC"],
    supportedFiatCurrencies: ["USD", "EUR", "GBP", "その他"],
    supportedChains: ["Ethereum", "BNB Chain", "Polygon", "その他"],
    settlementMethod: "非カストディウォレット残高から決済時に変換",
    stablecoinSupport: true,
    spendFrom: "Bitget Walletの非カストディ残高",
    rechargeModel: "ウォレット連携型（非カストディ）",
    referralProgram: true,
    signupBonus: "KYC完了で5 USDCボーナス",
    availabilityStatus: "available",
    waitlist: false,
    bestFor: ["非カストディ重視", "EU・アジア在住", "USDC活用"],
    useCases: [
      "非カストディで資産管理しながら決済したい方",
      "EU・アジアで利用したい方",
      "月$400以内の支出なら実質手数料0%で使いたい方",
    ],
    pros: [
      "非カストディで資産の自己管理が可能",
      "月$400まで手数料実質0%の補助制度",
      "KYC完了で5 USDCボーナス",
      "Apple Pay / Google Pay 対応",
      "年会費・チャージ手数料無料",
    ],
    cons: [
      "米国・カナダは対応外",
      "物理カードなし（バーチャルのみ）",
      "$400超の月次支出には1.7%手数料発生",
    ],
    faq: [
      {
        question: "月$400の手数料還付はどのように受け取れますか？",
        answer:
          "毎月最初の$400 USDT相当の支出に対し、FXおよびコンバージョン手数料が自動的に還付されます。詳細は公式サイトをご確認ください。",
      },
      {
        question: "日本から申し込めますか？",
        answer:
          "アジア太平洋地域に対応していますが、日本からの申込可否は公式サイトでご確認ください。",
      },
    ],
    relatedGuides: ["what-is-crypto-card"],
    relatedComparisons: [],
    relatedTopPicks: ["overall", "defi"],
    tags: ["非カストディ", "USDC", "手数料補助", "EU", "アジア", "Bitget"],
    image: "/cards/bitget-wallet-card.svg",
    officialUrl: "https://web3.bitget.com",
    referralUrl: "https://web3.bitget.com",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: true,
    isPriority: true,
    priorityRank: 5,
    keyStrength: "非カストディ",
    lastReviewed: "2026-04-16",
    lastUpdated: "2026-04-16",
    reviewNote: "Bitget Wallet公式サイト（web3.bitget.com）およびkkinvesting.ioレビューをもとに調査。",
  },

  // ============================================================
  // 6. Jupiter Global
  // ============================================================
  {
    id: "jupiter-global",
    name: "Jupiter Global",
    slug: "jupiter-global",
    logo: "J",
    coverColor: "from-orange-500 to-amber-600",
    shortDescription:
      "Solanaベースの非カストディ型VisaカードByJupiter。USD取引0%・最大4%キャッシュバック（予定）。紹介で$100獲得。",
    longDescription:
      "Jupiter Globalは、Solana最大のDEXアグリゲーターJupiterが提供する非カストディ型のVisa決済カードです。USDおよびUSDC取引の手数料は0%で、非USD取引には1〜1.8%のFX手数料が発生します（発行体による）。最大4%のキャッシュバックプログラムをロードマップに計画中（実装時期は公式サイト参照）。紹介プログラムでは、紹介した相手が30日以内に$1,000を使うと紹介者・被紹介者双方に$100が付与されます。主にアジア太平洋向けで展開中。",
    issuer: "Jupiter Global",
    issuerType: "defi",
    provider: "Jupiter Global（Solana DEXアグリゲーター）",
    network: "Visa",
    regionAvailability: ["asia", "global"],
    supportedCountries: ["アジア太平洋（詳細は公式サイト参照）"],
    cardType: "virtual-only",
    custodyType: "non-custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: false,
    virtualCard: true,
    applePay: false,
    googlePay: false,
    cashbackRate: "最大4%（ロードマップ予定）",
    cashbackDetails:
      "最大4%キャッシュバックをロードマップに予定。現在はUSDC残高の利回りを原資とする設計。紹介プログラム：$1,000消費で双方に$100付与。※変更の可能性あり",
    rewardType: "cashback-fiat",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "$0",
    monthlyFee: "$0",
    fxFee: "USD：0%、非USD：1〜1.8%（発行体による）",
    atmFee: "公式情報未公開",
    topupMethods: ["USDC", "銀行振込（USDC）"],
    spendingLimit: "公式情報未公開",
    atmWithdrawalLimit: "現金引き出し上限：$10,000/回（ロードマップ）",
    supportedAssets: ["USDC", "その他Solanaエコシステムトークン"],
    supportedFiatCurrencies: ["USD", "現地通貨（QRペイ対応地域）"],
    supportedChains: ["Solana"],
    settlementMethod: "SolanaウォレットのUSDCから決済時に変換",
    stablecoinSupport: true,
    spendFrom: "非カストディSolanaウォレット残高",
    rechargeModel: "USDC入金型（ウォレット or 銀行振込）",
    referralProgram: true,
    signupBonus: "紹介プログラム：対象条件達成で$100",
    availabilityStatus: "available",
    waitlist: false,
    bestFor: ["Solanaユーザー", "USD取引無料", "DeFiユーザー", "紹介収入"],
    useCases: [
      "Solanaエコシステムを活用しているDeFiユーザー",
      "USD建て取引を手数料0%で行いたい方",
      "アジア太平洋での決済が多い方",
      "紹介プログラムで$100ボーナスを得たい方",
    ],
    pros: [
      "USD取引手数料0%（USDC使用時）",
      "非カストディで資産の自己管理が可能",
      "Solana最大DEXアグリゲーターのインフラ",
      "紹介で双方$100の強力なプログラム",
    ],
    cons: [
      "最大4%キャッシュバックはロードマップ段階（未実装）",
      "物理カードなし（デジタルカードのみ）",
      "現時点はアジア太平洋圏中心",
      "Solana依存のエコシステム",
    ],
    faq: [
      {
        question: "Jupiter Globalカードは日本から使えますか？",
        answer:
          "アジア太平洋圏を対象に展開中です。日本からの対応状況は公式サイト（global.jup.ag）でご確認ください。",
      },
      {
        question: "紹介プログラムの$100はどのように受け取れますか？",
        answer:
          "紹介したユーザーがカードを有効化後30日以内に$1,000を支出した場合、紹介者・被紹介者の双方に$100が付与されます。",
      },
    ],
    relatedGuides: ["what-is-crypto-card", "stablecoin-daily-payment"],
    relatedComparisons: [],
    relatedTopPicks: ["overall", "defi", "usdt"],
    tags: ["Solana", "非カストディ", "USD手数料0%", "DeFi", "紹介ボーナス"],
    image: "/cards/jupiter-global.svg",
    officialUrl: "https://landing.global.jup.ag",
    referralUrl: "https://landing.global.jup.ag",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: true,
    isPriority: true,
    priorityRank: 6,
    keyStrength: "Solana×非カストディ",
    lastReviewed: "2026-04-16",
    lastUpdated: "2026-04-16",
    reviewNote: "Jupiter Global公式サイト（landing.global.jup.ag）、cryptorank.io、kkinvesting.ioをもとに調査。",
  },
];

// ============================================================
// ユーティリティ関数
// ============================================================
export function getCardBySlug(slug: string): Card | undefined {
  return cards.find((c) => c.slug === slug);
}

export function getPriorityCards(): Card[] {
  return cards
    .filter((c) => c.isPriority)
    .sort((a, b) => (a.priorityRank ?? 99) - (b.priorityRank ?? 99));
}

export function getFeaturedCards(): Card[] {
  return cards.filter((c) => c.isFeatured);
}

export function getCardsByTopPick(topPickSlug: string): Card[] {
  return cards.filter((c) => c.relatedTopPicks.includes(topPickSlug));
}

export function filterCards(filters: {
  region?: string;
  kycRequired?: boolean;
  hasPhysical?: boolean;
  hasVirtual?: boolean;
  hasCashback?: boolean;
  hasApplePay?: boolean;
  hasGooglePay?: boolean;
  stablecoinSupport?: boolean;
  custodyType?: string;
  issuerType?: string;
}): Card[] {
  return cards.filter((card) => {
    if (filters.region && filters.region !== "all") {
      if (!card.regionAvailability.includes(filters.region as never)) return false;
    }
    if (filters.kycRequired !== undefined) {
      if (card.kycRequired !== filters.kycRequired) return false;
    }
    if (filters.hasPhysical !== undefined) {
      if (card.physicalCard !== filters.hasPhysical) return false;
    }
    if (filters.hasVirtual !== undefined) {
      if (card.virtualCard !== filters.hasVirtual) return false;
    }
    if (filters.hasCashback === true) {
      if (card.rewardType === "none") return false;
    }
    if (filters.hasApplePay === true) {
      if (!card.applePay) return false;
    }
    if (filters.hasGooglePay === true) {
      if (!card.googlePay) return false;
    }
    if (filters.stablecoinSupport === true) {
      if (!card.stablecoinSupport) return false;
    }
    if (filters.custodyType && filters.custodyType !== "all") {
      if (card.custodyType !== filters.custodyType) return false;
    }
    if (filters.issuerType && filters.issuerType !== "all") {
      if (card.issuerType !== filters.issuerType) return false;
    }
    return true;
  });
}
