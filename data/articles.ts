import type { Article } from "@/types";

export const articles: Article[] = [
  {
    id: "what-is-crypto-card",
    slug: "what-is-crypto-card",
    title: "クリプトカードとは？仕組み・使い方・選び方を初心者向けに解説",
    excerpt:
      "クリプトカードは、暗号資産を日常の決済に使えるプリペイド・バーチャルカードです。基本の仕組みと選び方を整理します。",
    content: `## クリプトカードとは

クリプトカード（Crypto Card）とは、暗号資産を使って実店舗やオンラインショップで決済できるカードです。多くはVisaまたはMastercardのネットワーク上で動作し、加盟店では通常のカードと同じように利用できます。

## 基本的な仕組み

1. USDTやUSDC、BTCなどをカードや連携ウォレットに用意する
2. 決済時にカード発行側が法定通貨へ変換する
3. 加盟店には通常の法定通貨が支払われる

## 主なカードタイプ

- **プリペイド型**：事前に残高を入れて使うタイプ。Kast、RedotPay、Tevauなど。
- **非カストディ型**：ウォレット資産を自分で管理しながら使うタイプ。Tria、Bitget Wallet Card、Jupiter Globalなど。
- **バーチャル中心型**：スマホ決済やオンライン決済に向くタイプ。Bitget Wallet Card、Jupiter Globalなど。

## 選ぶ際のポイント

1. 対応地域
2. FX手数料
3. KYC要件
4. 対応資産
5. キャッシュバックや特典

詳しくは「[クリプトカードの選び方](/guides/how-to-choose-crypto-card)」をご参照ください。`,
    category: "beginner-guide",
    tags: ["初心者", "クリプトカード", "仕組み", "USDT", "Visa"],
    relatedCardSlugs: ["tria", "kast", "bitget-wallet-card"],
    relatedComparisonSlugs: ["tria-vs-kast"],
    relatedTopPickSlugs: ["overall", "usdt"],
    relatedArticleSlugs: ["how-to-choose-crypto-card", "stablecoin-daily-payment"],
    publishedAt: "2026-03-01",
    updatedAt: "2026-04-16",
    author: "CryptoCardNavi編集部",
    readingTime: 8,
    featured: true,
  },
  {
    id: "how-to-choose-crypto-card",
    slug: "how-to-choose-crypto-card",
    title: "クリプトカードの選び方【2026年版】日本人向け完全ガイド",
    excerpt:
      "6枚の掲載カードから自分に合う1枚を選ぶために、手数料・地域・KYC・還元の見方を整理します。",
    content: `## 選び方の5つの軸

### 1. 対応地域を確認する
日本からの申込可否や、海外での利用しやすさを確認しましょう。TevauやTriaのようにグローバル訴求の強いカードと、地域限定色の強いカードでは使い勝手が異なります。

### 2. FX手数料を比較する
日常利用ではFX手数料が総コストに直結します。USDC中心ならKast、マルチトークン活用ならTriaのように、設計思想の違いを確認するのが重要です。

### 3. KYC要件を把握する
掲載中の6カードはいずれも何らかのKYCを前提としています。必要書類や審査フローの軽さはカードごとに差があります。

### 4. 対応資産を確認する
USDT・USDC中心で十分なのか、Triaのように多数のトークンに対応している方がよいのかで候補は変わります。

### 5. 特典条件を読む
「最大〇%」や「月額補助」は条件付きです。Jupiter Globalのロードマップ要素やBitget Wallet Cardの月間補助など、適用条件まで確認しましょう。

## タイプ別の見方

- **初心者寄り**：[Kast](/cards/kast)、[RedotPay](/cards/redotpay)
- **非カストディ重視**：[Tria](/cards/tria)、[Bitget Wallet Card](/cards/bitget-wallet-card)、[Jupiter Global](/cards/jupiter-global)
- **海外利用重視**：[Tevau](/cards/tevau)、[Tria](/cards/tria)

→ [Finder：条件で絞り込んで探す](/finder)`,
    category: "beginner-guide",
    tags: ["選び方", "比較", "初心者", "手数料", "KYC"],
    relatedCardSlugs: ["tria", "kast", "redotpay", "tevau"],
    relatedComparisonSlugs: ["tria-vs-kast", "tevau-vs-redotpay"],
    relatedTopPickSlugs: ["overall", "japan-users", "overseas"],
    relatedArticleSlugs: ["what-is-crypto-card", "stablecoin-daily-payment", "what-is-kyc"],
    publishedAt: "2026-03-05",
    updatedAt: "2026-04-16",
    author: "CryptoCardNavi編集部",
    readingTime: 12,
    featured: true,
  },
  {
    id: "stablecoin-daily-payment",
    slug: "stablecoin-daily-payment",
    title: "ステーブルコインを日常決済に使う方法【USDT・USDC対応カード比較】",
    excerpt:
      "USDTやUSDCを買い物に活用するために、掲載中の6カードの中からステーブルコイン利用に向く候補を整理します。",
    content: `## ステーブルコインを決済に使うメリット

USDTやUSDCは価格変動が比較的小さいため、日常決済に使いやすいのが特徴です。決済専用の残高として切り分けやすく、コスト管理もしやすくなります。

## 主な対応カード

| カード | ステーブルコイン対応 | FX手数料 | 特徴 |
|--------|----------------------|----------|------|
| [Kast](/cards/kast) | USDC中心 | USD取引0% | USDC決済に特化 |
| [RedotPay](/cards/redotpay) | USDT/USDC対応 | 1.2% | シンプルな料金体系 |
| [Tevau](/cards/tevau) | USDT/USDC対応 | 公式情報未公開 | グローバル利用向け |
| [Jupiter Global](/cards/jupiter-global) | USDC中心 | USD 0% | Solanaユーザー向け |

## 活用のポイント

1. 日常決済用の残高をUSDTまたはUSDCで分ける
2. USD建て取引が多い場合はKastやJupiter Globalの条件を確認する
3. 物理カードの要否で候補を絞る

→ [ステーブルコイン対応カードを探す](/finder)`,
    category: "stablecoin",
    tags: ["USDT", "USDC", "ステーブルコイン", "決済", "比較"],
    relatedCardSlugs: ["kast", "redotpay", "tevau", "jupiter-global"],
    relatedComparisonSlugs: ["kast-vs-redotpay", "stablecoin-3way"],
    relatedTopPickSlugs: ["usdt", "overall"],
    relatedArticleSlugs: ["what-is-crypto-card", "fund-transfer-basics"],
    publishedAt: "2026-03-10",
    updatedAt: "2026-04-16",
    author: "CryptoCardNavi編集部",
    readingTime: 10,
    featured: true,
  },
  {
    id: "fund-transfer-basics",
    slug: "fund-transfer-basics",
    title: "資金移動の基礎知識：クリプトカードを決済ルートとして使う考え方",
    excerpt:
      "カードを銀行出金の代替ではなく、日常決済に接続するルートとして捉える考え方を整理します。",
    content: `## 決済ルートとしてのクリプトカード

クリプトカードは、暗号資産を銀行口座へ戻す前に、そのまま支払いへつなぐためのルートとして使えます。用途は「現金化」よりも「決済への接続」と考えた方が実態に近い場面が多いです。

## 比較時に見るポイント

1. 決済時の手数料が明確か
2. 物理カードやApple Payに対応しているか
3. ステーブルコイン残高をそのまま使いやすいか
4. 利用地域に制限がないか

Triaはマルチトークン対応、KastはUSDC中心の低コスト設計、Tevauはグローバル利用のしやすさが強みです。

→ [USDT・ステーブルコイン活用ランキング](/top-picks/usdt)`,
    category: "fund-transfer",
    tags: ["決済", "資金移動", "USDT", "手数料", "実用"],
    relatedCardSlugs: ["tria", "kast", "tevau"],
    relatedComparisonSlugs: ["tria-vs-kast", "stablecoin-3way"],
    relatedTopPickSlugs: ["usdt", "overall"],
    relatedArticleSlugs: ["stablecoin-daily-payment", "what-is-crypto-card"],
    publishedAt: "2026-03-15",
    updatedAt: "2026-04-16",
    author: "CryptoCardNavi編集部",
    readingTime: 8,
    featured: false,
  },
  {
    id: "what-is-kyc",
    slug: "what-is-kyc",
    title: "KYCとは？クリプトカードで求められる本人確認の種類と対応方法",
    excerpt:
      "KYCの基本と、掲載中のカード選びで確認すべき本人確認レベルの違いを解説します。",
    content: `## KYCとは

KYC（Know Your Customer）は、金融サービス利用者の本人確認手続きです。マネーロンダリング対策や不正利用防止のため、多くのカードで必須です。

## 主なKYCレベル

| レベル | 必要書類 | 一般的な傾向 |
|--------|----------|-------------|
| 基本 | メールアドレス + 身分証 | 比較的軽い |
| 標準 | 身分証 + 自撮り写真 | 一般的 |
| 強化 | 上記 + 住所証明など | 利用上限が高い場合に多い |

## このサイトの掲載カードでは

Triaは基本KYC、Kast・RedotPay・Tevau・Bitget Wallet Card・Jupiter Globalは標準KYCとして整理しています。実際の必要書類は必ず各公式サイトで再確認してください。

→ [カード一覧でKYC要件を比較する](/cards)`,
    category: "kyc-security",
    tags: ["KYC", "本人確認", "セキュリティ", "規制"],
    relatedCardSlugs: ["tria", "kast", "bitget-wallet-card"],
    relatedComparisonSlugs: [],
    relatedTopPickSlugs: ["overall", "japan-users"],
    relatedArticleSlugs: ["how-to-choose-crypto-card", "what-is-crypto-card"],
    publishedAt: "2026-03-20",
    updatedAt: "2026-04-16",
    author: "CryptoCardNavi編集部",
    readingTime: 7,
    featured: false,
  },
  {
    id: "overseas-usage-guide",
    slug: "overseas-usage-guide",
    title: "海外でクリプトカードを使う際の注意点と選び方",
    excerpt:
      "海外旅行・出張・在住時に確認すべきFX手数料、ATM利用、対応地域の見方を整理します。",
    content: `## 海外利用で重要な3つのポイント

### 1. FX手数料
海外での総コストに直結します。USD建て決済が多いならKastやJupiter Global、広い対応地域を重視するならTevauやTriaが候補になります。

### 2. 物理カードやATMの扱い
現地ATMも使いたいなら物理カードの有無が重要です。Bitget Wallet CardやJupiter Globalはバーチャル中心です。

### 3. 対応地域
カードによって対応国・地域は大きく異なります。TriaやTevauのようにグローバル訴求が強いカードでも、申込可否は国ごとに再確認が必要です。

→ [海外利用向けランキングを見る](/top-picks/overseas)
→ [海外利用に強いカードをFinderで探す](/finder)`,
    category: "overseas-usage",
    tags: ["海外", "ATM", "FX手数料", "旅行", "出張"],
    relatedCardSlugs: ["tria", "tevau", "redotpay"],
    relatedComparisonSlugs: ["tevau-vs-redotpay"],
    relatedTopPickSlugs: ["overseas", "overall"],
    relatedArticleSlugs: ["how-to-choose-crypto-card", "stablecoin-daily-payment"],
    publishedAt: "2026-03-25",
    updatedAt: "2026-04-16",
    author: "CryptoCardNavi編集部",
    readingTime: 9,
    featured: false,
  },
  {
    id: "what-is-non-custodial-card",
    slug: "what-is-non-custodial-card",
    title: "非カストディ型クリプトカードとは？自己管理型カードのメリット・デメリット",
    excerpt:
      "セルフカストディを維持したまま決済したい人向けに、掲載中の非カストディ型カードの特徴を整理します。",
    content: `## 非カストディ型とは

非カストディとは、秘密鍵や資産管理を第三者に預けず、自分で管理する方式です。カードでもこの思想を維持したまま使えるサービスがあります。

## カストディ型との違い

| 項目 | カストディ型 | 非カストディ型 |
|------|-------------|----------------|
| 資産管理 | 事業者が管理 | 自分で管理 |
| 使いやすさ | 高い傾向 | やや複雑 |
| 代表例 | Kast、RedotPay、Tevau | Tria、Bitget Wallet Card、Jupiter Global |

## 掲載中の非カストディ型

- [Tria](/cards/tria)：マルチトークン対応
- [Bitget Wallet Card](/cards/bitget-wallet-card)：月額補助つき
- [Jupiter Global](/cards/jupiter-global)：Solanaエコシステム特化

→ [DeFiユーザー向けランキングを見る](/top-picks/defi)`,
    category: "payment-infra",
    tags: ["非カストディ", "DeFi", "セルフカストディ", "セキュリティ"],
    relatedCardSlugs: ["tria", "bitget-wallet-card", "jupiter-global"],
    relatedComparisonSlugs: ["tria-vs-bitget-wallet-card", "bitget-wallet-card-vs-jupiter-global"],
    relatedTopPickSlugs: ["defi", "overall"],
    relatedArticleSlugs: ["what-is-crypto-card", "what-is-kyc"],
    publishedAt: "2026-04-01",
    updatedAt: "2026-04-16",
    author: "CryptoCardNavi編集部",
    readingTime: 8,
    featured: false,
  },
  {
    id: "what-is-cashback-in-crypto",
    slug: "what-is-cashback-in-crypto",
    title: "クリプトカードの特典を正しく理解する【還元率の読み方】",
    excerpt:
      "還元率や月額補助、ポイント付与の違いを整理し、掲載中6カードの特典表記をどう読むべきかを解説します。",
    content: `## 「最大〇%」の見方

特典は単純な還元率だけでは比較できません。ティア制、月額補助、紹介特典、ロードマップ段階の要素が混在しています。

## 確認すべきポイント

### 1. 何が付与されるか
- 法定通貨相当
- 独自ポイント
- 独自トークン
- 手数料還付

### 2. 条件は何か
- 有料プラン加入
- 一定額以上の利用
- 紹介条件の達成

### 3. 常設か期間限定か
Kastのシーズン報酬、Bitget Wallet Cardの月額補助、Jupiter Globalのロードマップ要素は性質が異なります。

## 掲載カードの読み方

- [Kast](/cards/kast)：USDC利用とティア制を確認
- [Bitget Wallet Card](/cards/bitget-wallet-card)：月$400までの還付条件を確認
- [Tria](/cards/tria)：ティア別の還元と受取条件を確認

→ [総合ランキングを見る](/top-picks/overall)`,
    category: "comparison",
    tags: ["特典", "キャッシュバック", "還元率", "比較", "ポイント"],
    relatedCardSlugs: ["kast", "bitget-wallet-card", "tria"],
    relatedComparisonSlugs: ["tria-vs-kast", "tria-vs-bitget-wallet-card"],
    relatedTopPickSlugs: ["overall", "usdt"],
    relatedArticleSlugs: ["how-to-choose-crypto-card"],
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-16",
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
