import { AuthInput } from '@/components/auth/AuthInput';
import React from 'react';
import { Text, View } from 'react-native';

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  className?: string;
}

/**
 * Text input field component for forms
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  className = ''
}) => {
  if (multiline) {
    return (
      <View className="mb-4">
        <Text className="font-ibm-regular text-sm text-[#333] mb-1 text-right">{label}</Text>
        <AuthInput
          value={value}
          onChangeText={onChangeText}
          multiline
          numberOfLines={numberOfLines}
          className={`h-32 pt-2 ${className}`}
          placeholder={placeholder}
        />
      </View>
    );
  }

  return (
    <AuthInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      className={`mb-4 ${className}`}
    />
  );
};
