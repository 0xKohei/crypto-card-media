import type { Card } from "@/types";
import { cn } from "@/lib/utils";
import ShowcaseCard from "@/components/cards/ShowcaseCard";

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
  return <ShowcaseCard card={card} />;
}
