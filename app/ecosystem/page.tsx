import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { articles } from "@/data/articles";
import ArticleCard from "@/components/articles/ArticleCard";

export const metadata: Metadata = {
  title: "クリプト決済エコシステム解説",
  description:
    "ステーブルコイン・DeFi・決済インフラ・ブロックチェーンなど、クリプトカードを取り巻くエコシステムを解説します。",
};

export default function EcosystemPage() {
  const ecosystemArticles = articles.filter(
    (a) => a.category === "ecosystem" || a.category === "payment-infra" || a.category === "stablecoin"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "エコシステム" }]} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">クリプト決済エコシステム</h1>
        <p className="text-gray-600 leading-relaxed">
          クリプトカードを支えるステーブルコイン・DeFi・決済インフラ・ブロックチェーンについて解説します。
        </p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {[
          {
            title: "ステーブルコイン",
            desc: "USDT・USDCなど価格が安定した暗号資産。クリプトカード決済の主要手段。",
            href: "/guides/stablecoin-daily-payment",
            emoji: "💵",
            color: "bg-emerald-50 border-emerald-200",
          },
          {
            title: "DeFi × 決済",
            desc: "非カストディ型カードがDeFiエコシステムと接続する仕組みを解説。",
            href: "/guides/what-is-non-custodial-card",
            emoji: "⛓",
            color: "bg-blue-50 border-blue-200",
          },
          {
            title: "資金移動インフラ",
            desc: "クリプトカードを出金ルートとして活用するための基礎知識。",
            href: "/guides/fund-transfer-basics",
            emoji: "🔄",
            color: "bg-violet-50 border-violet-200",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`block border ${item.color} rounded-2xl p-5 hover:shadow-sm transition-all`}
          >
            <div className="text-3xl mb-3">{item.emoji}</div>
            <h2 className="font-bold text-gray-900 mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </Link>
        ))}
      </div>

      {ecosystemArticles.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">エコシステム関連記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ecosystemArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
