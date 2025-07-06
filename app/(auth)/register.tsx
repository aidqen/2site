import { AuthButton } from '@/components/auth/AuthButton';
import { AuthInput } from '@/components/auth/AuthInput';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { colors } from '@/constants/styles';
import { onGoogleButtonPress } from '@/services/firebase.service';
import auth from '@react-native-firebase/auth';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  function handleGoogleLogin() {
    console.log('hi');
    
    onGoogleButtonPress()
  }

  const onSignup = () => {
    auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 px-6 pt-[125px]">
        <View className="items-end mb-8">
          <Text className="font-bold text-2xl mb-2"
            style={{ color: colors.primaryDarker }}>שלום!<br />הירשם כדי להתחיל</Text>
        </View>

        <View className="w-full mb-6">
          <AuthInput
            placeholder="שם משתמש"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <AuthInput
            placeholder='דוא"ל'
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
            onPress={onSignup}
            isLoading={isLoading}
          />
        </View>

        <SocialLoginButtons onGooglePress={handleGoogleLogin}/>

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


