import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function scoreToLabel(score: number): string {
  if (score >= 9) return "優秀";
  if (score >= 8) return "良好";
  if (score >= 7) return "標準以上";
  if (score >= 6) return "標準";
  return "要確認";
}

export function scoreToColor(score: number): string {
  if (score >= 9) return "text-emerald-600";
  if (score >= 8) return "text-blue-600";
  if (score >= 7) return "text-amber-600";
  if (score >= 6) return "text-orange-500";
  return "text-red-500";
}

export function scoreToBgColor(score: number): string {
  if (score >= 9) return "bg-emerald-100 text-emerald-800";
  if (score >= 8) return "bg-blue-100 text-blue-800";
  if (score >= 7) return "bg-amber-100 text-amber-800";
  if (score >= 6) return "bg-orange-100 text-orange-800";
  return "bg-red-100 text-red-800";
}

export const regionLabels: Record<string, string> = {
  japan: "日本",
  asia: "アジア",
  eu: "EU・欧州",
  usa: "米国",
  global: "グローバル",
  latam: "中南米",
  mena: "中東・北アフリカ",
};

export const kycLabels: Record<string, string> = {
  none: "KYC不要",
  basic: "基本KYC",
  standard: "標準KYC",
  enhanced: "強化KYC",
};

export const custodyLabels: Record<string, string> = {
  custodial: "カストディ型",
  "non-custodial": "非カストディ型",
  hybrid: "ハイブリッド型",
};

export const issuerTypeLabels: Record<string, string> = {
  fintech: "フィンテック",
  cex: "取引所（CEX）",
  defi: "DeFi",
  neobank: "ネオバンク",
  traditional: "従来型金融",
};

export const categoryLabels: Record<string, string> = {
  "beginner-guide": "初心者ガイド",
  comparison: "比較・選び方",
  review: "レビュー",
  opinion: "オピニオン",
  "payment-infra": "決済インフラ",
  stablecoin: "ステーブルコイン",
  "kyc-security": "KYC・セキュリティ",
  "fund-transfer": "資金移動",
  "overseas-usage": "海外利用",
  ecosystem: "エコシステム",
};

export const topPickLabels: Record<string, string> = {
  overall: "総合おすすめ",
  "high-cashback": "高還元向け",
  overseas: "海外利用向け",
  beginner: "初心者向け",
  "japan-users": "日本ユーザー向け",
  "virtual-card": "バーチャルカード向け",
  withdrawal: "出金性重視",
  usdt: "USDT活用向け",
  "no-kyc": "KYC不要",
  defi: "DeFiユーザー向け",
};

export const topPickIcons: Record<string, string> = {
  overall: "🏆",
  "high-cashback": "💰",
  overseas: "✈️",
  beginner: "🌱",
  "japan-users": "🗾",
  "virtual-card": "💳",
  withdrawal: "🔄",
  usdt: "💵",
  "no-kyc": "🔓",
  defi: "⛓",
};

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "…";
}
