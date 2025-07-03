import { colors } from '@/constants/styles';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface AuthButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
  textStyle?: string;
}

export function AuthButton({ 
  title, 
  isLoading = false, 
  variant = 'primary',
  className,
  textStyle,
  ...props 
}: AuthButtonProps) {
  return (
    <TouchableOpacity
      className={`w-full h-12 rounded-lg justify-center items-center my-2 ${props.disabled ? 'opacity-60' : ''} ${className}`}
      style={{
        backgroundColor: variant === 'primary' ? '#5DA5B2' : colors.secondary,
        shadowColor: '#000000',
        shadowOffset: { width: 0.89, height: 2.67 },
        shadowOpacity: 0.2,
        shadowRadius: 4.19,
        elevation: 6, // Android equivalent
      }}
      activeOpacity={0.8}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text 
          className={`font-bold text-lg text-white ${textStyle || ''}`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}


