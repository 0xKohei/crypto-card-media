#!/usr/bin/env bash
# ================================================================
# CryptoCardNavi — ローカル環境セットアップスクリプト
#
# 使い方:
#   bash scripts/setup.sh \
#     "https://your-project.supabase.co" \
#     "eyJhbGci...service-role-key..."
#
# または環境変数で渡す:
#   SUPABASE_URL="https://..." SUPABASE_SERVICE_ROLE_KEY="eyJ..." bash scripts/setup.sh
# ================================================================

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env.local"
SCHEMA_FILE="$PROJECT_ROOT/supabase-schema.sql"
HEALTH_URL="http://localhost:3000/api/admin/health"

# ── カラー出力 ──────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

info()    { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC}   $1"; }
warn()    { echo -e "${YELLOW}[WARN]${NC} $1"; }
error()   { echo -e "${RED}[ERR]${NC}  $1"; }

# ── 引数または環境変数から値を取得 ────────────────────────────────
SUPABASE_URL="${1:-${SUPABASE_URL:-}}"
SERVICE_ROLE_KEY="${2:-${SUPABASE_SERVICE_ROLE_KEY:-}}"

# 不足チェック
MISSING=()
if [ -z "$SUPABASE_URL" ];     then MISSING+=("SUPABASE_URL (1番目の引数)"); fi
if [ -z "$SERVICE_ROLE_KEY" ]; then MISSING+=("SUPABASE_SERVICE_ROLE_KEY (2番目の引数)"); fi

if [ ${#MISSING[@]} -gt 0 ]; then
  error "必要な値が不足しています:"
  for m in "${MISSING[@]}"; do
    echo "  - $m"
  done
  echo ""
  echo "使い方:"
  echo '  bash scripts/setup.sh "https://xxx.supabase.co" "eyJ...service-role-key..."'
  exit 1
fi

# ── Step 1: .env.local を生成 ─────────────────────────────────────
info "Step 1: .env.local を生成"

cat > "$ENV_FILE" << EOF
# 自動生成: $(date)
# setup.sh によって作成されました

NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
SUPABASE_SERVICE_ROLE_KEY=${SERVICE_ROLE_KEY}

# 管理画面パスワード (デフォルト: admin2026 — 本番では変更してください)
# ADMIN_PASSWORD=your-strong-password
EOF

success ".env.local を作成しました: $ENV_FILE"

# ── Step 2: Supabase テーブル作成を試みる ────────────────────────
info "Step 2: Supabase テーブルの作成を試みます"

# プロジェクト ref を URL から抽出
PROJECT_REF=$(echo "$SUPABASE_URL" | sed 's|https://||' | sed 's|\.supabase\.co.*||')
info "  Project ref: $PROJECT_REF"

# supabase-schema.sql からテーブル作成 SQL だけを抽出
# (Supabase REST API は DDL を直接受け付けないため Management API を試みる)
SCHEMA_SQL=$(cat "$SCHEMA_FILE" 2>/dev/null || echo "")

if [ -n "$SCHEMA_SQL" ]; then
  # Supabase Management API で SQL 実行 (Personal Access Token が必要)
  # PAT が SUPABASE_ACCESS_TOKEN にあれば自動実行
  if [ -n "${SUPABASE_ACCESS_TOKEN:-}" ]; then
    info "  Management API 経由でスキーマを適用します..."
    RESPONSE=$(curl -s -o /tmp/schema_result.json -w "%{http_code}" \
      -X POST "https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query" \
      -H "Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}" \
      -H "Content-Type: application/json" \
      -d "$(jq -n --arg sql "$SCHEMA_SQL" '{"query": $sql}')" 2>/dev/null)

    if [ "$RESPONSE" = "200" ]; then
      success "  スキーマを自動適用しました"
    else
      warn "  Management API でのスキーマ適用に失敗 (HTTP $RESPONSE)"
      warn "  手動で supabase-schema.sql を実行してください (Step 3 参照)"
    fi
  else
    warn "  SUPABASE_ACCESS_TOKEN が未設定のため、スキーマの自動適用をスキップ"
    warn "  → 手動対応が必要 (後述の Step 3 を参照)"
  fi
else
  warn "  supabase-schema.sql が見つかりません"
fi

# ── Step 3: dev server を再起動 ──────────────────────────────────
info "Step 3: 開発サーバーを起動します"
cd "$PROJECT_ROOT"

# 既存の next dev プロセスを終了
if pgrep -f "next dev" > /dev/null 2>&1; then
  info "  既存の next dev を停止します..."
  pkill -f "next dev" 2>/dev/null || true
  sleep 2
fi

# バックグラウンドで起動
info "  npm run dev をバックグラウンドで起動..."
nohup npm run dev > /tmp/nextdev.log 2>&1 &
DEV_PID=$!
echo $DEV_PID > /tmp/nextdev.pid
info "  PID: $DEV_PID (ログ: /tmp/nextdev.log)"

# 起動待ち (最大 30 秒)
info "  起動を待機しています..."
for i in $(seq 1 30); do
  if curl -s "http://localhost:3000" > /dev/null 2>&1; then
    success "  開発サーバーが起動しました"
    break
  fi
  sleep 1
  if [ $i -eq 30 ]; then
    warn "  30秒待ってもサーバーが起動しませんでした。/tmp/nextdev.log を確認してください"
  fi
done

# ── Step 4: health check ─────────────────────────────────────────
info "Step 4: 接続確認 (health check)"
sleep 2

HEALTH_RESPONSE=$(curl -s "$HEALTH_URL" 2>/dev/null || echo '{"error":"connection_refused"}')
echo "$HEALTH_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$HEALTH_RESPONSE"

HAS_URL=$(echo "$HEALTH_RESPONSE" | grep -o '"hasUrl":true' | wc -l | tr -d ' ')
HAS_KEY=$(echo "$HEALTH_RESPONSE" | grep -o '"hasServiceRoleKey":true' | wc -l | tr -d ' ')
CARDS_OK=$(echo "$HEALTH_RESPONSE" | grep -o '"cardsTableReachable":true' | wc -l | tr -d ' ')

if [ "$HAS_URL" = "1" ] && [ "$HAS_KEY" = "1" ]; then
  success "  環境変数: OK"
else
  error "  環境変数が認識されていません — next dev の再起動が必要かもしれません"
fi

if [ "$CARDS_OK" = "1" ]; then
  success "  Supabase テーブル: OK"
else
  warn "  テーブルに接続できません"
  echo ""
  echo "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  ★ 手動で必要な作業:"
  echo "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  1. Supabase ダッシュボードを開く:"
  echo "     https://supabase.com/dashboard/project/${PROJECT_REF}/sql"
  echo ""
  echo "  2. 以下のファイルの内容をコピーして「Run」を押す:"
  echo "     $(realpath "$SCHEMA_FILE")"
  echo ""
  echo "  3. 再度 health check:"
  echo "     curl http://localhost:3000/api/admin/health"
  echo "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

# ── 完了サマリー ───────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
success "セットアップ完了"
echo ""
echo "  管理画面: http://localhost:3000/admin"
echo "  パスワード: admin2026 (ADMIN_PASSWORD 変数で変更可)"
echo "  Health:    http://localhost:3000/api/admin/health"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
