import { PERMISSIONS, RESULTS, check, openSettings, request } from 'react-native-permissions';

export const requestPermission = async () => {
    // if (Platform.OS === 'android') {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //     {
    //       title: 'Gallery Permission',
    //       message: 'App needs access to your photo gallery',
    //       buttonPositive: 'OK',
    //     },
    //   );
    //   console.log("🚀 ~ requestPermission ~ granted:", granted)
    //   console.log("🚀 ~ requestPermission ~ PermissionsAndroid.RESULTS.GRANTED:", PermissionsAndroid.RESULTS.GRANTED)
    // //   if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    // //     Alert.alert('Permission Denied', 'Cannot access gallery');
    // //   }
    // }
    const status = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (status === RESULTS.DENIED) {
        const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        if (result === RESULTS.BLOCKED) {
            // Permission is permanently denied
            openSettings();
        }
    }
};