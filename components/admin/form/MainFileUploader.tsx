import { colors } from '@/constants/styles';
import { getStorageDownloadUrl } from '@/services/lesson.service';
import { uploadImageToStorage } from '@/services/storage.service';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity } from 'react-native';

interface VideoUploaderProps {
    onPress?: () => void;
    label: string;
    type: 'mainImg' | 'video';
    fileUrl: string;
    onFileUploaded?: (path: string) => void;
}

/**
 * Reusable video upload component for forms
 */
export const MainFileUploader: React.FC<VideoUploaderProps> = ({
    onPress,
    type,
    fileUrl,
    onFileUploaded,
}) => {
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    
    const [uri, setUri] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);
    
    useEffect(() => {
        if (fileUrl) {
            getStorageDownloadUrl(fileUrl)
                .then(url => setUri(url))
                .catch(console.error);
        }
    }, [fileUrl])

    const pickFromGallery = async () => {
        await requestPermission();
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: type === 'video' ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [11, 7],
          quality: 1,
        });
    
        if (!result.canceled) {
          const selectedUri = result.assets[0].uri;
          setUri(selectedUri);
          
          try {
            setIsUploading(true);
            const folder = type === 'video' ? 'videos' : 'images';
            const uploadResult = await uploadImageToStorage(selectedUri, folder);
            
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
        <TouchableOpacity
            className="mb-4 h-[146px] relative border rounded-lg items-center justify-center"
            style={{ borderColor: colors.primaryDarker }}
        >
            {type === 'mainImg' && uri && <Image source={{uri}} className="w-full h-full rounded-lg" resizeMode="cover"/>}
            {/* {type === 'video' && <Video source={{uri}} className="w-full h-full rounded-lg" resizeMode="cover"/>} */}
            {isUploading ? (
                <ActivityIndicator size="large" color={colors.primaryDarker} />
            ) : (
                <TouchableOpacity
                    className="absolute w-[60px] h-[60px] rounded-lg flex-row items-center justify-center"
                    style={{ borderColor: colors.primaryDarker, backgroundColor: colors.primaryDarker }}
                    onPress={pickFromGallery}
                >
                    <Ionicons name="add" size={35} color={'white'} />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
};
