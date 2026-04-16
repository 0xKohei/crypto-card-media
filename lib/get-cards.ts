import { cards as staticCards } from "@/data/cards";
import { getSupabaseClient, OVERRIDES_ROW_ID } from "@/lib/supabase";
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

// ---------------------------------------------------------------------------
// Local JSON helpers — Node.js only, used only during build / dev.
// Uses require() inside function body so Edge bundlers don't statically analyze it.
// ---------------------------------------------------------------------------

function readLocalOverrides(): AdminOverrides {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs") as typeof import("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path") as typeof import("path");
    const filePath = path.join(process.cwd(), "data", "admin-overrides.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as AdminOverrides;
  } catch {
    return { cards: [], rankings: {} };
  }
}

function writeLocalOverrides(data: AdminOverrides): void {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs") as typeof import("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path") as typeof import("path");
    const filePath = path.join(process.cwd(), "data", "admin-overrides.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // no-op in environments without fs (Edge Runtime, etc.)
  }
}

// ---------------------------------------------------------------------------
// Supabase helpers
// ---------------------------------------------------------------------------

async function readSupabaseOverrides(): Promise<AdminOverrides | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("admin_overrides")
    .select("data")
    .eq("id", OVERRIDES_ROW_ID)
    .single();
  if (error || !data) return null;
  return data.data as AdminOverrides;
}

async function writeSupabaseOverrides(overrides: AdminOverrides): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase
    .from("admin_overrides")
    .upsert({ id: OVERRIDES_ROW_ID, data: overrides });
  if (error) throw new Error(`Supabase write failed: ${error.message}`);
}

// ---------------------------------------------------------------------------
// Public API — async, Supabase preferred, local JSON fallback
// ---------------------------------------------------------------------------

export async function readAdminOverrides(): Promise<AdminOverrides> {
  const supabaseData = await readSupabaseOverrides();
  if (supabaseData) return supabaseData;
  return readLocalOverrides();
}

export async function writeAdminOverrides(data: AdminOverrides): Promise<void> {
  const supabase = getSupabaseClient();
  if (supabase) {
    await writeSupabaseOverrides(data);
  } else {
    writeLocalOverrides(data);
  }
}

// ---------------------------------------------------------------------------
// Card data getters (used by Server Components at build time)
// ---------------------------------------------------------------------------

export async function getCards(): Promise<(Card & { isVisible?: boolean })[]> {
  const overrides = await readAdminOverrides();
  return staticCards
    .map((card) => {
      const override = overrides.cards.find((c) => c.id === card.id);
      if (!override) return { ...card, isVisible: true } as Card & { isVisible?: boolean };
      return { ...card, ...override } as unknown as Card & { isVisible?: boolean };
    })
    .filter((card) => card.isVisible !== false);
}

export async function getCardBySlug(
  slug: string,
): Promise<(Card & { isVisible?: boolean }) | undefined> {
  const cards = await getCards();
  return cards.find((c) => c.slug === slug);
}

export async function getPriorityCards(): Promise<(Card & { isVisible?: boolean })[]> {
  const cards = await getCards();
  return cards
    .filter((c) => c.isPriority && c.priorityRank != null)
    .sort((a, b) => (a.priorityRank ?? 99) - (b.priorityRank ?? 99));
}

export async function getRankingEntries(category: string): Promise<AdminRankingEntry[]> {
  const overrides = await readAdminOverrides();
  return overrides.rankings[category] ?? [];
}
