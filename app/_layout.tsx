import { AuthProvider } from '@/context/AuthContext';
import store from '@/store/reducer';
import '@react-native-firebase/app';
import { Stack } from "expo-router";
import React from 'react';
import { I18nManager } from 'react-native';
import { Provider } from 'react-redux';
import './globals.css';

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
            animation: 'slide_from_right',
            presentation: 'card',
            animationDuration: 200,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
      </Provider>
    </AuthProvider>
  );
}
