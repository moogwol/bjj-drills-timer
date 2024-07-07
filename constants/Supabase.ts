import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://xflgmbxgfafdodkvsiss.supabase.co";
const PUBLIC_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmbGdtYnhnZmFmZG9ka3ZzaXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1MzY5NjQsImV4cCI6MjAzNDExMjk2NH0.HO2AIC8c6x3LPANor04JInW2ivqV_4a8lDDlRBl38GE"
 
export const supabase = createClient(SUPABASE_URL, PUBLIC_ANON_KEY);

