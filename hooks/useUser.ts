import { useAuth } from '@/context/AuthContext';

/**
 * A custom hook that provides access to the current user state
 * and authentication-related functionality
 */
export function useUser() {
  const { user, isLoading, isAdmin, isAuthenticated, logout, refreshUserData } = useAuth();
  
  return {
    user,
    isLoading,
    isAuthenticated,
    logout,
    refreshUserData,
    isAdmin,
    
    // Helper methods
    getUserId: () => user?.uid || null,
    getUsername: () => user?.username || user?.displayName || 'משתמש',
    getFavoriteLessons: () => user?.favoriteLessons || [],
  };
}
