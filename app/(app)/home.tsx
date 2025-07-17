import { CenterDuet } from "@/components/CenterDuet";
import { PageContainer } from "@/components/PageContainer";
import { SectionPreview } from "@/components/SectionPreview";
import { sections } from "@/constants/mockData";
import { useUser } from "@/hooks/useUser";
import { router, Stack } from "expo-router";
import { FlatList, SafeAreaView, View } from "react-native";

export default function Home() {
   const { user, isAdmin, getUsername } = useUser()




   return (
      <SafeAreaView className="h-full bg-white pt-6 pb-10">
         <Stack.Screen options={{ headerShown: false }} />
         
         <PageContainer
            title={'שלום ' + getUsername()}
            description="הגיל לא עוצר את מי שממשיך לזוז"
         >
            <View className="w-full">
               <FlatList
                  data={sections}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                     <SectionPreview 
                        id={item.id}
                        imgUrl={item.imgUrl}
                        title={item.title}
                        onPress={() => router.push({pathname: item.link as any, params: {id: item.id !== 'recommendations' ? item.id.toString() : ''}})} 
                     />
                  )}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
                  ListFooterComponent={<CenterDuet />}
               />
            </View>
         </PageContainer>
      </SafeAreaView>
   );
}