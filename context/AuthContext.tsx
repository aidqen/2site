import { FavoriteLesson } from '@/types';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = FirebaseAuthTypes.User & {
  username?: string;
  favoriteLessons?: FavoriteLesson[];
  isAdmin?: boolean;
};

type UserSummary = {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    creationTime: string | undefined;
    lastSignInTime: string | undefined;
  };
  username?: string;
  favoriteLessons?: FavoriteLesson[];
  isAdmin?: boolean;
};

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
  isAuthenticated: false,
  isAdmin: false,
  logout: async () => {},
  refreshUserData: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

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

    return unsubscribe;
  }, []);

  const fetchUserData = async (firebaseUser: FirebaseAuthTypes.User): Promise<User> => {
    try {
      const userDoc = await firestore()
      .collection('users')
      .doc(firebaseUser.uid)
      .get();

      const favoriteLessonsDoc = await firestore()
      .collection('users')
      .doc(firebaseUser.uid)
      .collection('favoriteLessons')
      .get();
      
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const favoriteLessons = favoriteLessonsDoc.docs.map(doc => doc.data())
        console.log("🚀 ~ fetchUserData ~ userData:", userData)
        const simplifiedUser = getUserSummary(firebaseUser as User);
        
        const enhancedUser = {
          ...simplifiedUser,
          username: userData?.username,
          favoriteLessons,
          isAdmin: userData?.isAdmin || false,
        } as unknown as User; 
        
        return enhancedUser;
      }
      
      return firebaseUser as User;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return firebaseUser as User;
    }
  };

  const getUserSummary = (user: FirebaseAuthTypes.User | User): UserSummary => {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime
      },
      username: (user as User).username,
      favoriteLessons: (user as User).favoriteLessons,
      isAdmin: (user as User).isAdmin
    };
  };

  const refreshUserData = async () => {
    if (!auth.currentUser) return;
    
    try {
      const updatedUser = await fetchUserData(auth.currentUser);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    setUser,
    isAdmin: user?.isAdmin || false,
    isLoading,
    isAuthenticated: user !== null,
    logout,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
