-- Run this once in your Supabase project's SQL editor to set up admin overrides storage.

CREATE TABLE IF NOT EXISTS admin_overrides (
  id   TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Pre-seed with empty overrides so the first read never returns null.
INSERT INTO admin_overrides (id, data)
VALUES ('admin_overrides', '{"cards":[],"rankings":{}}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Recommended: enable Row Level Security and restrict to service role only.
ALTER TABLE admin_overrides ENABLE ROW LEVEL SECURITY;
-- No policies needed — service role key bypasses RLS by default in Supabase.
