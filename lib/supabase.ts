import { createClient } from "@supabase/supabase-js";

// Returns a Supabase service-role client, or null when env vars are missing.
// The null check lets us fall back to the local JSON file in dev / non-Supabase deploys.
export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export const OVERRIDES_ROW_ID = "admin_overrides";
