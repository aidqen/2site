import React from 'react';
import { Text, TextInput, View, TextInputProps } from 'react-native';
import { colors } from '@/constants/styles';

interface AuthInputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

export function AuthInput({ 
  label, 
  error, 
  isPassword = false,
  ...props 
}: AuthInputProps) {
  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="font-ibm-regular text-sm text-[#333] mb-1 text-right">{label}</Text>
      )}
      <TextInput
        className={`h-12 border rounded-lg px-4 font-ibm-regular text-base text-[#333] bg-white text-right ${error ? 'border-[#FF6B6B]' : 'border-[#E0E0E0]'}`}
        placeholderTextColor="#A0A0A0"
        secureTextEntry={isPassword}
        {...props}
      />
      {error && (
        <Text className="font-ibm-regular text-xs text-[#FF6B6B] mt-1 text-right">{error}</Text>
      )}
    </View>
  );
}


