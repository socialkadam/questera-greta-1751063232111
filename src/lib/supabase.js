// Supabase removed - using local data only
export const supabase = null;

// Mock auth helpers for compatibility
export const authHelpers = {
  async signUp(email, password, userData = {}) {
    // Mock successful signup
    const mockUser = {
      id: Date.now().toString(),
      email,
      ...userData
    };
    
    localStorage.setItem('wizardoo_user', JSON.stringify(mockUser));
    return { data: { user: mockUser }, error: null };
  },

  async signIn(email, password) {
    // Mock successful signin
    const mockUser = {
      id: Date.now().toString(),
      email,
      role: 'seeker'
    };
    
    localStorage.setItem('wizardoo_user', JSON.stringify(mockUser));
    return { data: { user: mockUser }, error: null };
  },

  async signOut() {
    localStorage.removeItem('wizardoo_user');
    return { error: null };
  },

  async getCurrentProfile() {
    const saved = localStorage.getItem('wizardoo_user');
    if (saved) {
      return { data: JSON.parse(saved), error: null };
    }
    return { data: null, error: new Error('No user found') };
  }
};

// Mock wizard helpers
export const wizardHelpers = {
  async createWizardProfile(wizardData, userId) {
    // Mock successful wizard profile creation
    const mockWizard = {
      id: userId,
      ...wizardData,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    return { data: mockWizard, error: null };
  },

  async getWizardProfile(userId) {
    return { data: null, error: null };
  }
};

export default supabase;