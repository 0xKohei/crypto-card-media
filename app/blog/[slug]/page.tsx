import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/data/articles";
import { cards } from "@/data/cards";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ArticleCard from "@/components/articles/ArticleCard";
import { CardGridItem } from "@/components/cards/CardGrid";
import { categoryLabels, formatDate } from "@/lib/utils";
import { Clock, RefreshCw } from "lucide-react";
import Link from "next/link";

const blogCategories = [
  "payment-infra",
  "stablecoin",
  "kyc-security",
  "fund-transfer",
  "overseas-usage",
  "ecosystem",
];

export async function generateStaticParams() {
  return articles
    .filter((a) => blogCategories.includes(a.category))
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article || !blogCategories.includes(article.category)) notFound();

  const relatedCards = cards.filter((c) => article.relatedCardSlugs.includes(c.slug));
  const relatedArticles = articles.filter(
    (a) => article.relatedArticleSlugs.includes(a.slug) && a.slug !== article.slug
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "ブログ", href: "/blog" },
          { label: article.title },
        ]}
      />

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        <article className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {categoryLabels[article.category]}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTime}分
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-gray-500 mb-8">
            <span>{article.author}</span>
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3 h-3" />
              更新：{formatDate(article.updatedAt)}
            </span>
          </div>

          <div className="text-gray-700 leading-relaxed space-y-4">
            {article.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">{block.replace("## ", "")}</h2>;
              }
              if (block.startsWith("### ")) {
                return <h3 key={i} className="text-lg font-semibold text-gray-900 mt-6 mb-2">{block.replace("### ", "")}</h3>;
              }
              return block ? <p key={i} className="text-sm leading-relaxed">{block.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")}</p> : null;
            })}
          </div>
        </article>

        <aside className="mt-10 lg:mt-0 space-y-6">
          {relatedCards.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-4">関連カード</h3>
              <div className="space-y-4">
                {relatedCards.map((card) => (
                  <CardGridItem key={card.id} card={card} />
                ))}
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">関連ページ</h3>
            <div className="space-y-2 text-sm">
              <Link href="/finder" className="block text-blue-600 hover:underline">→ 条件でカードを探す</Link>
              <Link href="/top-picks/usdt" className="block text-blue-600 hover:underline">→ USDT活用ランキング</Link>
              <Link href="/top-picks/withdrawal" className="block text-blue-600 hover:underline">→ 出金性ランキング</Link>
            </div>
          </div>
        </aside>
      </div>

      {relatedArticles.length > 0 && (
        <section className="mt-12 border-t border-gray-100 pt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">次に読む記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedArticles.slice(0, 3).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
