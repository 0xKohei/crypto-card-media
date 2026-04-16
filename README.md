# CryptoCardNavi

クリプトカード比較メディア — Next.js 14 (App Router) + Cloudflare Pages + Supabase

---

## ローカル開発セットアップ

### 1. 依存パッケージをインストール

```bash
npm install
```

### 2. 環境変数を設定

```bash
cp .env.local.example .env.local
```

`.env.local` を開いて以下の2つを記入:

| 変数名 | 取得場所 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase ダッシュボード → Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase ダッシュボード → Settings → API → service_role |

> **重要**: `SUPABASE_SERVICE_ROLE_KEY` は `NEXT_PUBLIC_` 接頭辞をつけないこと。  
> client bundle に漏れると全データが読み書きできる状態になります。

### 3. Supabase テーブルを作成

Supabase ダッシュボード → SQL Editor を開いて `supabase-schema.sql` の内容をすべてコピー&実行。

作成されるテーブル:
- `cards` — カード情報のオーバーライド
- `rankings` — 管理者が編集するランキング
- `homepage_featured` — トップページ掲載枠 (slot 1〜3)

### 4. 開発サーバーを起動

```bash
npm run dev
```

> **注意**: `.env.local` を作成・変更した後は必ず `next dev` を再起動してください。  
> 起動したまま `.env.local` を編集しても環境変数は反映されません。

### 5. 接続確認 (オプション)

```bash
curl http://localhost:3000/api/admin/health
```

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

`success: false` の場合は `env.missing` と `error` フィールドを確認してください。

### 6. 管理画面にアクセス

```
http://localhost:3000/admin
```

デフォルトパスワード: `admin2026`  
本番では `ADMIN_PASSWORD` 環境変数で変更してください。

---

## Cloudflare Pages 本番設定

### 環境変数の設定

Cloudflare Pages ダッシュボード → Settings → Environment variables に以下を追加:

| 変数名 | 値 | 注意 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key | 絶対に公開しない |
| `ADMIN_PASSWORD` | 任意の強いパスワード | デフォルトの admin2026 から変更すること |

### ビルドコマンド

| 項目 | 値 |
|---|---|
| Build command | `npm run build` |
| Build output directory | `.next` |
| Node.js version | 18 以上 |

### 注意事項

- `SUPABASE_SERVICE_ROLE_KEY` は **Production** と **Preview** の両方に設定すること
- 環境変数を変更したらリデプロイが必要
- 保存内容はトップページに即時反映されない場合があります。管理画面の「キャッシュ更新」ボタンを押すか、再デプロイしてください

---

## トラブルシューティング

### 「Supabase is not configured. Missing: ...」

→ `.env.local` が存在しないか、変数名が間違っている  
→ `next dev` を再起動する  
→ `/api/admin/health` で診断する

### テーブルが見つからない (relation "cards" does not exist)

→ `supabase-schema.sql` を Supabase SQL Editor で実行していない

### 保存できるが反映されない

→ サイトは静的ビルド済み。管理画面の「キャッシュ更新」を押すか再デプロイする

---

## プロジェクト構成

```
app/
  admin/            管理画面 (パスワード保護)
  api/admin/
    cards/          カード管理 API
    rankings/       ランキング管理 API
    homepage-featured/  トップページ掲載枠 API
    health/         接続確認 API
    revalidate/     キャッシュ更新 API
  cards/            カード一覧・詳細ページ
  top-picks/        ランキングページ
data/
  cards.ts          静的カードデータ (編集時は直接変更)
  top-picks.ts      静的ランキングデータ
lib/
  supabase.ts       Supabase クライアント (サーバー専用)
  admin-storage.ts  Supabase DB 操作
  get-cards.ts      ページ用データ取得関数
supabase-schema.sql Supabase テーブル定義
.env.local.example  環境変数テンプレート
```
