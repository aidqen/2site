import { AuthButton } from '@/components/auth/AuthButton';
import { AuthInput } from '@/components/auth/AuthInput';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { colors } from '@/constants/styles';
import { supabase } from '@/lib/supabase';
import * as Linking from 'expo-linking';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // const auth = 

  async function signInWithEmail() {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      console.log("🔍 ~ Auth ~ app/login_test.tsx:24 ~ data:", data.session)
      
    if (error) return Alert.alert(error.message)
      router.replace('/home')
    setLoading(false)
  }

  // const handleGoogleLogin = async () => {
  //   console.log('Google login button pressed');
    
  //   try {
  //     const userCredential = await onGoogleButtonPress();
  //     console.log('Google sign-in successful:', userCredential.user.uid);
  //     router.replace('/(app)/home');
  //   } catch (error) {
  //     console.error('Google sign-in failed:', error);
  //   }
  // };

  const handleGoogleLogin = async () => {
    // Build the deep link URL your app will handle
    const redirectTo = Platform.select({
      web: window.location.origin,
      default: Linking.createURL('http://localhost:8081/home'),
    });

    // Initiate the OAuth flow
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) {
      console.error('Error starting Google OAuth:', error);
      return;
    }

    // On native: open the system browser for the OAuth URL
    if (Platform.OS !== 'web' && data?.url) {
      Linking.openURL(data.url);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />


      <View className="flex-1 px-6 pt-[125px]">
        <View className="items-end mb-8">
          <Text className="font-bold text-[32px]" style={{ color: colors.primaryDarker }}>ברוכים השבים!</Text>
          <Text className="font-bold text-[32px] mb-2" style={{ color: colors.primaryDarker }}>טוב לראות אותך שוב</Text>
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
            onPress={() => { }}
          >
            <Text className="font-semibold text-sm text-right" style={{ color: colors.primaryDarker }}>Forgot Password?</Text>
          </TouchableOpacity>

          <AuthButton
            title="התחבר"
            onPress={signInWithEmail}
            isLoading={loading}
          />
        </View>

        <SocialLoginButtons
        onGooglePress={handleGoogleLogin}
        />

        <View className="absolute bottom-5 -translate-x-[50%] left-[50%] flex-row justify-center mt-6 gap-1">
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text className="font-bold text-base text-[#12616f]">הירשם עכשיו</Text>
          </TouchableOpacity>
          <Text className="font-medium text-base text-[#666666]">אין לך חשבון?</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


