import { launchImageLibrary } from 'react-native-image-picker';

const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if (result.didCancel) return;
    return result.assets[0].uri
    // setImageUri(result.assets[0].uri);
  };