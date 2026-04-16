import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cards, getCardBySlug } from "@/data/cards";
import { getRelatedArticlesForCard } from "@/data/articles";
import { getComparisonsForCard } from "@/data/comparisons";
import { topPicks } from "@/data/top-picks";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Badge from "@/components/common/Badge";
import FAQ from "@/components/common/FAQ";
import ArticleCard from "@/components/articles/ArticleCard";
import {
  regionLabels,
  kycLabels,
  custodyLabels,
  topPickLabels,
  topPickIcons,
  formatDate,
} from "@/lib/utils";
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  GitCompare,
  Trophy,
  BookOpen,
  Info,
  Globe,
  Calendar,
} from "lucide-react";

export async function generateStaticParams() {
  return cards.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const card = getCardBySlug(params.slug);
  if (!card) return {};

  return {
    title: `${card.name} | 手数料・還元率・特徴を解説`,
    description: `${card.shortDescription} FX手数料：${card.fxFee.split("、")[0]}、還元率：${card.cashbackRate}。最新情報を解説。`,
  };
}

export default function CardDetailPage({ params }: { params: { slug: string } }) {
  const card = getCardBySlug(params.slug);
  if (!card) notFound();

  const relatedArticles = getRelatedArticlesForCard(card.slug);
  const relatedComparisons = getComparisonsForCard(card.slug);
  const relatedTopPicksList = topPicks.filter((tp) =>
    card.relatedTopPicks.includes(tp.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "カード一覧", href: "/cards" },
          { label: card.name },
        ]}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: card.name,
            description: card.shortDescription,
            url: card.officialUrl,
          }),
        }}
      />

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Card header */}
          <div className={`bg-gradient-to-br ${card.coverColor} rounded-2xl p-6 sm:p-8 text-white mb-6`}>
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Card image or logo */}
              {card.image ? (
                <div className="w-full sm:w-52 flex-shrink-0">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full rounded-xl shadow-lg object-cover"
                    style={{ aspectRatio: "420/265" }}
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                  {card.logo}
                </div>
              )}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {card.isSponsor && (
                    <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">PR</span>
                  )}
                  {card.keyStrength && (
                    <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full border border-white/30">
                      {card.keyStrength}
                    </span>
                  )}
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                    {card.network}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">{card.name}</h1>
                <p className="text-white/70 text-sm">{card.provider}</p>

                <p className="mt-3 text-white/90 text-sm leading-relaxed">
                  {card.shortDescription}
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              {[
                { label: "FX手数料", value: card.fxFee.split("、")[0].split("（")[0] },
                { label: "還元率", value: card.cashbackRate },
                { label: "Apple Pay", value: card.applePay ? "対応" : "非対応" },
                { label: "カストディ", value: card.custodyType === "non-custodial" ? "非カストディ" : "カストディ型" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 rounded-xl p-3">
                  <p className="text-xs text-white/60 mb-0.5">{stat.label}</p>
                  <p className="font-bold text-sm text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Info notice */}
          <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
            <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              掲載情報は{formatDate(card.lastReviewed)}時点の調査に基づきます。手数料・対応地域・条件は変更される場合があります。必ず公式サイトで最新情報をご確認ください。
            </p>
          </div>

          {/* Overview */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{card.name}とは</h2>
            <p className="text-gray-700 leading-relaxed">{card.longDescription}</p>
          </section>

          {/* Key specs table */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">スペック詳細</h2>
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "発行会社", value: card.issuer },
                    { label: "発行体", value: card.provider },
                    { label: "ネットワーク", value: card.network },
                    { label: "カードタイプ", value: card.cardType },
                    { label: "カストディ", value: custodyLabels[card.custodyType] },
                    { label: "KYC要件", value: kycLabels[card.kycLevel] },
                    { label: "物理カード", value: card.physicalCard ? "あり" : "なし" },
                    { label: "バーチャルカード", value: card.virtualCard ? "あり" : "なし" },
                    { label: "Apple Pay", value: card.applePay ? "対応" : "非対応" },
                    { label: "Google Pay", value: card.googlePay ? "対応" : "非対応" },
                    { label: "発行手数料", value: card.issuanceFee },
                    { label: "月額手数料", value: card.monthlyFee },
                    ...(card.annualFee ? [{ label: "年会費", value: card.annualFee }] : []),
                    { label: "FX手数料", value: card.fxFee },
                    { label: "ATM手数料", value: card.atmFee },
                    { label: "還元率", value: card.cashbackRate },
                    { label: "還元詳細", value: card.cashbackDetails },
                    { label: "利用上限", value: card.spendingLimit },
                    ...(card.atmWithdrawalLimit ? [{ label: "ATM上限", value: card.atmWithdrawalLimit }] : []),
                    { label: "チャージ方法", value: card.topupMethods.join("、") },
                    { label: "対応資産", value: card.supportedAssets.join("、") },
                    { label: "対応チェーン", value: card.supportedChains.join("、") },
                    { label: "対応地域", value: card.regionAvailability.map((r) => regionLabels[r] ?? r).join("、") },
                    { label: "ステーブルコイン", value: card.stablecoinSupport ? "対応" : "非対応" },
                  ].map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-2.5 px-4 font-medium text-gray-500 w-36 border-b border-gray-100 text-xs">
                        {row.label}
                      </td>
                      <td className="py-2.5 px-4 text-gray-900 border-b border-gray-100 text-sm">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pros / Cons */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">長所・短所</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  長所
                </h3>
                <ul className="space-y-2">
                  {card.pros.map((pro) => (
                    <li key={pro} className="text-sm text-emerald-700 flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5 shrink-0">•</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2 text-sm">
                  <XCircle className="w-4 h-4" />
                  短所・注意点
                </h3>
                <ul className="space-y-2">
                  {card.cons.map((con) => (
                    <li key={con} className="text-sm text-red-700 flex items-start gap-2">
                      <span className="text-red-400 mt-0.5 shrink-0">•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Use cases */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">こんな方に向いています</h2>
            <div className="space-y-2">
              {card.useCases.map((useCase) => (
                <div key={useCase} className="flex items-start gap-3 bg-blue-50 rounded-xl p-3">
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-blue-900">{useCase}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          {card.faq.length > 0 && (
            <FAQ items={card.faq} title={`${card.name}に関するよくある質問`} />
          )}

          {/* Last updated */}
          <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>最終更新：{formatDate(card.lastUpdated)}</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="mt-8 lg:mt-0 space-y-6">
          {/* Main CTA */}
          <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 sticky top-24">
            <div className={`h-16 bg-gradient-to-br ${card.coverColor} rounded-xl flex items-center justify-center text-3xl mb-4`}>
              {card.logo}
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{card.name}</h3>
            {card.keyStrength && (
              <p className="text-sm text-blue-600 font-medium mb-4">{card.keyStrength}</p>
            )}

            {card.referralUrl && (
              <a
                href={card.referralUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors mb-3 shadow-sm shadow-blue-200"
              >
                公式サイトで詳細を見る
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <a
              href={card.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-medium py-2.5 px-4 rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              <Globe className="w-3.5 h-3.5" />
              公式サイトを確認する
            </a>

            <p className="text-xs text-gray-400 mt-3 text-center leading-relaxed">
              ※ 一部リンクにアフィリエイトが含まれます
            </p>
          </div>

          {/* Related comparisons */}
          {relatedComparisons.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                <GitCompare className="w-4 h-4 text-violet-500" />
                比較ページ
              </h3>
              <div className="space-y-2">
                {relatedComparisons.map((comp) => (
                  <Link
                    key={comp.slug}
                    href={`/compare/${comp.slug}`}
                    className="block text-sm text-blue-600 hover:text-blue-800 hover:underline py-1"
                  >
                    {comp.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related top picks */}
          {relatedTopPicksList.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-amber-500" />
                掲載ランキング
              </h3>
              <div className="space-y-2">
                {relatedTopPicksList.map((tp) => {
                  const entry = tp.entries.find((e) => e.cardSlug === card.slug);
                  return (
                    <Link
                      key={tp.slug}
                      href={`/top-picks/${tp.slug}`}
                      className="flex items-center justify-between text-sm hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
                    >
                      <span className="text-gray-700">
                        {topPickIcons[tp.category]} {topPickLabels[tp.category]}
                      </span>
                      {entry && (
                        <span className="font-bold text-amber-600 text-xs">
                          {entry.rank}位
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">タグ</h3>
            <div className="flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <Badge key={tag} variant="blue">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-12 border-t border-gray-100 pt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            {card.name}に関連する記事
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Other cards */}
      <section className="mt-12 border-t border-gray-100 pt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">他のカードと比較する</h2>
        <div className="flex flex-wrap gap-3">
          {cards
            .filter((c) => c.slug !== card.slug)
            .map((otherCard) => (
              <Link
                key={otherCard.slug}
                href={`/compare/${card.slug}-vs-${otherCard.slug}`}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                <span>{otherCard.logo}</span>
                <span>{card.name} vs {otherCard.name}</span>
                <GitCompare className="w-3.5 h-3.5" />
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
