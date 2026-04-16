-- ================================================================
-- CryptoCardNavi — Supabase スキーマ v2
-- Supabase SQL エディタで実行してください
--
-- v1 との変更点:
--   admin_overrides (単一 JSONB) → 3 テーブル構成に移行
-- ================================================================

-- ── cards (カード管理オーバーライド) ─────────────────────────────
-- data/cards.ts の静的データに対する上書き値を保存します
-- slug が一致する静的カードに上書き適用されます
CREATE TABLE IF NOT EXISTS cards (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        text UNIQUE NOT NULL,       -- 静的カードの slug/id と一致させること
  name        text,                       -- カード名の上書き
  description text,                       -- shortDescription の上書き
  image       text,                       -- cardImage パスの上書き
  fees        jsonb DEFAULT '{}'::jsonb,  -- 手数料・機能・その他すべての上書き値
  tags        jsonb DEFAULT '[]'::jsonb,  -- タグ配列の上書き
  visible     boolean DEFAULT true,       -- 公開/非公開
  updated_at  timestamptz DEFAULT now()
);

-- fees JSONB に格納するフィールド例:
-- {
--   "longDescription": "...",
--   "referralUrl": "...",
--   "network": "Visa",
--   "keyStrength": "...",
--   "priorityRank": 1,
--   "fxFee": "...", "cashbackRate": "...", "cashbackDetails": "...",
--   "issuanceFee": "...", "monthlyFee": "...", "annualFee": "...",
--   "atmFee": "...", "spendingLimit": "...",
--   "applePay": true, "googlePay": true,
--   "physicalCard": true, "virtualCard": true, "stablecoinSupport": true,
--   "regionAvailability": [...], "topupMethods": [...],
--   "supportedAssets": [...], "supportedChains": [...],
--   "pros": [...], "cons": [...], "useCases": [...],
--   "custodyType": "...", "kycLevel": "..."
-- }

-- ── rankings (管理者が編集するランキング) ──────────────────────
CREATE TABLE IF NOT EXISTS rankings (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category     text NOT NULL DEFAULT 'overall',
  rank         integer NOT NULL,
  card_slug    text NOT NULL,
  short_reason text,
  reason       text,
  is_visible   boolean DEFAULT true,
  UNIQUE (category, rank)
);

-- ── homepage_featured (トップページ掲載枠 slot 1〜3) ───────────
CREATE TABLE IF NOT EXISTS homepage_featured (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slot         integer NOT NULL UNIQUE CHECK (slot BETWEEN 1 AND 3),
  card_slug    text NOT NULL,
  short_reason text,
  is_visible   boolean DEFAULT true
);

-- ── Row Level Security ─────────────────────────────────────────
-- API ルートは SUPABASE_SERVICE_ROLE_KEY を使うため RLS をバイパスします
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_featured ENABLE ROW LEVEL SECURITY;

-- ── レガシー (v1 — 参照のみ, 削除可) ──────────────────────────
-- v1 の単一 JSONB テーブルは使用しなくなりました
-- 削除する場合: DROP TABLE IF EXISTS admin_overrides;
