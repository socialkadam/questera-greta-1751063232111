import { createClient } from '@supabase/supabase-js'

// Supabase project credentials
const SUPABASE_URL = 'https://fuhzrjphwzbvbgiuoknt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aHpyanBod3pidmJnaXVva250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMzkzNzAsImV4cCI6MjA2NjcxNTM3MH0.9ZLThaYx1taPoA07CxMarXvBobPu3iAsAj15b-uEZp0'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Helper functions for auth and data operations
export const authHelpers = {
  // Sign up with role
  async signUp(email, password, userData = {}) {
    try {
      console.log('🔄 Starting signup process for:', email)
      console.log('📝 User data:', userData)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name || '',
            role: userData.role || 'seeker',
            ...userData
          }
        }
      })

      if (error) {
        console.error('❌ Signup error:', error)
        throw error
      }

      console.log('✅ Signup successful:', data)

      // Wait a moment for the trigger to complete
      if (data.user) {
        console.log('⏳ Waiting for profile creation...')
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Verify profile was created
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create it manually
          console.log('📝 Creating profile manually...')
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              full_name: userData.full_name || '',
              email: data.user.email,
              role: userData.role || 'seeker'
            })

          if (insertError) {
            console.error('❌ Manual profile creation error:', insertError)
            throw new Error(`Failed to create user profile: ${insertError.message}`)
          }
          console.log('✅ Profile created manually')
        } else if (profileError) {
          console.error('❌ Profile check error:', profileError)
          throw new Error(`Database error: ${profileError.message}`)
        } else {
          console.log('✅ Profile exists:', profile)
        }
      }

      return { data, error: null }
    } catch (error) {
      console.error('❌ Signup exception:', error)
      return { data: null, error }
    }
  },

  // Sign in
  async signIn(email, password) {
    try {
      console.log('🔄 Starting signin process for:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('❌ Signin error:', error)
        throw error
      }

      console.log('✅ Signin successful:', data)
      return { data, error: null }
    } catch (error) {
      console.error('❌ Signin exception:', error)
      return { data: null, error }
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error }
    }
  },

  // Get current user profile
  async getCurrentProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return { data: null, error: null }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Update user profile
  async updateProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }
}

// Wizard-specific operations
export const wizardHelpers = {
  // Create wizard profile
  async createWizardProfile(wizardData) {
    try {
      console.log('🔄 Creating wizard profile:', wizardData)
      
      // First, ensure the user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('No authenticated user found')
      }

      console.log('👤 Authenticated user:', user.id)

      // Check if profile exists
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileCheckError && profileCheckError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        console.log('📝 Creating missing profile...')
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            full_name: wizardData.full_name || user.user_metadata?.full_name || '',
            email: user.email,
            role: 'wizard'
          })

        if (profileError) {
          console.error('❌ Profile creation error:', profileError)
          throw new Error(`Failed to create profile: ${profileError.message}`)
        }
        console.log('✅ Profile created successfully')
      } else if (profileCheckError) {
        console.error('❌ Profile check error:', profileCheckError)
        throw new Error(`Database error checking profile: ${profileCheckError.message}`)
      } else {
        console.log('✅ Profile exists, updating role if needed...')
        if (existingProfile.role !== 'wizard') {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: 'wizard' })
            .eq('id', user.id)

          if (updateError) {
            console.error('❌ Profile role update error:', updateError)
            throw new Error(`Failed to update profile role: ${updateError.message}`)
          }
        }
      }

      // Now create the wizard profile
      console.log('🧙‍♂️ Creating wizard entry...')
      const { data, error } = await supabase
        .from('wizards')
        .insert({
          id: user.id,
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
        console.error('❌ Wizard profile creation error:', error)
        throw new Error(`Failed to create wizard profile: ${error.message}`)
      }

      console.log('✅ Wizard profile created successfully:', data)
      return { data, error: null }
    } catch (error) {
      console.error('❌ Wizard profile creation exception:', error)
      return { data: null, error }
    }
  },

  // Get all approved wizards
  async getApprovedWizards(filters = {}) {
    try {
      let query = supabase
        .from('wizards')
        .select(`
          *,
          profiles!inner(full_name, avatar_url, location)
        `)
        .eq('status', 'approved')

      if (filters.wizard_type) {
        query = query.eq('wizard_type', filters.wizard_type)
      }

      if (filters.specialization) {
        query = query.eq('specialization', filters.specialization)
      }

      const { data, error } = await query
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Update wizard profile
  async updateWizardProfile(wizardId, updates) {
    try {
      const { data, error } = await supabase
        .from('wizards')
        .update(updates)
        .eq('id', wizardId)
        .select()
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }
}

export default supabase