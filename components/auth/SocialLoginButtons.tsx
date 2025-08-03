import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SocialLoginButtonsProps {
  onFacebookPress?: () => void;
  onGooglePress?: () => void;
  onApplePress?: () => void;
}

type SocialButtonType = {
  name: 'facebook' | 'google' | 'apple';
  color: string;
  onPress?: () => void;
}

export function SocialLoginButtons({
  onFacebookPress,
  onGooglePress,
  onApplePress
}: SocialLoginButtonsProps) {
  const socialButtons: SocialButtonType[] = [
    { name: 'facebook', color: '#3b5998', onPress: onFacebookPress },
    { name: 'google', color: '#DB4437', onPress: onGooglePress },
  ];

  return (
    <View className="w-full items-center mt-6">
      <Text className="font-semibold text-sm text-[#6A707C] mb-4">Or Login with</Text>
      <View className="flex-row justify-between w-full px-2">
        {socialButtons.map((button) => (
          <TouchableOpacity 
            key={button.name}
            className="bg-white justify-center items-center mx-2 flex-1"
            style={{
              borderColor: '#E8ECF4',
              borderWidth: 1,
              borderRadius: 8,
              height: 56,
              minWidth: 100
            }}
            onPress={button.onPress}
            activeOpacity={0.7}
          >
            <FontAwesome name={button.name} size={24} color={button.color} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}


