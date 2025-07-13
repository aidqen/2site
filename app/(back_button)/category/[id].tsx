import { BackButton } from "@/components/BackButton";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { colors } from "@/constants/styles";
import { Category } from "@/types";
import firestore from '@react-native-firebase/firestore';
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CategoryDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!id) {
      setError("No category ID provided");
      setLoading(false);
      return;
    }

    // Fetch the category with the matching ID from Firestore
    fetchCategoryById();
    
    // Note: Loading state and error handling are now managed inside fetchCategoryById
  }, [id]);

  async function fetchCategoryById() {
    try {
      // Option 1: If the route parameter 'id' is the Firestore document ID
      const docSnapshot = await firestore()
        .collection('categories')
        .doc(id)
        .get();
      
      // @ts-ignore: exists is a property, not a function
      if (docSnapshot.exists) {
        const categoryData = {
          id: docSnapshot.id,
          ...docSnapshot.data()
        } as Category;
        
        setCategory(categoryData);
        return;
      }

    } catch (err) {
      setError("שגיאה בטעינת הקטגוריה: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error || !category) {
    return <ErrorState message={error || "לא נמצא מידע על קטגוריה זו"} />;
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Main Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image with Gradient Overlay */}
        <View className="relative">
          <Image
            source={{ uri: "https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113343/4_1_no5ofb.png" }}
            style={{
              width: '100%',
              height: 550,
              marginTop: -insets.top, // Extend image above safe area
            }}
            resizeMode="cover"
          />

          {/* Back Button */}
          <BackButton />

          {/* Gradient Overlay */}
          <View style={{
            position: 'absolute',
            height: 200,
            width: '100%',
            bottom: 0,
          }}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 1)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                zIndex: 0,
                height: '100%',
              }}
            />
          </View>
        </View>

        {/* Category Title */}
        <View className="px-6 mt-4 justify-between">
          <View>
            <Text
              className="text-[28px] font-bold text-center text-[#12616f]"
              style={{ fontFamily: "IBMPlexSansHebrew-Bold" }}
            >
              {category?.name}
            </Text>

            {/* Description */}
            <Text
              className="text-[20px] text-center mt-4 leading-6 text-[#333333]"
              style={{ fontFamily: "IBMPlexSansHebrew-Regular" }}
            >
              {category?.description}
            </Text>
          </View>

          {/* Call to Action Buttons */}
          <View className="mt-10">
            <TouchableOpacity
              className="rounded-md py-3 mb-3"
              style={{ backgroundColor: colors.primaryDarker }}
              activeOpacity={0.8}
            >
              <Text
                className="text-white text-center font-bold text-[23px]"
                style={{ fontFamily: "IBMPlexSansHebrew-SemiBold" }}
              >
                התחלת סדרת האימונים
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-md py-3"
              style={{ backgroundColor: colors.secondary }}
              activeOpacity={0.8}
            >
              <Text
                className="text-white text-center font-bold text-[23px]"
                style={{ fontFamily: "IBMPlexSansHebrew-SemiBold" }}
              >
                לרשימת האימונים המלאה
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
