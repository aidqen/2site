import { MainButton } from '@/components/ui/MainButton';
import { colors } from '@/constants/styles';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

type ButtonItem = {
    title: string;
    variant?: 'filled' | 'outlined';
    onPress?: () => void;
};

export default function AdminHome() {
    const router = useRouter();

    const lessonButtons: ButtonItem[] = [
        {
            title: "הוספת סרטון חדש",
            variant: "filled",
            onPress: () => router.push('/admin/form?type=video&isEdit=false')
        },
        {
            title: "עריכת שיעורים באתר מלא",
            onPress: () => router.push('/admin/form?type=video&isEdit=true')
        },
        {
            title: "עריכת שיעורים קצרים",
            onPress: () => router.push('/admin/form?type=category&isEdit=true')
        }
    ];

    const promotionalButtons: ButtonItem[] = [
        {
            title: "עריכת תוכן שיווקי",
            onPress: () => router.push('/admin/form?type=promotional&isEdit=true')
        },
        {
            title: "תמיכה",
            onPress: () => {}
        }
    ];
    return (
        <SafeAreaView className="hi flex-1 bg-white " style={{ paddingHorizontal: 36, paddingVertical: 132 }}>
            <View className="flex-1">
                <View className="flex-row items-center mb-4">
                    <Text
                        className="text-[32px] font-bold text-center flex-1"
                        style={{ color: colors.primaryDarker }}
                    >
                        שלום דפנה,
                    </Text>
                </View>
                <View className='mb-16'>
                    <FlatList<ButtonItem>
                        data={lessonButtons}
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
                        data={promotionalButtons}
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
                <MainButton
                    title="התנתקות"
                    variant="filled"
                    color={colors.secondary}
                    containerStyle={{ marginTop: 16 }}
                    onPress={() => router.push('/login')}
                />
            </ View>
        </SafeAreaView>
    );
}