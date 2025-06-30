import { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";
import { colors } from "@/constants/styles";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  paddingBottom?: number;
  gap?: number;
}

/**
 * A reusable page container component that provides consistent layout structure
 * for different pages in the application.
 */
export function PageContainer({
  children,
  title,
  description,
  paddingBottom = 40,
  gap = 20,
}: PageContainerProps) {
  return (
    <ScrollView
      className="w-full px-6"
      contentContainerStyle={{ 
        paddingBottom: paddingBottom, 
        alignItems: 'center', 
        gap: gap, 
        justifyContent: 'flex-start' 
      }}
    >
      {/* Header section with title and description */}
      {(title || description) && (
        <View className="mt-10 items-center gap-2">
          {title && (
            <Text
              className="font-semibold text-4xl"
              style={{ color: colors.primaryDarker }}
            >
              {title}
            </Text>
          )}
          {description && (
            <Text className="text-center text-2xl">
              {description}
            </Text>
          )}
        </View>
      )}

      {/* Main content */}
      {children}
    </ScrollView>
  );
}
