// import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// // Initialize GoogleSignin with the webClientId from google-services.json
// // The webClientId is the client_id with client_type: 3 from google-services.json
// GoogleSignin.configure({
//   webClientId: '940099451051-27k3m5q01c4d11pfb104jdlqrj7q3jl7.apps.googleusercontent.com',
// });

// /**
//  * Signs in the user with Google
//  * @returns Firebase User Credential
//  */
// export async function onGoogleButtonPress() {
//   try {
//     console.log('hi');
    
//     // Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices();
    
//     // Prompt user to sign in with Google
//     const userInfo = await GoogleSignin.signIn();
    
//     // Get the ID token (may be undefined in the type but should be present)
//     // @ts-ignore - The idToken property exists but TypeScript doesn't recognize it
//     const idToken = userInfo.idToken;
    
//     if (!idToken) {
//       throw new Error('No ID token present in Google Sign-In response');
//     }

//     // Create a Firebase credential with the token
//     const googleCredential = GoogleAuthProvider.credential(idToken);

//     // Sign in with credential
//     return auth().signInWithCredential(googleCredential);
//   } catch (error) {
//     console.error('Google Sign-In Error:', error);
//     throw error;
//   }
// }
