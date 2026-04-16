import Link from "next/link";
import type { Card } from "@/types";
import { ExternalLink, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import CardArtwork from "@/components/cards/CardArtwork";

interface ShowcaseCardProps {
  card: Card;
  rank?: number;
  reason?: string;
  className?: string;
}

const rankTone: Record<number, string> = {
  1: "bg-amber-400 text-amber-950",
  2: "bg-slate-300 text-slate-800",
  3: "bg-orange-500/90 text-white",
};

export default function ShowcaseCard({
  card,
  rank,
  reason,
  className,
}: ShowcaseCardProps) {
  const specs = [
    { label: "FX手数料", value: card.fxFee.split("、")[0].split("（")[0] },
    { label: "還元率", value: card.cashbackRate },
    {
      label: "日本対応",
      value:
        card.regionAvailability.includes("global") || card.regionAvailability.includes("asia")
          ? "申込可能性あり"
          : "要確認",
    },
    {
      label: "カード種別",
      value: card.physicalCard ? "物理カードあり" : "バーチャル中心",
    },
  ];

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_38px_rgba(15,23,42,0.10)]",
        className,
      )}
    >
      <div className="relative bg-[#05070b]">
        <CardArtwork
          card={card}
          fallbackClassName="text-2xl"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/18 to-transparent" />
        <div className="absolute left-3 top-3 flex items-start gap-2">
          {typeof rank === "number" && (
            <span
              className={cn(
                "inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-2 text-sm font-black shadow-sm",
                rankTone[rank] ?? "bg-black/60 text-white",
              )}
            >
              {rank}
            </span>
          )}
          {card.isSponsor && (
            <span className="rounded-full border border-white/15 bg-black/60 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              PR
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold leading-tight text-slate-900">{card.name}</h3>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
              {card.network}
            </span>
            {card.keyStrength && (
              <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700">
                {card.keyStrength}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {card.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 px-2 py-1 text-[11px] text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
            {reason ?? card.shortDescription}
          </p>
          {reason && (
            <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
              {card.shortDescription}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {specs.map((spec) => (
            <div key={spec.label} className="rounded-xl bg-slate-50 p-3">
              <p className="mb-1 text-[11px] text-slate-400">{spec.label}</p>
              <p className="truncate text-xs font-semibold text-slate-800">{spec.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1">
            <Globe className="h-3.5 w-3.5" />
            {card.regionAvailability.includes("global")
              ? "グローバル対応"
              : card.regionAvailability.slice(0, 2).join(" / ")}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/cards/${card.slug}`}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            詳細を見る
          </Link>
          {card.referralUrl && (
            <a
              href={card.referralUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-1 rounded-xl bg-blue-600 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              <span className="inline-flex items-center gap-1.5">
                公式サイト
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
