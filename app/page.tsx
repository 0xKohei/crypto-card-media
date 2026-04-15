import type { Metadata } from "next";
import Link from "next/link";
import { cards } from "@/data/cards";
import { articles } from "@/data/articles";
import { topPicks } from "@/data/top-picks";
import { CardGridItem } from "@/components/cards/CardGrid";
import ArticleCard from "@/components/articles/ArticleCard";
import { topPickLabels, topPickIcons } from "@/lib/utils";
import {
  LayoutGrid,
  GitCompare,
  SlidersHorizontal,
  BookOpen,
  Zap,
  Globe,
  DollarSign,
  RefreshCcw,
  Leaf,
  Wallet,
  ArrowRight,
  TrendingUp,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "クリプトカード比較・資金移動手段を日本向けに徹底解説",
  description:
    "日本人向けクリプトカード比較メディア。Tria・GoMining・SwissBorgなど10枚以上を手数料・還元率・KYC・地域で比較。初心者ガイドから出金性重視の上級者向け解説まで。",
};

const entryPoints = [
  {
    icon: LayoutGrid,
    label: "一覧で探す",
    description: "全カードをスペック表で一覧比較",
    href: "/cards",
    color: "bg-blue-50 text-blue-600",
    border: "hover:border-blue-300",
  },
  {
    icon: GitCompare,
    label: "比較する",
    description: "2〜4枚を並べて項目ごとに比較",
    href: "/compare",
    color: "bg-violet-50 text-violet-600",
    border: "hover:border-violet-300",
  },
  {
    icon: SlidersHorizontal,
    label: "条件で絞り込む",
    description: "地域・KYC・還元率などで検索",
    href: "/finder",
    color: "bg-emerald-50 text-emerald-600",
    border: "hover:border-emerald-300",
  },
  {
    icon: BookOpen,
    label: "記事から学ぶ",
    description: "初心者ガイド・選び方・解説記事",
    href: "/guides",
    color: "bg-amber-50 text-amber-600",
    border: "hover:border-amber-300",
  },
];

const useCaseLinks = [
  { icon: DollarSign, label: "高還元重視", href: "/top-picks/high-cashback", color: "text-amber-600 bg-amber-50" },
  { icon: Globe, label: "海外利用向け", href: "/top-picks/overseas", color: "text-blue-600 bg-blue-50" },
  { icon: Wallet, label: "USDT活用向け", href: "/top-picks/usdt", color: "text-emerald-600 bg-emerald-50" },
  { icon: RefreshCcw, label: "出金性重視", href: "/top-picks/withdrawal", color: "text-violet-600 bg-violet-50" },
  { icon: Leaf, label: "初心者向け", href: "/top-picks/beginner", color: "text-green-600 bg-green-50" },
  { icon: Zap, label: "DeFiユーザー", href: "/top-picks/defi", color: "text-indigo-600 bg-indigo-50" },
];

