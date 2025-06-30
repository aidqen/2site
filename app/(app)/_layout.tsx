// app/(app)/_layout.tsx
import Footer from '@/components/Footer'
import { Stack } from 'expo-router'

function AppLayout() {
  return (
    <>
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
      
      {/* your persistent footer */}
      <Footer />
    </>
  )
}

export default AppLayout