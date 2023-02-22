import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'ADD URL HERE'
const supabaseAnonKey = 'ADD ANON KEY HERE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);