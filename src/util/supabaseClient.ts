import { createClient } from '@supabase/supabase-js';

// Server-side helper: requires SUPABASE_URL and SUPABASE_SERVICE_KEY
const env = (globalThis as any).process?.env || {};
const supabaseUrl = env.SUPABASE_URL || '';
const supabaseKey = env.SUPABASE_SERVICE_KEY || env.SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  // keep minimal: don't throw on import for client-side builds, but warn
  // In Vercel server env these must be set.
  // eslint-disable-next-line no-console
  console.warn('[supabaseClient] SUPABASE_URL or SERVICE_KEY not set');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export default supabaseAdmin;
