import { colors } from "@/constants/styles";
import { Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <View className="w-full items-center mb-6">
      <Text
        className="text-2xl font-bold text-center"
        style={{ color: colors.primaryDarker }}
      >
        {title}
      </Text>
      {description && (
        <Text
          className="text-base text-center mt-2"
          style={{ color: colors.primaryDarker }}
        >
          {description}
        </Text>
      )}
    </View>
  );
}
