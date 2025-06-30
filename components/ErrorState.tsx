import { colors } from "@/constants/styles";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ErrorStateProps {
  message: string;
  buttonText?: string;
}

export function ErrorState({ message, buttonText = "חזרה" }: ErrorStateProps) {
  return (
    <SafeAreaView className="h-full bg-white items-center justify-center">
      <Text className="text-xl" style={{ color: colors.primaryDarker }}>
        {message}
      </Text>
      <TouchableOpacity 
        className="mt-4 px-4 py-2 rounded-lg" 
        style={{ backgroundColor: colors.primaryDarker }}
        onPress={() => router.back()}
      >
        <Text className="text-white">{buttonText}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
