import { MainButton } from '@/components/ui/MainButton';
import { colors } from '@/constants/styles';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminHome() {

    const lessonButtons = [
        {
            title: "הוספת סרטון חדש",
            variant: "filled" as const,
        },
        {
            title: "עריכת שיעורים באתר מלא",
        },
        {
            title: "עריכת שיעורים קצרים",
        }
    ]

    const promotionalButtons = [
        {
            title: "עריכת תוכן שיווקי",
        },
        {
            title: "תמיכה",
        }
    ]
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
                    {lessonButtons.map((button, index) => (
                        <MainButton
                            key={index}
                            title={button.title}
                            variant={button.variant}
                            color={colors.primaryDarker}
                            onPress={() => { }}
                        />
                    ))}
                </View>

                <View className='mb-16'>
                    {promotionalButtons.map((button, index) => (
                        <MainButton
                            key={index}
                            title={button.title}
                            onPress={() => { }}
                        />
                    ))}

                </View>
                <MainButton
                    title="התנתקות"
                    variant="filled"
                    color={colors.secondary}
                    containerStyle={{ marginTop: 16 }}
                    onPress={() => { }}
                />
            </ View>
        </SafeAreaView>
    );
}