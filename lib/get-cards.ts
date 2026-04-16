import fs from "fs";
import path from "path";
import { cards as staticCards } from "@/data/cards";
import type { Card } from "@/types";

export interface AdminCardOverride {
  id: string;
  isVisible?: boolean;
  name?: string;
  shortDescription?: string;
  cardImage?: string;
  referralUrl?: string;
  network?: string;
  tags?: string[];
  keyStrength?: string;
  priorityRank?: number;
}

export interface AdminRankingEntry {
  rank: number;
  cardSlug: string;
  reason: string;
  shortReason?: string;
  keyStrength?: string;
}

export interface AdminOverrides {
  cards: AdminCardOverride[];
  rankings: Record<string, AdminRankingEntry[]>;
}

const OVERRIDES_PATH = path.join(process.cwd(), "data", "admin-overrides.json");

export function readAdminOverrides(): AdminOverrides {
  try {
    const raw = fs.readFileSync(OVERRIDES_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { cards: [], rankings: {} };
  }
}

export function writeAdminOverrides(data: AdminOverrides): void {
  fs.writeFileSync(OVERRIDES_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function getCards(): (Card & { isVisible?: boolean })[] {
  const overrides = readAdminOverrides();
  return staticCards
    .map((card) => {
      const override = overrides.cards.find((c) => c.id === card.id);
      if (!override) return { ...card, isVisible: true } as Card & { isVisible?: boolean };
      // Cast through unknown to avoid strict type conflicts on union fields like `network`
      return { ...card, ...override } as unknown as Card & { isVisible?: boolean };
    })
    .filter((card) => card.isVisible !== false);
}

export function getCardBySlug(slug: string): (Card & { isVisible?: boolean }) | undefined {
  return getCards().find((c) => c.slug === slug);
}

export function getPriorityCards(): (Card & { isVisible?: boolean })[] {
  return getCards()
    .filter((c) => c.isPriority && c.priorityRank != null)
    .sort((a, b) => (a.priorityRank ?? 99) - (b.priorityRank ?? 99));
}

export function getRankingEntries(category: string): AdminRankingEntry[] {
  const overrides = readAdminOverrides();
  return overrides.rankings[category] ?? [];
}
