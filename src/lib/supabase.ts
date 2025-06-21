import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Activity {
  id: string
  title: string
  short_description?: string
  full_description?: string
  category: string
  age_groups?: string[]
  duration_minutes: number
  difficulty: 'easy' | 'medium' | 'hard'
  materials?: string[]
  instructions?: string[]
  skills_developed?: string[]
  location: 'indoor' | 'outdoor' | 'any'
  season?: 'spring' | 'summer' | 'autumn' | 'winter' | 'any'
  premium: boolean
  tags?: string[]
  rating: number
  times_completed: number
  video_url?: string
  image_url?: string
  site_url?: string
  has_detailed_content?: boolean
  created_at: string
  updated_at?: string
}