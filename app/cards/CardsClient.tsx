"use client";

import { useState, useMemo } from "react";
import type { Card } from "@/types";
import { CardGridItem } from "@/components/cards/CardGrid";
import { regionLabels, kycLabels, custodyLabels } from "@/lib/utils";
import { SlidersHorizontal, X, ArrowUpDown } from "lucide-react";

interface CardsClientProps {
  initialCards: Card[];
}

type SortKey = "priority" | "name";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "priority", label: "おすすめ順" },
  { key: "name", label: "名前順" },
];

export default function CardsClient({ initialCards }: CardsClientProps) {
  const [region, setRegion] = useState("all");
  const [kycLevel, setKycLevel] = useState("all");
  const [custodyType, setCustodyType] = useState("all");
  const [hasApplePay, setHasApplePay] = useState(false);
  const [hasPhysical, setHasPhysical] = useState(false);
  const [hasVirtual, setHasVirtual] = useState(false);
  const [hasCashback, setHasCashback] = useState(false);
  const [stablecoin, setStablecoin] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("priority");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...initialCards];

    if (region !== "all") result = result.filter((c) => c.regionAvailability.includes(region as never));
    if (kycLevel !== "all") result = result.filter((c) => c.kycLevel === kycLevel);
    if (custodyType !== "all") result = result.filter((c) => c.custodyType === custodyType);
    if (hasApplePay) result = result.filter((c) => c.applePay);
    if (hasPhysical) result = result.filter((c) => c.physicalCard);
    if (hasVirtual) result = result.filter((c) => c.virtualCard);
    if (hasCashback) result = result.filter((c) => c.rewardType !== "none");
    if (stablecoin) result = result.filter((c) => c.stablecoinSupport);

    result.sort((a, b) => {
      switch (sortKey) {
        case "priority": return (a.priorityRank ?? 99) - (b.priorityRank ?? 99);
        case "name": return a.name.localeCompare(b.name, "ja");
        default: return 0;
      }
    });

    return result;
  }, [initialCards, region, kycLevel, custodyType, hasApplePay, hasPhysical, hasVirtual, hasCashback, stablecoin, sortKey]);

  const activeFilterCount = [
    region !== "all",
    kycLevel !== "all",
    custodyType !== "all",
    hasApplePay,
    hasPhysical,
    hasVirtual,
    hasCashback,
    stablecoin,
  ].filter(Boolean).length;

  const resetFilters = () => {
    setRegion("all");
    setKycLevel("all");
    setCustodyType("all");
    setHasApplePay(false);
    setHasPhysical(false);
    setHasVirtual(false);
    setHasCashback(false);
    setStablecoin(false);
  };

  return (
    <div>
      {/* Filter/Sort bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          フィルター
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
          >
            <X className="w-3.5 h-3.5" />
            リセット
          </button>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <ArrowUpDown className="w-4 h-4 text-gray-400" />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>{opt.label}</option>
            ))}
          </select>
        </div>

        <span className="text-sm text-gray-500">
          {filtered.length}件のカード
        </span>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">対応地域</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">すべての地域</option>
                {Object.entries(regionLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* KYC */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">KYC要件</label>
              <select
                value={kycLevel}
                onChange={(e) => setKycLevel(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">すべて</option>
                {Object.entries(kycLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Custody */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">カストディ</label>
              <select
                value={custodyType}
                onChange={(e) => setCustodyType(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">すべて</option>
                {Object.entries(custodyLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">機能で絞り込む</label>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: hasApplePay, setter: setHasApplePay, label: "Apple Pay対応" },
                  { value: hasPhysical, setter: setHasPhysical, label: "物理カードあり" },
                  { value: hasVirtual, setter: setHasVirtual, label: "バーチャルカードあり" },
                  { value: hasCashback, setter: setHasCashback, label: "キャッシュバックあり" },
                  { value: stablecoin, setter: setStablecoin, label: "USDT/USDC対応" },
                ].map((item) => (
                  <label key={item.label} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.value}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg mb-2">条件に合うカードが見つかりませんでした</p>
          <button onClick={resetFilters} className="text-blue-600 hover:underline text-sm">
            フィルターをリセット
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((card) => (
            <CardGridItem key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}