export default function HomePage() {
  const featuredCards = cards.filter((c) => c.isFeatured || c.isEditorsPick);
  const editorsPick = cards.find((c) => c.isEditorsPick);
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 3);
  const overallRanking = topPicks.find((tp) => tp.slug === "overall");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-blue-300 text-sm mb-6">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>日本人向け・クリプトカード比較メディア</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            あなたに合った<br />
            <span className="text-blue-400">クリプトカード</span>を見つける
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            手数料・還元率・KYC要件・対応地域を中立的に比較。<br className="hidden sm:block" />
            日常決済・USDT活用・出金性重視など、用途で選べるランキングも。
          </p>

          {/* 4 entry points */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {entryPoints.map((ep) => {
              const Icon = ep.icon;
              return (
                <Link
                  key={ep.href}
                  href={ep.href}
                  className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all text-left group`}
                >
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="font-semibold text-white text-sm mb-0.5">{ep.label}</p>
                  <p className="text-xs text-slate-400 leading-snug">{ep.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use case links */}
      <section className="bg-gray-50 border-b border-gray-200 py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-sm text-gray-500 font-medium shrink-0">用途で探す：</span>
            {useCaseLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 ${link.color} hover:opacity-80 transition-opacity`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Editor's Pick — Tria spotlight */}
        {editorsPick && (
          <section className="py-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-lg">★</span>
                <h2 className="text-xl font-bold text-gray-900">編集部イチオシ</h2>
              </div>
              <Link href="/top-picks/overall" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                総合ランキングを見る <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <Link
              href={`/cards/${editorsPick.slug}`}
              className="group block bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white hover:shadow-xl transition-all"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                    {editorsPick.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                        編集部イチオシ
                      </span>
                      <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">PR</span>
                    </div>
                    <h3 className="text-2xl font-bold">{editorsPick.name}</h3>
                    <p className="text-violet-200 text-sm">総合スコア {editorsPick.scores.overall} / 10</p>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-white/90 leading-relaxed mb-4 text-sm">
                    {editorsPick.shortDescription}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "対応国", value: "150カ国以上" },
                      { label: "対応トークン", value: "1,000以上" },
                      { label: "Apple Pay", value: "対応" },
                      { label: "カストディ", value: "非カストディ型" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/10 rounded-xl p-3">
                        <p className="text-xs text-violet-300 mb-0.5">{stat.label}</p>
                        <p className="font-semibold text-sm">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0">
                  <div className="bg-white text-violet-700 font-bold px-5 py-2.5 rounded-xl text-sm group-hover:bg-violet-50 transition-colors">
                    詳細を見る →
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Featured cards */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">注目のクリプトカード</h2>
            <Link href="/cards" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              全件を見る <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredCards.slice(0, 6).map((card) => (
              <CardGridItem key={card.id} card={card} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/cards"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
              全カードを一覧で見る
            </Link>
          </div>
        </section>

        {/* Top Picks overview */}
        <section className="py-12 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">用途別ランキング</h2>
            <Link href="/top-picks" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              全ランキングを見る <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topPicks.map((tp) => (
              <Link
                key={tp.slug}
                href={`/top-picks/${tp.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="text-2xl mb-2">{topPickIcons[tp.category] ?? "📋"}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 text-sm leading-snug mb-1">
                  {topPickLabels[tp.category]}
                </h3>
                <p className="text-xs text-gray-500">
                  {tp.entries.length}件のカード
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
                  <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span className="truncate text-gray-600 font-medium">
                    {tp.entries[0] ? tp.entries[0].cardSlug.replace(/-card$/, "").replace(/-/g, " ") : "-"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Comparison quick access */}
        <section className="py-12 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">人気の比較ページ</h2>
            <Link href="/compare" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              比較ページ一覧 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { slug: "tria-vs-gomining", label: "Tria vs GoMining", desc: "総合1位 vs 高還元王者を比較" },
              { slug: "tria-vs-pexx", label: "Tria vs PEXX", desc: "グローバル対応 vs USDT特化を比較" },
              { slug: "tria-vs-swissborg", label: "Tria vs SwissBorg", desc: "非カストディ型同士を比較" },
              { slug: "gomining-vs-swissborg", label: "GoMining vs SwissBorg", desc: "高還元カード2強を比較" },
              { slug: "zeal-vs-picnic", label: "Zeal vs Picnic", desc: "低コスト設計の2枚を比較" },
              { slug: "tria-3way", label: "Tria / GoMining / PEXX", desc: "3枚まとめて比較する" },
            ].map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <GitCompare className="w-4 h-4 text-violet-500" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 text-sm">
                    {comp.label}
                  </h3>
                </div>
                <p className="text-xs text-gray-500">{comp.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-900 text-slate-900 rounded-xl font-medium hover:bg-slate-900 hover:text-white transition-colors text-sm"
            >
              <GitCompare className="w-4 h-4" />
              自分でカードを選んで比較する
            </Link>
          </div>
        </section>

        {/* Articles */}
        <section className="py-12 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">読まれている記事</h2>
            <Link href="/guides" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              記事一覧 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Trust signals */}
        <section className="py-12 border-t border-gray-100">
          <div className="bg-slate-50 rounded-2xl p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">CryptoCardナビについて</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "中立的な情報整理",
                  desc: "特定サービスに偏らず、客観的な比較基準に基づいて情報を整理・掲載しています。",
                },
                {
                  icon: TrendingUp,
                  title: "定期的な情報更新",
                  desc: "各カードの情報は定期的にレビューし、最新の状況を反映するよう努めています。",
                },
                {
                  icon: Globe,
                  title: "日本人向けに設計",
                  desc: "シンガポール法人による運営ですが、コンテンツは完全に日本人ユーザー向けに設計しています。",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-6">
              <Link href="/about" className="text-sm text-blue-600 hover:underline">
                詳しくはこちら →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
