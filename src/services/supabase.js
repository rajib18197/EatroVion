import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qawadcpjlboaictrcvso.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhd2FkY3BqbGJvYWljdHJjdnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNjU0ODgsImV4cCI6MjAxNjY0MTQ4OH0.l_kF47yL3ygBiebQfbyzgcA6YR8TCABFR-B1PQEK2-E";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
