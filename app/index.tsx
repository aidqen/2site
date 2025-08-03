import { AuthButton } from "@/components/auth/AuthButton";
import { useUser } from "@/hooks/useUser";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { Image, SafeAreaView, View } from "react-native";
// Image asset import (React Native requires the require() syntax for images)


/**
 * Welcome screen component that displays the app introduction
 */
export default function Index() {
  const router = useRouter();
    const { user, isAuthenticated } = useUser()
  
  
  // Load custom fonts if needed
  const [fontsLoaded] = useFonts({
    "IBMPlexSansHebrew-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
    "IBMPlexSansHebrew-Bold": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });


  if (!fontsLoaded) {
    return <View className="flex-1 bg-white" />;
  }

  return (

        <SafeAreaView className="flex-1 bg-white">
          {/* <StatusBar style="dark" /> */}
          <Stack.Screen options={{ headerShown: false }} />
    
          <View className="flex-1 relative flex justify-between">
            {/* Logo at top */}
            <Image
              source={{ uri: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751374852/%D7%9C%D7%95%D7%92%D7%95_%D7%93%D7%A4%D7%A0%D7%94_%D7%9B%D7%A1%D7%A4%D7%99_-_%D7%92%D7%93%D7%95%D7%9C_-_%D7%90%D7%A0%D7%92%D7%9C%D7%99%D7%AA_wmxbeo.png' }}
              style={{
                position: 'absolute',
                width: 100,
                height: 100,
                top: '5%',
                alignSelf: 'center',
                marginTop: 60,
              }}
              resizeMode="contain"
            />
    
            {/* Text absolutely centered in page */}
            <View className="items-center absolute inset-0 justify-center">
              <Image source={{ uri: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751458725/logo_yrevdj.png' }}
                style={{
                  width: '100%',
                  height: '60%',
                  top: '25%',
                  left: '50%',
                  transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
                }} />
            </View>
    
            {/* Position buttons at bottom */}
            <View className="absolute -translate-x-[50%] left-[50%] bottom-2.5 w-full px-6 mb-8 self-end">
              <AuthButton
                title="התחברות"
                onPress={() => router.push('/auth/login')}
                variant="primary"
                className='h-[53px]'
                textStyle="text-3xl"
              />
    
              <AuthButton
                title="הרשמה"
                onPress={() => router.push('/welcome')}
                variant="secondary"
                className='h-[53px]'
                textStyle="text-3xl"
              />
            </View>
          </View>
        </SafeAreaView>
  );
}
