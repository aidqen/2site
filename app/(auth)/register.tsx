import { AuthButton } from '@/components/auth/AuthButton';
import { AuthInput } from '@/components/auth/AuthInput';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { colors } from '@/constants/styles';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(app)/home');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* <BackButton /> */}
      
      <View className="flex-1 px-6 pt-[60px]">
        <View className="items-center mb-8">
          <Text className="font-ibm-bold text-2xl text-[#12616f] mb-2">נשלום!</Text>
          <Text className="font-ibm-regular text-lg text-[#666666]">הירשם כדי להתחיל</Text>
        </View>
        
        <View className="w-full mb-6">
          <AuthInput
            placeholder="שם משתמש"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          
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
          
          <AuthInput
            placeholder="אישור סיסמא"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isPassword={true}
          />
          
          <AuthButton
            title="הירשם"
            onPress={handleRegister}
            isLoading={isLoading}
          />
        </View>
        
        <SocialLoginButtons />
        
        <View className="flex-row justify-center mt-6">
          <Text className="font-ibm-regular text-base text-[#666666]">כבר יש לך חשבון? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="font-ibm-semibold text-base text-[#12616f]">התחבר עכשיו</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


