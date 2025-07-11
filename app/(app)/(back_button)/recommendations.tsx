import { BackButton } from "@/components/BackButton";
import { footerNoteText, principleSections, recommendationCards } from "@/constants/recommendationData";
import { colors } from "@/constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Recommendation card component
const RecommendationCard = ({ title, borderColor = colors.primaryDarker }: { title: string, borderColor?: string }) => {
    return (
        <TouchableOpacity
            className="rounded-xl justify-center border h-[64px] py-3 px-4"
            style={{ borderColor }}
        >
            <Text
                className="text-center text-base"
                style={{ color: 'black' }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const Separator = () => (
    <View className="h-[2.5px] w-[85%] rounded-full mx-auto my-8 opacity-80" style={{ backgroundColor: colors.primary }} />
)

export default function RecommendationsPage() {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Hero Image with Gradient Overlay */}
            {/* Hero Image */}
            <View style={{ height: 300, marginTop: -insets.top }}>
                <Image
                    source={{ uri: "https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113343/4_1_no5ofb.png" }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: 300,
                        zIndex: 1
                    }}
                    resizeMode="cover"
                />

                <View style={{ position: 'absolute', top: insets.top, left: 0, zIndex: 10 }}>
                    <BackButton />
                </View>

                {/* Gradient Overlay */}
                <View style={{
                    position: 'absolute',
                    height: 150,
                    width: '100%',
                    bottom: 0,
                    zIndex: 5
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
            </View>

            {/* Content */}
            <View className="px-6 pt-0 items-center">
                <View className="w-full items-center">

                    {/* Title */}
                    <Text
                        className="text-center text-[28px] font-bold"
                        style={{ color: colors.primaryDarker }}
                    >
                        המלצות ארגון הבריאות
                    </Text>
                    <Text
                        className="text-right text-[28px] font-bold mb-4"
                        style={{ color: colors.primaryDarker }}
                    >
                        העולמי לגיל 65+
                    </Text>
                </View>

                {/* Description */}
                <Text className="text-center text-xl mb-0">
                    פעילות גופנית בגיל 65+ מחזקת את הגוף,
                </Text>
                <Text className="text-center text-xl mb-8">
                    משפרת את הנפש ושומרת על איכות החיים.
                </Text>

                {/* Why section */}
                <Text
                    className="text-center text-2xl font-semibold mb-1"
                    style={{ color: colors.secondary }}
                >
                    למה זה חשוב?
                </Text>
                <Text className="text-center text-xl mb-0">
                    פעילות גופנית קבועה בגיל השלישי:
                </Text>
                <Text className="text-center text-lg mb-6">
                    מספקת יתרונות בריאותיים רבים:
                </Text>

                {/* Recommendation cards grid */}
                <FlatList
                    data={recommendationCards}
                    numColumns={2}
                    contentContainerStyle={{ gap: 8 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <View style={{ width: '48.5%' }}>
                            <RecommendationCard title={item} />
                        </View>
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    scrollEnabled={false}
                />

                {/* Divider */}
                <Separator />

                {/* 4 Core Principles Section */}
                <View className="mb-6 w-full">
                    <Text
                        className="text-center text-2xl font-bold mb-0"
                        style={{ color: colors.secondary }}
                    >
                        4 מרכיבי הכושר
                    </Text>
                    <Text
                        className="text-center text-2xl font-bold mb-4"
                        style={{ color: colors.secondary }}
                    >
                        המומלצים לגיל 65+
                    </Text>

                    {/* Principle cards */}
                    <FlatList
                        data={principleSections}
                        renderItem={({ item }) => (
                            <View
                                className="rounded-xl h-[100px] items-center justify-center px-4 border"
                                style={{
                                    borderColor: colors.primaryDarker,
                                }}
                            >
                                <Text className="text-center text-base">
                                    {item.title}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(_, index) => index.toString()}
                        scrollEnabled={false}
                        contentContainerStyle={{ gap: 12 }}
                    />

                    <Separator />

                    {/* Key Message */}
                    <View className="rounded-xl px-4 py-6 mb-1 border" style={{ borderColor: colors.primaryDarker, borderRadius: 16 }}>
                        <Text
                            className="text-center text-2xl font-bold mb-0"
                            style={{ color: colors.secondary }}
                        >
                            המסר המרכזי
                        </Text>
                        <Text className="text-center text-xl font-bold">
                            זוזו כמה יותר, שבו כמה שפחות. כל
                        </Text>
                        <Text className="text-center text-xl font-bold">
                             פעילות עדיפה על לא כלום!
                        </Text>
                    </View>

                    <Separator />
                    {/* Footer Note */}
                    <Text className="text-center text-lg mb-1" style={{ color: 'black' }}>
                        {footerNoteText}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}