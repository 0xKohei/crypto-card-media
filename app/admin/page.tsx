"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CARD_TEMPLATE = `  {
    id: "CARD_ID",
    name: "カード名",
    slug: "card-slug",
    logo: "✦",
    coverColor: "from-blue-600 to-indigo-700",
    shortDescription: "1〜2文の簡潔な説明",
    longDescription: "詳細な説明（公式情報ベース）",
    issuer: "発行会社名",
    issuerType: "fintech",          // fintech / cex / defi / neobank / traditional
    provider: "発行体（法人名・国）",
    network: "Visa",                // Visa / Mastercard / Both
    regionAvailability: ["global"], // japan / asia / eu / usa / global / latam / mena
    supportedCountries: ["対応国リスト"],
    cardType: "prepaid",            // prepaid / debit / credit / virtual-only / cex-linked
    custodyType: "custodial",       // custodial / non-custodial / hybrid
    kycRequired: true,
    kycLevel: "standard",           // none / basic / standard / enhanced
    physicalCard: true,
    virtualCard: true,
    applePay: false,
    googlePay: false,
    cashbackRate: "最大X%",
    cashbackDetails: "還元詳細",
    rewardType: "cashback-crypto",  // cashback-fiat / cashback-crypto / points / apy / none
    stakingRequired: false,
    subscriptionRequired: false,
    issuanceFee: "XX USD",
    monthlyFee: "$0",
    fxFee: "X%",
    atmFee: "公式情報未公開",
    topupMethods: ["USDT", "USDC"],
    spendingLimit: "公式情報未公開",
    supportedAssets: ["USDT", "USDC"],
    supportedFiatCurrencies: ["USD", "EUR"],
    supportedChains: ["Ethereum"],
    settlementMethod: "説明",
    stablecoinSupport: true,
    spendFrom: "プリペイド残高",
    rechargeModel: "事前チャージ型",
    referralProgram: false,
    availabilityStatus: "available",
    waitlist: false,
    bestFor: ["特徴1", "特徴2"],
    useCases: ["ユースケース1"],
    pros: ["長所1", "長所2"],
    cons: ["短所1"],
    faq: [
      {
        question: "質問1",
        answer: "回答1",
      },
    ],
    relatedGuides: [],
    relatedComparisons: [],
    relatedTopPicks: ["overall"],
    tags: ["タグ1", "タグ2"],
    officialUrl: "https://example.com",
    referralUrl: "https://example.com/ref/XXXXXX",
    isEditorsPick: false,
    isFeatured: true,
    isSponsor: true,
    isPriority: true,
    priorityRank: 7,             // 既存6カードの後ろに追加
    keyStrength: "強みワード",
    lastReviewed: "${new Date().toISOString().split("T")[0]}",
    lastUpdated: "${new Date().toISOString().split("T")[0]}",
    reviewNote: "調査元のURL・情報源を記載",
  },`;

export default function AdminPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CARD_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
          🔧 開発者向けページ
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">カード追加ガイド</h1>
        <p className="text-gray-600 text-sm">
          新しいカードを追加する際は、以下のテンプレートを
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs mx-1">data/cards.ts</code>
          の cards 配列末尾に追加してください。
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
            リサーチ要件
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong>公式ソースを最優先</strong>：公式サイト・公式ドキュメント・公式X（Twitter）・アプリ内情報</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>情報が不明な場合は <code className="bg-gray-100 px-1 rounded text-xs">公式情報未公開</code> と明記。推測で埋めない</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>変更の可能性がある数値には <code className="bg-gray-100 px-1 rounded text-xs">※変更の可能性あり</code> を付記</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>referralUrl には確認済みの紹介リンクのみを設定</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">2</span>
            必須入力項目
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {[
              "issuanceFee（発行費）",
              "fxFee（FX手数料）",
              "atmFee（ATM手数料）",
              "cashbackRate（還元率）",
              "physicalCard（ATM可否）",
              "regionAvailability（対応地域）",
              "officialUrl（公式URL）",
              "referralUrl（紹介URL）",
              "lastReviewed（調査日）",
              "pros（長所3件以上）",
              "cons（短所2件以上）",
              "faq（Q&A 2件以上）",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                <span className="text-xs text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
              カードテンプレート
            </h2>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "コピーしました" : "コピー"}
            </button>
          </div>
          <pre className="bg-slate-900 text-slate-300 text-xs rounded-xl p-4 overflow-x-auto leading-relaxed">
            <code>{CARD_TEMPLATE}</code>
          </pre>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">4</span>
            追加後のチェックリスト
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              "data/cards.ts に追加（TypeScriptエラーがないか確認）",
              "data/top-picks.ts の該当ランキングに cardSlug を追加",
              "priorityRank を正しい順番に設定（既存カードとの重複なし）",
              "referralUrl が正しく動作するか確認",
              "npm run build でビルドエラーがないか確認",
              "本番環境でカード詳細ページが正しく表示されるか確認",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-4 h-4 border border-gray-300 rounded flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <strong>注意：</strong>このページは開発者向けです。本番環境では
        <code className="bg-amber-100 px-1 rounded text-xs mx-1">/admin</code>
        へのアクセスを制限することを推奨します。
      </div>
    </div>
  );
}
