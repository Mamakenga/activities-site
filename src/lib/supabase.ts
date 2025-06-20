import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Типы для TypeScript
export interface Activity {
  id: string
  title: string
  short_description: string
  category: string
  age_groups: string[]
  duration_minutes: number
  difficulty: 'easy' | 'medium' | 'hard'
  materials: string[]
  instructions: string[]
  location: 'indoor' | 'outdoor' | 'any'
  premium: boolean
  tags: string[]
  rating: number
  created_at: string
}