import {createClient} from "@supabase/supabase-js";

const SUPABASE_URL = 'https://lcwkadbjjalrlzosxlcd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxjd2thZGJqamFscmx6b3N4bGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDA5NDQsImV4cCI6MjA3ODM3Njk0NH0.589P78xcoXyMUDMqu_Jy07T-_3GxJVmd-e-aGjqV-o4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);