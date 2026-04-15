import type { Metadata } from "next";
import { articles } from "@/data/articles";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ArticleCard from "@/components/articles/ArticleCard";

export const metadata: Metadata = {
  title: "クリプトカード ブログ・解説記事",
  description:
    "ステーブルコイン・資金移動・KYC・決済インフラ・海外利用など、クリプトカード周辺のエコシステムを解説するブログ記事を掲載しています。",
};

const blogCategories = [
  "payment-infra",
  "stablecoin",
  "kyc-security",
  "fund-transfer",
  "overseas-usage",
  "ecosystem",
];

export default function BlogPage() {
  const blogArticles = articles.filter((a) => blogCategories.includes(a.category));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "ブログ" }]} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">ブログ・解説記事</h1>
        <p className="text-gray-600">
          ステーブルコイン・資金移動・KYC・決済インフラなど、クリプトカードの周辺知識を解説します。
        </p>
      </div>

      {blogArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p>記事を準備中です。しばらくお待ちください。</p>
        </div>
      )}
    </div>
  );
}
