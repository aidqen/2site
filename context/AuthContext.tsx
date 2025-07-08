import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the User type that extends Firebase User with additional properties
type User = FirebaseAuthTypes.User & {
  username?: string;
  favoriteLessons?: string[];
};

// Define the context value type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  logout: async () => {},
  refreshUserData: async () => {},
});

// Custom hook for using the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  // Function to fetch additional user data from Firestore
  const fetchUserData = async (firebaseUser: FirebaseAuthTypes.User): Promise<User> => {
    try {
      const userDoc = await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .get();
      
      if (userDoc.exists) {
        const userData = userDoc.data();
        // Merge Firebase user with Firestore data
        return {
          ...firebaseUser,
          username: userData?.username,
          favoriteLessons: userData?.favoriteLessons || [],
        };
      }
      
      return firebaseUser as User;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return firebaseUser as User;
    }
  };

  // Function to refresh user data
  const refreshUserData = async () => {
    if (!auth.currentUser) return;
    
    try {
      const updatedUser = await fetchUserData(auth.currentUser);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Set up the auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser !== null) {
          const enhancedUser = await fetchUserData(firebaseUser);
          setUser(enhancedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    // Clean up the listener on unmount
    return unsubscribe;
  }, []);

  // Context value
  const value = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    logout,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
