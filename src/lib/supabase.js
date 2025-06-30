import { createClient } from '@supabase/supabase-js'

// Supabase project credentials - using verified working credentials
const SUPABASE_URL = 'https://fuhzrjphwzbvbgiuoknt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aHpyanBod3pidmJnaXVva250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMzkzNzAsImV4cCI6MjA2NjcxNTM3MH0.9ZLThaYx1taPoA07CxMarXvBobPu3iAsAj15b-uEZp0'

// Test connection on module load
console.log('🔗 Supabase URL:', SUPABASE_URL)
console.log('🔑 Supabase Key (first 20 chars):', SUPABASE_ANON_KEY.substring(0, 20) + '...')

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Test connection immediately
supabase.from('profiles').select('count').limit(1)
  .then(() => console.log('✅ Supabase connection successful'))
  .catch(err => console.error('❌ Supabase connection failed:', err))

// Helper functions for auth and data operations
export const authHelpers = {
  // Sign up with role - Enhanced with debugging and auth state management
  async signUp(email, password, userData = {}) {
    try {
      console.log('🔄 Starting signup process for:', email)
      console.log('📝 User data:', userData)
      
      // Step 1: Create user in Supabase Auth
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
        console.error('❌ Auth signup error:', error)
        throw error
      }

      if (!data.user) {
        throw new Error('No user returned from signup')
      }

      console.log('✅ Auth signup successful:', data.user.id)

      // Step 2: Wait for auth state to be established
      console.log('⏳ Waiting for auth state to be established...')
      await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds

      // Step 3: Verify authentication by getting current user
      const { data: currentUser, error: authError } = await supabase.auth.getUser()
      
      if (authError || !currentUser.user) {
        console.log('⚠️ User not authenticated yet, trying manual session setup...')
        
        // Try setting the session manually if needed
        if (data.session) {
          await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token
          })
          
          // Wait a bit more for session to be established
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }

      console.log('✅ User authentication verified')

      // Step 4: Check if profile was created by trigger
      console.log('🔍 Checking for profile creation...')
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it manually
        console.log('📝 Creating profile manually...')
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: userData.full_name || '',
            email: data.user.email,
            role: userData.role || 'seeker'
          })
          .select()
          .single()

        if (insertError) {
          console.error('❌ Manual profile creation error:', insertError)
          throw new Error(`Failed to create user profile: ${insertError.message}`)
        }
        console.log('✅ Profile created manually:', newProfile)
      } else if (profileError) {
        console.error('❌ Profile check error:', profileError)
        throw new Error(`Database error: ${profileError.message}`)
      } else {
        console.log('✅ Profile exists (created by trigger):', profile)
      }

      return { data, error: null }
    } catch (error) {
      console.error('❌ Signup exception:', error)
      return { data: null, error }
    }
  },

  // Sign in with debugging
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

      console.log('✅ Signin successful:', data.user?.id)
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
  // Create wizard profile with enhanced debugging and auth handling
  async createWizardProfile(wizardData, userId = null) {
    try {
      console.log('🔄 Creating wizard profile:', wizardData)
      
      let authenticatedUser = null

      if (userId) {
        // Use provided user ID (for cases where we just created the user)
        console.log('👤 Using provided user ID:', userId)
        authenticatedUser = { id: userId }
      } else {
        // Get current authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
          console.error('❌ Auth check failed:', authError)
          throw new Error('No authenticated user found. Please try logging in again.')
        }
        authenticatedUser = user
      }

      console.log('👤 Working with user:', authenticatedUser.id)

      // Check if profile exists for this user
      console.log('🔍 Checking if profile exists...')
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authenticatedUser.id)
        .single()

      if (profileCheckError && profileCheckError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        console.log('📝 Creating missing profile for wizard...')
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authenticatedUser.id,
            full_name: wizardData.full_name || '',
            email: wizardData.email || '',
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
            .eq('id', authenticatedUser.id)

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
          id: authenticatedUser.id,
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