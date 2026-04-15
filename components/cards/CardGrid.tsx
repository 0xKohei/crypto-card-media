import Link from "next/link";
import type { Card } from "@/types";
import Badge from "@/components/common/Badge";
import { CheckCircle, XCircle, Globe, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <Link
      href={`/cards/${card.slug}`}
      className="group block bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Card header */}
      <div className={cn("h-24 bg-gradient-to-br flex items-center justify-center relative", card.coverColor)}>
        <span className="text-4xl">{card.logo}</span>
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          {card.isEditorsPick && (
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
              編集部イチオシ
            </span>
          )}
          {card.isSponsor && (
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
              PR
            </span>
          )}
        </div>
        {/* Score badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-2 py-1 rounded-lg">
            {card.scores.overall} / 10
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
            {card.name}
          </h3>
          <span className="text-xs text-gray-500 shrink-0">{card.network}</span>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
          {card.shortDescription}
        </p>

        {/* Key stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-xs text-gray-500">FX手数料</p>
            <p className="text-xs font-semibold text-gray-900 truncate">{card.fxFee}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-xs text-gray-500">還元率</p>
            <p className="text-xs font-semibold text-gray-900 truncate">{card.cashbackRate}</p>
          </div>
        </div>

        {/* Feature flags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <FeatureFlag enabled={card.applePay} label="Apple Pay" />
          <FeatureFlag enabled={card.virtualCard} label="バーチャル" />
          <FeatureFlag enabled={card.physicalCard} label="物理カード" />
          <FeatureFlag enabled={card.stablecoinSupport} label="USDT対応" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {card.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="blue" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Globe className="w-3 h-3" />
            {card.regionAvailability.includes("global") ? "グローバル" : card.regionAvailability.slice(0, 2).join(" / ")}
          </span>
          <span className="text-xs font-medium text-blue-600">
            詳細を見る →
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeatureFlag({ enabled, label }: { enabled: boolean; label: string }) {
  return (
    <span
      className={cn(
        "flex items-center gap-0.5 text-xs",
        enabled ? "text-emerald-600" : "text-gray-400"
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
