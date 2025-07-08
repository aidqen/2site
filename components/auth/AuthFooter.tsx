import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type AuthFooterProps = {
  type: 'login' | 'register';
};

export function AuthFooter({ type }: AuthFooterProps) {
  const router = useRouter();
  
  const content = {
    login: {
      question: 'אין לך חשבון?',
      action: 'הירשם עכשיו',
      route: '/auth/register' as const,
    },
    register: {
      question: 'יש לך חשבון?',
      action: 'התחבר עכשיו',
      route: '/auth/login' as const,
    },
  };

  const { question, action, route } = content[type];

  return (
    <View className="absolute bottom-16 left-0 right-0 mx-auto flex items-center justify-center">
      <View className="flex-row-reverse gap-1">
        <Text className="font-medium text-base text-[#666666]">{question}</Text>
        <TouchableOpacity onPress={() => router.push(route)}>
          <Text className="font-bold text-base text-[#12616f]">{action}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
