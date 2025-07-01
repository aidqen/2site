import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { BackButton } from '@/components/BackButton';
import { colors } from '@/constants/styles';

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
      
      <BackButton />
      
      <View className="flex-1 px-6 pt-[60px]">
        <View className="items-center mb-8">
          <Text className="font-ibm-bold text-2xl text-[#12616f] mb-2">ברוכים השבים!</Text>
          <Text className="font-ibm-regular text-lg text-[#666666]">טוב לראות אותך שוב</Text>
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
            <Text className="font-ibm-regular text-sm text-[#12616f] text-right">?Forgot Password</Text>
          </TouchableOpacity>
          
          <AuthButton
            title="התחבר"
            onPress={handleLogin}
            isLoading={isLoading}
          />
        </View>
        
        <SocialLoginButtons />
        
        <View className="flex-row justify-center mt-6">
          <Text className="font-ibm-regular text-base text-[#666666]">אין לך חשבון? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text className="font-ibm-semibold text-base text-[#12616f]">הירשם עכשיו</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


