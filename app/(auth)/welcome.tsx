import { AuthButton } from '@/components/auth/AuthButton';
import { colors } from '@/constants/styles';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="flex-1 px-6 relative flex justify-between">
        {/* Logo at top */}
        <Image
          source={{uri: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751374852/%D7%9C%D7%95%D7%92%D7%95_%D7%93%D7%A4%D7%A0%D7%94_%D7%9B%D7%A1%D7%A4%D7%99_-_%D7%92%D7%93%D7%95%D7%9C_-_%D7%90%D7%A0%D7%92%D7%9C%D7%99%D7%AA_wmxbeo.png'}} 
          style={{ 
            position: 'absolute',
            width: 92, 
            height: 92, 
            top: 60,
            alignSelf: 'center',
            marginTop: 60,
            resizeMode: 'contain'
          }}
        />
        
        {/* Text absolutely centered in page */}
        <View className="items-center absolute inset-0 justify-center">
          <Text className="font-ibm-extrabold text-[68px] mb-2" style={{color: colors.secondary}}>Active 60+</Text>
          <Text className="font-ibm-bold text-2xl" style={{color: '#A1B7FF'}}>מאת דפנה כספי</Text>
        </View>
        
        {/* Position buttons at bottom */}
        <View className="w-full px-4 mb-8 self-end">
          <AuthButton 
            title="התחברות" 
            onPress={() => router.push('/(auth)/login')}
            variant="primary"
          />
          
          <AuthButton 
            title="הרשמה" 
            onPress={() => router.push('/(auth)/register')}
            variant="secondary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}


