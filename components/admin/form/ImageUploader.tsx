import { colors } from '@/constants/styles';
import { getStorageDownloadUrl } from '@/services/lesson.service';
import { uploadImageToStorage } from '@/services/storage.service';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ImageUploaderProps {
  onPress: () => void;
  image: string | undefined;
  label?: string;
  onFileUploaded?: (path: string) => void;
}

/**
 * Reusable image upload component for forms
 */
export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onPress,
  image,
  label = 'תמונות ראשיות',
  onFileUploaded
}) => {
  const [imgUrl, setImgUrl] = useState<string | undefined>(image)
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [isUploading, setIsUploading] = useState(false);


  useEffect(() => {
    if (image) {
      getStorageDownloadUrl(image)
        .then(url => setImgUrl(url))
        .catch(console.error);
    }
  }, [image])

  const pickFromGallery = async () => {
    await requestPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [11, 7],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImgUrl(selectedUri);

      try {
        setIsUploading(true);
        const uploadResult = await uploadImageToStorage(selectedUri, 'images');

        if (uploadResult.status === 'success' && uploadResult.imagePath) {
          if (onFileUploaded) {
            onFileUploaded(uploadResult.imagePath);
          }
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <View className="mb-4 flex-col">
      <Text className="font-ibm-regular text-xl text-[#333] mb-1 text-right"
        style={{ color: colors.primaryDarker }}>{label}</Text>
      <View className="flex-row justify-end gap-2 mb-4">

        <TouchableOpacity
          onPress={pickFromGallery}
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
