import type { Metadata } from "next";
import Link from "next/link";
import { comparisons } from "@/data/comparisons";
import { cards } from "@/data/cards";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CardArtwork from "@/components/cards/CardArtwork";
import { GitCompare, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "クリプトカード比較ページ一覧",
  description:
    "Tria・Kast・RedotPay・Tevau・Bitget Wallet Card・Jupiter Globalの掲載カード同士を比較。手数料・還元率・KYC・対応地域を項目別に確認できます。",
};

export default function ComparePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "カード比較" }]} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">クリプトカード比較</h1>
        <p className="text-gray-600 leading-relaxed">
          2〜4枚のカードを選んで、手数料・還元率・KYC・対応地域などを項目別に並べて比較できます。
        </p>
      </div>

      {/* Quick compare builder */}
      <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-6 mb-10">
        <h2 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-violet-600" />
          自分でカードを選んで比較する
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          URLに <code className="bg-white px-1 py-0.5 rounded text-xs border">/compare/カードA-vs-カードB</code> の形式でアクセスすると、任意のカードを比較できます。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cards.slice(0, 4).map((card) => (
            <Link
              key={card.slug}
              href={`/cards/${card.slug}`}
              className="bg-white border border-violet-200 rounded-xl p-3 text-center hover:border-violet-400 transition-colors"
            >
              <CardArtwork
                card={card}
                className="mb-2"
                imageClassName="rounded-[14px]"
                fallbackClassName="rounded-lg text-2xl"
                paddingClassName="p-3"
              />
              <p className="text-xs font-medium text-gray-900">{card.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Pre-built comparisons */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">人気の比較ページ</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {comparisons.map((comp) => {
          const compCards = comp.cardSlugs
            .map((slug) => cards.find((c) => c.slug === slug))
            .filter(Boolean);

          return (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
            >
              {/* Card logos */}
              <div className="flex items-center gap-2 mb-4">
                {compCards.map((card, i) => (
                  <div key={card!.id} className="flex items-center gap-2">
                    {i > 0 && <span className="text-gray-400 text-sm font-bold">vs</span>}
                    <CardArtwork
                      card={card!}
                      className="w-24"
                      imageClassName="rounded-[14px]"
                      fallbackClassName="rounded-xl text-xl"
                      paddingClassName="p-2.5"
                    />
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 text-sm leading-snug">
                {comp.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                {comp.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {comp.cardSlugs.length}枚を比較
                </span>
                <span className="text-xs font-medium text-blue-600 flex items-center gap-1">
                  比較する <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* All cards quick access */}
      <div className="mt-12 bg-gray-50 rounded-2xl p-6">
        <h2 className="font-bold text-gray-900 mb-4">比較したいカードから探す</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {cards.map((card) => (
            <Link
              key={card.slug}
              href={`/cards/${card.slug}`}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 hover:border-blue-300 hover:text-blue-600 transition-all text-sm"
            >
              <CardArtwork
                card={card}
                className="w-16 flex-shrink-0"
                imageClassName="rounded-[12px]"
                fallbackClassName="rounded-lg text-sm"
                paddingClassName="p-2"
              />
              <span className="truncate font-medium text-gray-900">{card.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
