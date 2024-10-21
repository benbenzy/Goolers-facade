
import { createClient } from '@supabase/supabase-js'
const supabase_url=process.env.NEXT_PUBLIC_SUPABASE_URL!
const service_role_key=process.env.NEXT_SUPABASE_SERVICE_ROLE!

const supabase = createClient(supabase_url, service_role_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Access auth admin api
export const supabase_admin = supabase.auth.admin
