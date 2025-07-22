import { useAuth } from '@/context/AuthContext';
import { FavoriteLesson } from '@/types';

/**
 * A custom hook that provides access to the current user state
 * and authentication-related functionality
 */
export function useUser() {
  const { user, setUser, isLoading, isAdmin, isAuthenticated, logout, refreshUserData } = useAuth();
  
  return {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    logout,
    refreshUserData,
    isAdmin,
    
    getUserId: () => user?.uid || null,
    getUsername: () => user?.username || user?.displayName || 'משתמש',
    getFavoriteLessons: () => user?.favoriteLessons || [],
    updateFavoriteLessons: (favoriteLessons: FavoriteLesson[]) => {
      if (user) {
        setUser({ ...user, favoriteLessons });
      }
    },
  };
}
