import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface SocialLoginButtonsProps {
  onFacebookPress?: () => void;
  onGooglePress?: () => void;
  onApplePress?: () => void;
}

export function SocialLoginButtons({
  onFacebookPress,
  onGooglePress,
  onApplePress
}: SocialLoginButtonsProps) {
  return (
    <View className="w-full items-center mt-6">
      <Text className="font-ibm-regular text-sm text-[#666] mb-4">Or Login with</Text>
      <View className="flex-row justify-center w-full">
        <TouchableOpacity 
          className="w-12 h-12 rounded-full bg-white justify-center items-center mx-3 shadow-sm"
          onPress={onFacebookPress}
          activeOpacity={0.7}
        >
          <FontAwesome name="facebook" size={24} color="#3b5998" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="w-12 h-12 rounded-full bg-white justify-center items-center mx-3 shadow-sm"
          onPress={onGooglePress}
          activeOpacity={0.7}
        >
          <FontAwesome name="google" size={24} color="#DB4437" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="w-12 h-12 rounded-full bg-white justify-center items-center mx-3 shadow-sm"
          onPress={onApplePress}
          activeOpacity={0.7}
        >
          <FontAwesome name="apple" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


