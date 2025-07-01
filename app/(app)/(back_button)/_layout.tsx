import { BackButton } from "@/components/BackButton";
import { Stack } from "expo-router";
import '../../globals.css';

/**
 * Root layout component that sets up the app structure
 */
export default function RootLayout() {
    return (
        <>
            <BackButton />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'white' },
                    // Add smooth animations
                    animation: 'slide_from_right',
                    presentation: 'card',
                    animationDuration: 200,
                    // Add gesture-based navigation
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                }}
            />
        </>
    );
}
