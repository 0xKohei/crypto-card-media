"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Eye,
  EyeOff,
  Save,
  LogOut,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Lock,
} from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface CardOverride {
  id: string;
  isVisible: boolean;
  name: string;
  shortDescription: string;
  cardImage: string;
  referralUrl: string;
  network: string;
  tags: string[];
  keyStrength: string;
  priorityRank: number;
}

interface RankingEntry {
  rank: number;
  cardSlug: string;
  reason: string;
  shortReason: string;
  keyStrength: string;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
async function apiFetch(
  url: string,
  method: string,
  password: string,
  body?: unknown
) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${password}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
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
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              管理パスワード
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="パスワードを入力"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !pw}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            {loading ? "確認中..." : "ログイン"}
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-4 text-center">
          環境変数 <code className="bg-slate-800 px-1 rounded">ADMIN_PASSWORD</code> で設定
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
}: {
  card: CardOverride;
  onSave: (updated: CardOverride) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CardOverride>(card);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const set = (field: keyof CardOverride, value: unknown) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden">
      {/* Header row */}
      <div
        className="flex items-center gap-3 px-4 py-3 bg-slate-800 cursor-pointer hover:bg-slate-750"
        onClick={() => setOpen((o) => !o)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            const updated = { ...form, isVisible: !form.isVisible };
            setForm(updated);
            onSave(updated);
          }}
          className={`flex-shrink-0 ${form.isVisible ? "text-emerald-400" : "text-slate-500"}`}
        >
          {form.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        <span className="text-sm font-medium text-white flex-1">{form.name}</span>
        <span className="text-xs text-slate-400 hidden sm:block">#{form.priorityRank}</span>
        <span className="text-xs text-slate-500 hidden sm:block">{form.network}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </div>

      {/* Edit fields */}
      {open && (
        <div className="p-4 bg-slate-900 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="カード名"
              value={form.name}
              onChange={(v) => set("name", v)}
            />
            <Field
              label="表示順 (priorityRank)"
              value={String(form.priorityRank)}
              onChange={(v) => set("priorityRank", Number(v))}
              type="number"
            />
            <Field
              label="ネットワーク"
              value={form.network}
              onChange={(v) => set("network", v)}
            />
            <Field
              label="強みワード"
              value={form.keyStrength}
              onChange={(v) => set("keyStrength", v)}
            />
            <Field
              label="紹介URL"
              value={form.referralUrl}
              onChange={(v) => set("referralUrl", v)}
            />
            <Field
              label="券面画像パス"
              value={form.cardImage}
              onChange={(v) => set("cardImage", v)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              一言説明 (shortDescription)
            </label>
            <textarea
              value={form.shortDescription}
              onChange={(e) => set("shortDescription", e.target.value)}
              rows={2}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              タグ (カンマ区切り)
            </label>
            <input
              type="text"
              value={form.tags.join(", ")}
              onChange={(e) =>
                set(
                  "tags",
                  e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                )
              }
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isVisible}
                onChange={(e) => set("isVisible", e.target.checked)}
                className="w-4 h-4 rounded border-slate-500"
              />
              <span className="text-sm text-slate-300">公開する</span>
            </label>

            <button
              onClick={handleSave}
              disabled={saving}
              className="ml-auto flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "保存中..." : saved ? "保存しました ✓" : "保存"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Ranking editor
// ─────────────────────────────────────────────
function RankingEditor({
  password,
  cardNames,
}: {
  password: string;
  cardNames: Record<string, string>;
}) {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch(
        "/api/admin/rankings?category=overall",
        "GET",
        password
      );
      setEntries(data);
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    load();
  }, [load]);

  const updateEntry = (rank: number, field: keyof RankingEntry, value: string | number) => {
    setEntries((prev) =>
      prev.map((e) => (e.rank === rank ? { ...e, [field]: value } : e))
    );
  };

  const moveUp = (rank: number) => {
    if (rank <= 1) return;
    setEntries((prev) => {
      const copy = [...prev];
      const idxA = copy.findIndex((e) => e.rank === rank);
      const idxB = copy.findIndex((e) => e.rank === rank - 1);
      if (idxA < 0 || idxB < 0) return prev;
      const updated = copy.map((e) => {
        if (e.rank === rank) return { ...e, rank: rank - 1 };
        if (e.rank === rank - 1) return { ...e, rank: rank };
        return e;
      });
      return updated.sort((a, b) => a.rank - b.rank);
    });
  };

  const moveDown = (rank: number, max: number) => {
    if (rank >= max) return;
    setEntries((prev) => {
      const updated = prev.map((e) => {
        if (e.rank === rank) return { ...e, rank: rank + 1 };
        if (e.rank === rank + 1) return { ...e, rank: rank };
        return e;
      });
      return updated.sort((a, b) => a.rank - b.rank);
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiFetch("/api/admin/rankings", "POST", password, {
        category: "overall",
        entries,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-slate-400 text-sm">読み込み中...</p>;

  return (
    <div className="space-y-4">
      {entries.map((entry, i) => (
        <div key={entry.rank} className="border border-slate-700 rounded-xl p-4 bg-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {entry.rank}
            </span>
            <span className="text-sm font-medium text-white flex-1">
              {cardNames[entry.cardSlug] ?? entry.cardSlug}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => moveUp(entry.rank)}
                disabled={entry.rank === 1}
                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-slate-300"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => moveDown(entry.rank, entries.length)}
                disabled={entry.rank === entries.length}
                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-slate-300"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <label className="block text-xs text-slate-400 mb-1">一言理由 (shortReason)</label>
              <input
                type="text"
                value={entry.shortReason}
                onChange={(e) => updateEntry(entry.rank, "shortReason", e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">詳細理由 (reason)</label>
              <textarea
                value={entry.reason}
                onChange={(e) => updateEntry(entry.rank, "reason", e.target.value)}
                rows={2}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">強みワード</label>
              <input
                type="text"
                value={entry.keyStrength}
                onChange={(e) => updateEntry(entry.rank, "keyStrength", e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Save className="w-4 h-4" />
          {saving ? "保存中..." : saved ? "保存しました ✓" : "ランキングを保存"}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main admin dashboard
// ─────────────────────────────────────────────
function AdminDashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [tab, setTab] = useState<"cards" | "rankings">("cards");
  const [cards, setCards] = useState<CardOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [revalidating, setRevalidating] = useState(false);

  const loadCards = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/api/admin/cards", "GET", password);
      setCards(data);
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const saveCard = async (updated: CardOverride) => {
    await apiFetch("/api/admin/cards", "POST", password, updated);
    setCards((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const revalidate = async () => {
    setRevalidating(true);
    try {
      await apiFetch("/api/admin/revalidate", "POST", password);
      alert("ページキャッシュをリセットしました");
    } catch {
      alert("リセット失敗");
    } finally {
      setRevalidating(false);
    }
  };

  const cardNames = Object.fromEntries(cards.map((c) => [c.id, c.name]));

  const tabs = [
    { id: "cards" as const, label: "カード管理" },
    { id: "rankings" as const, label: "ランキング編集" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Lock className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm">CryptoCardNavi 管理画面</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={revalidate}
            disabled={revalidating}
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
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Cards tab */}
        {tab === "cards" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">カード一覧 ({cards.length}件)</h2>
              <p className="text-xs text-slate-500">
                目のアイコンで公開/非公開を即時切替
              </p>
            </div>

            {loading ? (
              <p className="text-slate-400 text-sm">読み込み中...</p>
            ) : (
              <div className="space-y-2">
                {[...cards]
                  .sort((a, b) => (a.priorityRank ?? 99) - (b.priorityRank ?? 99))
                  .map((card) => (
                    <CardRow key={card.id} card={card} onSave={saveCard} />
                  ))}
              </div>
            )}

            <div className="mt-8 bg-slate-800 border border-slate-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-slate-300 mb-2">カード追加について</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                新しいカードを追加するには <code className="bg-slate-700 px-1 rounded">data/cards.ts</code> に
                カードデータを追加してください。追加後、このページのカード一覧に表示されます。
                その後、公開/非公開・順番・画像パスなどをここで管理できます。
              </p>
            </div>
          </div>
        )}

        {/* Rankings tab */}
        {tab === "rankings" && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-1">ランキング編集（総合）</h2>
              <p className="text-xs text-slate-400">
                順位変更・理由の編集ができます。保存後60秒でサイトに反映されます（キャッシュ更新で即時反映可）。
              </p>
            </div>
            <RankingEditor password={password} cardNames={cardNames} />
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

  if (!password) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <AdminDashboard password={password} onLogout={handleLogout} />;
}
