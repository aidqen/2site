import { PageContainer } from "@/components/PageContainer";
import { SectionPreview } from "@/components/SectionPreview";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import { FlatList, SafeAreaView, View } from "react-native";

export default function FavoriteLessons() {
    // const [favoriteLessons, setFavoriteLessons] = useState<FavoriteLesson[]>([])
    const router = useRouter()
    // console.log("🚀 ~ FavoriteLessons ~ favoriteLessons:", favoriteLessons)
    const { user } = useUser()
    
    // useEffect(() => {
    //     const fetchFavoriteLessons = async () => {
    //         if (user) {
    //             const favoriteLessons = await getFavoriteLessons(user.uid)
    //             setFavoriteLessons(favoriteLessons || [])
    //         }
    //     }
    //     fetchFavoriteLessons()
    // }, [])

    return (
        <SafeAreaView className="h-full bg-white pt-6 pb-10">
            <PageContainer
                title="מועדפים"
                description="הגיל לא עוצר את מי שממשיך לזוז"
            >
                <View style={{ width: '100%' }}>
                    {user?.favoriteLessons && user.favoriteLessons.length > 0 && (
                        <FlatList
                            data={user.favoriteLessons}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <SectionPreview
                                    id={item.id}
                                    imgUrl={item.imgUrl}
                                    title={item.name}
                                    onPress={() => router.push(`/lesson/${item.id}`)}
                                    isLesson={true}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
                        />
                    )}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}
