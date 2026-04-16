import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cards, getCardBySlug } from "@/data/cards";
import { comparisons, getComparisonBySlug } from "@/data/comparisons";
import { articles } from "@/data/articles";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Badge from "@/components/common/Badge";
import {
  regionLabels,
  kycLabels,
  custodyLabels,
  formatDate,
} from "@/lib/utils";
import { CheckCircle, XCircle, ExternalLink, AlertCircle } from "lucide-react";
import type { Card } from "@/types";

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const comp = getComparisonBySlug(params.slug);
  if (!comp) return {};
  return {
    title: comp.title,
    description: comp.description,
  };
}

function CompareCell({ value, highlight }: { value: string | boolean | React.ReactNode; highlight?: boolean }) {
  if (typeof value === "boolean") {
    return (
      <td className="py-3 px-4 text-center border-b border-gray-100">
        {value ? (
          <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" />
        ) : (
          <XCircle className="w-4 h-4 text-gray-300 mx-auto" />
        )}
      </td>
    );
  }
  return (
    <td className={`py-3 px-4 text-center text-sm border-b border-gray-100 ${highlight ? "font-semibold text-blue-700" : "text-gray-700"}`}>
      {value}
    </td>
  );
}

function ScoreCell({ score }: { score: number }) {
  const color =
    score >= 9 ? "text-emerald-600 bg-emerald-50"
      : score >= 8 ? "text-blue-600 bg-blue-50"
      : score >= 7 ? "text-amber-600 bg-amber-50"
      : "text-gray-600 bg-gray-50";

  return (
    <td className="py-3 px-4 text-center border-b border-gray-100">
      <span className={`inline-flex items-center justify-center w-10 h-8 rounded-lg text-sm font-bold ${color}`}>
        {score}
      </span>
    </td>
  );
}

