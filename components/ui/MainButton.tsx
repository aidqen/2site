import { colors } from '@/constants/styles';
import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

interface MainButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'filled' | 'outlined';
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const MainButton: React.FC<MainButtonProps> = ({
  title,
  variant = 'filled',
  color = colors.primaryDarker,
  containerStyle,
  textStyle,
  ...rest
}) => {
  const isFilled = variant === 'filled';
  
  return (
    <TouchableOpacity
      className={`w-full rounded-lg h-12 items-center justify-center p-0 mb-3 ${!isFilled ? 'bg-white' : ''}`}
      style={[
        isFilled ? { backgroundColor: color } : { borderWidth: 1, borderColor: colors.primaryTwo },
        containerStyle,
      ]}
      {...rest}
    >
      <Text 
        className={`text-center items-center justify-center p-0 text-[23px] font-bold ${isFilled ? 'text-white' : ''}`}
        style={[
          !isFilled ? { color: colors.primaryDarker } : {},
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
