"use client";

import { useEffect, useState } from "react";
import type { Card } from "@/types";
import { cn } from "@/lib/utils";

interface CardArtworkProps {
  card: Card;
  alt?: string;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  stageClassName?: string;
  paddingClassName?: string;
}

export default function CardArtwork({
  card,
  alt,
  className,
  imageClassName,
  fallbackClassName,
  stageClassName,
  paddingClassName,
}: CardArtworkProps) {
  const primarySrc = card.cardImage ?? card.image;
  const [src, setSrc] = useState(primarySrc);

  useEffect(() => {
    setSrc(primarySrc);
  }, [primarySrc]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,#07111a_0%,#05080d_100%)] shadow-[0_10px_30px_rgba(2,8,20,0.12)]",
        className,
      )}
      style={{ aspectRatio: "1200 / 756" }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-[9%] top-[6%] h-[38%] rounded-full bg-white/10 blur-3xl",
          stageClassName,
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%)]" />
      <div className={cn("relative flex h-full items-center justify-center p-5 sm:p-6", paddingClassName)}>
        {src ? (
          <img
            src={src}
            alt={alt ?? card.name}
            className={cn(
              "max-h-full w-full rounded-[16px] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.18)]",
              imageClassName,
            )}
            onError={() => setSrc(undefined)}
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center rounded-[16px] bg-gradient-to-br text-3xl text-white",
              card.coverColor,
              fallbackClassName,
            )}
          >
            {card.logo}
          </div>
        )}
      </div>
    </div>
  );
}
