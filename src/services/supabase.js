import {createClient} from "@supabase/supabase-js";

export const supabaseUrl = "https://xikeijtxzpdjntjxwyac.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpa2VpanR4enBkam50anh3eWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5NTEzMzMsImV4cCI6MjAwNzUyNzMzM30.mIrqbuyPqDVkWTciMVsp6Rle55cO0FNOgdhPCtk3lAQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
