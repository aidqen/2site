import { AuthButton } from '@/components/auth/AuthButton';
import { colors } from '@/constants/styles';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyOTPScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Fixed router path to match the expected type
      router.push('/auth/reset-password');
    }, 1500);
  };

  const handleResendCode = () => {
    console.log('Resend code');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 px-6 pt-[125px]">
        <View className="items-end mb-8">
          <Text className="font-bold text-[32px] mb-2" style={{ color: colors.primaryDarker }}>
            קוד אימות
          </Text>
          <Text className="font-medium text-base text-right text-[#6A707C]">
            אנא הכנס את קוד האימות שנשלח{'\n'}
            לכתובת המייל שלך
          </Text>
        </View>

        <View className="w-full mb-6">
          <View className="mb-6">
            <FlatList<number>
              data={[0, 1, 2, 3]}
              horizontal={false}
              numColumns={4}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              scrollEnabled={false}
              keyExtractor={(item: number) => `otp-${item}`}
              renderItem={({ item: index }: { item: number }) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputRefs.current[index] = ref }}
                  className={`h-16 border rounded-lg text-center text-2xl font-bold ${otp[index] ? 'bg-white border-[#74CEDE]' : 'border-[#E8ECF4] bg-[#F7F8F9]'}`}
                  style={{ color: colors.primaryDarker, width: 70, height: 70 }}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={otp[index]}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              )}
            />
          </View>

          <AuthButton
            title="אישור"
            onPress={handleVerifyOTP}
            isLoading={isLoading}
            className="mt-6"
          />
        </View>

        <View className="absolute bottom-5 -translate-x-[50%] left-[50%] flex-row items-center justify-center gap-1">
          <TouchableOpacity onPress={handleResendCode}>
            <Text className="font-bold text-base" style={{ color: colors.primaryDarker }}>
              לשליחה מחדש
            </Text>
          </TouchableOpacity>
          <Text className='font-medium text-[#1E232C] text-base'>
            לא קיבלת קוד?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
