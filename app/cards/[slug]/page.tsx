import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cards, getCardBySlug } from "@/data/cards";
import { getRelatedArticlesForCard } from "@/data/articles";
import { getComparisonsForCard } from "@/data/comparisons";
import { topPicks } from "@/data/top-picks";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScoreBar from "@/components/common/ScoreBar";
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
  scoreToBgColor,
} from "@/lib/utils";
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  GitCompare,
  Trophy,
  BookOpen,
  AlertCircle,
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
    title: `${card.name}の評判・手数料・特徴を解説`,
    description: `${card.name}の総合スコア${card.scores.overall}/10。${card.shortDescription}FX手数料：${card.fxFee}、還元率：${card.cashbackRate}。詳細な比較情報をまとめました。`,
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
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: card.scores.overall,
              bestRating: 10,
              worstRating: 0,
              reviewCount: 1,
            },
          }),
        }}
      />

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Card header */}
          <div className={`bg-gradient-to-br ${card.coverColor} rounded-2xl p-8 text-white mb-8`}>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                {card.logo}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {card.isEditorsPick && (
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">
                      ★ 編集部イチオシ
                    </span>
                  )}
                  {card.isSponsor && (
                    <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">PR</span>
                  )}
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                    {card.network}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-1">{card.name}</h1>
                <p className="text-white/80 text-sm">{card.issuer} · {card.issuerType}</p>
              </div>
              <div className="text-center bg-white/20 rounded-xl p-3">
                <div className="text-3xl font-bold">{card.scores.overall}</div>
                <div className="text-xs text-white/70">/ 10</div>
                <div className="text-xs text-white/80 mt-0.5">総合スコア</div>
              </div>
            </div>

            <p className="mt-4 text-white/90 text-sm leading-relaxed">
              {card.shortDescription}
            </p>
          </div>

          {/* Alert: Mock data notice */}
          <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              掲載情報は{formatDate(card.lastReviewed)}時点の参考情報です。手数料・対応地域・条件は変更される場合があります。必ず公式サイトで最新情報をご確認ください。
            </p>
          </div>

          {/* Long description */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{card.name}とは</h2>
            <p className="text-gray-700 leading-relaxed">{card.longDescription}</p>
          </section>

          {/* Score breakdown */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">スコア詳細</h2>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
              {[
                { label: "総合評価", score: card.scores.overall },
                { label: "初心者向き", score: card.scores.beginnerFriendly },
                { label: "日本適性", score: card.scores.japanCompatibility },
                { label: "還元率", score: card.scores.cashback },
                { label: "手数料の低さ", score: card.scores.fees },
                { label: "入手しやすさ", score: card.scores.accessibility },
                { label: "USDT活用度", score: card.scores.usdtUsability },
                { label: "出金性", score: card.scores.withdrawal },
                { label: "セキュリティ", score: card.scores.security },
              ].map((item) => (
                <ScoreBar key={item.label} label={item.label} score={item.score} />
              ))}
            </div>
          </section>

          {/* Pros / Cons */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">長所・短所</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  長所
                </h3>
                <ul className="space-y-2">
                  {card.pros.map((pro) => (
                    <li key={pro} className="text-sm text-emerald-700 flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  短所
                </h3>
                <ul className="space-y-2">
                  {card.cons.map((con) => (
                    <li key={con} className="text-sm text-red-700 flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Spec table */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">スペック詳細</h2>
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "発行会社", value: card.issuer },
                    { label: "ネットワーク", value: card.network },
                    { label: "カードタイプ", value: card.cardType },
                    { label: "カストディ", value: custodyLabels[card.custodyType] },
                    { label: "KYC要件", value: kycLabels[card.kycLevel] },
                    { label: "物理カード", value: card.physicalCard ? "あり" : "なし" },
                    { label: "バーチャルカード", value: card.virtualCard ? "あり" : "なし" },
                    { label: "Apple Pay", value: card.applePay ? "対応" : "非対応" },
                    { label: "Google Pay", value: card.googlePay ? "対応" : "非対応" },
                    { label: "FX手数料", value: card.fxFee },
                    { label: "発行手数料", value: card.issuanceFee },
                    { label: "月額手数料", value: card.monthlyFee },
                    { label: "ATM手数料", value: card.atmFee },
                    { label: "還元率", value: card.cashbackRate },
                    { label: "利用上限", value: card.spendingLimit },
                    { label: "チャージ方法", value: card.topupMethods.join("、") },
                    { label: "対応資産", value: card.supportedAssets.join("、") },
                    { label: "対応チェーン", value: card.supportedChains.join("、") },
                    { label: "ステーブルコイン対応", value: card.stablecoinSupport ? "対応" : "非対応" },
                    { label: "対応地域", value: card.regionAvailability.map((r) => regionLabels[r]).join("、") },
                  ].map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-2.5 px-4 font-medium text-gray-600 w-36 border-b border-gray-100">
                        {row.label}
                      </td>
                      <td className="py-2.5 px-4 text-gray-900 border-b border-gray-100">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Best for */}
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
          {card.faq.length > 0 && <FAQ items={card.faq} title={`${card.name}に関するよくある質問`} />}
        </div>

        {/* Sidebar */}
        <div className="mt-8 lg:mt-0 space-y-6">
          {/* CTA */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 sticky top-24">
            <div className={`h-16 bg-gradient-to-br ${card.coverColor} rounded-xl flex items-center justify-center text-3xl mb-4`}>
              {card.logo}
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{card.name}</h3>
            <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold mb-4 ${scoreToBgColor(card.scores.overall)}`}>
              総合スコア {card.scores.overall} / 10
            </div>

            {card.referralUrl && (
              <a
                href={card.referralUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors mb-3"
              >
                公式サイトを見る
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <a
              href={card.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              公式情報を確認する
            </a>

            <p className="text-xs text-gray-400 mt-3 text-center leading-relaxed">
              ※ 一部リンクにアフィリエイトが含まれます
            </p>
          </div>

          {/* Related comparisons */}
          {relatedComparisons.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
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
              <Link
                href="/compare"
                className="mt-3 block text-xs text-center text-gray-500 hover:text-blue-600"
              >
                自分でカードを選んで比較する →
              </Link>
            </div>
          )}

          {/* Related top picks */}
          {relatedTopPicksList.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
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
                      className="flex items-center justify-between text-sm hover:bg-gray-50 rounded-lg p-2 -mx-2"
                    >
                      <span className="text-gray-700">
                        {topPickIcons[tp.category]} {topPickLabels[tp.category]}
                      </span>
                      {entry && (
                        <span className="font-bold text-amber-600">
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
            <h3 className="font-bold text-gray-900 mb-3">タグ</h3>
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
            .slice(0, 6)
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
