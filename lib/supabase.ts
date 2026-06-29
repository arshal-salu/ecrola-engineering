import { createClient } from "@supabase/supabase-js";

const DEFAULT_URL = "https://nsurwcrxhnuuurozyxzf.supabase.co";
const DEFAULT_KEY = "sb_publishable_MGj8NU5w2lrE_euaRQiodA_mA-uLQk1";

function getValidUrl(rawUrl?: string): string {
  if (rawUrl && typeof rawUrl === "string" && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))) {
    return rawUrl.trim();
  }
  return DEFAULT_URL;
}

function getValidKey(rawKey?: string): string {
  if (rawKey && typeof rawKey === "string" && rawKey.trim().length > 0) {
    return rawKey.trim();
  }
  return DEFAULT_KEY;
}

const supabaseUrl = getValidUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = getValidKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
