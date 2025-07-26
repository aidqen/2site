import { colors } from "@/constants/styles";
import { getStorageDownloadUrl } from "@/services/lesson.service";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";

interface SectionPreviewProps {
    id: string;
    imgUrl?: string;
    title: string;
    onPress?: (id: string) => void;
    isLesson?: boolean;
    isEdit?: boolean;
    onDelete?: (id: string) => void;
}

export function SectionPreview({ id, imgUrl, title, onPress, isLesson = false, isEdit = false, onDelete }: SectionPreviewProps) {
    const [uri, setUri] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (imgUrl) {
            getStorageDownloadUrl(imgUrl)
                .then(url => {
                    setUri(url)
                    setLoading(false)
                })
                .catch(error => {
                    setLoading(false)
                })
        } else {
            setLoading(false);
        }
    }, [imgUrl])

    useEffect(() => {
        Animated.timing(overlayOpacity, {
            toValue: isEdit ? 0.6 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [isEdit, overlayOpacity]);

    const handlePress = () => {
        if (onPress) {
            onPress(id);
        }
    };
    
    const handleDeletePress = () => {
        if (onDelete) {
            onDelete(id);
        }
    };

    return (
        <TouchableOpacity
            key={id}
            className="w-full mb-4 overflow-hidden rounded-2xl bg-white overflow-x-visible"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 3, height: 3 },
                shadowOpacity: 1,
                shadowRadius: 4,
                elevation: 5,
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
                    <Animated.View 
                        className="absolute inset-0 bg-black"
                        style={{
                            opacity: overlayOpacity,
                        }}
                    />
                    {isEdit && (
                        <TouchableOpacity 
                            onPress={handleDeletePress}
                            className="absolute right-3 top-3 z-10 p-2"
                        >
                            <FontAwesome6 name="trash" size={23} color={'red'} />
                        </TouchableOpacity>
                    )}
                    {isLesson && <TouchableOpacity
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 rounded-full w-[46.5px] h-[46.5px] items-center justify-center"
                        style={{
                            backgroundColor: colors.primaryDarker,
                            top: '50%',
                            marginTop: -48/2
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

    );
}
