import { MainButton } from '@/components/ui/MainButton';
import { colors } from '@/constants/styles';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ButtonItem = {
    title: string;
    variant?: 'filled' | 'outlined';
    onPress?: () => void;
};

export default function ProfilePage() {
    const router = useRouter();
    const { isAdmin, getUsername, logout } = useUser();

    // Admin buttons
    const adminLessonButtons: ButtonItem[] = [
        {
            title: "הוספת סרטון חדש",
            variant: "filled",
            onPress: () => router.push('/admin/form?type=lesson&isEdit=false')
        },
        {
            title: "עריכת שיעורים באורך מלא",
            onPress: () => router.push('/admin/form?type=lesson&isEdit=true&category=long')
        },
        {
            title: "עריכת שיעורים קצרים",
            onPress: () => router.push('/admin/form?type=lesson&isEdit=true&category=short')
        },
        {
            title: 'עריכת קטגוריה',
            onPress: () => router.push('/home?isEdit=true')
        }
    ];

    const adminPromotionalButtons: ButtonItem[] = [
        {
            title: "עריכת תוכן שיווקי",
            onPress: () => router.push('/admin/form?type=promotional&isEdit=true')
        },
        {
            title: "תמיכה",
            onPress: () => {}
        }
    ];
    
    // Non-admin buttons
    const userButtons: ButtonItem[] = [
        {
            title: "אימונים מועדפים",
            variant: "filled",
            onPress: () => {}
        },
        {
            title: "פרטי משתמש",
            variant: "filled",
            onPress: () => {}
        }
    ];
    
    const userPromotionalButtons: ButtonItem[] = [
        {
            title: "מידע על האפליקציה",
            variant: "filled",
            onPress: () => {}
        },
        {
            title: "תמיכה",
            variant: "filled",
            onPress: () => {}
        }
    ];

    function onLogout() {
        logout()
        router.replace('/auth/login')
    }

    return (
        <SafeAreaView className="hi flex-1 bg-white" style={{ paddingHorizontal: 36, paddingVertical: 132 }}>
            <View className="flex-1">
                <View className="flex-row items-center mb-4">
                    <Text
                        className="text-[32px] font-bold text-center flex-1"
                        style={{ color: colors.primaryDarker }}
                    >
                        שלום {getUsername()},
                    </Text>
                </View>
                
                {isAdmin ? (
                    // Admin view
                    <>
                        <View className='mb-16'>
                            <FlatList<ButtonItem>
                                data={adminLessonButtons}
                                keyExtractor={(_: ButtonItem, index: number) => `lesson-${index}`}
                                renderItem={({ item }: { item: ButtonItem }) => (
                                    <MainButton
                                        title={item.title}
                                        variant={item.variant}
                                        color={colors.primaryDarker}
                                        onPress={item.onPress || (() => {})}
                                    />
                                )}
                                scrollEnabled={false}
                                contentContainerStyle={{ gap: 8 }}
                            />
                        </View>

                        <View className='mb-16'>
                            <FlatList<ButtonItem>
                                data={adminPromotionalButtons}
                                keyExtractor={(_: ButtonItem, index: number) => `promo-${index}`}
                                renderItem={({ item }: { item: ButtonItem }) => (
                                    <MainButton
                                        title={item.title}
                                        onPress={item.onPress || (() => {})}
                                    />
                                )}
                                scrollEnabled={false}
                                contentContainerStyle={{ gap: 8 }}
                            />
                        </View>
                    </>
                ) : (
                    // Non-admin view
                    <>
                        <View className='mb-16'>
                            <FlatList<ButtonItem>
                                data={userButtons}
                                keyExtractor={(_: ButtonItem, index: number) => `user-${index}`}
                                renderItem={({ item }: { item: ButtonItem }) => (
                                    <MainButton
                                        title={item.title}
                                        variant={item.variant}
                                        color={colors.primaryDarker}
                                        onPress={item.onPress || (() => {})}
                                    />
                                )}
                                scrollEnabled={false}
                                contentContainerStyle={{ gap: 8 }}
                            />
                        </View>

                        <View className='mb-16'>
                            <FlatList<ButtonItem>
                                data={userPromotionalButtons}
                                keyExtractor={(_: ButtonItem, index: number) => `user-promo-${index}`}
                                renderItem={({ item }: { item: ButtonItem }) => (
                                    <MainButton
                                        title={item.title}
                                        variant={item.variant}
                                        color={colors.primaryDarker}
                                        onPress={item.onPress || (() => {})}
                                    />
                                )}
                                scrollEnabled={false}
                                contentContainerStyle={{ gap: 8 }}
                            />
                        </View>
                    </>
                )}
                
                <MainButton
                    title="התנתקות"
                    variant="filled"
                    color={colors.secondary}
                    containerStyle={{ marginTop: 16 }}
                    onPress={onLogout}
                />
            </View>
        </SafeAreaView>
    );
}