import { AuthButton } from '@/components/auth/AuthButton';
import { AuthInput } from '@/components/auth/AuthInput';
import { colors } from '@/constants/styles';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('הסיסמאות אינן תואמות');
      return false;
    }
    if (newPassword.length < 6) {
      setPasswordError('הסיסמא חייבת להכיל לפחות 6 תווים');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleResetPassword = () => {
    if (!validatePassword()) return;
    
    setIsLoading(true);
    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/password-success');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      
      
      <View className="flex-1 px-6 pt-[125px]">
        <View className="items-end mb-8">
          <Text className="font-bold text-[32px] mb-2" style={{color: colors.primaryDarker}}>
            צור סיסמא חדשה
          </Text>
          <Text className="font-medium text-base text-right text-[#6A707C]">
            הסיסמא החדשה צריכה להיות שונה{'\n'}
            מהסיסמאות הקודמות
          </Text>
        </View>
        
        <View className="w-full mb-6">
          <AuthInput
            placeholder="סיסמא חדשה"
            value={newPassword}
            onChangeText={setNewPassword}
            isPassword={true}
          />
          
          <AuthInput
            placeholder="אישור סיסמא"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isPassword={true}
            error={passwordError}
          />
          
          <AuthButton
            title="איפוס הסיסמא"
            onPress={handleResetPassword}
            isLoading={isLoading}
            className="mt-6"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
