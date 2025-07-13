import { colors } from "@/constants/styles";
import { Category } from "@/types";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CategoryCardProps {
  category: Category;
  onPress: (id: string) => void;
}

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity
      key={category.id}
      className="w-full m-2 overflow-hidden rounded-xl bg-white"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3
      }}
      onPress={() => onPress(category.id)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: category.img }}
        className="w-full h-[120px]"
        resizeMode="cover"
        accessibilityLabel={category.name}
      />
      <View className="p-2 bg-white border-t" style={{ borderColor: colors.primaryDarker }}>
        <Text
          className="text-center font-medium"
          style={{ color: colors.primaryDarker }}
          numberOfLines={2}
        >
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
