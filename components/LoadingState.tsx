import { colors } from "@/constants/styles";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "טוען..." }: LoadingStateProps) {
  return (
    <SafeAreaView className="h-full bg-white items-center justify-center">
      <Text className="text-xl" style={{ color: colors.primaryDarker }}>
        {message}
      </Text>
    </SafeAreaView>
  );
}
