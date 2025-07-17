import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { colors } from "@/constants/styles";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "טוען..." }: LoadingStateProps) {
  return (
    <SafeAreaView className="h-full bg-white items-center justify-center">
      <View className="items-center">
        <ActivityIndicator size="large" color={colors.primaryDarker} />
        <Text className="text-xl mt-4" style={{ color: colors.primaryDarker }}>
          {message}
        </Text>
      </View>
    </SafeAreaView>
  );
}
