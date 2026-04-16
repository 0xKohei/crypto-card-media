"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Card } from "@/types";
import { CardGridItem } from "@/components/cards/CardGrid";
import { regionLabels, kycLabels, custodyLabels, issuerTypeLabels } from "@/lib/utils";
import { SlidersHorizontal, X, CheckCircle, Search } from "lucide-react";

interface FinderClientProps {
  initialCards: Card[];
}

interface Filters {
  region: string;
  kycLevel: string;
  custodyType: string;
  issuerType: string;
  hasApplePay: boolean;
  hasGooglePay: boolean;
  hasPhysical: boolean;
  hasVirtual: boolean;
  hasCashback: boolean;
  stablecoin: boolean;
  beginnerFriendly: boolean;
  overseasFriendly: boolean;
  withdrawalFocused: boolean;
}

const defaultFilters: Filters = {
  region: "all",
  kycLevel: "all",
  custodyType: "all",
  issuerType: "all",
  hasApplePay: false,
  hasGooglePay: false,
  hasPhysical: false,
  hasVirtual: false,
  hasCashback: false,
  stablecoin: false,
  beginnerFriendly: false,
  overseasFriendly: false,
  withdrawalFocused: false,
};

const useCasePresets = [
  {
    label: "初心者向け",
    icon: "🌱",
    filters: { beginnerFriendly: true, hasVirtual: true },
  },
  {
    label: "USDT活用",
    icon: "💵",
    filters: { stablecoin: true },
  },
  {
    label: "海外旅行向け",
    icon: "✈️",
    filters: { overseasFriendly: true, hasApplePay: true },
  },
  {
    label: "出金性重視",
    icon: "🔄",
    filters: { withdrawalFocused: true, stablecoin: true },
  },
  {
    label: "非カストディ",
    icon: "🔐",
    filters: { custodyType: "non-custodial" },
  },
  {
    label: "Apple Pay対応",
    icon: "📱",
    filters: { hasApplePay: true },
  },
];

export default function FinderClient({ initialCards }: FinderClientProps) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetFilters: Partial<Filters>) => {
    setFilters({ ...defaultFilters, ...presetFilters });
  };

  const resetFilters = () => setFilters(defaultFilters);

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => {
    if (k === "region" || k === "kycLevel" || k === "custodyType" || k === "issuerType") {
      return v !== "all";
    }
    return v === true;
  }).length;

  const filtered = useMemo(() => {
    return initialCards.filter((card) => {
      if (filters.region !== "all" && !card.regionAvailability.includes(filters.region as never)) return false;
      if (filters.kycLevel !== "all" && card.kycLevel !== filters.kycLevel) return false;
      if (filters.custodyType !== "all" && card.custodyType !== filters.custodyType) return false;
      if (filters.issuerType !== "all" && card.issuerType !== filters.issuerType) return false;
      if (filters.hasApplePay && !card.applePay) return false;
      if (filters.hasGooglePay && !card.googlePay) return false;
      if (filters.hasPhysical && !card.physicalCard) return false;
      if (filters.hasVirtual && !card.virtualCard) return false;
      if (filters.hasCashback && card.rewardType === "none") return false;
      if (filters.stablecoin && !card.stablecoinSupport) return false;
      if (filters.beginnerFriendly && card.custodyType === "non-custodial") return false;
      if (filters.overseasFriendly && !card.regionAvailability.includes("global") && card.regionAvailability.length < 2) return false;
      if (filters.withdrawalFocused && !card.physicalCard) return false;
      return true;
    });
  }, [initialCards, filters]);

  return (
    <div className="lg:grid lg:grid-cols-4 lg:gap-8">
      {/* Filter sidebar */}
      <aside className="lg:col-span-1 mb-8 lg:mb-0">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-24">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              絞り込み条件
            </h2>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
              >
                <X className="w-3 h-3" />
                リセット（{activeFilterCount}）
              </button>
            )}
          </div>

          {/* Presets */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              用途から選ぶ
            </p>
            <div className="grid grid-cols-2 gap-2">
              {useCasePresets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => applyPreset(preset.filters)}
                  className="flex items-center gap-1.5 text-xs px-2 py-1.5 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
                >
                  <span>{preset.icon}</span>
                  <span className="text-gray-700">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5 space-y-5">
            {/* Region */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                対応地域
              </label>
              <select
                value={filters.region}
                onChange={(e) => updateFilter("region", e.target.value)}
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
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                KYC要件
              </label>
              <select
                value={filters.kycLevel}
                onChange={(e) => updateFilter("kycLevel", e.target.value)}
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
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                カストディタイプ
              </label>
              <select
                value={filters.custodyType}
                onChange={(e) => updateFilter("custodyType", e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">すべて</option>
                {Object.entries(custodyLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Issuer type */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                発行元タイプ
              </label>
              <select
                value={filters.issuerType}
                onChange={(e) => updateFilter("issuerType", e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">すべて</option>
                {Object.entries(issuerTypeLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                機能・用途
              </label>
              <div className="space-y-2">
                {[
                  { key: "hasApplePay", label: "Apple Pay対応" },
                  { key: "hasGooglePay", label: "Google Pay対応" },
                  { key: "hasPhysical", label: "物理カードあり" },
                  { key: "hasVirtual", label: "バーチャルカードあり" },
                  { key: "hasCashback", label: "キャッシュバックあり" },
                  { key: "stablecoin", label: "USDT/USDC対応" },
                  { key: "beginnerFriendly", label: "初心者向け" },
                  { key: "overseasFriendly", label: "海外利用向け" },
                  { key: "withdrawalFocused", label: "出金性重視" },
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters[item.key as keyof Filters] as boolean}
                      onChange={(e) => updateFilter(item.key as keyof Filters, e.target.checked as never)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 font-medium">
              {filtered.length}件のカードが見つかりました
            </span>
          </div>
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.region !== "all" && (
                <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {regionLabels[filters.region]}
                  <button onClick={() => updateFilter("region", "all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.stablecoin && (
                <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  USDT対応
                  <button onClick={() => updateFilter("stablecoin", false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">条件に合うカードが見つかりませんでした</p>
            <p className="text-sm mb-4">条件を変えて再度お試しください</p>
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              条件をリセットする
            </button>
          </div>
        ) : (
          <>
            {/* Editor's pick always on top if matches */}
            {filtered.some((c) => c.isEditorsPick) && (
              <div className="mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 mb-2">
                  <span>★</span> 編集部イチオシがこの条件に対応しています
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered
                .sort((a, b) => (a.priorityRank ?? 99) - (b.priorityRank ?? 99))
                .map((card) => (
                  <CardGridItem key={card.id} card={card} />
                ))}
            </div>
          </>
        )}

        {/* Guide links */}
        <div className="mt-10 bg-blue-50 rounded-2xl p-5">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">
            選び方に迷ったら
          </h3>
          <div className="space-y-2">
            <Link href="/guides/how-to-choose-crypto-card" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <CheckCircle className="w-4 h-4" />
              クリプトカードの選び方ガイドを読む
            </Link>
            <Link href="/top-picks/overall" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <CheckCircle className="w-4 h-4" />
              総合おすすめランキングを見る
            </Link>
            <Link href="/compare" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <CheckCircle className="w-4 h-4" />
              カードを並べて比較する
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
