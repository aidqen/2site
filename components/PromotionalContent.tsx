import { colors } from "@/constants/styles";
import { PromotionalItem } from "@/services/promotional.service";
import { getStorageDownloadUrl } from "@/services/storage.service";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

interface PromotionalContentProps {
  item: PromotionalItem;
  buttonText?: string;
  isEdit?: boolean;
  onDelete?: (id: string) => void;
}

/**
 * Component for displaying a single promotional content item
 */
export function PromotionalContent({
  item,
  buttonText = "למידע נוסף",
  isEdit = false,
  onDelete
}: PromotionalContentProps) {
  const [imgUrl, setImgUrl] = useState('')
  useEffect(() => {
    if (item.imgUrl) {
      getStorageDownloadUrl(item.imgUrl)
        .then(url => setImgUrl(url))
        .catch(console.error);
    }
  }, [item.imgUrl])
  
  const handleButtonPress = () => {
    if (item?.link) {
      Linking.openURL(item.link).catch(err => {
        console.error('Error opening link:', err);
      });
    }
  }
  
  const handleDeletePress = () => {
    if (onDelete && item.id) {
      onDelete(item.id);
    }
  }

  return (
    <TouchableOpacity onPress={() => router.push(`/admin/form?type=promotional&id=${item.id}&isEdit=true`)} className="rounded-2xl shadow-md w-full bg-white overflow-hidden mb-36" >
      <View className="relative">
        <Image
          source={{ uri: imgUrl }}
          className="w-full h-[240px]"
          resizeMode="cover"
          accessibilityLabel={item.name}
        />
        {isEdit && (
          <TouchableOpacity 
            onPress={handleDeletePress}
            className="absolute right-3 top-3 z-10 p-2"
          >
            <FontAwesome6 name="trash" size={23} color={'red'} />
          </TouchableOpacity>
        )}
      </View>
      <View className="p-5 text-center items-center gap-3" style={{ backgroundColor: colors.primaryTwo }}>
        <Text className="text-white font-bold text-2xl">{item.name}</Text>
        <Text className="text-white text-center text-lg">{item.description}</Text>
        <TouchableOpacity 
          className="rounded-lg w-[225px] bg-white border border-white items-center p-2"
          onPress={handleButtonPress}
        >
          <Text style={{ color: colors.primaryDarker }} className="font-bold text-lg">{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
