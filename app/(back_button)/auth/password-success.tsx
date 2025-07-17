import { AuthButton } from '@/components/auth/AuthButton';
import { colors } from '@/constants/styles';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function PasswordSuccessScreen() {

    const handleLogin = () => {
        router.replace('/auth/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />


            <View className="flex-1 px-6 justify-center items-center">
                <View className="items-center mb-8">

                    <Text className="font-bold text-[32px] mb-2" style={{ color: colors.primaryDarker }}>
                        הסיסמא שונתה!
                    </Text>
                    <Text className="font-medium text-base text-center text-[#6A707C] mb-12">
                        הסיסמא שלך שונתה בהצלחה
                    </Text>
                </View>

                <AuthButton
                    title="התחבר"
                    onPress={handleLogin}
                    className="w-full"
                />
            </View>
        </SafeAreaView>
    );
}
