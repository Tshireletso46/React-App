
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hwizdnwypgqlwhyhvttz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aXpkbnd5cGdxbHdoeWh2dHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5NzUwNjYsImV4cCI6MjAwNjU1MTA2Nn0.RfyDMw343eBwRG9XQ-u9NfIw3v9DiUjOGiQ_DFDCnxw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
