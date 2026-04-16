import Link from "next/link";
import type { Card } from "@/types";
import { CheckCircle, XCircle, Globe, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import CardArtwork from "@/components/cards/CardArtwork";

interface CardGridProps {
  cards: Card[];
  columns?: 2 | 3 | 4;
}

export default function CardGrid({ cards, columns = 3 }: CardGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-5", gridCols[columns])}>
      {cards.map((card) => (
        <CardGridItem key={card.id} card={card} />
      ))}
    </div>
  );
}

export function CardGridItem({ card }: { card: Card }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Card header */}
      {card.cardImage ?? card.image ? (
        <div className="relative p-3 pb-0">
          <CardArtwork
            card={card}
            className="rounded-[20px]"
            imageClassName="block"
            fallbackClassName="text-2xl"
            paddingClassName="p-4 sm:p-5"
          />
          <div className="absolute top-5 right-5 flex flex-col gap-1 items-end">
            {card.isSponsor && (
              <span className="bg-black/40 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">PR</span>
            )}
            {card.keyStrength && (
              <span className="bg-black/40 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/20">
                {card.keyStrength}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className={cn("h-24 bg-gradient-to-br flex items-center justify-between px-5 relative", card.coverColor)}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
              {card.logo}
            </div>
            <div>
              <h3 className="font-bold text-white leading-tight">{card.name}</h3>
              <p className="text-white/70 text-xs">{card.network}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            {card.isSponsor && (
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">PR</span>
            )}
            {card.keyStrength && (
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/20">
                {card.keyStrength}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Card body */}
      <div className="p-4 pt-3">
        {/* Card name (shown when using image, gradient header already has it) */}
        {(card.cardImage ?? card.image) && (
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-slate-900 leading-tight">{card.name}</h3>
              <p className="text-slate-400 text-xs">{card.network}</p>
            </div>
          </div>
        )}
        <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">
          {card.shortDescription}
        </p>

        {/* Key specs: 必須4項目 */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="text-xs text-gray-400 mb-0.5">FX手数料</p>
            <p className="text-xs font-semibold text-gray-900 truncate">
              {card.fxFee.split("、")[0].split("（")[0]}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="text-xs text-gray-400 mb-0.5">還元率</p>
            <p className="text-xs font-semibold text-gray-900 truncate">{card.cashbackRate}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="text-xs text-gray-400 mb-0.5">ATM利用</p>
            <p className="text-xs font-semibold text-gray-900 truncate">
              {card.physicalCard ? "利用可" : "バーチャルのみ"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5">
            <p className="text-xs text-gray-400 mb-0.5">日本対応</p>
            <p className="text-xs font-semibold text-gray-900 truncate">
              {card.regionAvailability.includes("global") || card.regionAvailability.includes("asia")
                ? "申込可能性あり"
                : "要確認"}
            </p>
          </div>
        </div>

        {/* Feature flags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <FeatureFlag enabled={card.applePay} label="Apple Pay" />
          <FeatureFlag enabled={card.virtualCard} label="バーチャル" />
          <FeatureFlag enabled={card.physicalCard} label="物理カード" />
          <FeatureFlag enabled={card.stablecoinSupport} label="USDT/USDC" />
        </div>

        {/* CTA buttons */}
        <div className="flex gap-2">
          <Link
            href={`/cards/${card.slug}`}
            className="flex-1 text-center text-sm font-medium text-gray-700 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition-colors"
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

      {/* Footer */}
      <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Globe className="w-3 h-3" />
          {card.regionAvailability.includes("global")
            ? "グローバル対応"
            : card.regionAvailability.slice(0, 2).join(" / ")}
        </span>
      </div>
    </div>
  );
}

function FeatureFlag({ enabled, label }: { enabled: boolean; label: string }) {
  return (
    <span
      className={cn(
        "flex items-center gap-0.5 text-xs",
        enabled ? "text-emerald-600" : "text-gray-300"
      )}
    >
      {enabled ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <XCircle className="w-3 h-3" />
      )}
      {label}
    </span>
  );
}
