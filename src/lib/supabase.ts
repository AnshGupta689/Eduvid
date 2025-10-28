import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type VideoGeneration = {
  id: string;
  prompt: string;
  topic_category: string;
  duration: number;
  created_at: string;
  metadata: Record<string, any>;
};
