import { colors } from "@/constants/styles";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface SectionPreviewProps {
    section: any;
    onPress?: (id: string) => void;
}

export function SectionPreview({ section, onPress }: SectionPreviewProps) {
    console.log("🔍 ~ SectionPreview ~ components/SectionPreview.tsx:8 ~ section:", section)

    const handlePress = () => {
        if (onPress) {
            onPress(section.id);
        }
    };

    return (
        <TouchableOpacity
            key={section.id}
            className="w-full mb-4 overflow-hidden rounded-2xl bg-white"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 3, height: 3 },
                shadowOpacity: 1,
                shadowRadius: 4,
                elevation: 5
            }}
            onPress={handlePress}
            activeOpacity={0.9}
        >
            <View className="relative">
                <Image
                    source={{ uri: section.imgUrl }}
                    className="w-full h-[200px]"
                    resizeMode="cover"
                    accessibilityLabel={section.title}
                />
                <View className="absolute bottom-0 w-full border rounded-b-2xl bg-white py-3 px-4"
                    style={{ borderColor: colors.primaryDarker }}>
                    <Text
                        className="text-xl text-center font-semibold text-black"
                        style={{ color: colors.primaryDarker }}
                    >
                        {section.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

