import Link from "next/link";
import type { Article } from "@/types";
import { categoryLabels } from "@/lib/utils";
import { Clock } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/${article.category === "beginner-guide" || article.category === "comparison" || article.category === "review" ? "guides" : "blog"}/${article.slug}`}
        className="group flex gap-3 hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs text-blue-600 font-medium mb-0.5">
            {categoryLabels[article.category]}
          </p>
          <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </p>
        </div>
        <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-1" />
      </Link>
    );
  }

  const articlePath =
    ["beginner-guide", "comparison", "review"].includes(article.category)
      ? "guides"
      : "blog";

  return (
    <Link
      href={`/${articlePath}/${article.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all overflow-hidden"
    >
      {/* Category color bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {categoryLabels[article.category]}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readingTime}分
          </span>
        </div>

        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-2 text-sm">
          {article.title}
        </h3>

        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-1 mt-3">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
