import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase belum dikonfigurasi. Menampilkan data statis sebagai fallback.'
  );
}

/**
 * Shared Supabase client using the public "anon"/"publishable" key only.
 * This key is safe to expose in client-side code — it is scoped by Row
 * Level Security policies defined in supabase/schema.sql, which only allow
 * public read access to published rows. Never put the service_role key here.
 */
export const supabase = isConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : (null as unknown as ReturnType<typeof createClient<Database>>);
