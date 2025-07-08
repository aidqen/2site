import { AuthButton } from '@/components/auth/AuthButton';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { AuthInput } from '@/components/auth/AuthInput';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { colors } from '@/constants/styles';
import { createUserWithEmailAndPassword, getAuth } from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const auth = getAuth()




  async function signUpWithEmail() {
    if (!username || !email || !password || !confirmPassword) {
      const missingFields = []
      if (!username) missingFields.push('Username')
      if (!email) missingFields.push('Email')
      if (!password) missingFields.push('Password')
      if (!confirmPassword) missingFields.push('Confirm Password')
      Alert.alert('Error', `Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;
      await firestore()
        .collection("users")
        .doc(uid)
        .set({
          username,
          favoriteLessons: [],
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      router.replace('/home')
      console.log('User signed up successfully!');
    } catch (err) {

    }
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
        />

        <AuthFooter type="register" />
      </View>
    </SafeAreaView>
  );
}
