import type { Metadata } from "next";
import Link from "next/link";
import { topPicks } from "@/data/top-picks";
import { cards } from "@/data/cards";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { topPickLabels, topPickIcons } from "@/lib/utils";
import { Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "クリプトカード用途別ランキング一覧",
  description:
    "総合おすすめ・高還元・日本ユーザー向け・海外利用・USDT活用・出金性重視など用途別のクリプトカードランキング。選定基準と根拠を明示した中立的なランキングです。",
};

export default function TopPicksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "ランキング" }]} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          クリプトカード 用途別ランキング
        </h1>
        <p className="text-gray-600 leading-relaxed">
          目的・用途に合わせてランキングを確認できます。各ランキングには選定基準・スコアリング方法・選ばれた理由を明示しています。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topPicks.map((tp) => {
          const topCard = cards.find((c) => c.slug === tp.entries[0]?.cardSlug);
          return (
            <Link
              key={tp.slug}
              href={`/top-picks/${tp.slug}`}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-md transition-all"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-slate-700 to-slate-900 p-5 text-white">
                <div className="text-3xl mb-2">{topPickIcons[tp.category] ?? "📋"}</div>
                <h2 className="font-bold text-lg group-hover:text-blue-200 transition-colors leading-tight">
                  {topPickLabels[tp.category]}
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  {tp.entries.length}件のカードを評価
                </p>
              </div>

              {/* Top 3 entries */}
              <div className="p-5">
                <div className="space-y-3">
                  {tp.entries.slice(0, 3).map((entry) => {
                    const card = cards.find((c) => c.slug === entry.cardSlug);
                    if (!card) return null;
                    return (
                      <div key={entry.rank} className="flex items-center gap-3">
                        <span className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                          entry.rank === 1 ? "bg-amber-400 text-amber-900"
                          : entry.rank === 2 ? "bg-slate-300 text-slate-700"
                          : "bg-amber-100 text-amber-700"
                        }`}>
                          {entry.rank}
                        </span>
                        <div className={`w-7 h-7 bg-gradient-to-br ${card.coverColor} rounded-lg flex items-center justify-center text-sm flex-shrink-0`}>
                          {card.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{card.name}</p>
                          {entry.highlightScore && entry.highlightLabel && (
                            <p className="text-xs text-gray-500">
                              {entry.highlightLabel}：{entry.highlightScore}
                            </p>
                          )}
                        </div>
                        {entry.rank === 1 && card.isEditorsPick && (
                          <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    更新：{tp.updatedAt}
                  </span>
                  <span className="text-xs font-medium text-blue-600 flex items-center gap-1">
                    ランキングを見る <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Criteria note */}
      <div className="mt-12 bg-gray-50 rounded-2xl p-6">
        <h2 className="font-bold text-gray-900 mb-3">ランキングの選定基準について</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          各ランキングは編集部が設定したスコアリング基準に基づいて作成されています。手数料・対応地域・KYC要件・還元率・セキュリティなど複数の項目を評価しており、特定のサービスを恣意的に優遇するものではありません。
          ただし、一部リンクにはアフィリエイト（紹介報酬）が含まれる場合があります。詳細は
          <Link href="/disclaimer" className="text-blue-600 hover:underline mx-1">免責事項</Link>
          をご覧ください。
        </p>
      </div>
    </div>
  );
}
