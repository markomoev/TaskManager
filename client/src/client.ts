import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 
    'https://qtndgezifkltzdrcsgpo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bmRnZXppZmtsdHpkcmNzZ3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTM4MjksImV4cCI6MjA3ODUyOTgyOX0.r0M0XgOAQXogItVHmBc1amFdtIslfC5wnsVuqsYGoEE';
export const supabase = createClient(supabaseUrl, supabaseKey)