import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nsurwcrxhnuuurozyxzf.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_MGj8NU5w2lrE_euaRQiodA_mA-uLQk1";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
