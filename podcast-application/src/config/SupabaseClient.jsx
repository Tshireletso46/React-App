import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react'
import {ThemeSupa,} from '@supabase/auth-ui-shared'
export const Supabase   = createClient(
    "https://hwizdnwypgqlwhyhvttz.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aXpkbnd5cGdxbHdoeWh2dHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5NzUwNjYsImV4cCI6MjAwNjU1MTA2Nn0.RfyDMw343eBwRG9XQ-u9NfIw3v9DiUjOGiQ_DFDCnxw")
export default function Supa () {
    return (
    <Auth
      supabaseClient={Supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
    />
    )
  }