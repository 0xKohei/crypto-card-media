/**
 * 管理画面認証ユーティリティ
 *
 * パスワード検証の優先順位:
 *   1. admin_settings テーブルに admin_password_hash があれば PBKDF2 で検証
 *   2. なければ ADMIN_PASSWORD 環境変数と直接比較
 *   3. 最終フォールバック: "admin2026" (開発用のみ)
 *
 * Edge Runtime (Cloudflare Workers / Next.js Edge) で動作。
 * Node.js 固有 API を一切使わず、Web Crypto API のみ使用。
 */
import type { NextRequest } from "next/server";
import { getSupabaseClient } from "./supabase";

// ─── PBKDF2 定数 ──────────────────────────────────────────────────
const ITERATIONS = 100_000;
const HASH_ALGO = "SHA-256";
const SALT_BYTES = 16;
const KEY_BYTES = 32;
const FORMAT_PREFIX = "pbkdf2";

// ─── バイナリ ↔ 16進数変換 ────────────────────────────────────────

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array<ArrayBuffer> {
  const pairs = hex.match(/.{2}/g);
  if (!pairs) return new Uint8Array(0);
  // new Uint8Array(length) allocates a fresh ArrayBuffer — avoids SharedArrayBuffer ambiguity
  const arr = new Uint8Array(pairs.length);
  for (let i = 0; i < pairs.length; i++) {
    arr[i] = parseInt(pairs[i], 16);
  }
  return arr;
}

// タイミング攻撃対策: 文字列の長さが同じ場合のみ定数時間比較
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// ─── PBKDF2 ハッシュ生成 ──────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: HASH_ALGO },
    keyMaterial,
    KEY_BYTES * 8,
  );
  return `${FORMAT_PREFIX}:${toHex(salt.buffer)}:${toHex(bits)}`;
}

// ─── PBKDF2 ハッシュ検証 ──────────────────────────────────────────

export async function verifyHashedPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(":");
  if (parts.length !== 3 || parts[0] !== FORMAT_PREFIX) return false;
  const [, saltHex, expectedHashHex] = parts;
  const salt = fromHex(saltHex);
  if (salt.length === 0) return false;

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: HASH_ALGO },
    keyMaterial,
    KEY_BYTES * 8,
  );
  return timingSafeEqual(toHex(bits), expectedHashHex);
}

// ─── DB 読み書き ──────────────────────────────────────────────────

export async function getStoredPasswordHash(): Promise<string | null> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("admin_settings")
      .select("value")
      .eq("key", "admin_password_hash")
      .single();
    if (error || !data) return null;
    return (data as { value: string }).value ?? null;
  } catch {
    return null;
  }
}

export async function setAdminPasswordHash(newPassword: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase 未設定: パスワードをDBに保存できません");
  const hash = await hashPassword(newPassword);
  const { error } = await supabase
    .from("admin_settings")
    .upsert(
      { key: "admin_password_hash", value: hash, updated_at: new Date().toISOString() },
      { onConflict: "key" },
    );
  if (error) throw new Error(`パスワード保存失敗: ${error.message}`);
}

// ─── 認証検証（優先順位付き） ─────────────────────────────────────

/**
 * パスワード文字列を受け取り、認証可否を返す。
 *
 * 優先順位:
 *   1. DB に admin_password_hash があれば PBKDF2 検証
 *   2. なければ ADMIN_PASSWORD 環境変数と比較
 *   3. 最終フォールバック "admin2026"
 */
/**
 * パスワード文字列を受け取り、認証可否を返す。
 *
 * 優先順位:
 *   1. DB に admin_password_hash があれば PBKDF2 検証
 *   2. なければ ADMIN_PASSWORD 環境変数と比較
 *   3. NODE_ENV === "development" のときのみ "admin2026" フォールバックを許可
 *      → production では DB も ENV も未設定の場合はログイン不可（false を返す）
 */
export async function checkAuthPassword(password: string): Promise<boolean> {
  // 1. DB ハッシュ検証
  const storedHash = await getStoredPasswordHash();
  if (storedHash) {
    return verifyHashedPassword(password, storedHash);
  }

  // 2. 環境変数 ADMIN_PASSWORD
  const envPassword = process.env.ADMIN_PASSWORD;
  if (envPassword) {
    return timingSafeEqual(password, envPassword);
  }

  // 3. development のみ "admin2026" フォールバックを許可
  if (process.env.NODE_ENV === "development") {
    return timingSafeEqual(password, "admin2026");
  }

  // production で DB も ENV も未設定 → ログイン不可
  return false;
}

/**
 * NextRequest の Authorization ヘッダーからパスワードを取り出し認証する。
 * Bearer トークン方式: Authorization: Bearer <password>
 */
export async function verifyAdminRequest(req: NextRequest): Promise<boolean> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;
  const password = authHeader.slice(7);
  return checkAuthPassword(password);
}
