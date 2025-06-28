import { createClient } from '@supabase/supabase-js'

// These will be automatically injected during deployment
const SUPABASE_URL = 'https://<PROJECT-ID>.supabase.co'
const SUPABASE_ANON_KEY = '<ANON_KEY>'

if (SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase environment variables. Please connect your Supabase project.');
}

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
    return { data, error }
  },

  // Sign in
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user profile
  async getCurrentProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { data: null, error: null }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return { data, error }
  },

  // Update user profile
  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    return { data, error }
  }
}

// Wizard-specific operations
export const wizardHelpers = {
  // Get all approved wizards
  async getApprovedWizards(filters = {}) {
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
  },

  // Create wizard profile
  async createWizardProfile(wizardData) {
    const { data, error } = await supabase
      .from('wizards')
      .insert(wizardData)
      .select()
      .single()

    return { data, error }
  },

  // Update wizard profile
  async updateWizardProfile(wizardId, updates) {
    const { data, error } = await supabase
      .from('wizards')
      .update(updates)
      .eq('id', wizardId)
      .select()
      .single()

    return { data, error }
  },

  // Get wizard reviews with ratings
  async getWizardReviews(wizardId) {
    const { data, error } = await supabase
      .from('wizard_reviews')
      .select(`
        *,
        profiles!seeker_id(full_name, avatar_url)
      `)
      .eq('wizard_id', wizardId)
      .order('created_at', { ascending: false })

    return { data, error }
  }
}

// Session operations
export const sessionHelpers = {
  // Book a session
  async bookSession(sessionData) {
    const { data, error } = await supabase
      .from('sessions')
      .insert(sessionData)
      .select()
      .single()

    return { data, error }
  },

  // Get user sessions
  async getUserSessions(userId, userRole) {
    let query = supabase
      .from('sessions')
      .select(`
        *,
        wizards!wizard_id(*, profiles!inner(full_name, avatar_url)),
        profiles!seeker_id(full_name, avatar_url)
      `)

    if (userRole === 'wizard') {
      query = query.eq('wizard_id', userId)
    } else {
      query = query.eq('seeker_id', userId)
    }

    const { data, error } = await query.order('scheduled_at', { ascending: false })
    return { data, error }
  },

  // Update session
  async updateSession(sessionId, updates) {
    const { data, error } = await supabase
      .from('sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single()

    return { data, error }
  }
}

export default supabase