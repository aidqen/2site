import { colors } from "@/constants/styles";
import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { ReactNode, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  paddingBottom?: number;
  gap?: number;
  plusBtnAction?: () => void;
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
  gap = 10,
  plusBtnAction
}: PageContainerProps) {
  const { isAdmin } = useUser()
  const [isHome, setIsHome] = useState(false)
  const pathname = usePathname();

  useEffect(() => {
    setIsHome(pathname === "/home");
  }, [])
  
  
  return (
    <View
      style={{ flex: 1, paddingHorizontal: 24, paddingBottom, gap }}    // px-6
      className="flex-1 items-center justify-start"
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
      {isAdmin && !isHome && plusBtnAction && <TouchableOpacity
        className="mb-4 h-[68px] w-full border rounded-2xl items-center justify-center"
        style={{ borderColor: colors.primaryDarker }}
        onPress={plusBtnAction ? () => plusBtnAction() : () => {}}
      >
        <TouchableOpacity
          className="w-[41px] h-[41px] rounded-lg flex-row items-center justify-center"
          style={{ borderColor: colors.primaryDarker, backgroundColor: colors.primaryDarker }}
        >
          <Ionicons name="add" size={35} color={'white'} />
        </TouchableOpacity>
      </TouchableOpacity>}
      {children}
    </View>
  );
}