export default function CompareDetailPage({ params }: { params: { slug: string } }) {
  const comp = getComparisonBySlug(params.slug);

  // Fallback: try to parse slug as "cardA-vs-cardB"
  let compCards: Card[] = [];

  if (comp) {
    compCards = comp.cardSlugs
      .map((s) => getCardBySlug(s))
      .filter(Boolean) as Card[];
  } else {
    // Dynamic parsing
    const parts = params.slug.split("-vs-");
    if (parts.length >= 2) {
      compCards = parts
        .map((p) => getCardBySlug(p))
        .filter(Boolean) as Card[];
    }
    if (compCards.length < 2) notFound();
  }

  const relatedArticles = comp
    ? articles.filter((a) => comp.relatedArticleSlugs.includes(a.slug))
    : [];

  const title = comp
    ? comp.title
    : `${compCards.map((c) => c.name).join(" vs ")} 比較`;

  // スコア比較は廃止。スペック比較のみ。

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "カード比較", href: "/compare" },
          { label: title },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{title}</h1>
        {comp && <p className="text-gray-600">{comp.description}</p>}
      </div>

      <div className="flex gap-2 items-center bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 text-sm text-amber-800">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        掲載情報は参考値です。最新の手数料・条件は各公式サイトをご確認ください。
      </div>

      {/* Card headers */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-2xl overflow-hidden text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-4 px-4 text-left font-semibold text-gray-700 w-40">比較項目</th>
              {compCards.map((card) => (
                <th key={card.id} className="py-4 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 bg-gradient-to-br ${card.coverColor} rounded-xl flex items-center justify-center text-xl`}>
                      {card.logo}
                    </div>
                    <Link href={`/cards/${card.slug}`} className="font-bold text-gray-900 hover:text-blue-600 text-sm">
                      {card.name}
                    </Link>
                    {card.isEditorsPick && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium">
                        編集部イチオシ
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Details */}
            <tr className="bg-slate-50">
              <td className="py-2.5 px-4 text-xs font-bold text-slate-600 uppercase tracking-wide" colSpan={compCards.length + 1}>
                スペック比較
              </td>
            </tr>
            {[
              { label: "ネットワーク", fn: (c: Card) => c.network },
              { label: "カストディ", fn: (c: Card) => custodyLabels[c.custodyType] },
              { label: "KYC要件", fn: (c: Card) => kycLabels[c.kycLevel] },
              { label: "FX手数料", fn: (c: Card) => c.fxFee },
              { label: "発行手数料", fn: (c: Card) => c.issuanceFee },
              { label: "月額手数料", fn: (c: Card) => c.monthlyFee },
              { label: "ATM手数料", fn: (c: Card) => c.atmFee },
              { label: "還元率", fn: (c: Card) => c.cashbackRate },
              { label: "利用上限/日", fn: (c: Card) => c.spendingLimit },
              { label: "対応地域", fn: (c: Card) => c.regionAvailability.map((r) => regionLabels[r]).join("、") },
            ].map((row) => (
              <tr key={row.label} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium text-gray-600 border-b border-gray-100">{row.label}</td>
                {compCards.map((card) => (
                  <CompareCell key={card.id} value={row.fn(card)} />
                ))}
              </tr>
            ))}

            {/* Features */}
            <tr className="bg-slate-50">
              <td className="py-2.5 px-4 text-xs font-bold text-slate-600 uppercase tracking-wide" colSpan={compCards.length + 1}>
                機能比較
              </td>
            </tr>
            {[
              { label: "物理カード", fn: (c: Card) => c.physicalCard },
              { label: "バーチャルカード", fn: (c: Card) => c.virtualCard },
              { label: "Apple Pay", fn: (c: Card) => c.applePay },
              { label: "Google Pay", fn: (c: Card) => c.googlePay },
              { label: "ステーブルコイン対応", fn: (c: Card) => c.stablecoinSupport },
              { label: "紹介プログラム", fn: (c: Card) => c.referralProgram },
            ].map((row) => (
              <tr key={row.label} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium text-gray-600 border-b border-gray-100">{row.label}</td>
                {compCards.map((card) => (
                  <CompareCell key={card.id} value={row.fn(card) as boolean} />
                ))}
              </tr>
            ))}

            {/* CTA row */}
            <tr className="bg-white">
              <td className="py-4 px-4 text-sm font-medium text-gray-500">公式サイト</td>
              {compCards.map((card) => (
                <td key={card.id} className="py-4 px-4 text-center">
                  <a
                    href={card.referralUrl || card.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    公式サイト
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pros/Cons per card */}
      <div className="mt-10 grid gap-5" style={{ gridTemplateColumns: `repeat(${compCards.length}, 1fr)` }}>
        {compCards.map((card) => (
          <div key={card.id} className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${card.coverColor} rounded-xl flex items-center justify-center text-xl`}>
                {card.logo}
              </div>
              <h3 className="font-bold text-gray-900">{card.name}</h3>
            </div>
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-emerald-700 mb-2">長所</h4>
              <ul className="space-y-1">
                {card.pros.slice(0, 3).map((pro) => (
                  <li key={pro} className="text-xs text-gray-700 flex items-start gap-1.5">
                    <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-red-600 mb-2">短所</h4>
              <ul className="space-y-1">
                {card.cons.slice(0, 2).map((con) => (
                  <li key={con} className="text-xs text-gray-700 flex items-start gap-1.5">
                    <XCircle className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/cards/${card.slug}`}
              className="mt-4 block text-center text-xs text-blue-600 hover:underline"
            >
              {card.name}の詳細を見る →
            </Link>
          </div>
        ))}
      </div>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-12 border-t border-gray-100 pt-8">
          <h2 className="font-bold text-gray-900 mb-4">関連記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      {/* Other comparisons */}
      <section className="mt-8 border-t border-gray-100 pt-8">
        <h2 className="font-bold text-gray-900 mb-4">他の比較ページ</h2>
        <Link href="/compare" className="text-sm text-blue-600 hover:underline">
          比較ページ一覧を見る →
        </Link>
      </section>
    </div>
  );
}
