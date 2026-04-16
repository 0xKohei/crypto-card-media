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
    description:
      "担保設定したデジタル資産をもとに使うVisaカード。Virtual / Plastic / Metalの3種類が公式規約で開示されています。",
    fees: {
      issuance: "Virtual: $25 / Plastic: $109 / Metal: $250",
      annual: "Virtual: $25 / Plastic: $109 / Metal: $250",
      fx: "Up to 3% FX + up to 1% international transaction fee",
      atm: "Balance inquiry: up to $2 / decline: up to $2 / withdrawal: up to $2 + 3%",
    },
    cashback: {
      rate: "Not publicly disclosed",
      condition: "Not publicly disclosed",
    },
    atm: {
      available: true,
      limit: "Not publicly disclosed",
    },
    availability: {
      countries: ["Intended for users outside the United States; exact supported jurisdictions are Not publicly disclosed"],
      japan: "unknown",
    },
    source: {
      url: "https://docs.tria.so/card-terms-international",
      section: "Important Disclosures; Eligibility; Collateral; Spending Limits; Fees",
    },
    shortDescription:
      "担保設定したデジタル資産をもとに使うVisaカード。Virtual / Plastic / Metalの3種類が公式規約で開示されています。",
    longDescription:
      "Tria Spend Cardの国際規約では、Nimbus, LLC が発行体であり、Triaがオンラインアクセスを提供すると記載されています。カードは担保設定したデジタル資産を前提に利用し、Isssuer が信用枠と動的な利用上限を設定します。公式の国際カード規約では、Virtual Card、Plastic Card、Metal Card の3種類と各種手数料が開示されています。一方で、対応国一覧、モバイルウォレット対応、還元内容の詳細は、規約ページ上では公表されていません。",
    issuer: "Tria",
    issuerType: "defi",
    provider: "Nimbus LLC（Delaware）",
    network: "Visa",
    regionAvailability: ["asia", "eu", "latam", "mena"],
    supportedCountries: ["Intended for users outside the United States; exact supported jurisdictions are Not publicly disclosed"],
    cardType: "credit",
    custodyType: "non-custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: false,
    googlePay: false,
    cashbackRate: "Not publicly disclosed",
    cashbackDetails:
      "Not publicly disclosed",
    rewardType: "none",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "Virtual: $25 / Plastic: $109 / Metal: $250",
    monthlyFee: "$0",
    annualFee: "Virtual: $25 / Plastic: $109 / Metal: $250",
    fxFee: "Up to 3% FX + up to 1% international transaction fee",
    atmFee: "Balance inquiry: up to $2 / decline: up to $2 / withdrawal: up to $2 + 3%",
    topupMethods: ["Collateralized digital assets in linked wallet", "Additional wallet collateral"],
    spendingLimit: "Dynamic; set by Issuer and/or Tria based on collateral",
    atmWithdrawalLimit: "Not publicly disclosed",
    supportedAssets: ["Eligible digital assets accepted as collateral", "Not publicly disclosed"],
    supportedFiatCurrencies: ["Not publicly disclosed"],
    supportedChains: ["Ethereum", "Polygon", "Optimism", "Arbitrum", "Other supported blockchains at issuer discretion"],
    settlementMethod: "Card charges are secured by digital-asset collateral in a linked or additional wallet",
    stablecoinSupport: true,
    spendFrom: "Collateral-backed card account",
    rechargeModel: "Collateral-backed credit line",
    referralProgram: false,
    availabilityStatus: "available",
    waitlist: false,
    appRating: "Not publicly disclosed",
    bestFor: ["非カストディ志向", "担保型のカード利用", "Visaネットワーク利用"],
    useCases: [
      "自己管理の資産を担保にカード決済したい方",
      "Virtual / Plastic / Metalの選択肢が欲しい方",
      "利用上限が担保連動でも問題ない方",
    ],
    pros: [
      "国際カード規約でカード発行費・FX・ATM関連手数料が明示されている",
      "担保設定したデジタル資産に基づく利用モデル",
      "Virtual / Plastic / Metalの3種類が公式規約に記載されている",
    ],
    cons: [
      "カードは米国外向けで、対応法域の一覧は公開されていない",
      "還元・モバイルウォレット対応は規約上で確認できない",
      "担保額に応じて利用上限が動的に変わる",
    ],
    faq: [
      {
        question: "Triaカードは日本から申し込めますか？",
        answer:
          "国際カード規約では米国外向けカードであることは確認できますが、日本対応の明示は確認できませんでした。対応法域は Not publicly disclosed です。",
      },
      {
        question: "利用上限はどのように決まりますか？",
        answer:
          "国際カード規約では、Issuer および Tria が担保状況に応じて動的に利用上限を設定すると説明されています。",
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
    tags: ["セルフカストディ", "担保型", "Visa", "国際規約あり", "DeFi"],
    image: "/cards/tria.png",
    cardImage: "/cards/tria.png",
    cardImageSourceUrl: "https://tria.so/icons/cards/a.png",
    cardImageSourceType: "official-site",
    officialUrl: "https://www.tria.so/ja",
    referralUrl: "https://www.tria.so/ja",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: true,
    isPriority: true,
    priorityRank: 1,
    keyStrength: "担保型カード",
    lastReviewed: "2026-04-16",
    lastUpdated: "2026-04-16",
    reviewNote: "Primary sources: https://docs.tria.so/card-terms-international (Important Disclosures, Eligibility, Collateral, Spending Limits, Fees), https://docs.tria.so/account-opening-privacy-notice (account opening data collection).",
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
    description:
      "USDC / ステーブルコインをUSD残高として使うカード。公式ヘルプセンターに手数料・ATM・限度額が細かく公開されています。",
    fees: {
      issuance: "Standard virtual: first two free (additional $2 each; first virtual may cost $2 in some countries) / Standard physical: free + $40 shipping",
      annual: "Premium: $1,000 / Limited: $5,000 one time / Luxe: $10,000",
      fx: "USD取引：0%、非USD：0.5〜1.75%",
      atm: "$3 + 2% + ATM事業者手数料",
    },
    cashback: {
      rate: "2%〜8% in KAST Points",
      condition: "Standard 2%, Premium 5%, Luxe 8% in KAST Points. Help center also lists referral and milestone point rewards.",
    },
    atm: {
      available: true,
      limit: "$250/回、$750/24時間（最大3回）",
    },
    availability: {
      countries: ["グローバル（詳細は公式サイト参照）"],
      japan: "unknown",
    },
    source: {
      url: "https://concierge.kast.xyz/hc/en-us/articles/9850062738703-What-Are-the-Fees-and-Conditions-for-KAST-Cards-and-Accounts",
      section: "Card Pricing; Transaction Fees; Card Limits; ATM Withdrawal Fees and Limits; Stablecoin to USD Conversion",
    },
    shortDescription:
      "USDC / ステーブルコインをUSD残高として使うカード。公式ヘルプセンターに手数料・ATM・限度額が細かく公開されています。",
    longDescription:
      "KASTの公式ヘルプセンターでは、カード価格、年会費、決済手数料、ATM手数料、引き出し上限、入出金手数料が公開されています。Standard / Premium / Limited / Luxe の4ティアがあり、USD建てカード決済は0%、非USD決済は居住国等に応じて0.5%〜1.75%のFX手数料が適用されます。ステーブルコイン入金は1:1でUSD残高に変換され、KAST Points の還元率もティア別に記載されています。",
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
    cashbackRate: "2%〜8% in KAST Points",
    cashbackDetails:
      "Standard 2%, Premium 5%, Luxe 8% in KAST Points. Help center also lists referral and milestone point rewards.",
    rewardType: "points",
    rewardToken: "KAST Points",
    stakingRequired: false,
    subscriptionRequired: false,
    subscriptionDetails: "Optional tier upgrades: Premium $1,000/year, Limited $5,000 one time, Luxe $10,000/year",
    issuanceFee: "Standard virtual: first two free (additional $2 each; first virtual may cost $2 in some countries) / Standard physical: free + $40 shipping",
    monthlyFee: "$0",
    annualFee: "Premium：$1,000 / Limited：$5,000（一括） / Luxe：$10,000",
    fxFee: "USD取引：0%、非USD：0.5〜1.75%",
    atmFee: "$3 + 2% + ATM事業者手数料",
    topupMethods: ["Supported stablecoins", "Non-stablecoin deposits auto-converted to stablecoins", "ACH", "FedWire"],
    spendingLimit: "Unlimited card transaction limit",
    atmWithdrawalLimit: "$250/回、$750/24時間（最大3回）",
    supportedAssets: ["Supported stablecoins", "Non-stablecoin deposits auto-converted to stablecoins"],
    supportedFiatCurrencies: ["USD", "EUR", "その他多数"],
    supportedChains: ["Solana", "Arbitrum", "Ethereum (ERC-20)", "Tron"],
    settlementMethod: "Deposits are shown in USD; stablecoins are converted to USD at 1:1 with 0% spread",
    stablecoinSupport: true,
    spendFrom: "USDCプリペイド残高",
    rechargeModel: "USDC事前チャージ型",
    referralProgram: true,
    signupBonus: "200 KAST Points after first $100 spend; other milestone rewards vary by activity",
    availabilityStatus: "available",
    waitlist: false,
    bestFor: ["USDC活用", "料金表の透明性重視", "高利用上限"],
    useCases: [
      "USDCをFX手数料なしで使いたい方",
      "ステーブルコインで日常決済したい方",
      "ティア制ポイント還元を使いたい方",
    ],
    pros: [
      "USD取引はFX手数料0%（USDC決済時）",
      "Standard無料から使い始められる",
      "公式ヘルプセンターで料金・上限・入出金条件まで確認できる",
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
          "KASTのヘルプセンターでは、利用額や紹介条件に応じてKAST Pointsが付与されることが記載されています。交換・利用方法の詳細は Not publicly disclosed です。",
      },
    ],
    relatedGuides: ["how-to-choose-crypto-card", "stablecoin-daily-payment"],
    relatedComparisons: [],
    relatedTopPicks: ["overall", "usdt", "japan-users"],
    tags: ["USDC", "ステーブルコイン", "KAST Points", "FX手数料0%", "料金表公開"],
    image: "/cards/kast.png",
    cardImage: "/cards/kast.png",
    cardImageSourceUrl: "https://cdn.prod.website-files.com/660c048ecf246f8d15a85d0a/695f91430a31f241e11cc1fa_700c5139f03d4461e833b1a607909c5c_cards-standard.webp",
    cardImageSourceType: "official-site",
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
    reviewNote: "Primary sources: https://concierge.kast.xyz/hc/en-us/articles/9850062738703-What-Are-the-Fees-and-Conditions-for-KAST-Cards-and-Accounts (Card Pricing, Transaction Fees, Card Limits, ATM Withdrawal Fees and Limits, Stablecoin to USD Conversion), https://concierge.kast.xyz/hc/en-us/articles/13922963428111-How-Can-I-Check-the-Status-of-My-KAST-Account-Verification, https://concierge.kast.xyz/hc/en-us/articles/13929268414095-What-Information-Do-I-Need-To-Verify-My-KAST-Account, https://concierge.kast.xyz/hc/en-us/articles/9486976599951-What-Are-the-Differences-Between-KAST-Verification-Levels.",
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
    description:
      "シンプルなクリプト決済カード。バーチャル$10、物理カード$100。世界中のVisa加盟店で利用可能。",
    fees: {
      issuance: "バーチャル：$10 / 物理カード：$100",
      annual: "Not publicly disclosed",
      fx: "Card currency spend: 0% FX / non-card-currency spend: 1.2% + 1% crypto conversion",
      atm: "HKD card: 2% / USD card: 2% up to cumulative monthly ATM withdrawals of $10,000, then 3%",
    },
    cashback: {
      rate: "None",
      condition: "No permanent cashback is disclosed in the help center.",
    },
    atm: {
      available: true,
      limit: "See RedotPay Card Limitations & Fees",
    },
    availability: {
      countries: ["Available except unsupported countries/regions listed in help center"],
      japan: "unknown",
    },
    source: {
      url: "https://helpcenter.redotpay.com/en/articles/10339271-redotpay-card-limitations-fees",
      section: "Fees and limits",
    },
    shortDescription:
      "シンプルなクリプト決済カード。バーチャル$10、物理カード$100。世界中のVisa加盟店で利用可能。",
    longDescription:
      "RedotPayの公式ヘルプセンターでは、カード申請手数料、月額・年会費の有無、本人確認要件、非対応国、ATM出金、Apple Pay対応、利用可能場所が公開されています。USDカードでは暗号資産変換手数料1%に加え、非USD利用時は1.2%の外貨手数料がかかります。物理カードはATM出金に対応し、手数料は月間ATM利用額に応じて2%または3%です。",
    issuer: "RedotPay",
    issuerType: "fintech",
    provider: "RedotPay（公式：redotpay.com）",
    network: "Visa",
    regionAvailability: ["global", "asia"],
    supportedCountries: ["Available except unsupported countries/regions listed in help center"],
    cardType: "prepaid",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "None",
    cashbackDetails:
      "No permanent cashback is disclosed in the help center.",
    rewardType: "none",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "バーチャル：$10 / 物理カード：$100",
    monthlyFee: "$0",
    fxFee: "Card currency spend: 0% FX / non-card-currency spend: 1.2% + 1% crypto conversion",
    atmFee: "HKD card: 2% / USD card: 2% up to cumulative monthly ATM withdrawals of $10,000, then 3%",
    topupMethods: ["Supported crypto assets in app", "Mainstream bank card transfer", "Other supported funding methods in app"],
    spendingLimit: "See RedotPay Card Limitations & Fees",
    supportedAssets: ["Supported crypto assets in app", "Not publicly disclosed as a fixed list in help center"],
    supportedFiatCurrencies: ["USD", "HKD", "Other local transaction currencies enabled in app"],
    supportedChains: ["Not publicly disclosed"],
    settlementMethod: "Crypto is converted when card transactions are processed; USD and HKD card currencies are supported",
    stablecoinSupport: true,
    spendFrom: "プリペイド残高",
    rechargeModel: "事前チャージ型",
    referralProgram: false,
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
      "対応資産・対応チェーンの固定一覧は公開されていない",
    ],
    faq: [
      {
        question: "RedotPayのキャッシュバックはありますか？",
        answer:
          "公式ヘルプセンター上では常設キャッシュバックは確認できませんでした。",
      },
      {
        question: "USD取引の実質コストはいくらですか？",
        answer:
          "USDカードでUSD建て決済を行う場合は1%の暗号資産変換手数料、非USD決済では追加で1.2%の外貨手数料がかかります。",
      },
    ],
    relatedGuides: ["how-to-choose-crypto-card"],
    relatedComparisons: [],
    relatedTopPicks: ["overall"],
    tags: ["シンプル", "USDT", "バーチャルカード", "グローバル"],
    image: "/cards/redotpay.png",
    cardImage: "/cards/redotpay.png",
    cardImageSourceUrl: "https://staticsource1.redotpay.com/web/img/card/cover-2.webp",
    cardImageSourceType: "official-site",
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
    reviewNote: "Primary sources: https://helpcenter.redotpay.com/en/articles/10339271-redotpay-card-limitations-fees (fees and limits), https://helpcenter.redotpay.com/en/articles/10566200-do-i-need-to-pay-for-a-card, https://helpcenter.redotpay.com/en/articles/10566233-are-there-any-charges-if-i-don-t-use-my-card-for-a-month, https://helpcenter.redotpay.com/en/articles/10339261-how-to-verify-your-identity, https://helpcenter.redotpay.com/en/articles/10339263-redotpay-unsupported-countries-regions, https://helpcenter.redotpay.com/en/articles/13303117-how-to-use-your-redotpay-card-with-apple-pay, https://helpcenter.redotpay.com/en/articles/11027583-where-you-can-use-your-redotpay-card.",
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
    description:
      "Tevauの公開APIドキュメントでカード作成、KYC、カード手数料照会、カード上限照会の機能が確認できるカードサービス。",
    fees: {
      issuance: "Not publicly disclosed",
      annual: "Not publicly disclosed",
      fx: "Not publicly disclosed",
      atm: "Not publicly disclosed",
    },
    cashback: {
      rate: "Not publicly disclosed",
      condition: "Not publicly disclosed",
    },
    atm: {
      available: true,
      limit: "Not publicly disclosed",
    },
    availability: {
      countries: ["Not publicly disclosed"],
      japan: "unknown",
    },
    source: {
      url: "https://api-en.tevau.io/",
      section: "Get started; Virtual card application process; 3.12 Card Limit; 3.14 Query Card Fee",
    },
    shortDescription:
      "Tevauの公開APIドキュメントでカード作成、KYC、カード手数料照会、カード上限照会の機能が確認できるカードサービス。",
    longDescription:
      "Tevauについては、消費者向けの公式ヘルプセンターや料金表を確認できませんでした。公開されている一次情報としてはAPIドキュメントがあり、KYC提出、カード作成、カード手数料照会、カード上限照会、物流照会の各エンドポイントが存在します。したがって、カード発行やKYCフロー自体は確認できますが、利用者向けの具体的な料金・対応地域・還元条件は Not publicly disclosed として扱っています。",
    issuer: "Tevau",
    issuerType: "fintech",
    provider: "Tevau（公式：tevau.io）",
    network: "Other",
    regionAvailability: [],
    supportedCountries: ["Not publicly disclosed"],
    cardType: "prepaid",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: true,
    virtualCard: true,
    applePay: false,
    googlePay: false,
    cashbackRate: "Not publicly disclosed",
    cashbackDetails:
      "Not publicly disclosed",
    rewardType: "none",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "Not publicly disclosed",
    monthlyFee: "Not publicly disclosed",
    fxFee: "Not publicly disclosed",
    atmFee: "Not publicly disclosed",
    topupMethods: ["Not publicly disclosed"],
    spendingLimit: "Not publicly disclosed for consumer card; API docs expose a card limit query endpoint",
    supportedAssets: ["Not publicly disclosed"],
    supportedFiatCurrencies: ["USD"],
    supportedChains: ["Not publicly disclosed"],
    settlementMethod: "Not publicly disclosed",
    stablecoinSupport: false,
    spendFrom: "Not publicly disclosed",
    rechargeModel: "Not publicly disclosed",
    referralProgram: false,
    availabilityStatus: "available",
    waitlist: false,
    appRating: "Not publicly disclosed",
    bestFor: ["公開APIベースで導入可否を確認したい事業者", "一次情報不足でも掲載候補を把握したいユーザー"],
    useCases: [
      "一次情報がどこまで公開されているかを重視する方",
      "公開APIでカード機能の存在だけ確認したい方",
    ],
    pros: [
      "公開APIドキュメントでKYC・カード作成・物流・手数料照会の存在を確認できる",
      "バーチャルカード申請フローと配送フローの図が公開されている",
    ],
    cons: [
      "利用者向けの料金表や対応国一覧を確認できない",
      "Apple Pay / Google Pay や還元条件は Not publicly disclosed",
      "消費者向けFAQや利用規約を確認できない",
    ],
    faq: [
      {
        question: "Tevauはどの国で使えますか？",
        answer:
          "一次情報として確認できたのは公開APIドキュメントのみで、利用者向け対応国一覧は Not publicly disclosed です。",
      },
      {
        question: "チャージした資産を引き出すことはできますか？",
        answer:
          "利用者向け残高引き出しルールは公開ドキュメントで確認できませんでした。",
      },
    ],
    relatedGuides: ["how-to-choose-crypto-card"],
    relatedComparisons: [],
    relatedTopPicks: ["overall", "overseas"],
    tags: ["公開APIあり", "KYC", "カード作成", "料金非開示"],
    image: "/cards/tevau.png",
    cardImage: "/cards/tevau.png",
    cardImageSourceUrl: "https://www.tevau.co/wp-content/uploads/2024/07/about-Tevau-Card2.webp",
    cardImageSourceType: "official-site",
    officialUrl: "https://tevau.io",
    referralUrl: "https://tevau.io",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: true,
    isPriority: true,
    priorityRank: 4,
    keyStrength: "料金非開示",
    lastReviewed: "2026-04-16",
    lastUpdated: "2026-04-16",
    reviewNote: "Primary sources: https://api-en.tevau.io/ (Get started: Virtual card application process, Partner Shipping and Tevau Shipping), https://api-en.tevau.io/327069029e0 (2.1 V1 submits the customer's KYC information), https://api-en.tevau.io/327069033e0 (3.1 Create Card), https://api-en.tevau.io/327069044e0 (3.12 Card Limit), https://api-en.tevau.io/327069046e0 (3.14 Query Card Fee). Consumer fee schedule and eligibility pages were not found.",
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
    description:
      "Bitget Wallet内で使うVisaデビットカード。公式ヘルプセンターに地域別の申込条件・手数料・0-fee特典が公開されています。",
    fees: {
      issuance: "APAC: $10 activation fee / EEA, UK, Latin America: 0.1 USDC activation fee",
      annual: "$0",
      fx: "APAC fees: ~0.5% crypto-to-fiat conversion fee + 1.7% on non-USD transactions; USD spend has no FX fee",
      atm: "Not publicly disclosed",
    },
    cashback: {
      rate: "0-fee cashback up to a monthly cap shown in the app",
      condition: "0-fee means card fees are reimbursed as cashback after posting. The exact monthly cap is shown in Card > 0 fees in the app and resets on the 1st of each month.",
    },
    atm: {
      available: false,
      limit: "Not publicly disclosed",
    },
    availability: {
      countries: ["EEA（欧州経済領域）", "UK", "中南米", "アジア太平洋", "中国"],
      japan: true,
    },
    source: {
      url: "https://web3.bitget.com/en/helpCenter/431",
      section: "APAC Fees; 0-fee benefit; APAC application and identity verification",
    },
    shortDescription:
      "Bitget Wallet内で使うVisaデビットカード。公式ヘルプセンターに地域別の申込条件・手数料・0-fee特典が公開されています。",
    longDescription:
      "Bitget Wallet Cardのヘルプセンターでは、APACとEEA/UK/Latin Americaで申込条件や有効化方法が案内されています。APAC向け記事ではVisa debit card、申込対象国、KYC手順、10 USDの有効化費用、0.5%のcrypto-to-fiat conversion fee、非USD決済時の追加1.7% FX fee、0-fee benefit、Apple Pay / Google Pay対応が公開されています。EEA / UK / Latin America向け記事では、0.1 USDCの有効化費用とBaseネットワークのUSDCトップアップが案内されています。",
    issuer: "Bitget Wallet",
    issuerType: "defi",
    provider: "Bitget Wallet（非カストディ型）",
    network: "Visa",
    regionAvailability: ["eu", "asia", "latam"],
    supportedCountries: ["EEA（欧州経済領域）", "UK", "中南米", "アジア太平洋", "中国"],
    cardType: "debit",
    custodyType: "non-custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: false,
    virtualCard: true,
    applePay: true,
    googlePay: true,
    cashbackRate: "0-fee cashback up to a monthly cap shown in the app",
    cashbackDetails:
      "0-fee means card fees are reimbursed as cashback after posting. The exact monthly cap is shown in Card > 0 fees in the app and resets on the 1st of each month.",
    rewardType: "cashback-fiat",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "APAC: $10 activation fee / EEA, UK, Latin America: 0.1 USDC activation fee",
    monthlyFee: "$0",
    annualFee: "$0",
    fxFee: "APAC fees: ~0.5% crypto-to-fiat conversion fee + 1.7% on non-USD transactions; USD spend has no FX fee",
    atmFee: "Not publicly disclosed",
    topupMethods: ["APAC: supported stablecoins listed in app", "EEA/UK/Latin America: USDC on Base"],
    spendingLimit: "Not publicly disclosed",
    supportedAssets: ["APAC: selected stablecoins in app", "EEA/UK/Latin America: USDC on Base"],
    supportedFiatCurrencies: ["USD", "Other settlement currencies at Visa real-time rates"],
    supportedChains: ["Base", "Arbitrum", "Not publicly disclosed by region"],
    settlementMethod: "Wallet top-ups settle through Bitget Wallet Card; fees are reimbursed within the app if covered by 0-fee benefit",
    stablecoinSupport: true,
    spendFrom: "Bitget Walletの非カストディ残高",
    rechargeModel: "ウォレット連携型（非カストディ）",
    referralProgram: true,
    signupBonus: "Not publicly disclosed",
    availabilityStatus: "available",
    waitlist: false,
    bestFor: ["非カストディ重視", "EU・アジア在住", "USDC活用"],
    useCases: [
      "非カストディで資産管理しながら決済したい方",
      "EU・アジアで利用したい方",
      "アプリ内の0-fee benefitを活用したい方",
    ],
    pros: [
      "非カストディで資産の自己管理が可能",
      "月$400まで手数料実質0%の補助制度",
      "Apple Pay / Google Pay 対応",
      "年会費・チャージ手数料無料",
    ],
    cons: [
      "米国・カナダは対応外",
      "物理カードなし（バーチャルのみ）",
      "0-fee benefitの月額上限はアプリ表示で、公開固定値ではない",
    ],
    faq: [
      {
        question: "月$400の手数料還付はどのように受け取れますか？",
        answer:
          "0-fee benefit は、取引後にカード手数料がキャッシュバックとして返還される仕組みです。適用上限は Card > 0 fees に表示され、毎月1日にリセットされます。",
      },
      {
        question: "日本から申し込めますか？",
        answer:
          "APAC向けヘルプ記事では、日本居住者または市民が申込対象国に含まれています。",
      },
    ],
    relatedGuides: ["what-is-crypto-card"],
    relatedComparisons: [],
    relatedTopPicks: ["overall", "defi"],
    tags: ["Visa", "0-fee cashback", "Apple Pay", "Google Pay", "Bitget"],
    image: "/cards/bitget-wallet-card.png",
    cardImage: "/cards/bitget-wallet-card.png",
    cardImageSourceUrl: "https://static-web.jjdsn.vip/17c3dc65b04a52709561f1c2f7d0ccd8/img/403a28668223.png",
    cardImageSourceType: "official-site",
    officialUrl: "https://web3.bitget.com",
    referralUrl: "https://web3.bitget.com",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: true,
    isPriority: true,
    priorityRank: 5,
    keyStrength: "0-fee benefit",
    lastReviewed: "2026-04-16",
    lastUpdated: "2026-04-16",
    reviewNote: "Primary sources: https://web3.bitget.com/en/helpCenter/425 (APAC application and identity verification), https://web3.bitget.com/en/helpCenter/431 (APAC Fees), https://web3.bitget.com/en/helpCenter/488 (0-fee benefit), https://web3.bitget.com/en/helpCenter/279 (EEA, UK, and Latin America activation), https://web3.bitget.com/en/helpCenter/647 (product overview), https://web3.bitget.com/en/helpCenter/687, /689, /693 (identity verification requirements).",
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
    description:
      "USDCをUSD残高として使うJupiterのVisaデビットカード。公式FAQに手数料、カード種別、KYC、物理カード有無が公開されています。",
    fees: {
      issuance: "$0",
      annual: "$0",
      fx: "USD payments: 0% / non-USD payments: 1% (Rain) or 1.8% (DCS)",
      atm: "Not publicly disclosed",
    },
    cashback: {
      rate: "None publicly disclosed",
      condition: "No cashback or referral reward is described in the official support FAQ.",
    },
    atm: {
      available: false,
      limit: "Region-dependent and Not publicly disclosed in support FAQ",
    },
    availability: {
      countries: ["Region-dependent; issuer and requirements vary by country of residence"],
      japan: true,
    },
    source: {
      url: "https://support.jup.ag/hc/en-us/articles/25701355326876-FAQ",
      section: "General; Jupiter Card; Jupiter ID & KYC",
    },
    shortDescription:
      "USDCをUSD残高として使うJupiterのVisaデビットカード。公式FAQに手数料、カード種別、KYC、物理カード有無が公開されています。",
    longDescription:
      "Jupiter Globalは、Jupiterアプリ内の規制対象金融サービスです。公式FAQでは、Jupiter CardはVisa debit cardであり、USDCのみ入金可能、入金後はUSD残高で管理されると説明されています。カード発行体は居住国に応じてRainまたはDCSに自動割当され、Rainカードは1% FX feeで上限なし、DCSカードは1.8% FX feeで日次50,000・年次990,000の上限が適用されます。年会費とUSDC入金手数料は0、物理カードは未提供です。",
    issuer: "Jupiter Global",
    issuerType: "defi",
    provider: "Jupiter Global（Solana DEXアグリゲーター）",
    network: "Visa",
    regionAvailability: ["asia", "global"],
    supportedCountries: ["Region-dependent; issuer and requirements vary by country of residence"],
    cardType: "debit",
    custodyType: "custodial",
    kycRequired: true,
    kycLevel: "standard",
    physicalCard: false,
    virtualCard: true,
    applePay: false,
    googlePay: false,
    cashbackRate: "None publicly disclosed",
    cashbackDetails:
      "No cashback or referral reward is described in the official support FAQ.",
    rewardType: "none",
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "$0",
    monthlyFee: "$0",
    annualFee: "$0",
    fxFee: "USD payments: 0% / non-USD payments: 1% (Rain) or 1.8% (DCS)",
    atmFee: "Not publicly disclosed",
    topupMethods: ["USDC deposits only"],
    spendingLimit: "Rain: no spending limit / DCS: daily 50,000, annual 990,000",
    atmWithdrawalLimit: "Region-dependent and Not publicly disclosed in support FAQ",
    supportedAssets: ["USDC only"],
    supportedFiatCurrencies: ["USD"],
    supportedChains: ["Solana"],
    settlementMethod: "USDC deposits are converted one-to-one to USD; card balance is held in USD",
    stablecoinSupport: true,
    spendFrom: "USD balance in Jupiter Global",
    rechargeModel: "USDC deposit to Global account",
    referralProgram: false,
    availabilityStatus: "available",
    waitlist: false,
    bestFor: ["USDC-only運用", "デジタルカード利用", "Jupiterアプリ内利用"],
    useCases: [
      "Solanaエコシステムを活用しているDeFiユーザー",
      "USD建て取引を手数料0%で行いたい方",
      "物理カードなしで問題ない方",
    ],
    pros: [
      "USD取引手数料0%（USDC使用時）",
      "USDCのみのシンプルな入金設計",
      "年会費0、USDC入金手数料0",
      "Rain / DCS の差分がFAQで明示されている",
    ],
    cons: [
      "物理カードなし（デジタルカードのみ）",
      "対応地域と発行体が居住国依存",
      "Apple Pay / Google Pay は Not publicly disclosed",
    ],
    faq: [
      {
        question: "Jupiter Globalカードは日本から使えますか？",
        answer:
          "公式FAQでは、国別の発行体や必要書類が居住国に応じて変わるとされています。日本を含むAPACでは proof of address が必要です。",
      },
      {
        question: "USDCで入金すると残高はどう表示されますか？",
        answer:
          "公式FAQでは、USDCを入金するとその時点でUSDに変換され、カード残高はUSDとして保持されると案内されています。",
      },
    ],
    relatedGuides: ["what-is-crypto-card", "stablecoin-daily-payment"],
    relatedComparisons: [],
    relatedTopPicks: ["overall", "defi", "usdt"],
    tags: ["Solana", "USDC only", "Visa", "Digital-only", "Jupiter Global"],
    image: "/cards/jupiter-global.png",
    cardImage: "/cards/jupiter-global.png",
    cardImageSourceUrl: "https://jupiter.global/images/homepage-hero.svg",
    cardImageSourceType: "official-site",
    officialUrl: "https://landing.global.jup.ag",
    referralUrl: "https://landing.global.jup.ag",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: true,
    isPriority: true,
    priorityRank: 6,
    keyStrength: "USDC only",
    lastReviewed: "2026-04-16",
    lastUpdated: "2026-04-16",
    reviewNote: "Primary sources: https://support.jup.ag/hc/en-us/articles/25701355326876-FAQ (General, Jupiter Card, Jupiter ID & KYC sections), https://support.jup.ag/hc/en-us/articles/25692372102684-What-is-Jupiter-Global, https://support.jup.ag/hc/en-us/articles/25692871799836-Jupiter-ID.",
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
