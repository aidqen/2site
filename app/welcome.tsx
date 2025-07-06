import { AuthButton } from '@/components/auth/AuthButton';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 relative flex justify-between">
        {/* Logo at top */}
        <Image
          source={{ uri: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751374852/%D7%9C%D7%95%D7%92%D7%95_%D7%93%D7%A4%D7%A0%D7%94_%D7%9B%D7%A1%D7%A4%D7%99_-_%D7%92%D7%93%D7%95%D7%9C_-_%D7%90%D7%A0%D7%92%D7%9C%D7%99%D7%AA_wmxbeo.png' }}
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            top: '5%',
            alignSelf: 'center',
            marginTop: 60,
            resizeMode: 'contain'
          }}
        />

        {/* Text absolutely centered in page */}
        <View className="items-center absolute inset-0 justify-center">
          <Image source={{ uri: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751458725/logo_yrevdj.png' }}
            style={{
              width: '100%',
              height: '60%',
              top: '25%',
              left: '50%',
              transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
            }} />
        </View>

        {/* Position buttons at bottom */}
        <View className="absolute -translate-x-[50%] left-[50%] bottom-2.5 w-full px-6 mb-8 self-end">
          <AuthButton
            title="התחברות"
            onPress={() => router.push('/login')}
            variant="primary"
            className='h-[53px]'
            textStyle="text-3xl"
          />

          <AuthButton
            title="הרשמה"
            onPress={() => router.push('/register')}
            variant="secondary"
            className='h-[53px]'
            textStyle="text-3xl"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}


