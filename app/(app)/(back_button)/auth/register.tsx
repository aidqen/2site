import { AuthButton } from '@/components/auth/AuthButton';
import { AuthInput } from '@/components/auth/AuthInput';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { colors } from '@/constants/styles';
import { supabase } from '@/lib/supabase';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  // const handleGoogleLogin = async () => {
  //   const redirectUrl = Platform.select({
  //     web: window.location.origin,
  //     default: AuthSession.makeRedirectUri({ scheme: 'myapp' })
  //   });

  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: { redirectTo: redirectUrl }
  //   });

  //   if (error) {
  //     console.error('Google sign-in error:', error);
  //   } else {
  //     // data.url is the OAuth login URL; on web you'd navigate to it, on RN Expo it opens in Expo AuthSession :contentReference[oaicite:7]{index=7}
  //     if (Platform.OS === 'web') {
  //       window.location.href = data.url;
  //     } else {
  //       await AuthSession.startAsync({ authUrl: data.url, returnUrl: redirectUrl });
  //     }
  //   }
  // };



  async function signUpWithEmail() {
    setLoading(true)
    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!data.session) Alert.alert('Please check your inbox for email verification!')
    router.replace('/home')
    setLoading(false)
  }


  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 px-6 pt-[125px]">
        <View className="items-end mb-8">
          <Text className="font-bold text-[32px]"
            style={{ color: colors.primaryDarker }}>שלום!</Text>
          <Text className="font-bold text-[32px] mb-2"
            style={{ color: colors.primaryDarker }}>הירשם כדי להתחיל</Text>
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
            onPress={signUpWithEmail}
            isLoading={loading}
          />
        </View>

        <SocialLoginButtons
          // onGooglePress={handleGoogleLogin}
        />

        <View className="absolute bottom-5 -translate-x-[50%] left-[50%] flex-row justify-center mt-6 gap-1">
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text className="font-bold text-base text-[#12616f]">הירשם עכשיו</Text>
          </TouchableOpacity>
          <Text className="font-medium text-base text-[#666666]">יש לך חשבון?</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


