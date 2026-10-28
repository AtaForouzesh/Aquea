import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://nckxglzowhonsshanezj.supabase.co";
const supabaseKey = "sb_publishable_l5XLITsyyv1ew4iUj_mteA_ggxlHIJh";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
