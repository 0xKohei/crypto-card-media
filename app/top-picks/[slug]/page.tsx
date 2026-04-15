import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { topPicks, getTopPickBySlug } from "@/data/top-picks";
import { cards } from "@/data/cards";
import { articles } from "@/data/articles";
import { comparisons } from "@/data/comparisons";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScoreBar from "@/components/common/ScoreBar";
import { topPickLabels, topPickIcons } from "@/lib/utils";
import {
  Trophy,
  CheckCircle,
  ExternalLink,
  GitCompare,
  BookOpen,
  AlertCircle,
} from "lucide-react";

export async function generateStaticParams() {
  return topPicks.map((tp) => ({ slug: tp.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tp = getTopPickBySlug(params.slug);
  if (!tp) return {};
  return {
    title: tp.title,
    description: tp.description,
  };
}

export default function TopPickDetailPage({ params }: { params: { slug: string } }) {
  const tp = getTopPickBySlug(params.slug);
  if (!tp) notFound();

  const relatedArticles = articles.filter((a) => tp.relatedArticleSlugs.includes(a.slug));
  const relatedComparisons = comparisons.filter((c) => tp.relatedComparisonSlugs.includes(c.slug));

  // JSON-LD for ItemList
  const itemListElements = tp.entries.map((entry) => {
    const card = cards.find((c) => c.slug === entry.cardSlug);
    return {
      "@type": "ListItem",
      position: entry.rank,
      name: card?.name ?? entry.cardSlug,
      url: `https://cryptocardnavi.com/cards/${entry.cardSlug}`,
    };
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "ランキング", href: "/top-picks" },
          { label: topPickLabels[tp.category] ?? tp.title },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: tp.title,
            description: tp.description,
            numberOfItems: tp.entries.length,
            itemListElement: itemListElements,
          }),
        }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="text-4xl mb-4">{topPickIcons[tp.category] ?? "📋"}</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{tp.title}</h1>
        <p className="text-gray-600 leading-relaxed mb-4">{tp.description}</p>

        <div className="flex gap-2 items-start bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
          <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">選定基準</p>
            <p>{tp.selectionCriteria}</p>
            <p className="mt-1 text-xs text-blue-700">{tp.scoringMethod}</p>
          </div>
        </div>
      </div>

      {/* Ranking entries */}
      <div className="space-y-6 mb-12">
        {tp.entries.map((entry) => {
          const card = cards.find((c) => c.slug === entry.cardSlug);
          if (!card) return null;

          return (
            <div
              key={entry.rank}
              className={`bg-white border-2 rounded-2xl overflow-hidden transition-all ${
                entry.rank === 1
                  ? "border-amber-300 shadow-md shadow-amber-100"
                  : "border-gray-200"
              }`}
            >
              {/* Rank badge */}
              <div className={`px-5 py-3 flex items-center gap-4 ${
                entry.rank === 1 ? "bg-amber-50" : "bg-gray-50"
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 ${
                  entry.rank === 1 ? "bg-amber-400 text-amber-900"
                  : entry.rank === 2 ? "bg-gray-300 text-gray-700"
                  : entry.rank === 3 ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-gray-600"
                }`}>
                  {entry.rank}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-gray-900">{card.name}</span>
                    {entry.rank === 1 && (
                      <span className="flex items-center gap-1 text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-medium">
                        <Trophy className="w-3 h-3" />
                        1位
                      </span>
                    )}
                    {card.isEditorsPick && (
                      <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full font-medium">
                        ★ 編集部イチオシ
                      </span>
                    )}
                    {card.isSponsor && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">PR</span>
                    )}
                  </div>
                  {entry.highlightScore !== undefined && entry.highlightLabel && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {entry.highlightLabel}：<span className="font-semibold text-gray-700">{entry.highlightScore}</span> / 10
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5">
                <div className="flex gap-5">
                  {/* Card visual */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.coverColor} rounded-xl flex items-center justify-center text-3xl flex-shrink-0`}>
                    {card.logo}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      <span className="font-semibold text-gray-900">選ばれた理由：</span>
                      {entry.reason}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {[
                        { label: "FX手数料", value: card.fxFee },
                        { label: "還元率", value: card.cashbackRate },
                        { label: "Apple Pay", value: card.applePay ? "対応" : "非対応" },
                        { label: "総合スコア", value: `${card.scores.overall}/10` },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-gray-50 rounded-lg p-2">
                          <p className="text-xs text-gray-500">{stat.label}</p>
                          <p className="text-xs font-semibold text-gray-900 truncate">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Score bar for the highlight category */}
                    <div className="mb-3">
                      <ScoreBar label="総合スコア" score={card.scores.overall} size="sm" />
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                      <Link
                        href={`/cards/${card.slug}`}
                        className="text-sm text-blue-600 hover:underline font-medium"
                      >
                        詳細を見る →
                      </Link>
                      {card.referralUrl && (
                        <a
                          href={card.referralUrl}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          公式サイト
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pros */}
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">主な長所</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {card.pros.slice(0, 4).map((pro) => (
                      <div key={pro} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {pro}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Related comparisons */}
      {relatedComparisons.length > 0 && (
        <section className="mb-10 border-t border-gray-100 pt-8">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-violet-500" />
            このランキングのカードを比較する
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedComparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="block text-sm text-blue-600 hover:underline bg-violet-50 rounded-xl px-4 py-3 border border-violet-100 hover:border-violet-300 transition-colors"
              >
                → {comp.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="mb-10 border-t border-gray-100 pt-8">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            関連記事・ガイド
          </h2>
          <div className="space-y-2">
            {relatedArticles.map((article) => (
              <Link
                key={article.id}
                href={`/guides/${article.slug}`}
                className="block text-sm text-blue-600 hover:underline"
              >
                → {article.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Other rankings */}
      <section className="border-t border-gray-100 pt-8">
        <h2 className="font-bold text-gray-900 mb-4">他のランキングを見る</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {topPicks
            .filter((other) => other.slug !== tp.slug)
            .slice(0, 4)
            .map((other) => (
              <Link
                key={other.slug}
                href={`/top-picks/${other.slug}`}
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="text-2xl mb-1">{topPickIcons[other.category]}</div>
                <p className="text-xs font-medium text-gray-700 leading-snug">
                  {topPickLabels[other.category]}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
