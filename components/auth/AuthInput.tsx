import { colors } from '@/constants/styles';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface AuthInputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
  placeholder?: string;
}

export function AuthInput({
  label,
  error,
  isPassword = false,
  placeholder,
  ...props
}: AuthInputProps) {
  const [isPasswordSeen, setIsPasswordSeen] = useState(false)

  function passwordSeenTimeout() {
    setIsPasswordSeen(true)
    setTimeout(() => {
      setIsPasswordSeen(false)
    }, 1500)
  }
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
          secureTextEntry={isPassword && !isPasswordSeen}
          placeholder={placeholder}
          {...props}
        />
        {isPassword && <TouchableOpacity onPress={passwordSeenTimeout} className='absolute left-3.5 -translate-y-[50%] top-[50%]'>
          <Ionicons name="eye-outline" size={24} color={colors.primaryDarker} />
        </TouchableOpacity>}
      </View>
      {error && (
        <Text className="font-ibm-regular text-xs text-[#FF6B6B] mt-1 text-right">{error}</Text>
      )}
    </View>
  );
}


