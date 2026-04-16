"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Eye,
  EyeOff,
  Save,
  LogOut,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Lock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface AdminCard {
  id: string;
  name: string;
  slug: string;
  isVisible: boolean;
  network: string;
  keyStrength: string;
  priorityRank: number;
  referralUrl: string;
  cardImage: string;
  shortDescription: string;
  longDescription: string;
  fxFee: string;
  cashbackRate: string;
  cashbackDetails: string;
  issuanceFee: string;
  monthlyFee: string;
  annualFee: string;
  atmFee: string;
  spendingLimit: string;
  applePay: boolean;
  googlePay: boolean;
  physicalCard: boolean;
  virtualCard: boolean;
  stablecoinSupport: boolean;
  regionAvailability: string[];
  tags: string[];
  pros: string[];
  cons: string[];
  useCases: string[];
  topupMethods: string[];
  supportedAssets: string[];
  supportedChains: string[];
  custodyType: string;
  kycLevel: string;
}

interface RankingEntry {
  rank: number;
  cardSlug: string;
  reason: string;
  shortReason: string;
  keyStrength: string;
}

const REGIONS = [
  { value: "japan", label: "日本" },
  { value: "asia", label: "アジア" },
  { value: "eu", label: "EU" },
  { value: "usa", label: "米国" },
  { value: "global", label: "グローバル" },
  { value: "latam", label: "中南米" },
  { value: "mena", label: "中東・アフリカ" },
];

// ─────────────────────────────────────────────
// API helper
// ─────────────────────────────────────────────
async function apiFetch(url: string, method: string, password: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${password}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({ success: false, error: res.statusText })) as
    | { success: false; error?: string }
    | { success: true; data?: unknown }
    | unknown;

  const j = json as Record<string, unknown>;
  if (!res.ok || j.success === false) {
    throw new Error((j.error as string | undefined) ?? `HTTP ${res.status}`);
  }
  // { success: true, data: [...] } → return data; raw response → return as-is
  return j.data !== undefined ? j.data : json;
}

// ─────────────────────────────────────────────
// Toast system
// ─────────────────────────────────────────────
interface ToastMsg {
  id: number;
  msg: string;
  type: "success" | "error";
}

function useToast() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const idRef = useRef(0);
  const show = useCallback((msg: string, type: "success" | "error") => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), type === "error" ? 6000 : 3500);
  }, []);
  return { toasts, show };
}

