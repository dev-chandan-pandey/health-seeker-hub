import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxtirlvleipadspemxja.supabase.co'

const supabaseAnonKey =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4dGlybHZsZWlwYWRzcGVteGphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Mjg2MDMsImV4cCI6MjA3MDIwNDYwM30._0Y2X3gUGn3bzqqCpWcbeFIDP7VFpdED8asR4XEbqu4`

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Doctor = {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  consultation_fee: number
  location: string
  clinic: string
  available_today: boolean
  gender: string
  image?: string
  created_at: string
  updated_at: string
}

export type Appointment = {
  id: string
  doctor_id: string
  user_id: string
  appointment_date: string
  appointment_time: string
  status: string
  created_at: string
  updated_at: string
}