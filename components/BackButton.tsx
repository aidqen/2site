import { colors } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

/**
 * Custom back button component that can be positioned at the top left of the screen
 * Styled to match the design in the image
 */
export function BackButton() {
  return (
    <View style={{
      position: 'absolute',
      top: 25,
      left: 10,
      zIndex: 10,
      width: 48,
      height: 48
    }}>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          backgroundColor: colors.primaryDarker,
          width: '100%',
          height: '100%',
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}