function ToastArea({ toasts }: { toasts: ToastMsg[] }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-lg border ${
            t.type === "success"
              ? "bg-emerald-900 border-emerald-700 text-emerald-100"
              : "bg-red-900 border-red-700 text-red-100"
          }`}
        >
          {t.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span className="break-words min-w-0">{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Form field components
// ─────────────────────────────────────────────
function Field({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  rows = 3,
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  help?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
      {help && <p className="text-xs text-slate-500 mb-1">{help}</p>}
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-slate-500 accent-blue-500"
      />
      <span className="text-sm text-slate-300">{label}</span>
    </label>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-1 pb-2 border-b border-slate-700 mb-3">
      {title}
    </h4>
  );
}

// ─────────────────────────────────────────────
// Login screen
// ─────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiFetch("/api/admin/cards", "GET", pw);
      onLogin(pw);
    } catch {
      setError("パスワードが違います");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">管理画面</h1>
            <p className="text-slate-400 text-xs">CryptoCardNavi Admin</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">管理パスワード</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="パスワードを入力"
              autoFocus
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading || !pw}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            {loading ? "確認中..." : "ログイン"}
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-4 text-center">
          デフォルトパスワード:{" "}
          <code className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">admin2026</code>
          <br />
          <span className="text-slate-600">環境変数 ADMIN_PASSWORD で変更可能</span>
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Card edit row
// ─────────────────────────────────────────────
function CardRow({
  card,
  onSave,
  showToast,
}: {
  card: AdminCard;
  onSave: (updated: AdminCard) => Promise<void>;
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<AdminCard>(card);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(card);
  }, [card]);

  const set = <K extends keyof AdminCard>(field: K, value: AdminCard[K]) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(form);
      showToast(`${form.name} を保存しました`, "success");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      showToast(`保存失敗: ${msg}`, "error");
    } finally {
      setSaving(false);
    }
  };

  const toggleVisible = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...form, isVisible: !form.isVisible };
    setForm(updated);
    try {
      await onSave(updated);
      showToast(
        `${updated.name} を${updated.isVisible ? "公開" : "非公開"}にしました`,
        "success",
      );
    } catch (e) {
      setForm(form);
      const msg = e instanceof Error ? e.message : String(e);
      showToast(`切り替え失敗: ${msg}`, "error");
    }
  };

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden">
      {/* Header — always visible */}
      <div
        className="flex items-center gap-3 px-4 py-3 bg-slate-800 cursor-pointer hover:bg-slate-700/60 select-none"
        onClick={() => setOpen((o) => !o)}
      >
        <button
          onClick={toggleVisible}
          title={form.isVisible ? "公開中 → 非公開にする" : "非公開 → 公開にする"}
          className={`flex-shrink-0 p-1 rounded hover:bg-slate-600 transition-colors ${
            form.isVisible ? "text-emerald-400" : "text-slate-500"
          }`}
        >
          {form.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-white">{form.name}</span>
            {!form.isVisible && (
              <span className="text-xs bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded">
                非公開
              </span>
            )}
          </div>
          <div className="text-xs text-slate-500 mt-0.5 truncate">
            #{form.priorityRank ?? "—"} · {form.network} · FX:{" "}
            {(form.fxFee ?? "").split("、")[0]?.split("（")[0] || "—"} · 還元:{" "}
            {form.cashbackRate || "—"}
          </div>
        </div>

        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
      </div>

      {/* Edit form */}
      {open && (
        <div className="p-5 bg-slate-900 space-y-6">

          {/* ── 基本情報 ── */}
          <section>
            <SectionHeading title="基本情報" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="カード名" value={form.name} onChange={(v) => set("name", v)} />
              <SelectField
                label="ネットワーク"
                value={form.network}
                onChange={(v) => set("network", v)}
                options={[
                  { value: "Visa", label: "Visa" },
                  { value: "Mastercard", label: "Mastercard" },
                  { value: "Both", label: "Visa + Mastercard" },
                  { value: "Other", label: "その他" },
                ]}
              />
              <Field
                label="強みワード (keyStrength)"
                value={form.keyStrength ?? ""}
                onChange={(v) => set("keyStrength", v)}
              />
              <Field
                label="表示優先順位 (priorityRank)"
                value={String(form.priorityRank ?? "")}
                onChange={(v) => set("priorityRank", Number(v))}
                type="number"
              />
              <Field
                label="紹介URL (referralUrl)"
                value={form.referralUrl ?? ""}
                onChange={(v) => set("referralUrl", v)}
                className="sm:col-span-2"
              />
              <Field
                label="券面画像パス (cardImage) — 例: /cards/tria.png"
                value={form.cardImage ?? ""}
                onChange={(v) => set("cardImage", v)}
                className="sm:col-span-2"
              />
            </div>
          </section>

          {/* ── 説明文 ── */}
          <section>
            <SectionHeading title="説明文" />
            <div className="space-y-3">
              <TextareaField
                label="一言説明 (shortDescription) — カード一覧・ランキングに表示"
                value={form.shortDescription ?? ""}
                onChange={(v) => set("shortDescription", v)}
                rows={2}
              />
              <TextareaField
                label="詳細説明 (longDescription) — カード詳細ページの「〜とは」に表示"
                value={form.longDescription ?? ""}
                onChange={(v) => set("longDescription", v)}
                rows={6}
              />
            </div>
          </section>

          {/* ── 手数料・還元 ── */}
          <section>
            <SectionHeading title="手数料・還元" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="FX手数料 (fxFee)"
                value={form.fxFee ?? ""}
                onChange={(v) => set("fxFee", v)}
              />
              <Field
                label="還元率 (cashbackRate)"
                value={form.cashbackRate ?? ""}
                onChange={(v) => set("cashbackRate", v)}
              />
              <Field
                label="発行手数料 (issuanceFee)"
                value={form.issuanceFee ?? ""}
                onChange={(v) => set("issuanceFee", v)}
              />
              <Field
                label="月額手数料 (monthlyFee)"
                value={form.monthlyFee ?? ""}
                onChange={(v) => set("monthlyFee", v)}
              />
              <Field
                label="年会費 (annualFee)"
                value={form.annualFee ?? ""}
                onChange={(v) => set("annualFee", v)}
              />
              <Field
                label="ATM手数料 (atmFee)"
                value={form.atmFee ?? ""}
                onChange={(v) => set("atmFee", v)}
              />
              <Field
                label="利用上限 (spendingLimit)"
                value={form.spendingLimit ?? ""}
                onChange={(v) => set("spendingLimit", v)}
                className="sm:col-span-2"
              />
              <TextareaField
                label="還元詳細 (cashbackDetails)"
                value={form.cashbackDetails ?? ""}
                onChange={(v) => set("cashbackDetails", v)}
                rows={2}
              />
            </div>
          </section>

          {/* ── 対応機能 ── */}
          <section>
            <SectionHeading title="対応機能・スペック" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              <CheckboxField
                label="Apple Pay"
                checked={form.applePay}
                onChange={(v) => set("applePay", v)}
              />
              <CheckboxField
                label="Google Pay"
                checked={form.googlePay}
                onChange={(v) => set("googlePay", v)}
              />
              <CheckboxField
                label="物理カード"
                checked={form.physicalCard}
                onChange={(v) => set("physicalCard", v)}
              />
              <CheckboxField
                label="バーチャルカード"
                checked={form.virtualCard}
                onChange={(v) => set("virtualCard", v)}
              />
              <CheckboxField
                label="ステーブルコイン対応"
                checked={form.stablecoinSupport}
                onChange={(v) => set("stablecoinSupport", v)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SelectField
                label="カストディタイプ"
                value={form.custodyType ?? "custodial"}
                onChange={(v) => set("custodyType", v)}
                options={[
                  { value: "custodial", label: "カストディ型" },
                  { value: "non-custodial", label: "非カストディ型 (セルフカストディ)" },
                  { value: "hybrid", label: "ハイブリッド" },
                ]}
              />
              <SelectField
                label="KYCレベル"
                value={form.kycLevel ?? "standard"}
                onChange={(v) => set("kycLevel", v)}
                options={[
                  { value: "none", label: "不要 (none)" },
                  { value: "basic", label: "基本 (basic)" },
                  { value: "standard", label: "標準 (standard)" },
                  { value: "enhanced", label: "厳格 (enhanced)" },
                ]}
              />
            </div>
          </section>

          {/* ── 対応地域・通貨 ── */}
          <section>
            <SectionHeading title="対応地域・チェーン・資産" />
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  対応地域 (regionAvailability)
                </label>
                <div className="flex flex-wrap gap-4">
                  {REGIONS.map((r) => (
                    <label key={r.value} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(form.regionAvailability ?? []).includes(r.value)}
                        onChange={(e) => {
                          const curr = form.regionAvailability ?? [];
                          set(
                            "regionAvailability",
                            e.target.checked
                              ? [...curr, r.value]
                              : curr.filter((x) => x !== r.value),
                          );
                        }}
                        className="w-3.5 h-3.5 rounded border-slate-500 accent-blue-500"
                      />
                      <span className="text-sm text-slate-300">{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <TextareaField
                  label="チャージ方法 (topupMethods)"
                  value={(form.topupMethods ?? []).join("\n")}
                  onChange={(v) =>
                    set(
                      "topupMethods",
                      v
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                  rows={4}
                  help="1行に1つ"
                />
                <TextareaField
                  label="対応チェーン (supportedChains)"
                  value={(form.supportedChains ?? []).join("\n")}
                  onChange={(v) =>
                    set(
                      "supportedChains",
                      v
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                  rows={4}
                  help="1行に1つ"
                />
                <TextareaField
                  label="対応資産 (supportedAssets)"
                  value={(form.supportedAssets ?? []).join("\n")}
                  onChange={(v) =>
                    set(
                      "supportedAssets",
                      v
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                  rows={4}
                  help="1行に1つ"
                />
              </div>
            </div>
          </section>

          {/* ── テキスト一覧 ── */}
          <section>
            <SectionHeading title="テキスト一覧 (カード詳細に反映)" />
            <div className="space-y-3">
              <Field
                label="タグ (tags) — カンマ区切り"
                value={(form.tags ?? []).join(", ")}
                onChange={(v) =>
                  set(
                    "tags",
                    v
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  )
                }
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextareaField
                  label="長所 (pros) — 詳細ページの「長所」欄"
                  value={(form.pros ?? []).join("\n")}
                  onChange={(v) =>
                    set(
                      "pros",
                      v
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                  rows={5}
                  help="1行に1つ"
                />
                <TextareaField
                  label="短所・注意点 (cons) — 詳細ページの「短所」欄"
                  value={(form.cons ?? []).join("\n")}
                  onChange={(v) =>
                    set(
                      "cons",
                      v
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                  rows={5}
                  help="1行に1つ"
                />
              </div>
              <TextareaField
                label="こんな方に向いています (useCases) — 詳細ページに表示"
                value={(form.useCases ?? []).join("\n")}
                onChange={(v) =>
                  set(
                    "useCases",
                    v
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  )
                }
                rows={4}
                help="1行に1つ"
              />
            </div>
          </section>

          {/* ── 保存 ── */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700">
            <CheckboxField
              label="公開する (isVisible)"
              checked={form.isVisible}
              onChange={(v) => set("isVisible", v)}
            />
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              <Save className="w-4 h-4" />
              {saving ? "保存中..." : "保存する"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Ranking editor
// ─────────────────────────────────────────────
function RankingEditor({
  password,
  cardList,
  showToast,
}: {
  password: string;
  cardList: AdminCard[];
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/api/admin/rankings?category=overall", "GET", password);
      setEntries(data as RankingEntry[]);
    } catch (e) {
      showToast(`読み込み失敗: ${e instanceof Error ? e.message : String(e)}`, "error");
    } finally {
      setLoading(false);
    }
  }, [password, showToast]);

  useEffect(() => {
    load();
  }, [load]);

  const update = (rank: number, field: keyof RankingEntry, value: string | number) =>
    setEntries((prev) => prev.map((e) => (e.rank === rank ? { ...e, [field]: value } : e)));

  const swap = (rankA: number, rankB: number) => {
    setEntries((prev) =>
      prev
        .map((e) => {
          if (e.rank === rankA) return { ...e, rank: rankB };
          if (e.rank === rankB) return { ...e, rank: rankA };
          return e;
        })
        .sort((a, b) => a.rank - b.rank),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiFetch("/api/admin/rankings", "POST", password, {
        category: "overall",
        entries,
      });
      showToast("ランキングを保存しました", "success");
    } catch (e) {
      showToast(`保存失敗: ${e instanceof Error ? e.message : String(e)}`, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center gap-2 text-slate-400 text-sm py-8">
        <RefreshCw className="w-4 h-4 animate-spin" />
        読み込み中...
      </div>
    );

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div key={entry.rank} className="border border-slate-700 rounded-xl overflow-hidden">
          {/* Rank header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-black text-white flex-shrink-0">
              {entry.rank}
            </span>
            <div className="flex-1">
              <select
                value={entry.cardSlug}
                onChange={(e) => update(entry.rank, "cardSlug", e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-auto"
              >
                {cardList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => entry.rank > 1 && swap(entry.rank, entry.rank - 1)}
                disabled={entry.rank === 1}
                title="上に移動"
                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-slate-300 transition-colors"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => entry.rank < entries.length && swap(entry.rank, entry.rank + 1)}
                disabled={entry.rank === entries.length}
                title="下に移動"
                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-slate-300 transition-colors"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          {/* Text fields */}
          <div className="p-4 bg-slate-900 space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                一言理由 (shortReason) — トップページ「人気ランキング」 / /top-picks の短文
              </label>
              <input
                type="text"
                value={entry.shortReason ?? ""}
                onChange={(e) => update(entry.rank, "shortReason", e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                詳細理由 (reason) — ランキング詳細ページ (/top-picks/overall) に表示
              </label>
              <textarea
                value={entry.reason ?? ""}
                onChange={(e) => update(entry.rank, "reason", e.target.value)}
                rows={3}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                強みワード (keyStrength) — ランキング詳細ページのバッジ
              </label>
              <input
                type="text"
                value={entry.keyStrength ?? ""}
                onChange={(e) => update(entry.rank, "keyStrength", e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      {entries.length === 0 && (
        <p className="text-slate-500 text-sm text-center py-8">
          ランキングデータがありません。Supabase またはローカルJSONを確認してください。
        </p>
      )}

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={saving || entries.length === 0}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Save className="w-4 h-4" />
          {saving ? "保存中..." : "ランキングを保存"}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Homepage Featured editor
// ─────────────────────────────────────────────
interface FeaturedSlotForm {
  slot: number;
  card_slug: string;
  short_reason: string;
  is_visible: boolean;
}

function HomepageFeaturedEditor({
  password,
  cardList,
  showToast,
}: {
  password: string;
  cardList: AdminCard[];
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const makeDefaultSlots = useCallback(
    (): FeaturedSlotForm[] => [
      { slot: 1, card_slug: cardList[0]?.slug ?? "", short_reason: "", is_visible: true },
      { slot: 2, card_slug: cardList[1]?.slug ?? "", short_reason: "", is_visible: true },
      { slot: 3, card_slug: cardList[2]?.slug ?? "", short_reason: "", is_visible: true },
    ],
    [cardList],
  );

  const [slots, setSlots] = useState<FeaturedSlotForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = (await apiFetch(
        "/api/admin/homepage-featured",
        "GET",
        password,
      )) as { slot: number; card_slug: string; short_reason: string | null; is_visible: boolean }[];

      const defaults = makeDefaultSlots();
      const merged = defaults.map((def) => {
        const db = Array.isArray(data) ? data.find((s) => s.slot === def.slot) : undefined;
        if (!db) return def;
        return {
          slot: db.slot,
          card_slug: db.card_slug || def.card_slug,
          short_reason: db.short_reason ?? "",
          is_visible: db.is_visible ?? true,
        };
      });
      setSlots(merged);
    } catch (e) {
      showToast(
        `読み込み失敗: ${e instanceof Error ? e.message : String(e)}`,
        "error",
      );
      setSlots(makeDefaultSlots());
    } finally {
      setLoading(false);
    }
  }, [password, showToast, makeDefaultSlots]);

  useEffect(() => {
    if (cardList.length > 0) load();
  }, [load, cardList.length]);

  const updateSlot = (
    slotNum: number,
    field: keyof FeaturedSlotForm,
    value: string | boolean,
  ) =>
    setSlots((prev) =>
      prev.map((s) => (s.slot === slotNum ? { ...s, [field]: value } : s)),
    );

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiFetch("/api/admin/homepage-featured", "POST", password, { slots });
      showToast("トップ掲載を保存しました", "success");
    } catch (e) {
      showToast(
        `保存失敗: ${e instanceof Error ? e.message : String(e)}`,
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center gap-2 text-slate-400 text-sm py-8">
        <RefreshCw className="w-4 h-4 animate-spin" />
        読み込み中...
      </div>
    );

  return (
    <div className="space-y-4">
      {slots.map((slot) => (
        <div key={slot.slot} className="border border-slate-700 rounded-xl overflow-hidden">
          {/* Slot header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-black text-white flex-shrink-0">
              {slot.slot}
            </span>
            <span className="text-sm font-semibold text-white">スロット {slot.slot}</span>
            <label className="ml-auto flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={slot.is_visible}
                onChange={(e) => updateSlot(slot.slot, "is_visible", e.target.checked)}
                className="w-4 h-4 rounded border-slate-500 accent-blue-500"
              />
              <span className="text-xs text-slate-400">表示する</span>
            </label>
          </div>

          {/* Slot body */}
          <div className="p-4 bg-slate-900 space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">掲載カード</label>
              <select
                value={slot.card_slug}
                onChange={(e) => updateSlot(slot.slot, "card_slug", e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {cardList.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                一言コメント (short_reason) — トップページ「掲載カード一覧」に表示
              </label>
              <input
                type="text"
                value={slot.short_reason}
                onChange={(e) => updateSlot(slot.slot, "short_reason", e.target.value)}
                placeholder="例: 還元率トップクラスの実力派カード"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={saving || slots.length === 0}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Save className="w-4 h-4" />
          {saving ? "保存中..." : "トップ掲載を保存"}
        </button>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-xs text-slate-400 space-y-1.5">
        <p className="font-semibold text-slate-300">トップ掲載について</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>スロット 1〜3 がトップページの「掲載カード一覧」に表示されます</li>
          <li>「人気ランキング」セクションは「ランキング管理」タブで管理します</li>
          <li>「表示する」をオフにするとそのスロットは非表示になります</li>
          <li>保存後は即時反映されます</li>
        </ul>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Admin Dashboard
// ─────────────────────────────────────────────
function AdminDashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [tab, setTab] = useState<"cards" | "rankings" | "featured">("cards");
  const [cards, setCards] = useState<AdminCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [revalidating, setRevalidating] = useState(false);
  const { toasts, show: showToast } = useToast();

  const loadCards = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await apiFetch("/api/admin/cards", "GET", password);
      setCards(Array.isArray(data) ? (data as AdminCard[]) : []);
    } catch (e) {
      setLoadError(String(e));
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const saveCard = async (updated: AdminCard) => {
    await apiFetch("/api/admin/cards", "POST", password, updated);
    setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const revalidate = async () => {
    setRevalidating(true);
    try {
      await apiFetch("/api/admin/revalidate", "POST", password);
      showToast("キャッシュをリセットしました", "success");
    } catch {
      showToast("リセット失敗", "error");
    } finally {
      setRevalidating(false);
    }
  };

  const sortedCards = [...cards].sort(
    (a, b) => (a.priorityRank ?? 99) - (b.priorityRank ?? 99),
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ToastArea toasts={toasts} />

      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lock className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm">CryptoCardNavi 管理画面</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={revalidate}
            disabled={revalidating}
            title="Cloudflare / Vercel のキャッシュをクリアしてページを即時反映"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-300"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${revalidating ? "animate-spin" : ""}`} />
            キャッシュ更新
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-300"
          >
            <LogOut className="w-3.5 h-3.5" />
            ログアウト
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-800 rounded-xl p-1 mb-8 w-fit">
          {[
            { id: "cards" as const, label: `カード管理 (${cards.length}件)` },
            { id: "rankings" as const, label: "ランキング管理" },
            { id: "featured" as const, label: "トップ掲載管理" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Cards tab ── */}
        {tab === "cards" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold">カード管理</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  カード行をクリックして展開 · 目のアイコンで公開/非公開を即切替 · 保存後に「キャッシュ更新」で即時反映
                </p>
              </div>
              <button
                onClick={loadCards}
                disabled={loading}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors text-slate-400"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                再読込
              </button>
            </div>

            {loading ? (
              <div className="flex items-center gap-2 text-slate-400 text-sm py-12">
                <RefreshCw className="w-4 h-4 animate-spin" />
                読み込み中...
              </div>
            ) : loadError ? (
              <div className="bg-red-950 border border-red-800 rounded-xl p-5 text-sm text-red-300 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">読み込みエラー</p>
                  <p className="text-xs opacity-80 font-mono">{loadError}</p>
                  <p className="text-xs opacity-60 mt-2">
                    Supabase の接続設定 (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY) を確認してください。
                    ローカル開発の場合は data/admin-overrides.json が存在するか確認してください。
                  </p>
                </div>
              </div>
            ) : cards.length === 0 ? (
              <div className="text-center py-12 text-slate-400 border border-slate-700 rounded-xl">
                <p className="text-sm font-medium">カードが見つかりませんでした</p>
                <p className="text-xs mt-2 text-slate-500">
                  data/cards.ts にカードデータが存在するか確認してください
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {sortedCards.map((card) => (
                  <CardRow
                    key={card.id}
                    card={card}
                    onSave={saveCard}
                    showToast={showToast}
                  />
                ))}
              </div>
            )}

            {/* Reflection info */}
            {!loading && !loadError && cards.length > 0 && (
              <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-xs text-slate-400 space-y-1.5">
                <p className="font-semibold text-slate-300">保存した内容の反映先</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>トップページ — 掲載カード一覧・ランキング</li>
                  <li>/cards — カード一覧</li>
                  <li>/cards/[slug] — 各カード詳細ページ（手数料・還元・長所短所など全項目）</li>
                  <li>/compare/[slug] — 比較ページのカード情報</li>
                  <li>/top-picks/[slug] — ランキング詳細ページ</li>
                </ul>
                <p className="text-slate-500 pt-1">
                  ※ 保存後は右上の「キャッシュ更新」ボタンを押すと即時反映されます。
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Rankings tab ── */}
        {tab === "rankings" && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-1">ランキング管理（総合）</h2>
              <p className="text-xs text-slate-400">
                カードの順位変更、対象カードの変更、各理由文の編集ができます。
                保存後に「キャッシュ更新」で即時反映されます。
              </p>
            </div>
            <RankingEditor password={password} cardList={cards} showToast={showToast} />
          </div>
        )}

        {/* ── Homepage Featured tab ── */}
        {tab === "featured" && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-1">トップ掲載管理</h2>
              <p className="text-xs text-slate-400">
                トップページ「掲載カード一覧」セクションを管理します。スロット 1〜3 にカードを割り当て、一言コメントを設定してください。
                ※「人気ランキング」セクションは「ランキング管理」タブで管理します。
              </p>
            </div>
            <HomepageFeaturedEditor
              password={password}
              cardList={cards}
              showToast={showToast}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Entry point
// ─────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_pw");
    if (stored) setPassword(stored);
  }, []);

  const handleLogin = (pw: string) => {
    sessionStorage.setItem("admin_pw", pw);
    setPassword(pw);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_pw");
    setPassword(null);
  };

  if (!password) return <LoginForm onLogin={handleLogin} />;
  return <AdminDashboard password={password} onLogout={handleLogout} />;
}
