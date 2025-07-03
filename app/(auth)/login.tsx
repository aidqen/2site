import { AuthButton } from '@/components/auth/AuthButton';
import { AuthInput } from '@/components/auth/AuthInput';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { colors } from '@/constants/styles';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(app)/home');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      
      
      <View className="flex-1 px-6 pt-[125px]">
        <View className="items-end mb-8">
          <Text className="font-semibold text-[32px] mb-2" style={{color: colors.primaryDarker}}>ברוכים השבים!<br/>טוב לראות אותך שוב</Text>
        </View>
        
        <View className="w-full mb-6">
          <AuthInput
            placeholder="אימייל"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <AuthInput
            placeholder="סיסמא"
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />
          
          <TouchableOpacity 
            className="self-end mb-4"
            onPress={() => {}}
          >
            <Text className="font-semibold text-sm text-right" style={{color: colors.primaryDarker}}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <AuthButton
            title="התחבר"
            onPress={handleLogin}
            isLoading={isLoading}
          />
        </View>
        
        <SocialLoginButtons />
        
        <View className="absolute bottom-5 -translate-x-[50%] left-[50%] flex-row justify-center mt-6 gap-1">
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text className="font-bold text-base text-[#12616f]">הירשם עכשיו</Text>
          </TouchableOpacity>
          <Text className="font-medium text-base text-[#666666]">אין לך חשבון?</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


