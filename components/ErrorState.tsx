import { colors } from "@/constants/styles";
import { router } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

interface ErrorStateProps {
  message: string;
  buttonText?: string;
}

export function ErrorState({ message, buttonText = "חזרה" }: ErrorStateProps) {
  return (
    <SafeAreaView className="h-full bg-white gap-3 items-center justify-center">
      <Text className="text-3xl text-center" style={{ color: colors.primaryDarker }}>
        {message}
      </Text>
      <TouchableOpacity 
        className="mt-4 px-4 py-2 rounded-lg" 
        style={{ backgroundColor: colors.primaryDarker }}
        onPress={() => router.back()}
      >
        <Text className="text-white font-bold text-xl">{buttonText}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
