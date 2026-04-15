import { cn, scoreToColor } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  score: number;
  maxScore?: number;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export default function ScoreBar({
  label,
  score,
  maxScore = 10,
  showLabel = true,
  size = "md",
}: ScoreBarProps) {
  const percentage = (score / maxScore) * 100;

  const barColor =
    score >= 9
      ? "bg-emerald-500"
      : score >= 8
      ? "bg-blue-500"
      : score >= 7
      ? "bg-amber-500"
      : score >= 6
      ? "bg-orange-400"
      : "bg-red-400";

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span
          className={cn(
            "text-gray-600 shrink-0",
            size === "sm" ? "text-xs w-20" : "text-sm w-28"
          )}
        >
          {label}
        </span>
      )}
      <div className="flex-1 bg-gray-100 rounded-full overflow-hidden h-2">
        <div
          className={cn("h-full rounded-full transition-all duration-500", barColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span
        className={cn(
          "font-semibold shrink-0",
          size === "sm" ? "text-xs w-6" : "text-sm w-8",
          scoreToColor(score)
        )}
      >
        {score}
      </span>
    </div>
  );
}
