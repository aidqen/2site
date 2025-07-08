import { AuthButton } from '@/components/auth/AuthButton';
import { AuthInput } from '@/components/auth/AuthInput';
import { colors } from '@/constants/styles';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = () => {
    setIsLoading(true);
    // Simulate API call to send verification code
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/verify-otp');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      
      
      <View className="flex-1 px-6 pt-[125px]">
        <View className="items-end mb-8">
          <Text className="font-bold text-[32px] mb-2" style={{color: colors.primaryDarker}}>
            שכחת סיסמא?
          </Text>
          <Text className="font-medium text-base text-right text-[#6A707C]">
            לא נורא! אנא הכנס את הכתובת האימייל{'\n'}
            המקושרת לחשבון
          </Text>
        </View>
        
        <View className="w-full mb-6">
          <AuthInput
            placeholder='דוא"ל'
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <AuthButton
            title="לקבלת קוד"
            onPress={handleSendCode}
            isLoading={isLoading}
            className="mt-6"
          />
        </View>
        
        <View className="absolute bottom-5 -translate-x-[50%] left-[50%] flex-row justify-center gap-1">
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text className="font-bold text-base" style={{color: colors.primaryDarker}}>
              זכור את הסיסמא? התחבר
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
