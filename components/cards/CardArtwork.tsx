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
}

export default function CardArtwork({
  card,
  alt,
  className,
  imageClassName,
  fallbackClassName,
}: CardArtworkProps) {
  const primarySrc = card.cardImage ?? card.image;
  const [src, setSrc] = useState(primarySrc);

  useEffect(() => {
    setSrc(primarySrc);
  }, [primarySrc]);

  return (
    <div
      className={cn("relative overflow-hidden bg-[#05070b]", className)}
      style={{ aspectRatio: "16/10" }}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? card.name}
          className={cn("block h-full w-full object-cover object-center", imageClassName)}
          onError={() => setSrc(undefined)}
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center text-3xl text-white",
            card.coverColor,
            fallbackClassName,
          )}
        >
          {card.logo}
        </div>
      )}
    </div>
  );
}
