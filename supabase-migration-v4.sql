-- ================================================================
-- CryptoCardNavi — Migration v4
-- admin_settings テーブル追加
--
-- 用途: 管理画面パスワードのハッシュ保存
--   key   = 'admin_password_hash'
--   value = 'pbkdf2:<salt_hex>:<hash_hex>'  (PBKDF2/SHA-256/100k rounds)
--
-- Supabase SQL エディタで実行してください
-- ================================================================

CREATE TABLE IF NOT EXISTS admin_settings (
  key        text PRIMARY KEY,
  value      text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- API ルートは SUPABASE_SERVICE_ROLE_KEY を使うため RLS をバイパスします
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
