import type { Metadata } from "next";
import Link from "next/link";
import { cards, getPriorityCards } from "@/data/cards";
import { articles } from "@/data/articles";
import { topPicks } from "@/data/top-picks";
import ArticleCard from "@/components/articles/ArticleCard";
import { topPickLabels, topPickIcons } from "@/lib/utils";
import HeroCanvas from "@/components/hero/HeroCanvas";
import CardArtwork from "@/components/cards/CardArtwork";
import {
  LayoutGrid,
  GitCompare,
  SlidersHorizontal,
  BookOpen,
  ExternalLink,
  ChevronRight,
  Shield,
  Globe,
  TrendingUp,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "クリプトカード比較メディア | グローバル金融メディア CryptoCardNavi",
  description:
    "世界の主要クリプトカードを日本語で徹底比較。Tria・Kast・RedotPay・Tevau・Bitget Wallet Card・Jupiter Globalの手数料・還元率・対応地域を一覧で確認。",
};

const rankMedal: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: "bg-amber-400", text: "text-amber-900", label: "Gold" },
  2: { bg: "bg-slate-300", text: "text-slate-700", label: "Silver" },
  3: { bg: "bg-amber-600/80", text: "text-amber-100", label: "Bronze" },
};

export default function HomePage() {
  const priorityCards = getPriorityCards();
  const overallRanking = topPicks.find((tp) => tp.slug === "overall");
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 3);

  return (
    <>
      {/* ====================================================== */}
      {/* Hero */}
      {/* ====================================================== */}
      <section className="hero-section relative overflow-hidden text-white">
        {/* Background layers */}
        <div className="hero-bg absolute inset-0" />
        {/* Animated global network canvas */}
        <HeroCanvas />
        {/* Bottom fade to keep section edge clean */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/70" />
        {/* Subtle center vignette to improve text contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(2,6,20,0.35)_100%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-blue-200 mb-8">
            <Globe className="w-3.5 h-3.5" />
            <span>グローバル・クリプトカード比較メディア</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight mb-4">
            あなたに合う<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              クリプトカード
            </span>が見つかる
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-2 max-w-2xl mx-auto">
            出金・還元・対応地域までシンプルに整理
          </p>
          <p className="text-sm text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            最適な1枚を今すぐ見つける
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link
              href="/top-picks/overall"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-400/40 hover:-translate-y-0.5"
            >
              <TrendingUp className="w-4 h-4" />
              人気ランキングを見る
            </Link>
            <Link
              href="/cards"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-8 py-3.5 rounded-xl backdrop-blur-sm transition-all"
            >
              <LayoutGrid className="w-4 h-4" />
              全カードを比較する
            </Link>
          </div>

          {/* Quick nav */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: "/compare", icon: GitCompare, label: "カードを比較" },
              { href: "/finder", icon: SlidersHorizontal, label: "条件で絞る" },
              { href: "/guides", icon: BookOpen, label: "ガイドを読む" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 rounded-lg text-sm text-slate-300 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* Ranking */}
      {/* ====================================================== */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                人気ランキング
              </h2>
            </div>
            <Link
              href="/top-picks/overall"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium shrink-0"
            >
              ランキング詳細を見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Ranking note */}
          <p className="text-xs text-slate-500 mb-8 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 shrink-0" />
            当サイト内での注目度・掲載状況をもとに表示しています。
          </p>

          {/* Ranking list */}
          <div className="space-y-3">
            {overallRanking?.entries.map((entry) => {
              const card = cards.find((c) => c.slug === entry.cardSlug);
              if (!card) return null;
              const medal = rankMedal[entry.rank];

              return (
                <div
                  key={entry.rank}
                  className={`group bg-white rounded-2xl border transition-all hover:shadow-md ${
                    entry.rank <= 3
                      ? "border-slate-200 hover:border-blue-200"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4 p-5 sm:p-6">
                    {/* Left: rank + card image */}
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        medal ? `${medal.bg} ${medal.text}` : "bg-slate-100 text-slate-600"
                      }`}>
                        {entry.rank}
                      </div>
                      <CardArtwork
                        card={card}
                        className="w-24"
                        imageClassName="rounded-[14px]"
                        fallbackClassName="rounded-lg text-xl"
                        paddingClassName="p-3"
                      />
                    </div>

                    {/* Center: name + benefit */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-slate-900 text-base">{card.name}</span>
                        {card.isSponsor && (
                          <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">PR</span>
                        )}
                      </div>
                      {card.keyStrength && (
                        <span className="inline-flex items-center text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-medium mb-1.5">
                          {card.keyStrength}
                        </span>
                      )}
                      <p className="text-xs text-slate-500 line-clamp-2">{entry.reason}</p>
                    </div>

                    {/* Right: stats + CTA */}
                    <div className="hidden sm:flex flex-col items-end gap-3 flex-shrink-0">
                      <div className="flex gap-4 text-right">
                        <div>
                          <p className="text-xs text-slate-400">FX手数料</p>
                          <p className="text-sm font-bold text-slate-800 whitespace-nowrap">{card.fxFee.split("、")[0].split("（")[0]}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">還元率</p>
                          <p className="text-sm font-bold text-slate-800">{card.cashbackRate}</p>
                        </div>
                      </div>
                      <Link
                        href={`/cards/${card.slug}`}
                        className="flex items-center gap-1.5 px-5 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
                      >
                        詳細を見る <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Mobile only: stats + CTA row */}
                  <div className="sm:hidden px-5 pb-5 flex items-center justify-between border-t border-slate-50 pt-3">
                    <div className="flex gap-4">
                      <div>
                        <p className="text-xs text-slate-400">FX手数料</p>
                        <p className="text-xs font-bold text-slate-700">{card.fxFee.split("、")[0].split("（")[0]}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">還元率</p>
                        <p className="text-xs font-bold text-slate-700">{card.cashbackRate}</p>
                      </div>
                    </div>
                    <Link
                      href={`/cards/${card.slug}`}
                      className="text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg"
                    >
                      詳細 →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/top-picks/overall"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors text-sm"
            >
              すべてのランキングを見る
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* Card highlights — key specs */}
      {/* ====================================================== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">掲載カード一覧</h2>
            <Link href="/cards" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              全カードを見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {priorityCards.map((card) => (
              <div
                key={card.id}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all"
              >
                {/* Card header */}
                <div className={`h-28 bg-gradient-to-br ${card.coverColor} flex items-center justify-between px-5 relative`}>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                      {card.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight">{card.name}</h3>
                      <p className="text-white/70 text-xs mt-0.5">{card.network}</p>
                    </div>
                  </div>
                  {card.keyStrength && (
                    <span className="absolute top-3 right-3 text-xs bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {card.keyStrength}
                    </span>
                  )}
                </div>

                {/* Key specs */}
                <div className="p-4">
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {card.shortDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { label: "FX手数料", value: card.fxFee.split("、")[0].split("（")[0] },
                      { label: "還元率", value: card.cashbackRate },
                      { label: "日本対応", value: card.regionAvailability.includes("global") || card.regionAvailability.includes("asia") ? "申込可能性あり" : "要確認" },
                      { label: "カストディ", value: card.custodyType === "non-custodial" ? "非カストディ" : "カストディ型" },
                    ].map((spec) => (
                      <div key={spec.label} className="bg-slate-50 rounded-lg p-2.5">
                        <p className="text-xs text-slate-400 mb-0.5">{spec.label}</p>
                        <p className="text-xs font-semibold text-slate-800 truncate">{spec.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/cards/${card.slug}`}
                      className="flex-1 text-center text-sm font-medium text-slate-700 border border-slate-200 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      詳細を見る
                    </Link>
                    {card.referralUrl && (
                      <a
                        href={card.referralUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex-1 flex items-center justify-center gap-1.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition-colors"
                      >
                        公式サイト
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* Top picks overview */}
      {/* ====================================================== */}
      <section className="py-16 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">用途別ランキング</h2>
            <Link href="/top-picks" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              すべて見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {topPicks.map((tp) => {
              const topCard = cards.find((c) => c.slug === tp.entries[0]?.cardSlug);
              return (
                <Link
                  key={tp.slug}
                  href={`/top-picks/${tp.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-4 hover:border-blue-200 hover:shadow-sm transition-all"
                >
                  <div className="text-2xl mb-2">{topPickIcons[tp.category] ?? "📋"}</div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 text-sm leading-snug mb-2">
                    {topPickLabels[tp.category]}
                  </h3>
                  {topCard && (
                    <p className="text-xs text-slate-500 font-medium truncate">
                      1位：{topCard.name}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* Articles */}
      {/* ====================================================== */}
      {featuredArticles.length > 0 && (
        <section className="py-16 px-4 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">読まれている記事</h2>
              <Link href="/guides" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                記事一覧 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================== */}
      {/* Trust signals */}
      {/* ====================================================== */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">CryptoCardナビについて</h2>
          <p className="text-slate-400 text-sm mb-10">
            シンガポール法人が運営する、日本語話者向けクリプトカード比較メディアです。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: Shield,
                title: "情報の透明性",
                desc: "アフィリエイト収益が発生する場合があります。その旨は各ページに明示しています。",
              },
              {
                icon: TrendingUp,
                title: "定期的な情報更新",
                desc: "各カードの情報は定期的にレビューし、最新情報を反映するよう努めています。",
              },
              {
                icon: Globe,
                title: "日本語話者向け設計",
                desc: "グローバルなカードを日本語で比較できる唯一の専門メディアを目指しています。",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
            <Link href="/disclaimer" className="hover:text-slate-300 transition-colors">免責事項</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">プライバシーポリシー</Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">サイトについて</Link>
          </div>
        </div>
      </section>
    </>
  );
}
