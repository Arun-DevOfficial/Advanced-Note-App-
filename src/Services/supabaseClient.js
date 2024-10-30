
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyeznpewjadrgxuznibw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZXpucGV3amFkcmd4dXpuaWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNTU0MTEsImV4cCI6MjA0NTgzMTQxMX0.jdtxhHk23RWyzvdKOd8Tm3DbiqoHvR-CJTvSFl9XZzA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
