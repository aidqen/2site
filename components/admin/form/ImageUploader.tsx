import { colors } from '@/constants/styles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ImageUploaderProps {
  onPress: () => void;
  images: string[];
  label?: string;
}

/**
 * Reusable image upload component for forms
 */
export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onPress, 
  images,
  label = 'תמונות ראשיות'
}) => {
  return (
    <View className="mb-4 flex-col">
      <Text className="font-ibm-regular text-xl text-[#333] mb-1 text-right"
      style={{color: colors.primaryDarker}}>{label}</Text>
      <View className="flex-row justify-end gap-2 mb-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <View key={index} className="w-[104px] h-[104px] bg-gray-200 rounded-lg" />
          ))
        ) : (
          <TouchableOpacity 
            onPress={onPress}
            className="w-[104px] h-[104px] bg-white border border-[#4D8E99] rounded-lg items-center justify-center"
          >
            <Ionicons name="add" size={32} color={colors.primaryDarker} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
