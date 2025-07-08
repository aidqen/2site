import { useUser } from "@/hooks/useUser";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

// Image asset import (React Native requires the require() syntax for images)
const profileImage = require("../assets/images/profile.png");

/**
 * Welcome screen component that displays the app introduction
 */
export default function Index() {
  const router = useRouter();
    const { user, isAuthenticated } = useUser()
    console.log("🔍 ~ WelcomeScreen ~ app/welcome.tsx:10 ~ user:", isAuthenticated)
  
  
  // Load custom fonts if needed
  const [fontsLoaded] = useFonts({
    "IBMPlexSansHebrew-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
    "IBMPlexSansHebrew-Bold": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const handleStart = () => {
    if (isAuthenticated) router.push('/home')
      else router.push('/auth/login')
  };

  if (!fontsLoaded) {
    return <View className="flex-1 bg-white" />;
  }

  return (
    <View className="flex-1 bg-white relative items-center">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Profile Image */}
      <View className="absolute w-full h-[550px] top-0 items-center">
        <Image 
          source={profileImage}
          className="w-full h-full"
          resizeMode="cover"
          accessibilityLabel="Dr. Dafna Caspi profile image"
        />
      </View>

      {/* Gradient Overlay using LinearGradient */}
      <View style={{
        position: 'absolute',
        height: 350,
        width: '100%',
        top: 250,
      }}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 1)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
        />
      </View>

      {/* Text Content */}
      <View className="absolute top-[455px] w-[332px] items-center">
        <Text 
          className="text-[#12616f] text-[18px] text-center tracking-tighter"
          style={{ fontFamily: "IBMPlexSansHebrew-Regular", textAlign: 'center' }}
        >
          {`שלום! אני ד"ר דפנה כספי מורה ומאמנת תנועה בריאותית עם ניסיון של 35 שנה.`}
          {"\n\n"}
          {`באפליקציה זו תמצאו תרגולים פשוטים שמתאימים ליכולת האישית שלכם.`}
          {"\n\n"}
          {`המטרה שלי: לעזור לכם לזוז, להרגיש טוב, ולחיות באיכות חיים טובה. אני מאמינה שהתנועה היא מפתח לחיים מלאים ובריאים בכל גיל.`}
          {"\n\n"}
          {`הצטרפו אלינו למסע של כושר והשראה.`}
        </Text>
      </View>

      {/* Start Button */}
      <View className="absolute bottom-[80px] w-[321px] h-[53px]">
        <Pressable 
          className="w-full h-full bg-[#74cede] rounded-lg shadow-md flex items-center justify-center"
          onPress={handleStart}
          accessibilityLabel="Start button"
          accessibilityRole="button"
        >
          <Text 
            className="text-white text-[32px] text-center"
            style={{ fontFamily: "IBMPlexSansHebrew-Bold", textAlign: 'center' }}
          >
            התחילו
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
