import type { Article } from "@/types";

export const articles: Article[] = [
  {
    id: "what-is-crypto-card",
    slug: "what-is-crypto-card",
    title: "クリプトカードとは？仕組み・使い方・選び方を初心者向けに解説",
    excerpt:
      "クリプトカードは、暗号資産（仮想通貨）を日常の決済に使えるプリペイド・デビットカードです。どんな仕組みで動いているのか、選ぶ際のポイントとあわせて解説します。",
    content: `## クリプトカードとは

クリプトカード（Crypto Card）とは、暗号資産（仮想通貨）を使って実店舗・オンラインショッピングで決済できるカードです。VISAまたはMastercardのネットワークを使うものが多く、Visa/Mastercard加盟店であれば通常のクレジットカードと同様に使えます。

## 仕組み

1. カードにUSDTやBTCなどをチャージする
2. 決済時に自動的に現地通貨（円・ドルなど）に変換される
3. 加盟店には通常の法定通貨が支払われる

## どんなカードがあるか

クリプトカードにはいくつかの種類があります。

- **取引所連携型（CEX型）**：取引所口座と連携して使うタイプ。BingXカードなど。
- **プリペイド型**：USDTなどをチャージして使うタイプ。最も一般的。
- **非カストディ型（DeFi型）**：自分でウォレットを管理しながら使うタイプ。Triaなど。

## 選ぶ際のポイント

1. 対応地域：日本や海外での利用可否
2. FX手数料：決済時の通貨変換コスト
3. KYC要件：本人確認の厳しさ
4. 対応資産：USDT・BTC・ETHなど
5. キャッシュバック：還元率と条件

詳しくは「[クリプトカードの選び方](/guides/how-to-choose-crypto-card)」をご参照ください。
`,
    category: "beginner-guide",
    tags: ["初心者", "クリプトカード", "仕組み", "USDT", "Visa"],
    relatedCardSlugs: ["tria", "gomining-card", "pexx-card"],
    relatedComparisonSlugs: ["tria-vs-gomining"],
    relatedTopPickSlugs: ["overall", "beginner"],
    relatedArticleSlugs: ["how-to-choose-crypto-card", "stablecoin-daily-payment"],
    publishedAt: "2026-03-01",
    updatedAt: "2026-04-01",
    author: "CryptoCardNavi編集部",
    readingTime: 8,
    featured: true,
  },
  {
    id: "how-to-choose-crypto-card",
    slug: "how-to-choose-crypto-card",
    title: "クリプトカードの選び方【2026年版】日本人向け完全ガイド",
    excerpt:
      "数十種類あるクリプトカードの中から、自分に合ったものを選ぶための判断基準を徹底解説。手数料・地域・KYC・還元率の見方を整理します。",
    content: `## 選び方の5つの軸

### 1. 対応地域を確認する
日本からの申し込みが可能か、日本国内で使えるかを最初に確認しましょう。EU向けのみのカードは日本では使えない場合があります。

### 2. FX手数料を比較する
決済時の通貨変換手数料。0.3%〜3%まで差があります。頻繁に使う場合はここが大きなコスト差になります。

### 3. KYC要件を把握する
本人確認の厳しさはカードによって異なります。パスポートのみで完結するものから、住所証明・収入証明まで必要なものまで様々です。

### 4. 対応資産を確認する
USDTしかチャージできないカードと、1,000種類以上のトークンに対応するカード（Triaなど）では利便性が大きく変わります。

### 5. キャッシュバック条件を読む
「最大〇%」という表記のほとんどは、ステーキングや高額保有が前提です。通常利用での実際の還元率を確認しましょう。

## タイプ別おすすめ

- **初心者**：[Tria](/cards/tria)、[PEXX](/cards/pexx-card)
- **高還元重視**：[GoMining](/cards/gomining-card)、[SwissBorg](/cards/swissborg-card)
- **出金重視**：[Tria](/cards/tria)、[PEXX](/cards/pexx-card)

→ [Finder：条件で絞り込んで探す](/finder)
`,
    category: "beginner-guide",
    tags: ["選び方", "比較", "初心者", "手数料", "KYC"],
    relatedCardSlugs: ["tria", "gomining-card", "swissborg-card", "pexx-card"],
    relatedComparisonSlugs: ["tria-vs-gomining", "tria-vs-pexx"],
    relatedTopPickSlugs: ["overall", "beginner", "japan-users"],
    relatedArticleSlugs: ["what-is-crypto-card", "stablecoin-daily-payment", "fund-transfer-basics"],
    publishedAt: "2026-03-05",
    updatedAt: "2026-04-01",
    author: "CryptoCardNavi編集部",
    readingTime: 12,
    featured: true,
  },
  {
    id: "stablecoin-daily-payment",
    slug: "stablecoin-daily-payment",
    title: "ステーブルコインを日常決済に使う方法【USDT・USDC対応カード比較】",
    excerpt:
      "USDTやUSDCを日々の買い物に活用するためのカード比較と実践ガイド。価格変動リスクを抑えながら決済できるステーブルコイン対応カードを紹介します。",
    content: `## ステーブルコインを決済に使うメリット

USDTやUSDCは米ドルに価値が連動したステーブルコインです。BTCやETHと異なり価格変動が少なく、決済手段として使いやすいのが特徴です。

## 主なUSDT対応カード

| カード | USDT対応 | FX手数料 | 特徴 |
|--------|----------|----------|------|
| [Tria](/cards/tria) | ○ | 要確認 | 1,000以上のトークン対応 |
| [PEXX](/cards/pexx-card) | ○ | 2.6% | USDT特化、高上限 |
| [Zeal](/cards/zeal-card) | ○ | 0.3% | 低コスト設計 |

## 活用のポイント

1. チャージはUSDTで行い、価格変動リスクを回避
2. FX手数料が低いカードを選ぶことでコストを最小化
3. ステーブルコイン利回り（APY）が付くカードを活用する

→ [ステーブルコイン対応カードをすべて見る](/finder?stablecoin=true)
`,
    category: "stablecoin",
    tags: ["USDT", "USDC", "ステーブルコイン", "決済", "比較"],
    relatedCardSlugs: ["tria", "pexx-card", "zeal-card"],
    relatedComparisonSlugs: ["tria-vs-pexx"],
    relatedTopPickSlugs: ["usdt"],
    relatedArticleSlugs: ["what-is-crypto-card", "fund-transfer-basics"],
    publishedAt: "2026-03-10",
    updatedAt: "2026-04-01",
    author: "CryptoCardNavi編集部",
    readingTime: 10,
    featured: true,
  },
  {
    id: "fund-transfer-basics",
    slug: "fund-transfer-basics",
    title: "資金移動の基礎知識：クリプトカードを出金ルートとして使う考え方",
    excerpt:
      "クリプト資産を現実世界で活用するための「出金ルート」としてカードを使う考え方を整理します。手数料・上限・対応資産の観点から解説。",
    content: `## 出金ルートとしてのクリプトカード

クリプトカードは、単なる「決済ツール」ではなく、クリプト資産を日常生活で活用するための「出金ルート」として考えることができます。

## 主な出金方法との比較

- **取引所→銀行振込**：規制が厳しく手続きが煩雑
- **P2Pマーケット**：リスクあり、規制対応が難しい
- **クリプトカード**：Visa加盟店での直接決済が可能

## 出金性が高いカードの条件

1. 日次・月次の上限が高い
2. USDT/USDCに対応している
3. 手数料が予測しやすい（フラット型など）
4. 対応地域が広い

[PEXX](/cards/pexx-card)は$50,000の日次上限でUSDT中心の設計が特徴です。[Tria](/cards/tria)は1,000以上のトークンに対応し、グローバルな利用が可能です。

→ [出金性重視のカードランキング](/top-picks/withdrawal)
`,
    category: "fund-transfer",
    tags: ["出金", "資金移動", "USDT", "上限", "手数料"],
    relatedCardSlugs: ["tria", "pexx-card", "kosh-card"],
    relatedComparisonSlugs: ["tria-vs-pexx"],
    relatedTopPickSlugs: ["withdrawal"],
    relatedArticleSlugs: ["stablecoin-daily-payment", "what-is-crypto-card"],
    publishedAt: "2026-03-15",
    updatedAt: "2026-04-01",
    author: "CryptoCardNavi編集部",
    readingTime: 8,
    featured: false,
  },
  {
    id: "what-is-kyc",
    slug: "what-is-kyc",
    title: "KYCとは？クリプトカードで求められる本人確認の種類と対応方法",
    excerpt:
      "KYC（Know Your Customer）の概要と、クリプトカードで必要となる本人確認の種類・必要書類・注意点を解説します。",
    content: `## KYCとは

KYC（Know Your Customer）とは「顧客確認」の意味で、金融サービスを提供する際に利用者の身元を確認するプロセスです。マネーロンダリング防止（AML）と顧客保護を目的としています。

## KYCのレベル

| レベル | 必要書類 | 一般的な上限 |
|--------|----------|-------------|
| なし | 不要 | 低い |
| 基本 | メールアドレス + 身分証 | 中程度 |
| 標準 | 身分証 + 自撮り写真 | 高め |
| 強化 | 上記 + 住所証明など | 制限なし |

## 日本のパスポートで対応できるカード

多くのカードは日本のパスポートでKYCを完了できます。ただし一部のカードでは日本の住所証明が必要になる場合も。

## KYC不要のカードについて

No-KYCカードは利用上限が低く設定されることが多く、規制面での将来的な変化にも注意が必要です。

→ [KYC要件でカードを絞り込む](/finder?kyc=none)
`,
    category: "kyc-security",
    tags: ["KYC", "本人確認", "セキュリティ", "規制"],
    relatedCardSlugs: ["tria", "pexx-card"],
    relatedComparisonSlugs: [],
    relatedTopPickSlugs: ["no-kyc", "beginner"],
    relatedArticleSlugs: ["how-to-choose-crypto-card", "what-is-crypto-card"],
    publishedAt: "2026-03-20",
    updatedAt: "2026-04-01",
    author: "CryptoCardNavi編集部",
    readingTime: 7,
    featured: false,
  },
  {
    id: "overseas-usage-guide",
    slug: "overseas-usage-guide",
    title: "海外でクリプトカードを使う際の注意点と選び方",
    excerpt:
      "海外旅行・出張・在住でクリプトカードを使う際に押さえておくべきポイント。ATM手数料、FX手数料、対応地域の確認方法を解説します。",
    content: `## 海外利用で重要な3つのポイント

### 1. FX手数料の確認
現地通貨への変換コスト。0.3%〜3%の差があり、頻繁な利用では大きな差になります。

### 2. ATM手数料
海外ATMでの引き出し手数料。無料〜$3程度まで差があります。

### 3. 利用可能地域の確認
カードの対応地域外では使えない場合があります。[Tria](/cards/tria)は150カ国以上に対応しており、最も広い対応範囲のひとつです。

## 海外利用向けカード比較

→ [海外利用向けランキングを見る](/top-picks/overseas)
→ [海外利用に強いカードをFinderで探す](/finder?overseas=true)
`,
    category: "overseas-usage",
    tags: ["海外", "ATM", "FX手数料", "旅行", "出張"],
    relatedCardSlugs: ["tria", "zeal-card", "picnic-card"],
    relatedComparisonSlugs: [],
    relatedTopPickSlugs: ["overseas"],
    relatedArticleSlugs: ["how-to-choose-crypto-card", "fund-transfer-basics"],
    publishedAt: "2026-03-25",
    updatedAt: "2026-04-01",
    author: "CryptoCardNavi編集部",
    readingTime: 9,
    featured: false,
  },
  {
    id: "what-is-non-custodial-card",
    slug: "what-is-non-custodial-card",
    title: "非カストディ型クリプトカードとは？自己管理型カードのメリット・デメリット",
    excerpt:
      "「自分の鍵は自分で管理する」DeFi的思想をカードにも適用した非カストディ型。Triaなどの特徴とリスクを整理します。",
    content: `## 非カストディ型とは

非カストディ（Self-Custody / Non-Custodial）とは、秘密鍵・資産管理を第三者に委ねず、自分で保管する方式です。

## カストディ型との比較

| 項目 | カストディ型 | 非カストディ型 |
|------|-------------|----------------|
| 資産管理 | 事業者が管理 | 自分で管理 |
| 紛失リスク | 事業者破綻リスク | 自己責任 |
| 使いやすさ | 高い | やや複雑 |
| 代表カード | GoMining、SwissBorg | Tria、Kosh |

## Triaの場合

[Tria](/cards/tria)は非カストディ型でありながら、高いUXを実現しています。1,000以上のトークンに対応しながら、Apple Pay/Google Payも使えます。

→ [非カストディ型カードをFinderで探す](/finder?custody=non-custodial)
`,
    category: "payment-infra",
    tags: ["非カストディ", "DeFi", "セルフカストディ", "セキュリティ"],
    relatedCardSlugs: ["tria", "kosh-card", "etherfi-mexc-card"],
    relatedComparisonSlugs: ["tria-vs-gomining"],
    relatedTopPickSlugs: ["defi", "overall"],
    relatedArticleSlugs: ["what-is-crypto-card", "what-is-kyc"],
    publishedAt: "2026-04-01",
    updatedAt: "2026-04-01",
    author: "CryptoCardNavi編集部",
    readingTime: 8,
    featured: false,
  },
  {
    id: "what-is-cashback-in-crypto",
    slug: "what-is-cashback-in-crypto",
    title: "クリプトカードのキャッシュバックを正しく理解する【還元率の読み方】",
    excerpt:
      "「最大5%還元」の広告文句に潜む条件を解説。ステーキング要件・ティア制・トークン還元のリスクを踏まえた正しい比較方法を紹介します。",
    content: `## 「最大〇%」の裏側

キャッシュバック率の高い数字は、大抵「最高ティア達成時」の数字です。実際に多くのユーザーが受け取れる還元率は大幅に低い場合があります。

## 確認すべき3つのポイント

### 1. 何の形式で還元されるか
- 法定通貨（キャッシュ）
- ビットコイン・ETH
- 独自トークン（価格変動リスクあり）

### 2. 条件は何か
- 月額ステーキング量
- 月間利用額の下限
- 特定加盟店のみの高還元

### 3. 最低ティアの還元率
最低ティアで受け取れる還元率が、現実的な数字です。

## カード別比較

| カード | 最大還元率 | 最低ティア還元率 | 還元形式 |
|--------|-----------|----------------|---------|
| [GoMining](/cards/gomining-card) | 5% | 0.5% | BTC |
| [SwissBorg](/cards/swissborg-card) | 90% | 低め | $BORG |
| [Tria](/cards/tria) | 最大4% | 要確認 | クリプト |

→ [高還元カードランキング](/top-picks/high-cashback)
`,
    category: "comparison",
    tags: ["キャッシュバック", "還元率", "ステーキング", "ティア", "比較"],
    relatedCardSlugs: ["gomining-card", "swissborg-card", "tria", "zeal-card"],
    relatedComparisonSlugs: ["tria-vs-gomining", "gomining-vs-swissborg"],
    relatedTopPickSlugs: ["high-cashback"],
    relatedArticleSlugs: ["how-to-choose-crypto-card"],
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    author: "CryptoCardNavi編集部",
    readingTime: 10,
    featured: false,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function getRelatedArticlesForCard(cardSlug: string): Article[] {
  return articles.filter((a) => a.relatedCardSlugs.includes(cardSlug));
}
