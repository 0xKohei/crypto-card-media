import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/articles";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ArticleCard from "@/components/articles/ArticleCard";
import { categoryLabels } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "クリプトカード 初心者ガイド・選び方記事",
  description:
    "クリプトカードの仕組み・選び方・KYCの解説・ステーブルコインの使い方など、初心者から上級者まで役立つガイド記事を掲載しています。",
};

const guideCategories = ["beginner-guide", "comparison", "review", "opinion"];

export default function GuidesPage() {
  const guideArticles = articles.filter((a) => guideCategories.includes(a.category));
  const featured = guideArticles.filter((a) => a.featured);
  const rest = guideArticles.filter((a) => !a.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "ガイド" }]} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          クリプトカード ガイド・選び方記事
        </h1>
        <p className="text-gray-600">
          初心者向けの基礎解説から、上級者向けの比較・選び方まで幅広く掲載しています。
        </p>
      </div>

      {featured.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            おすすめ記事
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-5">すべての記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Cross-links */}
      <div className="mt-12 bg-blue-50 rounded-2xl p-6">
        <h2 className="font-bold text-gray-900 mb-3">記事から探す・比較する</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <Link href="/cards" className="text-blue-600 hover:underline">→ カード一覧</Link>
          <Link href="/compare" className="text-blue-600 hover:underline">→ カード比較</Link>
          <Link href="/finder" className="text-blue-600 hover:underline">→ 条件で探す</Link>
          <Link href="/top-picks" className="text-blue-600 hover:underline">→ ランキング</Link>
        </div>
      </div>
    </div>
  );
}
