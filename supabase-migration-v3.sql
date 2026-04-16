-- ================================================================
-- CryptoCardNavi — Supabase マイグレーション v3
-- Supabase SQL エディタで実行してください
--
-- 変更点:
--   1. cards テーブルに is_db_only カラムを追加
--   2. Storage bucket "card-images" を作成
-- ================================================================

-- ── 1. cards テーブルへの is_db_only カラム追加 ─────────────────
-- is_db_only = true のカードは data/cards.ts に存在しない DB 専用カード
ALTER TABLE cards ADD COLUMN IF NOT EXISTS is_db_only boolean DEFAULT false NOT NULL;

-- ── 2. Storage bucket 作成 ────────────────────────────────────
-- card-images バケットを Public で作成 (画像を URL 公開するため)
INSERT INTO storage.buckets (id, name, public)
VALUES ('card-images', 'card-images', true)
ON CONFLICT (id) DO NOTHING;

-- ── 確認クエリ (実行後に確認用) ─────────────────────────────────
-- SELECT column_name FROM information_schema.columns
--   WHERE table_name = 'cards' AND column_name = 'is_db_only';
-- SELECT id, name, public FROM storage.buckets WHERE id = 'card-images';
