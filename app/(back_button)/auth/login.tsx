import { AuthButton } from '@/components/auth/AuthButton';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { AuthInput } from '@/components/auth/AuthInput';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { colors } from '@/constants/styles';
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // const auth = 

  React.useEffect(() => {
    GoogleSignin.configure({
        webClientId: '940099451051-27k3m5q01c4d11pfb104jdlqrj7q3jl7.apps.googleusercontent.com', // Get this from your Firebase console
    });
}, []);

  async function signInWithEmail() {
    try {
      const result = await signInWithEmailAndPassword(getAuth(), email, password);
      console.log("🔍 ~ LoginScreen ~ app/(back_button)/auth/login.tsx:29 ~ result:", result)
      router.replace('/home')
      console.log('User signed in successfully!');
    } catch (err) {

    }
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
    setLoading(true);
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get the user ID token
            const response = await GoogleSignin.signIn();
            console.log("🔍 ~ LoginScreen ~ app/(app)/(back_button)/auth/login.tsx:49 ~ response:", response)

            // Check if sign-in was successful
            if (response.type === 'success' && response.data.idToken) {
                // Create a Google credential with the token
                const googleCredential = GoogleAuthProvider.credential(response.data.idToken);

                // Sign-in the user with the credential
                await signInWithCredential(getAuth(), googleCredential);
                console.log('User signed in with Google!');
            } else {
                console.log('Google Sign-In was cancelled or failed');
                setLoading(false);
                return;
            }
        } catch (error: any) {
            console.error(error);
            Alert.alert('Error', 'Google sign in failed. Please try again.');
        } finally {
            setLoading(false);
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

        <AuthFooter type="login" />
      </View>
    </SafeAreaView>
  );
}


