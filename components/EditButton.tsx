import { colors } from "@/constants/styles";
import { useUser } from "@/hooks/useUser";
import { FontAwesome6 } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export function EditButton({isEdit, onPress}: {isEdit?: boolean, onPress: () => void}) {
    const pathname = usePathname()
    const { isAdmin } = useUser()
    console.log("🔍 ~ EditButton ~ components/EditButton.tsx:6 ~ pathname:", pathname)
    if (!isAdmin) return null

    return (
        <View style={{
            position: 'absolute',
            top: 45,
            right: 20,
            zIndex: 10,
            width: 48,
            height: 48
          }}>
      
            <TouchableOpacity
              onPress={onPress}
              style={{
                backgroundColor: isEdit ? colors.primaryDarkest : colors.primaryDarker,
                width: '100%',
                height: '100%',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              activeOpacity={0.7}
            >
                <FontAwesome6 name="pen-to-square" size={24} color="white" />
              {/* <Ionicons
                name="chevron-back"
                size={24}
                color="white"
              /> */}
            </TouchableOpacity>
          </View>
    )
}