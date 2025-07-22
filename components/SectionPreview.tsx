import { colors } from "@/constants/styles";
import { getStorageDownloadUrl } from "@/services/lesson.service";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface SectionPreviewProps {
    id: string;
    imgUrl?: string;
    title: string;
    onPress?: (id: string) => void;
    isLesson?: boolean;
}

export function SectionPreview({ id, imgUrl, title, onPress, isLesson = false }: SectionPreviewProps) {
    const [uri, setUri] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    // console.log("🔍 ~ SectionPreview ~ components/SectionPreview.tsx:8 ~ section:", section)

    useEffect(() => {
        if (imgUrl) {
            getStorageDownloadUrl(imgUrl)
                .then(url => setUri(url))
                .catch(console.error)
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [imgUrl])


    const handlePress = () => {
        if (onPress) {
            onPress(id);
        }
    };

    // Function moved to firebase.service.ts

    return (
        <TouchableOpacity
            key={id}
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
                        source={{ uri: uri }}
                        className="w-full h-[200px]"
                        resizeMode="cover"
                        accessibilityLabel={title}
                    />
                    {isLesson && <TouchableOpacity
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 rounded-full w-[46.5px] h-[46.5px] items-center justify-center"
                        style={{ 
                            backgroundColor: colors.primaryDarker,
                            top: '50%',
                            marginTop: -48/2 // This achieves the same as calc(50% - 48px)
                        }}
                        onPress={handlePress}
                    >
                        <Ionicons name="play" size={24} color="white" />
                    </TouchableOpacity>}
                <View className="absolute bottom-0 w-full border rounded-b-2xl bg-white py-3 px-4 h-[48px]"
                    style={{ borderColor: colors.primaryDarker }}>
                    <Text
                        className="text-xl text-center font-semibold text-black"
                        style={{ color: colors.primaryDarker }}
                    >
                        {title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

