import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { colors } from '@/constants/styles';

interface AuthButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function AuthButton({ 
  title, 
  isLoading = false, 
  variant = 'primary',
  ...props 
}: AuthButtonProps) {
  return (
    <TouchableOpacity
      className={`w-full h-12 rounded-lg justify-center items-center my-2 ${props.disabled ? 'opacity-60' : ''}`}
      style={{ backgroundColor: variant === 'primary' ? colors.primaryDarker : colors.secondary }}
      activeOpacity={0.8}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text 
          className="font-ibm-semibold text-lg text-white"
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}


