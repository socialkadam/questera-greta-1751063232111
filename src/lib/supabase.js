import { createClient } from '@supabase/supabase-js'

// 🔥 YOUR FRESH SUPABASE PROJECT CREDENTIALS
const SUPABASE_URL = 'https://fuhzrjphwzbvbgiuoknt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aHpyanBod3pidmJnaXVva250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMzkzNzAsImV4cCI6MjA2NjcxNTM3MH0.9ZLThaYx1taPoA07CxMarXvBobPu3iAsAj15b-uEZp0'

console.log('🔗 Connecting to Supabase:', SUPABASE_URL)

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Test connection
supabase.from('profiles').select('count').limit(1)
  .then(() => console.log('✅ Supabase connection successful'))
  .catch(err => console.log('⚠️ Supabase connection pending (tables not created yet):', err.message))

// 🔥 ULTRA-SIMPLE AUTH HELPERS
export const authHelpers = {
  // Simple signup
  async signUp(email, password, userData = {}) {
    try {
      console.log('🔄 Creating account for:', email)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name || '',
            role: userData.role || 'seeker'
          }
        }
      })

      if (error) throw error
      console.log('✅ Account created successfully')
      return { data, error: null }
    } catch (error) {
      console.error('❌ Signup error:', error)
      return { data: null, error }
    }
  },

  // Simple signin
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current profile
  async getCurrentProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return { data: null, error: new Error('No user found') }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }
}

// 🔥 ENHANCED Wizard helpers with better error handling
export const wizardHelpers = {
  // Create wizard profile with enhanced debugging
  async createWizardProfile(wizardData, userId) {
    try {
      console.log('🧙‍♂️ Creating wizard profile for user:', userId)
      console.log('📋 Wizard data:', wizardData)

      // First, let's check if we can access the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        throw new Error('No authenticated user found: ' + (userError?.message || 'Unknown error'))
      }
      console.log('✅ Authenticated user verified:', user.id)

      // Check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError || !profile) {
        console.log('⚠️ Profile check failed:', profileError?.message)
        throw new Error('Profile not found. Please try again.')
      }
      console.log('✅ Profile verified:', profile.id, profile.role)

      // Debug RLS permissions (if function exists)
      try {
        const { data: debugInfo } = await supabase
          .rpc('debug_wizard_creation', { user_id: userId })
          .single()
        
        if (debugInfo) {
          console.log('🔍 RLS Debug Info:', debugInfo)
        }
      } catch (debugError) {
        console.log('⚠️ Debug function not available:', debugError.message)
      }

      // Create wizard profile with enhanced error handling
      const { data, error } = await supabase
        .from('wizards')
        .insert({
          id: userId,
          wizard_type: wizardData.wizard_type,
          specialization: wizardData.specialization,
          title: wizardData.title,
          experience_years: wizardData.experience_years,
          hourly_rate: wizardData.hourly_rate,
          bio_detailed: wizardData.bio_detailed,
          why_wizard: wizardData.why_wizard,
          certifications: wizardData.certifications || [],
          education: wizardData.education,
          languages: wizardData.languages || ['English'],
          session_types: wizardData.session_types || ['video'],
          status: 'pending'
        })
        .select()
        .single()

      if (error) {
        console.error('❌ Wizard creation error details:', error)
        
        // Provide specific error messages based on error type
        if (error.message?.includes('row-level security')) {
          throw new Error('Permission denied: Unable to create wizard profile. Please ensure you are properly authenticated.')
        } else if (error.message?.includes('duplicate key')) {
          throw new Error('A wizard profile already exists for this account.')
        } else if (error.message?.includes('foreign key')) {
          throw new Error('User profile not found. Please try signing up again.')
        } else {
          throw new Error('Failed to create wizard profile: ' + error.message)
        }
      }

      console.log('✅ Wizard profile created successfully')
      return { data, error: null }
    } catch (error) {
      console.error('❌ Wizard creation error:', error)
      return { data: null, error }
    }
  },

  // Get wizard profile
  async getWizardProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('wizards')
        .select('*')
        .eq('id', userId)
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }
}

export default supabase