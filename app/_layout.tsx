import { AuthProvider } from '@/context/AuthContext';
import store from '@/store/reducer';
import '@react-native-firebase/app';
import { Stack } from "expo-router";
import React from 'react';
import { I18nManager } from 'react-native';
import { Provider } from 'react-redux';
import './globals.css';
// Firebase is automatically initialized when importing the app module

/**
 * Root layout component that sets up the app structure
 */
export default function RootLayout() {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);

  return (
    <AuthProvider>
      <Provider store={store}>
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
      </Provider>
    </AuthProvider>
  );
}
