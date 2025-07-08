import '@react-native-firebase/app';
import { AuthProvider } from '@/context/AuthContext';
import { Stack } from "expo-router";
import './globals.css';
// Firebase is automatically initialized when importing the app module

/**
 * Root layout component that sets up the app structure
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
          // Add smooth animations
          animation: 'slide_from_right',
          presentation: 'card',
          animationDuration: 200,
          // Add gesture-based navigation
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
    </AuthProvider>
  );
}
