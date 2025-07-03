import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

async function onGoogleButtonPress() {
    // Prompt user to sign in with Google
    const { idToken } = await GoogleSignin.signIn();

    // Create a Firebase credential with the token
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // Sign in with credential
    return auth().signInWithCredential(googleCredential);
}
