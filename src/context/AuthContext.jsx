import {createContext, useContext, useState, useEffect} from 'react';

const AuthContext = createContext(null);

// User roles and their permissions
const USER_ROLES = {
  GUEST: 'guest',
  SEEKER: 'seeker',
  WIZARD: 'wizard',
  ADMIN: 'admin'
};

const ROLE_PERMISSIONS = {
  [USER_ROLES.GUEST]: {
    canBrowseWizards: true,
    canViewProfiles: false,
    canBookSessions: false,
    canMessage: false,
    canCreateProfile: false,
    canManageUsers: false,
    canAccessDashboard: false
  },
  [USER_ROLES.SEEKER]: {
    canBrowseWizards: true,
    canViewProfiles: true,
    canBookSessions: true,
    canMessage: true,
    canCreateProfile: true,
    canManageUsers: false,
    canAccessDashboard: true,
    canRateWizards: true,
    canSaveWizards: true
  },
  [USER_ROLES.WIZARD]: {
    canBrowseWizards: true,
    canViewProfiles: true,
    canBookSessions: false,
    canMessage: true,
    canCreateProfile: true,
    canManageUsers: false,
    canAccessDashboard: true,
    canManageBookings: true,
    canSetAvailability: true,
    canViewEarnings: true,
    canUpdateServices: true
  },
  [USER_ROLES.ADMIN]: {
    canBrowseWizards: true,
    canViewProfiles: true,
    canBookSessions: true,
    canMessage: true,
    canCreateProfile: true,
    canManageUsers: true,
    canAccessDashboard: true,
    canManageBookings: true,
    canViewAnalytics: true,
    canModerateContent: true,
    canManagePayments: true
  }
};

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('wizardoo_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('wizardoo_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const userWithDefaults = {
      id: userData.id || Date.now(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || USER_ROLES.SEEKER,
      avatar: userData.avatar || null,
      createdAt: userData.createdAt || new Date().toISOString(),
      isVerified: userData.isVerified || false,
      preferences: userData.preferences || {},
      ...userData
    };

    setIsAuthenticated(true);
    setUser(userWithDefaults);
    localStorage.setItem('wizardoo_user', JSON.stringify(userWithDefaults));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('wizardoo_user');
  };

  const updateUser = (updates) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('wizardoo_user', JSON.stringify(updatedUser));
  };

  const switchRole = (newRole) => {
    if (!user || !Object.values(USER_ROLES).includes(newRole)) return;
    
    updateUser({ role: newRole });
  };

  const hasPermission = (permission) => {
    if (!user) return ROLE_PERMISSIONS[USER_ROLES.GUEST][permission] || false;
    return ROLE_PERMISSIONS[user.role]?.[permission] || false;
  };

  const isRole = (role) => {
    return user?.role === role;
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      [USER_ROLES.GUEST]: 'Guest',
      [USER_ROLES.SEEKER]: 'Seeker',
      [USER_ROLES.WIZARD]: 'Wizard',
      [USER_ROLES.ADMIN]: 'Admin'
    };
    return roleNames[role] || 'Unknown';
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    updateUser,
    switchRole,
    hasPermission,
    isRole,
    getRoleDisplayName,
    USER_ROLES,
    ROLE_PERMISSIONS
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};