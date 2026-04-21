export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { checkAuthPassword, setAdminPasswordHash } from "@/lib/auth";

function ok(data: unknown = null) {
  return NextResponse.json({ success: true, data });
}
function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

const MIN_PASSWORD_LENGTH = 8;

/**
 * POST /api/admin/auth/password
 *
 * 管理パスワードを変更する。
 * Authorization: Bearer <currentPassword> で現在パスワードを検証してから保存。
 *
 * Body: { newPassword: string }
 */
export async function POST(req: NextRequest) {
  // 現在パスワードを Authorization ヘッダーから取得
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return err("Authorization ヘッダーが不正です", 401);
  }
  const currentPassword = authHeader.slice(7);

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return err("リクエストの解析に失敗しました", 400);
  }

  const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";

  // バリデーション
  if (!newPassword || newPassword.length < MIN_PASSWORD_LENGTH) {
    return err(`新しいパスワードは ${MIN_PASSWORD_LENGTH} 文字以上で入力してください`, 400);
  }

  // 現在パスワード検証
  let currentValid: boolean;
  try {
    currentValid = await checkAuthPassword(currentPassword);
  } catch (e) {
    console.error("[auth/password] 現在パスワード検証エラー:", e);
    return err("認証処理中にエラーが発生しました", 500);
  }
  if (!currentValid) {
    return err("現在のパスワードが正しくありません", 401);
  }

  // 新パスワードをハッシュ化して保存
  try {
    await setAdminPasswordHash(newPassword);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[auth/password] パスワード保存エラー:", msg);
    return err(`パスワードの保存に失敗しました: ${msg}`, 500);
  }

  return ok({ message: "パスワードを変更しました" });
}
