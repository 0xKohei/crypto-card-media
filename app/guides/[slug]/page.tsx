import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, getArticleBySlug } from "@/data/articles";
import { cards } from "@/data/cards";
import { comparisons } from "@/data/comparisons";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ArticleCard from "@/components/articles/ArticleCard";
import { CardGridItem } from "@/components/cards/CardGrid";
import { categoryLabels, formatDate } from "@/lib/utils";
import { Clock, RefreshCw, AlertCircle } from "lucide-react";

const guideCategories = ["beginner-guide", "comparison", "review", "opinion"];

export async function generateStaticParams() {
  return articles
    .filter((a) => guideCategories.includes(a.category))
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article || !guideCategories.includes(article.category)) notFound();

  const relatedCards = cards.filter((c) => article.relatedCardSlugs.includes(c.slug));
  const relatedArticles = articles.filter(
    (a) => article.relatedArticleSlugs.includes(a.slug) && a.slug !== article.slug
  );
  const relatedComps = comparisons.filter((c) =>
    article.relatedComparisonSlugs.includes(c.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "ガイド", href: "/guides" },
          { label: article.title },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: { "@type": "Organization", name: article.author },
          }),
        }}
      />

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        {/* Article */}
        <article className="lg:col-span-2">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {categoryLabels[article.category]}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readingTime}分で読める
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>{article.author}</span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                更新：{formatDate(article.updatedAt)}
              </span>
            </div>
          </header>

          <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 text-sm text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            掲載情報は参考情報です。最新の情報は各公式サイトをご確認ください。
          </div>

          {/* Content rendered as simple paragraphs (simplified for demo) */}
          <div className="prose prose-gray max-w-none">
            {article.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-4">
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              if (block.startsWith("| ")) {
                return (
                  <div key={i} className="overflow-x-auto my-4">
                    <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                      <tbody>
                        {block.split("\n").filter((r) => !r.startsWith("|---")).map((row, j) => {
                          const cells = row.split("|").filter((c) => c.trim() !== "");
                          return j === 0 ? (
                            <tr key={j} className="bg-gray-50">
                              {cells.map((cell, k) => (
                                <th key={k} className="py-2 px-3 text-left text-xs font-semibold text-gray-700 border-b border-gray-200">
                                  {cell.trim()}
                                </th>
                              ))}
                            </tr>
                          ) : (
                            <tr key={j} className="border-b border-gray-100">
                              {cells.map((cell, k) => (
                                <td key={k} className="py-2 px-3 text-xs text-gray-700">
                                  {cell.trim().replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }
              if (block.startsWith("→ ")) {
                const linkMatch = block.match(/\[([^\]]+)\]\(([^)]+)\)/);
                if (linkMatch) {
                  return (
                    <div key={i} className="my-4">
                      <Link href={linkMatch[2]} className="text-blue-600 hover:underline text-sm font-medium">
                        → {linkMatch[1]}
                      </Link>
                    </div>
                  );
                }
              }
              if (block.startsWith("1. ") || block.startsWith("- ")) {
                return (
                  <ul key={i} className="my-4 space-y-1 list-disc list-inside text-sm text-gray-700">
                    {block.split("\n").map((line, j) => (
                      <li key={j} className="leading-relaxed">
                        {line.replace(/^[0-9]+\. /, "").replace(/^- /, "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              return block ? (
                <p key={i} className="text-gray-700 leading-relaxed my-4 text-sm">
                  {block}
                </p>
              ) : null;
            })}
          </div>

          {/* Related comparisons */}
          {relatedComps.length > 0 && (
            <div className="mt-8 bg-violet-50 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-3">関連する比較ページ</h3>
              <div className="space-y-2">
                {relatedComps.map((comp) => (
                  <Link key={comp.slug} href={`/compare/${comp.slug}`} className="block text-sm text-blue-600 hover:underline">
                    → {comp.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="mt-10 lg:mt-0 space-y-6">
          {/* Related cards */}
          {relatedCards.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-4">この記事で紹介しているカード</h3>
              <div className="space-y-4">
                {relatedCards.map((card) => (
                  <CardGridItem key={card.id} card={card} />
                ))}
              </div>
            </div>
          )}

          {/* Quick links */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">カードを探す</h3>
            <div className="space-y-2 text-sm">
              <Link href="/finder" className="block text-blue-600 hover:underline">→ 条件で絞り込む</Link>
              <Link href="/compare" className="block text-blue-600 hover:underline">→ カードを比較する</Link>
              <Link href="/top-picks/overall" className="block text-blue-600 hover:underline">→ 総合ランキング</Link>
              <Link href="/top-picks/japan-users" className="block text-blue-600 hover:underline">→ 日本ユーザー向けランキング</Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-12 border-t border-gray-100 pt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">次に読むべき記事</h2>
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
