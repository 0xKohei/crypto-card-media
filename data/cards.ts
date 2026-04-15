import type { Card } from "@/types";

// ============================================================
// カードデータ — モックデータ（情報は参考値です）
// 実際のサービス内容は各公式サイトでご確認ください
// ============================================================

export const cards: Card[] = [
  // ============================================================
  // 1. Tria — 編集部イチオシ・総合1位
  // ============================================================
  {
    id: "tria",
    name: "Tria",
    slug: "tria",
    logo: "✦",
    coverColor: "from-violet-600 to-indigo-700",
    shortDescription:
      "1,000以上のトークンに対応し、150カ国以上で使えるセルフカストディ型クリプトカード。Virtual・Signature・Premiumの3ティア。",
    longDescription:
      "Triaは、セルフカストディ（自己管理）を維持したまま日常決済に使えるクリプトカードです。1,000種類以上のトークンでチャージでき、150カ国以上・世界1.3億店舗以上で利用可能。バーチャルカード（Virtual）から物理カード（Signature・Premium）まで3つのティアを用意。Apple Pay・Google Pay対応で、日々の決済に自然に組み込めます。AI最適化による最安ルートでのスワップ、オンチェーン利回り戦略との連携など、資産管理から決済まで一貫して対応します。※本情報は調査時点の参考情報です。詳細は公式サイトをご確認ください。",
    issuer: "Tria",
    issuerType: "defi",
    provider: "Tria Technologies",
    network: "Visa",
    regionAvailability: ["global", "asia", "eu", "usa"],
    supportedCountries: ["日本（申込可能性あり）", "シンガポール", "米国", "欧州各国", "150カ国以上"],
    cardType: "prepaid",
    custodyType: "non-custodial",
    kycRequired: true,
    kycLevel: "basic",
    physicalCard: true,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "最大4%（ティア依存）",
    cashbackDetails:
      "カードティアとステーキング状況によりキャッシュバック率が変動。クリプトまたは法定通貨で還元。詳細は公式サイト参照。",
    rewardType: "cashback-crypto",
    rewardToken: "TRIAトークン（参考）",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "バーチャル：参考情報（無料の可能性あり）",
    deliveryFee: "物理カード：参考情報（要確認）",
    monthlyFee: "参考情報（要確認）",
    fxFee: "参考情報（要確認、一般的な目安：1〜2%）",
    atmFee: "参考情報（要確認）",
    topupMethods: ["USDT", "USDC", "ETH", "BTC", "1,000以上のトークン", "クロスチェーンスワップ"],
    spendingLimit: "最大$1,000,000 / 日（参考値）",
    atmWithdrawalLimit: "要確認",
    supportedAssets: ["USDT", "USDC", "ETH", "BTC", "SOL", "AVAX", "1,000以上のトークン"],
    supportedFiatCurrencies: ["USD", "EUR", "JPY", "その他多数"],
    supportedChains: ["Ethereum", "Solana", "Arbitrum", "Base", "Avalanche", "Aptos", "その他多数"],
    settlementMethod: "オンチェーン資産からリアルタイム変換",
    stablecoinSupport: true,
    spendFrom: "ウォレット内のトークン（自動変換）",
    rechargeModel: "残高チャージ型（マルチトークン対応）",
    referralProgram: true,
    signupBonus: "紹介ボーナスあり（参考。条件は公式サイト参照）",
    availabilityStatus: "available",
    waitlist: false,
    appRating: "4.5+（参考）",
    scores: {
      overall: 9.2,
      beginnerFriendly: 7.8,
      japanCompatibility: 8.5,
      cashback: 8.5,
      fees: 8.0,
      accessibility: 8.8,
      usdtUsability: 9.5,
      withdrawal: 9.0,
      security: 9.2,
    },
    bestFor: ["総合おすすめ", "USDT活用", "DeFiユーザー", "グローバル利用", "出金性重視"],
    useCases: [
      "日常決済（コンビニ・飲食店・ネットショッピング）",
      "USDTを日常で使いたい方",
      "DeFiとリアル決済を一元管理したい方",
      "海外利用・越境決済",
      "オンチェーン資産をそのまま決済に使いたい方",
    ],
    pros: [
      "1,000以上のトークンに対応。多様な資産から直接決済できる",
      "セルフカストディ型で資産の自己管理を維持できる",
      "150カ国以上・1.3億店舗以上で利用可能",
      "Apple Pay / Google Pay 対応で日常使いしやすい",
      "AI最適化による最安スワップルートを自動選択",
      "オンチェーン利回り戦略と連携可能",
    ],
    cons: [
      "手数料の詳細は公式サイトで要確認",
      "日本語サポートの充実度は継続確認中",
      "高度なDeFi機能は初心者には学習コストあり",
      "ティア別の特典詳細は変更される可能性あり",
    ],
    faq: [
      {
        question: "Triaカードは日本から申し込めますか？",
        answer:
          "Triaは150カ国以上をカバーしており、日本からの申し込みが可能な可能性があります。ただし対応状況は変わることがあるため、公式サイト（tria.so）で最新情報をご確認ください。",
      },
      {
        question: "Triaカードは日本のコンビニや飲食店で使えますか？",
        answer:
          "Visa加盟店（国内外1.3億店舗以上）での利用が可能とされています。日本国内のVisa対応店舗での利用についても、公式サイトで最新の対応状況をご確認ください。",
      },
      {
        question: "KYC（本人確認）は必要ですか？",
        answer:
          "Triaはセルフカストディ型ですが、カード発行にはKYC（本人確認）が必要です。詳細な必要書類や手順は公式サイトをご参照ください。",
      },
      {
        question: "どんな暗号資産からチャージできますか？",
        answer:
          "USDT・USDC・ETH・BTC・SOLを含む1,000種類以上のトークンに対応しています。クロスチェーンでのスワップも可能で、保有資産に合わせて柔軟にチャージできます。",
      },
    ],
    relatedGuides: ["how-to-choose-crypto-card", "what-is-crypto-card", "stablecoin-daily-payment"],
    relatedComparisons: ["tria-vs-gomining", "tria-vs-swissborg", "tria-vs-pexx"],
    relatedTopPicks: ["overall", "usdt", "withdrawal", "japan-users"],
    tags: ["セルフカストディ", "マルチチェーン", "USDT", "Apple Pay", "グローバル", "DeFi", "編集部イチオシ"],
    officialUrl: "https://www.tria.so/ja",
    referralUrl: "https://www.tria.so/ja",
    isEditorsPick: true,
    isFeatured: true,
    isSponsor: true,
    lastReviewed: "2026-04-01",
    lastUpdated: "2026-04-01",
    reviewNote: "公式サイト（tria.so/ja）をもとに調査。手数料詳細は公式サイトで要確認。",
  },

  // ============================================================
  // 2. GoMining Card
  // ============================================================
  {
    id: "gomining",
    name: "GoMining Card",
    slug: "gomining-card",
    logo: "⛏",
    coverColor: "from-orange-500 to-amber-600",
    shortDescription:
      "ビットコインマイニングと連動したカード。保有BTCに応じて最大5%のキャッシュバック。VIPティア制。",
    longDescription:
      "GoMining Cardは、ビットコインマイニング事業と連携したユニークなクリプトカードです。$100相当のウォレット残高を持つユーザーから発行でき、保有・ステーキング量に応じてVIPティアが上がり、最大5%のキャッシュバックを受けられます。新規登録で1 TH（テラハッシュ）のボーナスが付与されます。EUを中心に対応しており、日本からのアクセスは要確認です。※本情報は参考情報です。詳細は公式サイトをご確認ください。",
    issuer: "GoMining",
    issuerType: "fintech",
    provider: "GoMining Technologies",
    network: "Visa",
    regionAvailability: ["eu", "global"],
    supportedCountries: ["欧州各国", "その他（要確認）"],
    cardType: "prepaid",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "最大5%",
    cashbackDetails:
      "VIPティアにより0.5〜5%のキャッシュバック。BTCマイニング保有量に連動。",
    rewardType: "cashback-crypto",
    rewardToken: "BTC",
    stakingRequired: true,
    stakingDetails: "GMTトークンのステーキングによりティアアップ",
    subscriptionRequired: false,
    issuanceFee: "要確認",
    monthlyFee: "要確認",
    fxFee: "要確認",
    atmFee: "要確認",
    topupMethods: ["BTC", "ETH", "USDT", "USDC"],
    spendingLimit: "要確認",
    supportedAssets: ["BTC", "ETH", "USDT", "USDC", "GMT"],
    supportedFiatCurrencies: ["USD", "EUR"],
    supportedChains: ["Bitcoin", "Ethereum"],
    settlementMethod: "チャージ残高から決済",
    stablecoinSupport: true,
    spendFrom: "プリペイド残高",
    rechargeModel: "事前チャージ型",
    referralProgram: true,
    signupBonus: "新規登録で1 TH ボーナス（参考）",
    availabilityStatus: "available",
    waitlist: false,
    scores: {
      overall: 7.8,
      beginnerFriendly: 6.5,
      japanCompatibility: 6.0,
      cashback: 9.0,
      fees: 7.0,
      accessibility: 6.5,
      usdtUsability: 7.5,
      withdrawal: 7.0,
      security: 7.5,
    },
    bestFor: ["高還元向け", "BTC保有者", "マイニング関心者"],
    useCases: [
      "BTCを活用しながら高還元を受けたい方",
      "マイニング収益を決済に活用したい方",
      "EU圏での日常決済",
    ],
    pros: [
      "最大5%という高水準のキャッシュバック",
      "新規登録ボーナス（1 TH）でお得にスタート",
      "BTCマイニング収益と連動したユニークな設計",
      "VIPティアで特典が拡張する長期利用向け設計",
    ],
    cons: [
      "最高還元にはBTC・GMTの相当量保有が必要",
      "EU圏中心で日本からのアクセスは要確認",
      "マイニング関連の仕組みへの理解が必要",
    ],
    faq: [
      {
        question: "GoMining Cardは日本から申し込めますか？",
        answer:
          "EU圏を主な対象とするカードです。日本からの申し込み可否は公式サイトでご確認ください。",
      },
      {
        question: "キャッシュバックはどのように受け取れますか？",
        answer:
          "BTC形式でウォレットに付与されます。ティアが高いほど還元率が上がります。",
      },
    ],
    relatedGuides: ["how-to-choose-crypto-card", "what-is-cashback-in-crypto"],
    relatedComparisons: ["tria-vs-gomining", "gomining-vs-swissborg"],
    relatedTopPicks: ["high-cashback", "overall"],
    tags: ["高還元", "BTC", "マイニング", "ステーキング", "VIPティア"],
    officialUrl: "https://gomining.com",
    referralUrl: "https://gomining.com",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: false,
    lastReviewed: "2026-04-01",
    lastUpdated: "2026-04-01",
  },

  // ============================================================
  // 3. SwissBorg Card
  // ============================================================
  {
    id: "swissborg",
    name: "SwissBorg Card",
    slug: "swissborg-card",
    logo: "🏔",
    coverColor: "from-cyan-600 to-teal-700",
    shortDescription:
      "スイス発のCeFiプラットフォーム。$BORG保有量に応じて最大90%のキャッシュバック。FX手数料0.99%。",
    longDescription:
      "SwissBorgは、スイスを拠点とする規制準拠の暗号資産投資・決済プラットフォームです。$BORGトークンの保有量によって複数のティアが存在し、最大90%のキャッシュバック還元（$BORG形式）を受けられます。FX手数料0.99%は比較的低水準。EUを中心に対応しており、規制環境を重視するユーザーに評価されています。※本情報は参考情報です。詳細は公式サイトをご確認ください。",
    issuer: "SwissBorg",
    issuerType: "fintech",
    provider: "SwissBorg SA（スイス）",
    network: "Visa",
    regionAvailability: ["eu"],
    supportedCountries: ["欧州各国（EU/EEA）"],
    cardType: "prepaid",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: false,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "最大90%（$BORG還元）",
    cashbackDetails:
      "$BORG保有量に応じてティアが決まり、キャッシュバック率が変動。ベーシアンティアでは低めの還元率。",
    rewardType: "cashback-crypto",
    rewardToken: "$BORG",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "無料（バーチャル）",
    monthlyFee: "無料",
    fxFee: "0.99%",
    atmFee: "要確認",
    topupMethods: ["USDT", "USDC", "BTC", "ETH", "$BORG", "法定通貨"],
    spendingLimit: "要確認",
    supportedAssets: ["BTC", "ETH", "USDT", "USDC", "$BORG", "その他多数"],
    supportedFiatCurrencies: ["EUR", "CHF", "GBP"],
    supportedChains: ["Ethereum", "その他"],
    settlementMethod: "プラットフォーム内残高から変換",
    stablecoinSupport: true,
    spendFrom: "SwissBorgアプリ残高",
    rechargeModel: "アプリ連携型",
    referralProgram: true,
    availabilityStatus: "available",
    waitlist: false,
    appRating: "4.6",
    scores: {
      overall: 7.5,
      beginnerFriendly: 7.0,
      japanCompatibility: 5.5,
      cashback: 8.5,
      fees: 8.5,
      accessibility: 6.0,
      usdtUsability: 7.0,
      withdrawal: 6.5,
      security: 8.5,
    },
    bestFor: ["$BORG保有者", "EU在住者", "高還元向け"],
    useCases: [
      "$BORG保有による高還元を受けたい方",
      "スイス発の規制準拠サービスを好む方",
      "EU圏での日常決済",
    ],
    pros: [
      "最大90%還元という圧倒的なキャッシュバック率（$BORG多量保有時）",
      "FX手数料0.99%は比較的低い",
      "スイス拠点・規制準拠で信頼性が高い",
      "App評価が高く、操作性に定評",
    ],
    cons: [
      "最高還元には大量の$BORG保有が必要",
      "EU圏向けで日本からは利用不可の可能性",
      "バーチャルカードのみ（物理カードなし）",
    ],
    faq: [
      {
        question: "日本から利用できますか？",
        answer:
          "SwissBorgは現在EU/EEA圏を主な対象としています。日本からの申し込みは難しい場合があります。公式サイトをご確認ください。",
      },
    ],
    relatedGuides: ["how-to-choose-crypto-card"],
    relatedComparisons: ["tria-vs-swissborg", "gomining-vs-swissborg"],
    relatedTopPicks: ["high-cashback", "eu-users"],
    tags: ["高還元", "$BORG", "スイス", "規制準拠", "EU"],
    officialUrl: "https://swissborg.com",
    isEditorsPick: false,
    isFeatured: false,
    isSponsor: false,
    lastReviewed: "2026-04-01",
    lastUpdated: "2026-04-01",
  },

  // ============================================================
  // 4. MEXC × EtherFi Card
  // ============================================================
  {
    id: "etherfi-mexc",
    name: "EtherFi × MEXC Card",
    slug: "etherfi-mexc-card",
    logo: "Ξ",
    coverColor: "from-blue-600 to-violet-700",
    shortDescription:
      "EtherFiとMEXCが提携。最大4%のキャッシュバックと最大10% APR。非カストディ型でETH保有者向け。",
    longDescription:
      "EtherFiとMEXCが提携して提供するクリプトカード。非カストディ型で、ETH・eETH（EtherFiのステーキングトークン）を保有しながら日常決済に活用できます。FX手数料は1%、最大4%のキャッシュバックと最大10%のAPRが特徴。ETH保有者・DeFiユーザーに向いています。※本情報は参考情報です。詳細は公式サイトをご確認ください。",
    issuer: "EtherFi × MEXC",
    issuerType: "defi",
    provider: "EtherFi / MEXC",
    network: "Visa",
    regionAvailability: ["eu", "usa", "global"],
    supportedCountries: ["欧州各国", "米国", "その他（要確認）"],
    cardType: "prepaid",
    custodyType: "non-custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "最大4%",
    cashbackDetails: "利用金額・保有量に応じて変動。キャッシュバックはクリプト形式。",
    rewardType: "cashback-crypto",
    rewardToken: "ETH / eETH",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "要確認",
    monthlyFee: "要確認",
    fxFee: "1%",
    atmFee: "要確認",
    topupMethods: ["ETH", "eETH", "USDC", "USDT"],
    spendingLimit: "要確認",
    supportedAssets: ["ETH", "eETH", "USDC", "USDT"],
    supportedFiatCurrencies: ["USD", "EUR"],
    supportedChains: ["Ethereum"],
    settlementMethod: "ETH/eETHからリアルタイム変換",
    stablecoinSupport: true,
    spendFrom: "ETH / eETHウォレット残高",
    rechargeModel: "残高チャージ型",
    referralProgram: false,
    availabilityStatus: "available",
    waitlist: false,
    scores: {
      overall: 7.8,
      beginnerFriendly: 6.0,
      japanCompatibility: 6.5,
      cashback: 8.0,
      fees: 8.2,
      accessibility: 6.5,
      usdtUsability: 7.0,
      withdrawal: 7.5,
      security: 8.0,
    },
    bestFor: ["ETH保有者", "DeFiユーザー", "ステーキング活用"],
    useCases: [
      "ETHやeETHを決済に活用したい方",
      "DeFiのステーキング収益を日常決済に使いたい方",
      "非カストディで資産管理したい方",
    ],
    pros: [
      "非カストディで資産の自己管理が可能",
      "FX手数料1%は標準的な水準",
      "最大10% APRで保有資産を効率的に運用",
      "ETH・DeFiエコシステムと自然に統合",
    ],
    cons: [
      "ETH中心のエコシステムで対応資産が限定的",
      "日本からの利用可否は要確認",
      "EtherFi・MEXCどちらのアカウントが必要か要確認",
    ],
    faq: [
      {
        question: "eETHとは何ですか？",
        answer:
          "eETHはEtherFiのリキッドステーキングトークンです。ETHをEtherFiでステーキングすると受け取れ、ステーキング報酬を受けながら決済にも利用できます。",
      },
    ],
    relatedGuides: ["what-is-crypto-card", "stablecoin-daily-payment"],
    relatedComparisons: ["tria-vs-etherfi", "etherfi-vs-swissborg"],
    relatedTopPicks: ["defi", "high-cashback"],
    tags: ["DeFi", "ETH", "ステーキング", "非カストディ", "APR"],
    officialUrl: "https://etherfi.bid",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: false,
    lastReviewed: "2026-04-01",
    lastUpdated: "2026-04-01",
  },

  // ============================================================
  // 5. PEXX Card
  // ============================================================
  {
    id: "pexx",
    name: "PEXX Card",
    slug: "pexx-card",
    logo: "P",
    coverColor: "from-emerald-600 to-green-700",
    shortDescription:
      "シンガポール発のUSDT特化型カード。2.6%のフラット手数料で出金性に優れる。日次上限$50,000。",
    longDescription:
      "PEXXはシンガポールを拠点とするフィンテック企業が提供するクリプトカードで、USDTを中心に扱います。フラット手数料2.6%でシンプルな料金体系が特徴。$50,000の日次上限と約3.5%のAPYも魅力。EU・USA対応で、アジア発でありながらグローバルに利用可能な設計です。出金ルートとして活用したいユーザーにも向いています。※本情報は参考情報です。",
    issuer: "PEXX",
    issuerType: "fintech",
    provider: "PEXX Pte. Ltd.（シンガポール）",
    network: "Visa",
    regionAvailability: ["eu", "usa", "asia"],
    supportedCountries: ["欧州各国", "米国", "シンガポール", "その他（要確認）"],
    cardType: "prepaid",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "あり（詳細は公式サイト参照）",
    cashbackDetails: "キャッシュバック詳細は公式サイト参照。約3.5% APYが付与される場合あり。",
    rewardType: "apy",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "要確認",
    monthlyFee: "要確認",
    fxFee: "2.6%（フラット）",
    atmFee: "要確認",
    topupMethods: ["USDT", "USDC", "BTC", "ETH"],
    spendingLimit: "$50,000 / 日",
    supportedAssets: ["USDT", "USDC", "BTC", "ETH"],
    supportedFiatCurrencies: ["USD", "EUR", "SGD"],
    supportedChains: ["Ethereum", "Tron", "BNB Chain"],
    settlementMethod: "USDTからリアルタイム変換",
    stablecoinSupport: true,
    spendFrom: "USDT残高",
    rechargeModel: "USDT中心のチャージ型",
    referralProgram: true,
    availabilityStatus: "available",
    waitlist: false,
    scores: {
      overall: 7.2,
      beginnerFriendly: 7.5,
      japanCompatibility: 7.0,
      cashback: 6.5,
      fees: 6.5,
      accessibility: 7.5,
      usdtUsability: 9.0,
      withdrawal: 8.5,
      security: 7.5,
    },
    bestFor: ["USDT活用", "出金性重視", "シンガポール拠点サービス"],
    useCases: [
      "USDTをそのまま日常決済に使いたい方",
      "クリプト資産の出金ルートを確保したい方",
      "シンガポール発のサービスを選びたい方",
    ],
    pros: [
      "シンガポール拠点でアジア向けに実績あり",
      "$50,000の高い日次上限",
      "USDT中心でシンプルな運用が可能",
      "フラット手数料でコスト予測がしやすい",
    ],
    cons: [
      "FX手数料2.6%は他と比べて高め",
      "日本からの利用可否は要確認",
      "USDT以外の対応資産は限定的",
    ],
    faq: [
      {
        question: "PEXXはシンガポール法人で日本でも使えますか？",
        answer:
          "PEXXはシンガポール拠点のサービスです。日本からの利用可否は公式サイトをご確認ください。",
      },
    ],
    relatedGuides: ["stablecoin-daily-payment", "fund-transfer-basics"],
    relatedComparisons: ["tria-vs-pexx", "pexx-vs-redotpay"],
    relatedTopPicks: ["usdt", "withdrawal"],
    tags: ["USDT", "シンガポール", "出金", "フラット手数料", "高上限"],
    officialUrl: "https://pexx.com",
    isEditorsPick: false,
    isFeatured: false,
    isSponsor: false,
    lastReviewed: "2026-04-01",
    lastUpdated: "2026-04-01",
  },

  // ============================================================
  // 6. Zeal Card
  // ============================================================
  {
    id: "zeal",
    name: "Zeal Card",
    slug: "zeal-card",
    logo: "Z",
    coverColor: "from-purple-600 to-pink-600",
    shortDescription:
      "FX手数料0.3%の低コスト設計。最大4%キャッシュバック、5〜6% APY。EU・USA対応。",
    longDescription:
      "Zealは、非常に低いFX手数料（0.3%）と高い利回り（5〜6% APY）を組み合わせたクリプトカードです。最大4%のキャッシュバック、登録無料で入手しやすく、EU・USA対応。コストを抑えながら還元率も高いバランスの良い設計が特徴です。※本情報は参考情報です。",
    issuer: "Zeal",
    issuerType: "fintech",
    provider: "Zeal",
    network: "Visa",
    regionAvailability: ["eu", "usa"],
    supportedCountries: ["欧州各国", "米国"],
    cardType: "prepaid",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "最大4%",
    cashbackDetails: "利用状況・ティアに応じて変動",
    rewardType: "cashback-fiat",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "無料",
    monthlyFee: "無料",
    fxFee: "0.3%",
    atmFee: "要確認",
    topupMethods: ["USDT", "USDC", "ETH", "BTC"],
    spendingLimit: "要確認",
    supportedAssets: ["USDT", "USDC", "ETH", "BTC"],
    supportedFiatCurrencies: ["USD", "EUR"],
    supportedChains: ["Ethereum", "その他"],
    settlementMethod: "クリプト残高から変換",
    stablecoinSupport: true,
    spendFrom: "チャージ残高",
    rechargeModel: "事前チャージ型",
    referralProgram: true,
    availabilityStatus: "available",
    waitlist: false,
    scores: {
      overall: 7.6,
      beginnerFriendly: 7.5,
      japanCompatibility: 5.5,
      cashback: 8.0,
      fees: 9.5,
      accessibility: 7.0,
      usdtUsability: 7.5,
      withdrawal: 7.0,
      security: 7.5,
    },
    bestFor: ["低コスト重視", "高還元向け", "EU在住者"],
    useCases: [
      "FX手数料を極限まで抑えたい方",
      "APYと高還元を両立したい方",
      "EU・USA圏での日常決済",
    ],
    pros: [
      "FX手数料0.3%は業界最低水準クラス",
      "5〜6% APYと最大4%キャッシュバックの組み合わせ",
      "登録・発行無料でコスト負担なし",
    ],
    cons: [
      "日本・アジアからの利用は難しい可能性",
      "詳細な手数料体系は公式サイト確認が必要",
    ],
    faq: [
      {
        question: "Zealは日本から使えますか？",
        answer: "EU・USA向けが中心です。日本からの申し込みは公式サイトをご確認ください。",
      },
    ],
    relatedGuides: ["how-to-choose-crypto-card"],
    relatedComparisons: ["zeal-vs-picnic", "tria-vs-zeal"],
    relatedTopPicks: ["high-cashback", "overall"],
    tags: ["低手数料", "高還元", "APY", "EU", "USA"],
    officialUrl: "https://zeal.app",
    isEditorsPick: false,
    isFeatured: false,
    isSponsor: false,
    lastReviewed: "2026-04-01",
    lastUpdated: "2026-04-01",
  },

  // ============================================================
  // 7. Picnic Card
  // ============================================================
  {
    id: "picnic",
    name: "Picnic Card",
    slug: "picnic-card",
    logo: "🧺",
    coverColor: "from-green-500 to-emerald-600",
    shortDescription:
      "FX手数料0.3%・個人IBAN付き・最大5%キャッシュバック。EU・USA対応の低コスト万能型。",
    longDescription:
      "Picnicは、0.3%という低FX手数料に加えて個人IBANの付与、最大5%のキャッシュバックを組み合わせた高コスパカードです。登録無料でEU・USA圏に対応。IBANが付くことで銀行口座に近い使い方もできます。※本情報は参考情報です。",
    issuer: "Picnic",
    issuerType: "neobank",
    provider: "Picnic",
    network: "Visa",
    regionAvailability: ["eu", "usa"],
    supportedCountries: ["欧州各国", "米国"],
    cardType: "prepaid",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "最大5%",
    cashbackDetails: "利用状況に応じて変動",
    rewardType: "cashback-fiat",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "無料",
    monthlyFee: "無料",
    fxFee: "0.3%",
    atmFee: "要確認",
    topupMethods: ["USDT", "USDC", "ETH", "BTC", "法定通貨"],
    spendingLimit: "要確認",
    supportedAssets: ["USDT", "USDC", "BTC", "ETH"],
    supportedFiatCurrencies: ["EUR", "USD"],
    supportedChains: ["Ethereum", "その他"],
    settlementMethod: "残高から変換",
    stablecoinSupport: true,
    spendFrom: "チャージ残高",
    rechargeModel: "事前チャージ型",
    referralProgram: true,
    availabilityStatus: "available",
    waitlist: false,
    scores: {
      overall: 7.4,
      beginnerFriendly: 8.0,
      japanCompatibility: 5.5,
      cashback: 8.5,
      fees: 9.5,
      accessibility: 7.5,
      usdtUsability: 7.0,
      withdrawal: 7.0,
      security: 7.5,
    },
    bestFor: ["低コスト重視", "IBAN活用", "EU在住者"],
    useCases: [
      "IBANを活用してSEPA送金もしたい方",
      "FX手数料を最小化したい方",
      "EU圏での万能カードを探している方",
    ],
    pros: [
      "0.3%の超低FX手数料",
      "個人IBANが付与され銀行的な使い方も可能",
      "最大5%キャッシュバック",
      "登録・発行無料",
    ],
    cons: [
      "EU・USA中心で日本からの利用は難しい可能性",
      "詳細条件は公式サイト要確認",
    ],
    faq: [
      {
        question: "IBANとは何ですか？",
        answer:
          "IBANは欧州の標準的な銀行口座番号形式です。SEPA送金の受け取りや欧州のサービスへの登録に使えます。",
      },
    ],
    relatedGuides: ["how-to-choose-crypto-card"],
    relatedComparisons: ["zeal-vs-picnic"],
    relatedTopPicks: ["high-cashback"],
    tags: ["低手数料", "IBAN", "高還元", "EU", "USA"],
    officialUrl: "https://picnic.finance",
    isEditorsPick: false,
    isFeatured: false,
    isSponsor: false,
    lastReviewed: "2026-04-01",
    lastUpdated: "2026-04-01",
  },

  // ============================================================
  // 8. BingX Card
  // ============================================================
  {
    id: "bingx",
    name: "BingX Card",
    slug: "bingx-card",
    logo: "B",
    coverColor: "from-blue-500 to-cyan-600",
    shortDescription:
      "BingX取引所発行のカード。マルチチェーン対応、最大2% FX手数料。CEX連携型。",
    longDescription:
      "BingXはグローバル展開する暗号資産取引所が提供するカード。取引所口座と連携してシームレスに利用でき、マルチチェーン対応が特徴。FX手数料は最大2%。EU・USA圏を中心に対応。取引所ユーザーにはとっつきやすい選択肢です。※本情報は参考情報です。",
    issuer: "BingX",
    issuerType: "cex",
    provider: "BingX Exchange",
    network: "Visa",
    regionAvailability: ["eu", "usa", "global"],
    supportedCountries: ["欧州各国", "米国", "その他（要確認）"],
    cardType: "cex-linked",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "あり（詳細は公式サイト参照）",
    cashbackDetails: "取引・保有状況に応じた還元プログラム",
    rewardType: "cashback-crypto",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "要確認",
    monthlyFee: "要確認",
    fxFee: "最大2%",
    atmFee: "要確認",
    topupMethods: ["BingX取引所残高", "USDT", "BTC", "ETH"],
    spendingLimit: "要確認",
    supportedAssets: ["BTC", "ETH", "USDT", "USDC", "BNB"],
    supportedFiatCurrencies: ["USD", "EUR"],
    supportedChains: ["Ethereum", "BNB Chain", "Polygon", "その他"],
    settlementMethod: "取引所残高から変換",
    stablecoinSupport: true,
    spendFrom: "BingX取引所残高",
    rechargeModel: "取引所連携型",
    referralProgram: true,
    availabilityStatus: "available",
    waitlist: false,
    scores: {
      overall: 6.8,
      beginnerFriendly: 7.0,
      japanCompatibility: 5.5,
      cashback: 6.5,
      fees: 7.0,
      accessibility: 7.0,
      usdtUsability: 7.5,
      withdrawal: 7.0,
      security: 7.0,
    },
    bestFor: ["BingXユーザー", "CEX連携重視", "マルチチェーン対応"],
    useCases: [
      "BingXで取引している方がそのままカード利用",
      "マルチチェーン資産を決済に使いたい方",
    ],
    pros: [
      "BingX取引所とシームレスに連携",
      "マルチチェーン対応で多様な資産を活用",
      "グローバルに展開する取引所の信頼性",
    ],
    cons: [
      "FX手数料最大2%は中〜高水準",
      "BingXアカウントが前提",
      "日本への規制状況は要確認",
    ],
    faq: [
      {
        question: "BingXカードはBingX口座がないと使えませんか？",
        answer: "基本的にBingX取引所口座との連携が必要です。まずBingXの口座開設が必要です。",
      },
    ],
    relatedGuides: ["what-is-crypto-card"],
    relatedComparisons: ["bingx-vs-tria"],
    relatedTopPicks: ["overall"],
    tags: ["CEX", "BingX", "マルチチェーン", "取引所連携"],
    officialUrl: "https://bingx.com",
    isEditorsPick: false,
    isFeatured: false,
    isSponsor: false,
    lastReviewed: "2026-04-01",
    lastUpdated: "2026-04-01",
  },

  // ============================================================
  // 9. Pionex Card
  // ============================================================
  {
    id: "pionex",
    name: "Pionex Card",
    slug: "pionex-card",
    logo: "⚡",
    coverColor: "from-yellow-500 to-orange-500",
    shortDescription:
      "自動売買ボットで有名なPionexのカード。5% APY・1% FX手数料・登録無料。EU・USA対応。",
    longDescription:
      "Pionexは自動売買ボット機能で知られる取引所が提供するカードです。5%という高いAPY、FX手数料1%、登録無料という使いやすい条件が整っています。EU・USA対応でキャッシュバックプログラムも用意されています。※本情報は参考情報です。",
    issuer: "Pionex",
    issuerType: "cex",
    provider: "Pionex",
    network: "Visa",
    regionAvailability: ["eu", "usa"],
    supportedCountries: ["欧州各国", "米国"],
    cardType: "cex-linked",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: false,
    googlePay: false,
    cashbackRate: "あり（詳細は公式サイト参照）",
    cashbackDetails: "キャッシュバックプログラムあり。詳細は公式サイト参照。",
    rewardType: "apy",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "無料",
    monthlyFee: "無料",
    fxFee: "1%",
    atmFee: "要確認",
    topupMethods: ["Pionex取引所残高", "USDT", "BTC", "ETH"],
    spendingLimit: "要確認",
    supportedAssets: ["BTC", "ETH", "USDT", "USDC"],
    supportedFiatCurrencies: ["USD", "EUR"],
    supportedChains: ["Ethereum", "BNB Chain"],
    settlementMethod: "取引所残高から変換",
    stablecoinSupport: true,
    spendFrom: "Pionex残高",
    rechargeModel: "取引所連携型",
    referralProgram: true,
    availabilityStatus: "available",
    waitlist: false,
    scores: {
      overall: 6.5,
      beginnerFriendly: 7.0,
      japanCompatibility: 5.0,
      cashback: 6.0,
      fees: 8.0,
      accessibility: 6.5,
      usdtUsability: 7.0,
      withdrawal: 6.5,
      security: 7.0,
    },
    bestFor: ["Pionexユーザー", "自動売買との組み合わせ"],
    useCases: [
      "Pionexで自動売買をしながらカードも利用したい方",
      "APYを受けながら決済したい方",
    ],
    pros: [
      "5%の高APY",
      "FX手数料1%で標準的なコスト",
      "登録・発行無料",
      "自動売買ボットとの親和性が高い",
    ],
    cons: [
      "Apple Pay / Google Pay 非対応（要確認）",
      "Pionexユーザー向けで汎用性は限定的",
      "日本からの利用は要確認",
    ],
    faq: [
      {
        question: "Pionexの自動売買ボットとカードは連携できますか？",
        answer: "同一プラットフォーム内で管理できます。詳しくは公式サイトをご確認ください。",
      },
    ],
    relatedGuides: ["what-is-crypto-card"],
    relatedComparisons: ["pionex-vs-tria"],
    relatedTopPicks: ["overall"],
    tags: ["CEX", "自動売買", "APY", "EU", "USA"],
    officialUrl: "https://www.pionex.com",
    isEditorsPick: false,
    isFeatured: false,
    isSponsor: false,
    lastReviewed: "2026-04-01",
    lastUpdated: "2026-04-01",
  },

  // ============================================================
  // 10. Kosh Card
  // ============================================================
  {
    id: "kosh",
    name: "Kosh Card",
    slug: "kosh-card",
    logo: "K",
    coverColor: "from-slate-600 to-slate-800",
    shortDescription:
      "非カストディ型。USD/EUR/AED口座対応・IBAN付き。FX手数料1.5%。EU・USA対応。",
    longDescription:
      "Koshは非カストディ型のクリプトカードで、USD・EUR・AEDの複数通貨口座とIBANに対応しています。資産の自己管理を維持しながら、欧州・米国・中東圏でも利用できる設計。FX手数料は1.5%。DeFiユーザーで複数の法定通貨口座が必要な方に向いています。※本情報は参考情報です。",
    issuer: "Kosh",
    issuerType: "defi",
    provider: "Kosh",
    network: "Visa",
    regionAvailability: ["eu", "usa", "mena"],
    supportedCountries: ["欧州各国", "米国", "UAE"],
    cardType: "prepaid",
    custodyType: "non-custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "あり（詳細は公式サイト参照）",
    cashbackDetails: "キャッシュバックプログラムあり",
    rewardType: "cashback-fiat",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "要確認",
    monthlyFee: "要確認",
    fxFee: "1.5%",
    atmFee: "要確認",
    topupMethods: ["USDT", "USDC", "ETH", "BTC"],
    spendingLimit: "要確認",
    supportedAssets: ["USDT", "USDC", "ETH", "BTC"],
    supportedFiatCurrencies: ["USD", "EUR", "AED"],
    supportedChains: ["Ethereum", "その他"],
    settlementMethod: "クリプト残高から変換",
    stablecoinSupport: true,
    spendFrom: "ウォレット残高",
    rechargeModel: "残高チャージ型",
    referralProgram: false,
    availabilityStatus: "available",
    waitlist: false,
    scores: {
      overall: 6.8,
      beginnerFriendly: 6.5,
      japanCompatibility: 5.5,
      cashback: 6.0,
      fees: 7.5,
      accessibility: 6.5,
      usdtUsability: 8.0,
      withdrawal: 7.5,
      security: 8.0,
    },
    bestFor: ["非カストディ重視", "中東利用", "複数通貨口座"],
    useCases: [
      "UAE・中東圏でも使いたい方",
      "複数の法定通貨口座を一枚で管理したい方",
      "資産の自己管理を維持しながら決済したい方",
    ],
    pros: [
      "非カストディで資産の自己管理が可能",
      "USD/EUR/AEDの複数通貨口座対応",
      "IBANが付与されSEPA送金も可能",
      "中東（UAE）でも利用可能",
    ],
    cons: [
      "日本からの申し込みは難しい可能性",
      "FX手数料1.5%は中水準",
      "還元率は限定的",
    ],
    faq: [
      {
        question: "AED口座とは何ですか？",
        answer:
          "AEDはアラブ首長国連邦（UAE）の通貨ディルハムです。ドバイなど中東圏でのサービス利用や決済に活用できます。",
      },
    ],
    relatedGuides: ["what-is-crypto-card", "overseas-usage-guide"],
    relatedComparisons: ["kosh-vs-tria"],
    relatedTopPicks: ["overall"],
    tags: ["非カストディ", "IBAN", "中東", "UAE", "マルチ通貨"],
    officialUrl: "https://kosh.finance",
    isEditorsPick: false,
    isFeatured: false,
    isSponsor: false,
    lastReviewed: "2026-04-01",
    lastUpdated: "2026-04-01",
  },
];

// ============================================================
// ユーティリティ関数
// ============================================================
export function getCardBySlug(slug: string): Card | undefined {
  return cards.find((c) => c.slug === slug);
}

export function getCardsByTopPick(topPickSlug: string): Card[] {
  return cards.filter((c) => c.relatedTopPicks.includes(topPickSlug));
}

export function getFeaturedCards(): Card[] {
  return cards.filter((c) => c.isFeatured);
}

export function getEditorsPicks(): Card[] {
  return cards.filter((c) => c.isEditorsPick);
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
