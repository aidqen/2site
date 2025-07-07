import { colors } from '@/constants/styles';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

/**
 * Footer component with navigation tabs
 */
export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();


  // Navigation items for the footer
  const navItems = [
    { icon: 'star', path: '/lessons' },
    { icon: 'home', path: '/home' },
    { icon: 'person', path: '/profile' },
  ];

  return (
    <View className="absolute bottom-0 justify-around items-center w-full"
    style={{flexDirection: 'row', backgroundColor: colors.footer, height: 64}}>
      {navItems.map((item, index) => {
        const isActive = pathname === item.path;

        return (
          <Pressable
            key={index}
            className="flex-1 items-center justify-center h-full"
            onPress={() => router.push(item.path)}
          >
            <Ionicons
              name={item.icon}
              size={32}
              color={isActive ? '#FFFFFF' : '#4F8B96'}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
