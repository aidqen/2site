import { colors } from "@/constants/styles";
import { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";

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
      style={{ flex: 1, paddingHorizontal: 24 }}    // px-6
      contentContainerStyle={{
        flexGrow: 1,                                 // fills the screen
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom,
        gap,
      }}
    >
      {(title || description) && (
        <View
          style={{
            marginTop: 40,                          // mt-10
            alignItems: 'center',
            marginBottom: gap,
          }}
        >
          {title && (
            <Text
              style={{
                fontSize: 32,                       // text-4xl
                fontWeight: '600',
                color: colors.primaryDarker,
              }}
            >
              {title}
            </Text>
          )}
          {description && (
            <Text style={{ fontSize: 20, textAlign: 'center' }}>
              {description}
            </Text>
          )}
        </View>
      )}

      {children}
    </ScrollView>
  );
}

