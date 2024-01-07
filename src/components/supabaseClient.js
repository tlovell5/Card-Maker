import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zknykjxktiiagyqbnwkg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprbnlranhrdGlpYWd5cWJud2tnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1Nzk3MzcsImV4cCI6MjAyMDE1NTczN30.S68866qafnkr2cknzUGVyNEIKXLCQGa5fCxk1uechgQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
