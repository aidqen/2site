import { EditButton } from "@/components/EditButton";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { colors } from "@/constants/styles";
import { fetchLessonsByCategory, getStorageDownloadUrl } from "@/services/lesson.service";
import { SET_CATEGORY_LESSONS } from "@/store/reducer";
import { Lesson } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryDetails() {
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  const category = useSelector((state: any) => state.selectedCategory)
  const lessons = useSelector((state: any) => state.categoryLessons)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryImageUrl, setCategoryImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setError("No category ID provided");
      setLoading(false);
      return;
    }
    
    fetchCategoryLessons();

  }, [categoryId]);

  // Fetch category image URL when category changes
  useEffect(() => {
    if (category && category.imgUrl) {
      getStorageDownloadUrl(category.imgUrl)
        .then((url) => setCategoryImageUrl(url))
        .catch((error) => {
          console.error('Error fetching category image URL:', error);
        });
    }
  }, [category]);


  async function fetchCategoryLessons() {
    try {
      setLoading(true);
      const lessons = await fetchLessonsByCategory(categoryId);
      dispatch({ type: SET_CATEGORY_LESSONS, lessons })

    } catch (error) {
      console.error('Error fetching category and lessons:', error);
    } finally {
      setLoading(false);
    }
  }

  function routeToEdit() {
    router.push(`/admin/form?type=category&isEdit=true&id=${categoryId}`)
  }

  function navigateToLesson() {
    router.push({ pathname: '/lesson/[lessonId]', params: { lessonId: lessons.find((lesson: Lesson) => lesson.index === 1)?.id } })
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error || !category) {
    return <ErrorState message={error || "לא נמצא מידע על קטגוריה זו"} />;
  }

  return (
    <View className="flex-1 bg-white">
      <EditButton onPress={routeToEdit} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      > */}
        <View className="relative h-[50%]">
          <Image
            source={{ uri: categoryImageUrl || "https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113343/4_1_no5ofb.png" }}
            style={{
              width: '100%',
              height: '100%',
              marginTop: -insets.top,
            }}
            resizeMode="cover"
          />

          {/* <BackButton /> */}

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

        <View className="px-6 mt-4 justify-between">
          <View>
            <Text
              className="text-[28px] font-bold text-center text-[#12616f]"
              style={{ fontFamily: "IBMPlexSansHebrew-Bold" }}
            >
              {category?.name}
            </Text>

            <Text
              className="text-[20px] text-center mt-4 leading-6 text-[#333333]"
              style={{ fontFamily: "IBMPlexSansHebrew-Regular" }}
            >
              {category?.description}
            </Text>
          </View>

          <View className="mt-10 gap-2">
            <TouchableOpacity
              className="rounded-md py-3 mb-2"
              style={{ backgroundColor: colors.primaryDarker }}
              activeOpacity={0.8}
              onPress={navigateToLesson}
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
              onPress={() => router.push({ pathname: '/category/details/[id]', params: { id: category?.id } })}
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
      {/* </ScrollView> */}
    </View>
  );
}
