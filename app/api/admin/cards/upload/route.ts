export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { requireSupabaseClient } from "@/lib/supabase";

const BUCKET = "card-images";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const ALLOWED_EXTS = new Set(["jpg", "jpeg", "png", "webp", "gif", "svg"]);

function checkAuth(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD ?? "admin2026";
  return req.headers.get("authorization") === `Bearer ${password}`;
}

function err(msg: string, status = 400) {
  return NextResponse.json({ success: false, error: msg }, { status });
}

function getSupabase() {
  try {
    return { client: requireSupabaseClient(), error: null };
  } catch (e) {
    return { client: null, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * POST /api/admin/cards/upload
 * multipart/form-data: file (画像), slug (カード slug)
 *
 * - MIME type / 拡張子チェック (許可: jpeg/png/webp/gif/svg)
 * - ファイルサイズ上限 5MB
 * - アップロード先: card-images/{slug}/{timestamp}.{ext}
 * - 成功時: { success: true, url: "https://..." }
 * - Bucket not found 時: 具体的なセットアップ案内を返す
 */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return err("Unauthorized", 401);

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return err("FormData の解析に失敗しました");
  }

  const file = formData.get("file") as File | null;
  const slug = formData.get("slug") as string | null;

  if (!file) return err("file が必要です");
  if (!slug) return err("slug が必要です");

  // ── MIME type チェック ────────────────────────────────────────
  const mimeType = file.type.toLowerCase();
  if (!ALLOWED_TYPES.has(mimeType)) {
    return err(
      `許可されていないファイル形式です (${mimeType})。jpeg / png / webp / gif / svg のみ使用可能です。`,
    );
  }

  // ── 拡張子チェック ────────────────────────────────────────────
  const originalName = file.name;
  const dotIdx = originalName.lastIndexOf(".");
  const ext = dotIdx !== -1 ? originalName.slice(dotIdx + 1).toLowerCase() : "";
  if (!ALLOWED_EXTS.has(ext)) {
    return err(`許可されていない拡張子です (.${ext})。`);
  }

  // ── ファイルサイズチェック ────────────────────────────────────
  if (file.size > MAX_FILE_SIZE) {
    const mb = (file.size / 1024 / 1024).toFixed(1);
    return err(`ファイルサイズが大きすぎます (${mb}MB)。5MB 以下にしてください。`);
  }

  const { client: supabase, error: supabaseError } = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      {
        success: false,
        error: `Supabase 未設定: ${supabaseError}`,
        setupRequired: true,
      },
      { status: 503 },
    );
  }

  const storagePath = `cards/${slug}/${Date.now()}.${ext}`;

  let arrayBuffer: ArrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch (e) {
    return err(`ファイル読み込み失敗: ${e instanceof Error ? e.message : String(e)}`, 500);
  }

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, arrayBuffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    // Bucket not found の場合は具体的なガイダンスを返す
    if (uploadError.message.toLowerCase().includes("bucket")) {
      const supabaseUrl =
        process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const projectRef = supabaseUrl
        .replace("https://", "")
        .replace(".supabase.co", "")
        .split(".")[0];
      const storageUrl = projectRef
        ? `https://supabase.com/dashboard/project/${projectRef}/storage/buckets`
        : "https://supabase.com/dashboard";

      return NextResponse.json(
        {
          success: false,
          error: `Storage bucket "${BUCKET}" が存在しません。`,
          bucketMissing: true,
          setupUrl: storageUrl,
          setupInstructions: [
            `Supabase ダッシュボード → Storage → New bucket をクリック`,
            `Bucket name: ${BUCKET}`,
            `Public bucket: ON にして作成`,
            `作成後、再度アップロードしてください`,
          ],
        },
        { status: 503 },
      );
    }
    return err(`アップロード失敗: ${uploadError.message}`, 500);
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

  return NextResponse.json({ success: true, url: urlData.publicUrl });
}

/**
 * DELETE /api/admin/cards/upload?path=cards/slug/filename.ext
 * Supabase Storage から旧画像ファイルを削除する。
 * 画像差し替え時に呼び出すことでゴミファイルの蓄積を防ぐ。
 * Best-effort: 削除失敗してもアップロード全体は失敗しない。
 */
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return err("Unauthorized", 401);

  const path = req.nextUrl.searchParams.get("path");
  if (!path) return err("path が必要です");

  // パストラバーサル防止
  if (!path.startsWith("cards/") || path.includes("..") || path.includes("//")) {
    return err("無効なパスです");
  }

  const { client: supabase, error: supabaseError } = getSupabase();
  if (!supabase) return err(supabaseError ?? "Supabase 未設定", 503);

  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) {
    // 存在しないファイルの削除はエラーにしない
    if (error.message.toLowerCase().includes("not found")) {
      return NextResponse.json({ success: true, skipped: true });
    }
    return err(`削除失敗: ${error.message}`, 500);
  }

  return NextResponse.json({ success: true });
}
