import { CenterDuet } from "@/components/CenterDuet";
import { PageContainer } from "@/components/PageContainer";
import { SectionPreview } from "@/components/SectionPreview";
import { router, Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";

export default function Home() {

   const sections = [{
      id: 'recommendation',
      imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751112658/dafna-1_smvsj3.png',
      title: 'המלצות ארגון הבריאות העולמי לגילאי 60+',
      link: '',
   },
   {
      id: 'long',
      imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113343/4_1_no5ofb.png',
      title: 'שיעורים באורך מלא',
      link: '',
      description: 'כאן תמצאו שיעורים באורך מלא בכמה סגנונות שונים',

   },
   {
      id: 'short',
      imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113343/4_1_no5ofb.png',
      title: 'שיעורים קצרים',
      link: '',
      description: 'כאן תמצאו שיעורים קצרים בכמה סגנונות שונים',
   }
   ]


   return (
      <SafeAreaView className="h-full bg-white pt-6 pb-10">
         <Stack.Screen options={{ headerShown: false }} />
         
         <PageContainer
            title="שלום אבי"
            description="הגיל לא עוצר את מי שממשיך לזוז"
         >
            <View className="w-full gap-5 items-center">
               {sections.map((section: any, index: number) => (
                  <SectionPreview 
                     section={section} 
                     key={index} 
                     onPress={() => router.push({pathname: "/section/[id]", params: {id: section.id.toString()}})} 
                  />
               ))}
               <CenterDuet />
            </View>
         </PageContainer>
      </SafeAreaView>
   );
}