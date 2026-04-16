#!/usr/bin/env bash
# ================================================================
# Supabase スキーマ適用スクリプト
# .env.local が存在する状態で実行してください
#
# 使い方:
#   bash scripts/apply-schema.sh
# ================================================================

set -euo pipefail
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# .env.local から環境変数を読み込む
if [ -f "$PROJECT_ROOT/.env.local" ]; then
  set -a
  # shellcheck disable=SC1091
  source "$PROJECT_ROOT/.env.local"
  set +a
else
  echo "[ERR] .env.local が見つかりません。先に setup.sh を実行してください。"
  exit 1
fi

SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:-${SUPABASE_URL:-}}"
SERVICE_ROLE_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

if [ -z "$SUPABASE_URL" ] || [ -z "$SERVICE_ROLE_KEY" ]; then
  echo "[ERR] NEXT_PUBLIC_SUPABASE_URL または SUPABASE_SERVICE_ROLE_KEY が未設定です"
  exit 1
fi

PROJECT_REF=$(echo "$SUPABASE_URL" | sed 's|https://||' | sed 's|\.supabase\.co.*||')
echo "[INFO] Project ref: $PROJECT_REF"

# スキーマファイルの各 CREATE TABLE 文を個別に実行
SCHEMA_FILE="$PROJECT_ROOT/supabase-schema.sql"

# Supabase は service_role で REST API 経由の DDL を直接受け付けない。
# ただし pg_net 経由または Management API 経由なら可能。
# ここでは HTTP API で試みる (失敗した場合は手動案内を出す)

echo "[INFO] テーブル作成を試みます..."

TABLES=("cards" "rankings" "homepage_featured")
ALL_OK=true

for TABLE in "${TABLES[@]}"; do
  # SELECT count(*) でテーブル存在確認
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "apikey: ${SERVICE_ROLE_KEY}" \
    -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
    "${SUPABASE_URL}/rest/v1/${TABLE}?select=count&limit=0" 2>/dev/null)

  if [ "$RESPONSE" = "200" ] || [ "$RESPONSE" = "206" ]; then
    echo "[OK]   テーブル '$TABLE' は存在します"
  else
    echo "[WARN] テーブル '$TABLE' が見つかりません (HTTP $RESPONSE)"
    ALL_OK=false
  fi
done

if [ "$ALL_OK" = false ]; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  テーブルが未作成です。以下の手順で作成してください:"
  echo ""
  echo "  1. 以下の URL を開く:"
  echo "     https://supabase.com/dashboard/project/${PROJECT_REF}/sql"
  echo ""
  echo "  2. 以下のファイルの内容を全てコピーして「Run」を押す:"
  echo "     cat $SCHEMA_FILE"
  echo ""
  echo "  3. 実行後、再度確認:"
  echo "     bash scripts/apply-schema.sh"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 1
else
  echo ""
  echo "[OK] 全テーブルが存在します。セットアップ完了です。"
fi
