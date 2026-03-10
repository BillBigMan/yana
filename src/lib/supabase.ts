import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    supabaseUrl: !!supabaseUrl,
    supabaseAnonKey: !!supabaseAnonKey
  })
  throw new Error('Supabase environment variables are missing')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface WaitlistEntry {
  id: string
  name: string
  email: string
  phone: string
  city: string
  user_type: 'family' | 'worker'
  created_at: string
}

export interface SurveyResponse {
  id: string
  waitlist_id: string
  question_key: string
  answer: string
  created_at: string
}

export interface MarketSurvey {
  id: string;
  user_type: 'family' | 'worker';
  current_method: string;
  verification_trust: number;
  monthly_budget?: string;
  expected_salary?: number;
  availability: string;
  location: string;
  created_at: string;
  budget?: string; 
}
