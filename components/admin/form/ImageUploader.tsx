import { colors } from '@/constants/styles';
import { getStorageDownloadUrl } from '@/services/lesson.service';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ImageUploaderProps {
  onPress: () => void;
  image: string | undefined;
  label?: string;
}

/**
 * Reusable image upload component for forms
 */
export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onPress,
  image,
  label = 'תמונות ראשיות'
}) => {
  const [imgUrl, setImgUrl] = useState<string | undefined>(image)


  useEffect(() => {
    if (image) {
      getStorageDownloadUrl(image)
        .then(url => setImgUrl(url))
        .catch(console.error);
    }
  }, [image])

  return (
    <View className="mb-4 flex-col">
      <Text className="font-ibm-regular text-xl text-[#333] mb-1 text-right"
        style={{ color: colors.primaryDarker }}>{label}</Text>
      <View className="flex-row justify-end gap-2 mb-4">

        <TouchableOpacity
          onPress={onPress}
          className="w-[104px] h-[104px] bg-white border border-[#4D8E99] rounded-lg items-center justify-center"
        >
          {imgUrl ?
            <Image source={{ uri: imgUrl }} className="w-full h-full z-10" /> :
            <Ionicons name="add" className='z-20' size={32} color={colors.primaryDarker} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};
