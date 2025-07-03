import { colors } from '@/constants/styles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

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
      <View className='relative'>

        <TextInput
          className={`h-14 border rounded-lg px-4 font-medium placeholder:text-[#4D8E99] text-base bg-transparent text-right ${error ? 'border-[#FF6B6B]' : 'border-[#4D8E99]'}`}
          style={{ color: colors.primaryDarker }}
          placeholderTextColor="#A0A0A0"
          secureTextEntry={isPassword}
          {...props}
        />
        {isPassword && <Ionicons name="eye-outline" size={24} color={colors.primaryDarker} className='absolute left-3.5 -translate-y-[50%] top-[50%]' />}
      </View>
      {error && (
        <Text className="font-ibm-regular text-xs text-[#FF6B6B] mt-1 text-right">{error}</Text>
      )}
    </View>
  );
}


