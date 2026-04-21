import Link from "next/link";
import type { Card } from "@/types";
import CardArtwork from "@/components/cards/CardArtwork";
import { ExternalLink } from "lucide-react";

interface RankingCardProps {
  card: Card;
  rank: number;
  reason: string;
  shortReason?: string;
  showCta?: boolean;
}

const rankStyles: Record<number, { badge: string; bar: string }> = {
  1: { badge: "bg-amber-400 text-amber-950 shadow-amber-200", bar: "bg-amber-400" },
  2: { badge: "bg-slate-300 text-slate-800 shadow-slate-200", bar: "bg-slate-400" },
  3: { badge: "bg-orange-400/90 text-white shadow-orange-200", bar: "bg-orange-400" },
};

export default function RankingCard({
  card,
  rank,
  reason,
  shortReason,
  showCta = false,
}: RankingCardProps) {
  const style = rankStyles[rank] ?? { badge: "bg-slate-700 text-white shadow-slate-200", bar: "bg-slate-700" };
  const description = shortReason ?? reason;

  return (
    <article className="flex items-stretch gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-all hover:border-blue-200 hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)]">
      {/* Rank bar */}
      <div className={`w-1 flex-shrink-0 ${style.bar}`} />

      {/* Card image */}
      <div className="w-[140px] sm:w-[180px] flex-shrink-0 self-stretch">
        <CardArtwork
          card={card}
          className="h-full w-full rounded-none"
          fallbackClassName="text-2xl"
        />
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 py-4 sm:px-5">
        {/* Rank + name row */}
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex h-8 min-w-8 items-center justify-center rounded-xl px-2 text-sm font-black shadow-sm ${style.badge}`}
          >
            {rank}
          </span>
          <h3 className="truncate text-base font-bold leading-tight text-slate-900 sm:text-lg">
            {card.name}
          </h3>
        </div>

        {/* Short reason */}
        {description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
            {description}
          </p>
        )}

        {/* CTA buttons (top 3 only) */}
        {showCta && (
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <Link
              href={`/cards/${card.slug}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-600"
            >
              詳細を確認する
            </Link>
            {card.referralUrl && (
              <a
                href={card.referralUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700"
              >
                カードをすぐに申し込む
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
