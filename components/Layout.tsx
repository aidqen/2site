// src/components/Layout.tsx
import React from 'react';
import { SafeAreaView, View } from 'react-native';

/**
 * Layout component that wraps the entire application
 * Provides consistent styling and safe area handling
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {children}
      </View>
    </SafeAreaView>
  );
}