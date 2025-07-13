import { CenterDuet } from "@/components/CenterDuet";
import { PageContainer } from "@/components/PageContainer";
import { SectionPreview } from "@/components/SectionPreview";
import { useUser } from "@/hooks/useUser";
import { router, Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";

export default function Home() {
   const { user, isAdmin, getUsername } = useUser()

   const sections = [{
      id: 'recommendation',
      imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751112658/dafna-1_smvsj3.png',
      title: 'המלצות ארגון הבריאות העולמי לגילאי 60+',
      link: '/recommendations',
   },
   {
      id: 'long',
      imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113343/4_1_no5ofb.png',
      title: 'שיעורים באורך מלא',
      link: '/section/[id]',
      description: 'כאן תמצאו שיעורים באורך מלא בכמה סגנונות שונים',

   },
   {
      id: 'short',
      imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113343/4_1_no5ofb.png',
      title: 'שיעורים קצרים',
      link: '/section/[id]',
      description: 'כאן תמצאו שיעורים קצרים בכמה סגנונות שונים',
   }
   ]


   return (
      <SafeAreaView className="h-full bg-white pt-6 pb-10">
         <Stack.Screen options={{ headerShown: false }} />
         
         <PageContainer
            title={'שלום ' + getUsername()}
            description="הגיל לא עוצר את מי שממשיך לזוז"
         >
            <View className="w-full gap-5 items-center">
               {sections.map((section: any, index: number) => (
                  <SectionPreview 
                     id={section.id}
                     imgUrl={section.imgUrl}
                     title={section.title}
                     onPress={() => router.push({pathname: section.link, params: {id: section.id !== 'recommendations' ? section.id.toString() : ''}})} 
                  />
               ))}
               <CenterDuet />
            </View>
         </PageContainer>
      </SafeAreaView>
   );
}