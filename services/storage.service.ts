import storage from '@react-native-firebase/storage';
import * as FileSystem from 'expo-file-system';

/**
 * Uploads an image to Firebase Storage and returns the storage path
 * @param uri Local URI of the image file to upload
 * @param folder Folder path in Firebase Storage (e.g., 'categories', 'lessons')
 * @returns The Firebase Storage path of the uploaded image
 */
export const uploadImageToStorage = async (
  uri: string,
  folder: string = 'images'
): Promise<{ status: string; imagePath: string | null }> => {
  try {
    const randomId = Math.random().toString(36).substring(2, 15);
    const filename = `${randomId}_${Date.now()}.jpg`;
    const storagePath = `${folder}/${filename}`;
    
    const uploadUri = uri;
    
    const storageRef = storage().ref(storagePath);
    
    if (uploadUri.startsWith('file://') || uploadUri.startsWith('content://')) {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      
      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }
      
      const base64Data = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      await storageRef.putString(base64Data, 'base64');
    } else {
      await storageRef.putFile(uploadUri);
    }
    
    return {
      status: 'success',
      imagePath: storagePath
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      status: 'error',
      imagePath: null
    };
  }
};

/**
 * Gets the download URL for a file in Firebase Storage
 * @param storagePath Path to the file in Firebase Storage
 * @returns Download URL for the file
 */
export const getStorageDownloadUrl = async (storagePath: string): Promise<string> => {
  try {
    const url = await storage().ref(storagePath).getDownloadURL();
    return url;
  } catch (error) {
    console.error('Error getting download URL:', error);
    throw error;
  }
};

/**
 * Deletes a file from Firebase Storage
 * @param storagePath Path to the file in Firebase Storage
 * @returns Status of the operation
 */
export const deleteFileFromStorage = async (storagePath: string): Promise<{ status: string }> => {
  try {
    await storage().ref(storagePath).delete();
    return { status: 'success' };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { status: 'error' };
  }
};
