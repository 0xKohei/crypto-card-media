# デプロイメントガイド

## ローカル開発

### 最速セットアップ (1コマンド)

Supabase ダッシュボード (https://supabase.com/dashboard) から
`Project URL` と `service_role` キーを取得して実行:

```bash
bash scripts/setup.sh \
  "https://YOUR-PROJECT-ID.supabase.co" \
  "eyJhbGci...YOUR-SERVICE-ROLE-KEY"
```

このスクリプトが自動でやること:
1. `.env.local` を生成
2. `next dev` を起動
3. `http://localhost:3000/api/admin/health` で接続確認

### Supabase テーブルの作成

`setup.sh` を実行後、テーブルが未作成の場合は:

1. [Supabase SQL Editor](https://supabase.com/dashboard/project/YOUR-PROJECT-ID/sql) を開く
2. `supabase-schema.sql` の内容をコピー&ペーストして **Run**
3. 確認: `bash scripts/apply-schema.sh`

---

## Cloudflare Pages 本番環境

### 設定必須の環境変数

Cloudflare Pages ダッシュボード →  
**Settings** → **Environment variables** → **Add variable**

| 変数名 | 値の取得元 | Production | Preview |
|---|---|:---:|:---:|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase > Settings > API > Project URL | ✅ | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase > Settings > API > service_role | ✅ | ✅ |
| `ADMIN_PASSWORD` | 任意 (デフォルト: admin2026) | ✅ | 任意 |

> **セキュリティ注意**:
> - `SUPABASE_SERVICE_ROLE_KEY` は **絶対に** `NEXT_PUBLIC_` 接頭辞をつけないこと
> - `ADMIN_PASSWORD` は本番では必ず `admin2026` から変更すること

### ビルド設定

| 設定項目 | 値 |
|---|---|
| Framework preset | Next.js |
| Build command | `npm run build` |
| Build output directory | `.next` |
| Root directory | (空欄) |
| Node.js version | 18 |

### デプロイ後の確認

```bash
# 本番 health check
curl https://your-site.pages.dev/api/admin/health
```

期待レスポンス:
```json
{
  "success": true,
  "env": { "hasUrl": true, "hasServiceRoleKey": true, "missing": [] },
  "database": {
    "connected": true,
    "cardsTableReachable": true,
    "rankingsTableReachable": true,
    "homepageFeaturedTableReachable": true
  }
}
```

---

## 環境変数が正しく設定されているか確認する方法

```bash
# ローカル
curl http://localhost:3000/api/admin/health | jq .env

# 本番
curl https://your-site.pages.dev/api/admin/health | jq .env
```

| フィールド | 期待値 | 問題がある場合 |
|---|---|---|
| `hasUrl` | `true` | `NEXT_PUBLIC_SUPABASE_URL` が未設定 |
| `hasServiceRoleKey` | `true` | `SUPABASE_SERVICE_ROLE_KEY` が未設定 |
| `missing` | `[]` | フィールド内に不足変数名が表示される |

---

## トラブルシューティング

### 「Supabase is not configured. Missing: ...」

**原因**: 環境変数が読めていない  
**対処**:
- ローカル: `.env.local` を確認 → `next dev` を再起動
- 本番: Cloudflare Pages の環境変数を確認 → 再デプロイ

### テーブルに接続できない

**原因**: Supabase でテーブルが未作成  
**対処**: `supabase-schema.sql` を Supabase SQL Editor で実行

### Cloudflare での HTML 500 エラー

**原因**: `runtime = "edge"` が API ルートに設定されていない  
**確認**: 全 API ルートに `export const runtime = "edge"` があるか確認

---

## どうしても自動化できない外部作業 (1点のみ)

> **Supabase ダッシュボードから2つの値をコピーする**
>
> 取得場所: https://supabase.com/dashboard  
> プロジェクト選択 → Settings → API
>
> 1. **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` の値
> 2. **service_role** (Project API keys) → `SUPABASE_SERVICE_ROLE_KEY` の値
>
> この2値を取得したら、あとは `bash scripts/setup.sh "URL" "KEY"` 1コマンドで完了。
