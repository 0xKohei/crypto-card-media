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
  Plus,
  Trash2,
  Upload,
  Crop,
  X,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";

// ─────────────────────────────────────────────
// Health check types
// ─────────────────────────────────────────────
interface HealthResult {
  success: boolean;
  missing?: string[];
  database?: {
    cardsTableReachable?: boolean;
    rankingsTableReachable?: boolean;
    homepageFeaturedTableReachable?: boolean;
    isDbOnlyColumnExists?: boolean;
    bucketExists?: boolean;
  };
  dashboard?: {
    sqlUrl: string;
    storageUrl: string;
  };
}

// ─────────────────────────────────────────────
// Setup warning banner
// ─────────────────────────────────────────────
function SetupWarningBanner({ health }: { health: HealthResult }) {
  const missing = health.missing ?? [];
  if (missing.length === 0) return null;

  const dash = health.dashboard;
  const db = health.database;

  const items: Array<{ key: string; title: string; lines: Array<{ type: "text" | "code" | "link"; content: string }> }> = [];

  // テーブル未作成
  if (!db?.cardsTableReachable || !db?.rankingsTableReachable || !db?.homepageFeaturedTableReachable) {
    items.push({
      key: "tables",
      title: "データベーステーブルが存在しません",
      lines: [
        { type: "text", content: "supabase-schema.sql の内容を SQL Editor で実行してください" },
        ...(dash ? [{ type: "link" as const, content: dash.sqlUrl }] : []),
      ],
    });
  }

  // is_db_only カラム未追加
  if (missing.includes("column:cards.is_db_only")) {
    items.push({
      key: "migration",
      title: 'マイグレーション v3 が未適用 (is_db_only カラムがありません)',
      lines: [
        { type: "text", content: "supabase-migration-v3.sql の内容を SQL Editor で実行してください" },
        { type: "code", content: "ALTER TABLE cards ADD COLUMN IF NOT EXISTS is_db_only boolean DEFAULT false NOT NULL;" },
        ...(dash ? [{ type: "link" as const, content: dash.sqlUrl }] : []),
      ],
    });
  }

  // bucket 未作成
  if (missing.includes("bucket:card-images")) {
    items.push({
      key: "bucket",
      title: 'Storage bucket "card-images" が存在しません（画像アップロード不可）',
      lines: [
        { type: "text", content: "Supabase Dashboard → Storage → New bucket をクリック" },
        { type: "code", content: 'Bucket name: card-images  /  Public bucket: ON' },
        ...(dash ? [{ type: "link" as const, content: dash.storageUrl }] : []),
      ],
    });
  }

  if (items.length === 0) return null;

  return (
    <div className="mb-6 bg-red-950/40 border border-red-800 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-red-900/40 border-b border-red-800">
        <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
        <p className="text-sm font-semibold text-red-300">
          {items.length}件のセットアップが未完了です
        </p>
      </div>
      <div className="p-4 space-y-3">
        {items.map((item) => (
          <div key={item.key} className="bg-red-900/25 border border-red-800/40 rounded-lg p-3 space-y-2">
            <p className="text-xs font-bold text-red-300">{item.title}</p>
            {item.lines.map((line, i) => {
              if (line.type === "link") {
                return (
                  <a
                    key={i}
                    href={line.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 break-all"
                  >
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    {line.content}
                  </a>
                );
              }
              if (line.type === "code") {
                return (
                  <code key={i} className="block bg-red-950/60 border border-red-900 rounded px-2 py-1 text-xs text-red-200 font-mono break-all">
                    {line.content}
                  </code>
                );
              }
              return (
                <p key={i} className="text-xs text-red-200">
                  {line.content}
                </p>
              );
            })}
          </div>
        ))}
        <p className="text-xs text-red-400 pt-1">
          解消後は「再読込」ボタンで再確認できます。
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface AdminCard {
  id: string;
  name: string;
  slug: string;
  isVisible: boolean;
  isDbOnly?: boolean;
  network: string;
  keyStrength: string;
  priorityRank: number;
  referralUrl: string;
  officialUrl: string;
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
// Crop modal
// ─────────────────────────────────────────────
const CARD_ASPECT = 85.6 / 53.98; // ISO/IEC 7810 ID-1 card ratio ≈ 1.586
// ISO/IEC 7810 corner radius ≈ 3.18 mm on 53.98 mm height → ~5.9%
const CARD_CORNER_RATIO = 3.18 / 53.98;

function CropModal({
  src,
  onCrop,
  onClose,
}: {
  src: string;
  onCrop: (blob: Blob) => void;
  onClose: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [imgDims, setImgDims] = useState({ w: 0, h: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.8); // fraction of image width occupied by crop box

  // Refs hold latest values — avoids stale-closure in event handlers registered once
  const imgDimsRef = useRef({ w: 0, h: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(0.8);
  const dragRef = useRef<{ sx: number; sy: number; px: number; py: number } | null>(null);

  // Derived box dimensions
  const boxW = imgDims.w * zoom;
  const boxH = boxW / CARD_ASPECT;
  const cornerPx = Math.round(boxH * CARD_CORNER_RATIO);

  const clampPos = (px: number, py: number, bw: number, bh: number, iw: number, ih: number) => ({
    x: Math.max(0, Math.min(px, iw - bw)),
    y: Math.max(0, Math.min(py, ih - bh)),
  });

  const onImgLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    const w = img.clientWidth;
    const h = img.clientHeight;
    imgDimsRef.current = { w, h };
    setImgDims({ w, h });

    const z = 0.8;
    zoomRef.current = z;
    const bw = w * z;
    const bh = bw / CARD_ASPECT;
    const px = (w - bw) / 2;
    const py = Math.max(0, (h - bh) / 2);
    posRef.current = { x: px, y: py };
    setPos({ x: px, y: py });
    setReady(true);
  };

  const handleZoom = (newZ: number) => {
    const { w, h } = imgDimsRef.current;
    const oldBw = w * zoomRef.current;
    const oldBh = oldBw / CARD_ASPECT;
    const newBw = w * newZ;
    const newBh = newBw / CARD_ASPECT;
    // Keep the center of the crop box fixed while resizing
    const cx = posRef.current.x + oldBw / 2;
    const cy = posRef.current.y + oldBh / 2;
    const clamped = clampPos(cx - newBw / 2, cy - newBh / 2, newBw, newBh, w, h);
    zoomRef.current = newZ;
    posRef.current = clamped;
    setZoom(newZ);
    setPos(clamped);
  };

  // Mouse drag
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const { w, h } = imgDimsRef.current;
      const z = zoomRef.current;
      const bw = w * z;
      const bh = bw / CARD_ASPECT;
      const dx = e.clientX - dragRef.current.sx;
      const dy = e.clientY - dragRef.current.sy;
      const clamped = clampPos(dragRef.current.px + dx, dragRef.current.py + dy, bw, bh, w, h);
      posRef.current = clamped;
      setPos(clamped);
    };
    const up = () => { dragRef.current = null; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []); // empty — reads latest values via refs

  // Touch drag
  useEffect(() => {
    const move = (e: TouchEvent) => {
      if (!dragRef.current) return;
      const t = e.touches[0];
      const { w, h } = imgDimsRef.current;
      const z = zoomRef.current;
      const bw = w * z;
      const bh = bw / CARD_ASPECT;
      const dx = t.clientX - dragRef.current.sx;
      const dy = t.clientY - dragRef.current.sy;
      const clamped = clampPos(dragRef.current.px + dx, dragRef.current.py + dy, bw, bh, w, h);
      posRef.current = clamped;
      setPos(clamped);
      e.preventDefault();
    };
    const end = () => { dragRef.current = null; };
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
    return () => {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { sx: e.clientX, sy: e.clientY, px: posRef.current.x, py: posRef.current.y };
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    dragRef.current = { sx: t.clientX, sy: t.clientY, px: posRef.current.x, py: posRef.current.y };
    e.preventDefault();
  };

  // Update preview canvas whenever pos/zoom/ready changes
  useEffect(() => {
    if (!ready) return;
    const img = imgRef.current;
    const canvas = previewCanvasRef.current;
    if (!img || !canvas) return;

    const { w } = imgDimsRef.current;
    const z = zoomRef.current;
    const bw = w * z;
    const bh = bw / CARD_ASPECT;

    const nw = img.naturalWidth > 0 ? img.naturalWidth : imgDimsRef.current.w;
    const nh = img.naturalHeight > 0 ? img.naturalHeight : imgDimsRef.current.h;
    const scaleX = nw / imgDimsRef.current.w;
    const scaleY = nh / imgDimsRef.current.h;

    const outW = 240;
    const outH = Math.round(outW / CARD_ASPECT);
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rx = Math.round(outH * CARD_CORNER_RATIO);
    ctx.clearRect(0, 0, outW, outH);
    // Clip to rounded rect
    ctx.beginPath();
    ctx.roundRect(0, 0, outW, outH, rx);
    ctx.clip();
    ctx.drawImage(
      img,
      posRef.current.x * scaleX,
      posRef.current.y * scaleY,
      bw * scaleX,
      bh * scaleY,
      0, 0, outW, outH,
    );
  }, [pos, zoom, ready]);

  const doCrop = () => {
    const img = imgRef.current;
    if (!img) return;
    const { w } = imgDimsRef.current;
    const z = zoomRef.current;
    const bw = w * z;
    const bh = bw / CARD_ASPECT;
    // SVG naturalWidth is 0 in some browsers — fall back to rendered size
    const nw = img.naturalWidth > 0 ? img.naturalWidth : imgDimsRef.current.w;
    const nh = img.naturalHeight > 0 ? img.naturalHeight : imgDimsRef.current.h;
    const scaleX = nw / imgDimsRef.current.w;
    const scaleY = nh / imgDimsRef.current.h;
    const canvas = document.createElement("canvas");
    const outW = 860; // Retina-friendly output
    const outH = Math.round(outW / CARD_ASPECT);
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(
      img,
      posRef.current.x * scaleX,
      posRef.current.y * scaleY,
      bw * scaleX,
      bh * scaleY,
      0, 0, outW, outH,
    );
    canvas.toBlob((blob) => {
      if (blob) onCrop(blob);
    }, "image/webp", 0.92);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Crop className="w-4 h-4 text-blue-400" />
            <h3 className="font-bold text-white text-sm">トリミング</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom slider */}
        <div className="px-4 pt-3 pb-2 shrink-0 space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 shrink-0 w-16">範囲 {Math.round(zoom * 100)}%</span>
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.01"
              value={zoom}
              onChange={(e) => handleZoom(Number(e.target.value))}
              disabled={!ready}
              className="flex-1 accent-blue-500 disabled:opacity-40"
            />
          </div>
          <p className="text-xs text-slate-500">
            ドラッグで移動 · スライダーで範囲調整 · 比率固定（ISO カード規格 1.586:1）
          </p>
        </div>

        {/* Crop area + preview side by side */}
        <div className="flex gap-4 px-4 pb-4 min-h-0 flex-1 overflow-hidden">
          {/* Main crop area */}
          <div className="flex-1 overflow-auto">
            <div className="relative inline-block select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={src}
                alt="crop target"
                className="max-w-full block"
                style={{ maxHeight: "48vh" }}
                onLoad={onImgLoad}
                draggable={false}
              />
              {ready && (
                <>
                  {/* Dark overlay outside crop box — 4 rectangles */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 bg-black/60"
                      style={{ height: pos.y }} />
                    <div className="absolute left-0 right-0 bottom-0 bg-black/60"
                      style={{ height: imgDims.h - pos.y - boxH }} />
                    <div className="absolute bg-black/60"
                      style={{ top: pos.y, left: 0, width: pos.x, height: boxH }} />
                    <div className="absolute bg-black/60"
                      style={{ top: pos.y, left: pos.x + boxW, right: 0, height: boxH }} />
                  </div>
                  {/* Draggable crop box with rounded corners matching card spec */}
                  <div
                    className="absolute border-2 border-white/90 cursor-move touch-none"
                    style={{
                      left: pos.x,
                      top: pos.y,
                      width: boxW,
                      height: boxH,
                      borderRadius: cornerPx,
                    }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                  >
                    {/* Corner L-brackets */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white" style={{ borderRadius: `${cornerPx}px 0 0 0` }} />
                    <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white" style={{ borderRadius: `0 ${cornerPx}px 0 0` }} />
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white" style={{ borderRadius: `0 0 0 ${cornerPx}px` }} />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white" style={{ borderRadius: `0 0 ${cornerPx}px 0` }} />
                    {/* Center crosshair hint */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                      <div className="relative w-6 h-6">
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Preview panel */}
          {ready && (
            <div className="shrink-0 w-32 flex flex-col items-center gap-2 pt-1">
              <span className="text-xs text-slate-400">プレビュー</span>
              <canvas
                ref={previewCanvasRef}
                className="w-full shadow-lg"
                style={{ borderRadius: Math.round((120 / CARD_ASPECT) * CARD_CORNER_RATIO) }}
              />
              <span className="text-[10px] text-slate-500 text-center leading-tight">
                実際の表示に近い角丸で確認
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 flex justify-between items-center shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white"
          >
            キャンセル
          </button>
          <button
            onClick={doCrop}
            disabled={!ready}
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-xl"
          >
            <Crop className="w-3.5 h-3.5" />
            この範囲で切り取る
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// New card modal
// ─────────────────────────────────────────────
function NewCardModal({
  cardList,
  password,
  onClose,
  onCreate,
  showToast,
}: {
  cardList: AdminCard[];
  password: string;
  onClose: () => void;
  onCreate: (card: AdminCard) => void;
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [network, setNetwork] = useState("Visa");
  const [fxFee, setFxFee] = useState("");
  const [cashbackRate, setCashbackRate] = useState("");
  const [issuanceFee, setIssuanceFee] = useState("");
  const [officialUrl, setOfficialUrl] = useState("");
  const [referralUrl, setReferralUrl] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [slugError, setSlugError] = useState("");

  const validateSlug = (s: string): string => {
    if (!s) return "";
    if (!/^[a-z0-9-]+$/.test(s)) return "小文字英数字とハイフンのみ使用可能です";
    if (cardList.some((c) => c.slug === s || c.id === s)) return "このslugはすでに使用されています";
    return "";
  };

  const handleSlugChange = (v: string) => {
    const cleaned = v.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    setSlug(cleaned);
    setSlugError(validateSlug(cleaned));
  };

  const handleCreate = async () => {
    const se = validateSlug(slug);
    if (se) { setSlugError(se); return; }
    if (!name.trim()) { showToast("カード名を入力してください", "error"); return; }
    setSaving(true);
    try {
      await apiFetch("/api/admin/cards", "POST", password, {
        id: slug,
        slug,
        name,
        network,
        fxFee,
        cashbackRate,
        issuanceFee,
        officialUrl,
        referralUrl,
        shortDescription,
        cardImage: "",
        isVisible: true,
        is_db_only: true,
        priorityRank: 99,
        keyStrength: "",
        longDescription: "",
        monthlyFee: "—",
        annualFee: "",
        atmFee: "—",
        spendingLimit: "—",
        cashbackDetails: "",
        applePay: false,
        googlePay: false,
        physicalCard: true,
        virtualCard: true,
        stablecoinSupport: false,
        regionAvailability: [],
        tags: [],
        pros: [],
        cons: [],
        useCases: [],
        topupMethods: [],
        supportedAssets: [],
        supportedChains: [],
        custodyType: "custodial",
        kycLevel: "standard",
      });

      onCreate({
        id: slug,
        slug,
        name,
        isVisible: true,
        isDbOnly: true,
        network,
        keyStrength: "",
        priorityRank: 99,
        referralUrl,
        officialUrl,
        cardImage: "",
        shortDescription,
        longDescription: "",
        fxFee,
        cashbackRate,
        cashbackDetails: "",
        issuanceFee,
        monthlyFee: "—",
        annualFee: "",
        atmFee: "—",
        spendingLimit: "—",
        applePay: false,
        googlePay: false,
        physicalCard: true,
        virtualCard: true,
        stablecoinSupport: false,
        regionAvailability: [],
        tags: [],
        pros: [],
        cons: [],
        useCases: [],
        topupMethods: [],
        supportedAssets: [],
        supportedChains: [],
        custodyType: "custodial",
        kycLevel: "standard",
      });
      showToast(`${name} を追加しました`, "success");
      onClose();
    } catch (e) {
      showToast(`追加失敗: ${e instanceof Error ? e.message : String(e)}`, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-900">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-400" />
            <h3 className="font-bold text-white">新規カード追加</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* slug */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              slug <span className="text-red-400">*</span>
              <span className="text-slate-500 font-normal ml-1">— URL・ID に使用。後から変更不可</span>
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="例: new-card-name"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {slugError && <p className="text-red-400 text-xs mt-1">{slugError}</p>}
            {slug && !slugError && (
              <p className="text-slate-500 text-xs mt-1">URL: /cards/{slug}</p>
            )}
          </div>

          {/* name */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              カード名 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: ExampleCard"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* network */}
          <SelectField
            label="ネットワーク"
            value={network}
            onChange={setNetwork}
            options={[
              { value: "Visa", label: "Visa" },
              { value: "Mastercard", label: "Mastercard" },
              { value: "Both", label: "Visa + Mastercard" },
              { value: "Other", label: "その他" },
            ]}
          />

          {/* fees */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="FX手数料" value={fxFee} onChange={setFxFee} />
            <Field label="還元率" value={cashbackRate} onChange={setCashbackRate} />
            <Field label="発行手数料" value={issuanceFee} onChange={setIssuanceFee} />
          </div>

          {/* urls */}
          <Field label="公式URL" value={officialUrl} onChange={setOfficialUrl} />
          <Field label="紹介URL (referralUrl)" value={referralUrl} onChange={setReferralUrl} />

          {/* description */}
          <TextareaField
            label="一言説明 (shortDescription)"
            value={shortDescription}
            onChange={setShortDescription}
            rows={2}
          />

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-400">
            画像・詳細スペックはカード追加後に編集フォームから設定できます。
          </div>
        </div>

        <div className="p-5 border-t border-slate-700 flex justify-end gap-3 sticky bottom-0 bg-slate-900">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white"
          >
            キャンセル
          </button>
          <button
            onClick={handleCreate}
            disabled={saving || !!slugError || !slug || !name.trim()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            {saving ? "追加中..." : "カードを追加"}
          </button>
        </div>
      </div>
    </div>
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
        <p className="text-xs text-slate-500 mt-4 text-center leading-relaxed">
          認証の優先順位: DB保存ハッシュ → 環境変数{" "}
          <code className="bg-slate-800 px-1 rounded text-slate-400">ADMIN_PASSWORD</code>
          <br />
          <span className="text-slate-600">
            開発環境のみ{" "}
            <code className="bg-slate-800 px-1 rounded">admin2026</code>{" "}
            が有効 · 本番は必ず設定が必要
          </span>
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
  password,
  onSave,
  onDelete,
  showToast,
}: {
  card: AdminCard;
  password: string;
  onSave: (updated: AdminCard) => Promise<void>;
  onDelete?: (slug: string) => Promise<void>;
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<AdminCard>(card);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [showCrop, setShowCrop] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(card);
  }, [card]);

  const set = <K extends keyof AdminCard>(field: K, value: AdminCard[K]) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setCroppedBlob(null);
    const url = URL.createObjectURL(f);
    setImagePreviewUrl(url);
    e.target.value = ""; // reset so same file can be reselected
  };

  const handleCropDone = (blob: Blob) => {
    setCroppedBlob(blob);
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImagePreviewUrl(URL.createObjectURL(blob));
    setShowCrop(false);
  };

  const resetImage = () => {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImageFile(null);
    setImagePreviewUrl(null);
    setCroppedBlob(null);
  };

  const handleUpload = async () => {
    const uploadTarget = croppedBlob ?? imageFile;
    if (!uploadTarget) return;
    setUploadingImage(true);
    try {
      // Best-effort: delete old Storage file before uploading new one
      if (form.cardImage) {
        const oldMatch = form.cardImage.match(/\/card-images\/(cards\/.+?)(?:\?|$)/);
        if (oldMatch) {
          fetch(`/api/admin/cards/upload?path=${encodeURIComponent(oldMatch[1])}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${password}` },
          }).catch(() => {}); // fire-and-forget; failure is non-critical
        }
      }

      const fd = new FormData();
      const ext = croppedBlob ? "webp" : (imageFile?.name.split(".").pop() ?? "jpg");
      fd.append("file", uploadTarget, `${form.slug}.${ext}`);
      fd.append("slug", form.slug);
      const res = await fetch("/api/admin/cards/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${password}` },
        body: fd,
      });
      const json = (await res.json()) as {
        success: boolean;
        url?: string;
        error?: string;
        bucketMissing?: boolean;
        setupUrl?: string;
        setupInstructions?: string[];
      };
      if (!json.success) {
        if (json.bucketMissing) {
          showToast(
            `Storage bucket "card-images" が未作成です。supabase-migration-v3.sql を実行してください。`,
            "error",
          );
        } else {
          throw new Error(json.error ?? "Unknown error");
        }
        return;
      }
      const newUrl = json.url ?? "";
      // Storage パスを抽出 — DB 保存失敗時のロールバックに使う
      const newStoragePath =
        newUrl.match(/\/card-images\/(cards\/.+?)(?:\?|$)/)?.[1] ?? null;

      const updated = { ...form, cardImage: newUrl };
      setForm(updated);
      // Auto-save: DB 保存失敗なら Storage ファイルをロールバック削除してフォームを戻す
      try {
        await onSave(updated);
        showToast("画像をアップロードして保存しました", "success");
        resetImage();
      } catch (saveErr) {
        // Rollback: アップロード済みファイルを削除して Storage/DB の不整合を防ぐ
        if (newStoragePath) {
          fetch(`/api/admin/cards/upload?path=${encodeURIComponent(newStoragePath)}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${password}` },
          }).catch(() => {});
        }
        setForm(form); // フォームを保存前の状態に戻す
        showToast(
          `DB保存失敗 (アップロードはロールバックしました): ${saveErr instanceof Error ? saveErr.message : String(saveErr)}`,
          "error",
        );
      }
    } catch (e) {
      showToast(`アップロード失敗: ${e instanceof Error ? e.message : String(e)}`, "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    setDeleting(true);
    try {
      await onDelete(form.slug);
      showToast(`${form.name} を削除しました`, "success");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      showToast(`削除失敗: ${msg}`, "error");
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

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
    // Require confirmation before hiding a live card — accidental 1-click hide is hard to notice
    if (form.isVisible) {
      if (!window.confirm(`「${form.name}」を非公開にしますか？\nサイトから即座に非表示になります。`)) {
        return;
      }
    }
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
    <>
      {showCrop && imagePreviewUrl && (
        <CropModal
          src={imagePreviewUrl}
          onCrop={handleCropDone}
          onClose={() => setShowCrop(false)}
        />
      )}

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
              {form.isDbOnly && (
                <span className="text-xs bg-blue-900/60 text-blue-300 border border-blue-700/40 px-1.5 py-0.5 rounded">
                  DB専用
                </span>
              )}
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

          {/* Delete button (DB-only cards only) */}
          {form.isDbOnly && onDelete && (
            <div onClick={(e) => e.stopPropagation()}>
              {confirmDelete ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-red-400">「{form.name}」を削除？</span>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="text-xs px-2 py-1 bg-red-700 hover:bg-red-600 disabled:opacity-50 rounded text-white"
                  >
                    {deleting ? "削除中" : "削除"}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  title="カードを削除"
                  className="p-1.5 rounded hover:bg-red-900/40 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {open ? (
            <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
          )}
        </div>

      {/* Edit form */}
      {open && (
        <div className="p-5 bg-slate-900 space-y-6">

          {/* ── 券面画像 ── */}
          <section>
            <SectionHeading title="券面画像" />
            <div className="space-y-3">
              {/* Current image preview */}
              {form.cardImage && !imagePreviewUrl && (
                <div className="flex items-center gap-3 p-2 bg-slate-800 rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.cardImage}
                    alt="現在の画像"
                    className="h-12 rounded object-contain flex-shrink-0"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <p className="text-xs text-slate-400 break-all font-mono truncate flex-1">{form.cardImage}</p>
                </div>
              )}

              {/* Upload area */}
              <div className="border border-dashed border-slate-600 rounded-xl p-4">
                {!imagePreviewUrl ? (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      画像を選択
                    </button>
                    <span className="text-xs text-slate-500">PNG・JPEG・WebP・SVG</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreviewUrl}
                      alt="プレビュー"
                      className="max-h-32 rounded-lg object-contain"
                    />
                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setShowCrop(true)}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300"
                      >
                        <Crop className="w-3 h-3" />
                        トリミング
                      </button>
                      <button
                        type="button"
                        onClick={handleUpload}
                        disabled={uploadingImage}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg text-white"
                      >
                        <Upload className="w-3 h-3" />
                        {uploadingImage ? "アップロード中..." : "アップロードして反映"}
                      </button>
                      <button
                        type="button"
                        onClick={resetImage}
                        className="text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-400"
                      >
                        リセット
                      </button>
                    </div>
                    {croppedBlob && (
                      <p className="text-xs text-emerald-400">✓ トリミング済み</p>
                    )}
                  </div>
                )}
              </div>

              {/* Manual URL input */}
              <Field
                label="画像URL (直接入力も可)"
                value={form.cardImage ?? ""}
                onChange={(v) => set("cardImage", v)}
              />
            </div>
          </section>

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
                label="紹介URL / 申込リンク (referralUrl)"
                value={form.referralUrl ?? ""}
                onChange={(v) => set("referralUrl", v)}
                className="sm:col-span-2"
              />
              <Field
                label="公式URL (officialUrl)"
                value={form.officialUrl ?? ""}
                onChange={(v) => set("officialUrl", v)}
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
    </>
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
// ─────────────────────────────────────────────
// Password change section
// ─────────────────────────────────────────────
function PasswordChangeSection({
  password,
  showToast,
}: {
  password: string;
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [saving, setSaving] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSave = async () => {
    if (newPw.length < 8) {
      showToast("新しいパスワードは 8 文字以上で入力してください", "error");
      return;
    }
    if (newPw !== confirmPw) {
      showToast("新しいパスワードと確認用パスワードが一致しません", "error");
      return;
    }
    if (newPw === currentPw) {
      showToast("新しいパスワードは現在のパスワードと異なるものにしてください", "error");
      return;
    }
    setSaving(true);
    try {
      await apiFetch("/api/admin/auth/password", "POST", currentPw, { newPassword: newPw });
      showToast(
        "パスワードを変更しました。ログアウトして新しいパスワードで再ログインしてください",
        "success",
      );
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } catch (e) {
      showToast(`変更失敗: ${e instanceof Error ? e.message : String(e)}`, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-1">認証設定</h2>
        <p className="text-xs text-slate-400">
          管理画面のログインパスワードを変更します。変更後は DB にハッシュとして保存されます。
        </p>
      </div>

      {/* 優先順位の説明 */}
      <div className="mb-6 bg-slate-800 border border-slate-700 rounded-xl p-4 text-xs text-slate-400 space-y-1.5">
        <p className="font-semibold text-slate-300">認証の優先順位</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>DB に保存されたパスワードハッシュ（このフォームで変更したもの）</li>
          <li>環境変数 <code className="bg-slate-700 px-1 rounded">ADMIN_PASSWORD</code></li>
          <li className="text-slate-500">
            開発環境のみ: <code className="bg-slate-700 px-1 rounded">admin2026</code>{" "}
            （production では無効）
          </li>
        </ol>
        <p className="text-slate-500 pt-1">
          ※ DBハッシュを設定すると以後はそちらが優先されます。
          環境変数は DBハッシュを忘れた場合のリカバリ手段として保持してください。
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md space-y-4">
        {/* Current password */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">現在のパスワード</label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              placeholder="現在のパスワードを入力"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowCurrent((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New password */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            新しいパスワード{" "}
            <span className="text-slate-500 font-normal">（8文字以上）</span>
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="新しいパスワードを入力"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowNew((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {newPw.length > 0 && newPw.length < 8 && (
            <p className="text-xs text-red-400 mt-1">8文字以上で入力してください</p>
          )}
        </div>

        {/* Confirm new password */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">新しいパスワード（確認）</label>
          <input
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            placeholder="もう一度入力"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {confirmPw.length > 0 && newPw !== confirmPw && (
            <p className="text-xs text-red-400 mt-1">パスワードが一致しません</p>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !currentPw || !newPw || !confirmPw}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors w-full justify-center"
        >
          <Save className="w-4 h-4" />
          {saving ? "保存中..." : "パスワードを変更する"}
        </button>
      </div>

      {/* Migration SQL note */}
      <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-xs text-slate-400 space-y-2">
        <p className="font-semibold text-slate-300">初回セットアップ: admin_settings テーブルの作成</p>
        <p>パスワードをDB保存するには Supabase に以下のテーブルが必要です:</p>
        <code className="block bg-slate-900 border border-slate-700 rounded px-3 py-2 font-mono text-slate-300 text-[11px] whitespace-pre">
{`CREATE TABLE IF NOT EXISTS admin_settings (
  key        text PRIMARY KEY,
  value      text NOT NULL,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;`}
        </code>
        <p className="text-slate-500">
          テーブルがない場合、パスワード変更は失敗します（環境変数での認証は引き続き有効です）。
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
function AdminDashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [tab, setTab] = useState<"cards" | "rankings" | "featured" | "auth">("cards");
  const [cards, setCards] = useState<AdminCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [revalidating, setRevalidating] = useState(false);
  const [showNewCard, setShowNewCard] = useState(false);
  const [health, setHealth] = useState<HealthResult | null>(null);
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

  const loadHealth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/health");
      const data = (await res.json()) as HealthResult;
      setHealth(data);
    } catch {
      // Health check failure is non-critical; silently ignore
    }
  }, []);

  useEffect(() => {
    loadCards();
    loadHealth();
  }, [loadCards, loadHealth]);

  const saveCard = async (updated: AdminCard) => {
    await apiFetch("/api/admin/cards", "POST", password, updated);
    setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const deleteCard = async (slug: string) => {
    const res = await fetch(`/api/admin/cards?slug=${encodeURIComponent(slug)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${password}` },
    });
    const json = (await res.json()) as { success: boolean; error?: string; blocked?: boolean };
    if (!json.success) throw new Error(json.error ?? "削除失敗");
    setCards((prev) => prev.filter((c) => c.slug !== slug));
  };

  const onCardCreated = (card: AdminCard) => {
    setCards((prev) => [...prev, card]);
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
            { id: "auth" as const, label: "認証設定" },
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
            {showNewCard && (
              <NewCardModal
                cardList={cards}
                password={password}
                onClose={() => setShowNewCard(false)}
                onCreate={onCardCreated}
                showToast={showToast}
              />
            )}

            {/* Default password warning */}
            {password === "admin2026" && (
              <div className="mb-5 bg-amber-950/40 border border-amber-700 rounded-xl flex items-start gap-3 px-4 py-3">
                <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-300">開発用デフォルトパスワードを使用中</p>
                  <p className="text-xs text-amber-400 mt-0.5">
                    このパスワードは development 環境専用です。本番デプロイ前に「認証設定」タブでパスワードを変更するか、
                    環境変数{" "}
                    <code className="bg-amber-900/40 px-1 rounded font-mono">ADMIN_PASSWORD</code>{" "}
                    を設定してください。production では <code className="bg-amber-900/40 px-1 rounded font-mono">admin2026</code> は使用不可です。
                  </p>
                </div>
              </div>
            )}

            {/* Supabase setup warnings */}
            {health && <SetupWarningBanner health={health} />}

            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold">カード管理</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  カード行をクリックして展開 · 目のアイコンで公開/非公開を即切替 · 保存後に「キャッシュ更新」で即時反映
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowNewCard(true)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
                  新規追加
                </button>
                <button
                  onClick={loadCards}
                  disabled={loading}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors text-slate-400"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                  再読込
                </button>
              </div>
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
                    password={password}
                    onSave={saveCard}
                    onDelete={card.isDbOnly ? deleteCard : undefined}
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

        {/* ── Auth settings tab ── */}
        {tab === "auth" && (
          <PasswordChangeSection
            password={password}
            showToast={showToast}
          />
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
