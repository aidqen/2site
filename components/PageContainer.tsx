import { colors } from "@/constants/styles";
import { useUser } from "@/hooks/useUser";
import { usePathname } from "expo-router";
import { ReactNode, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { PlusButton } from "./PlusButton";

interface PageContainerProps {
  children?: ReactNode;
  title?: string;
  description?: string;
  paddingBottom?: number;
  gap?: number;
  plusBtnAction?: () => void;
}

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
      className="flex-1 items-center justify-start pb-10 overflow-x-visible"
    >
      {(title || description) && (
        <View
          style={{
            marginTop: 40,
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
      {isAdmin && !isHome && plusBtnAction && <PlusButton onPress={plusBtnAction} />}
      {children}
    </View>
  );
}
