import { BackButton } from "@/components/BackButton";
import { EditButton } from "@/components/EditButton";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { colors } from "@/constants/styles";
import { SET_CATEGORY_LESSONS } from "@/store/reducer";
import { Lesson } from "@/types";
import firestore from '@react-native-firebase/firestore';
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryDetails() {
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>();

  const category = useSelector((state: any) => state.selectedCategory)
  const lessons = useSelector((state: any) => state.categoryLessons)
  console.log("🔍 ~ CategoryDetails ~ app/(app)/(back_button)/category/[id].tsx:15 ~ selectedCategory:", category)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No category ID provided");
      setLoading(false);
      return;
    }

    fetchCategoryLessons();

  }, [id]);


  async function fetchCategoryLessons() {
    try {
      setLoading(true);
      // Get category details
      // const snapshot = await firestore()
      //     .collection('categories')
      //     .doc(id)
      //     .get();
      // setCategory(snapshot.data() as Category);

      // Get lessons for this category
      const lessonsSnapshot = await firestore()
        .collection('categories')
        .doc(id)
        .collection('lessons')
        .orderBy('index')
        .get();

      // Map the lessons data and include the document ID
      const lessons = lessonsSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      })) as Lesson[];

      dispatch({ type: SET_CATEGORY_LESSONS, lessons })

    } catch (error) {
      console.error('Error fetching category and lessons:', error);
    } finally {
      setLoading(false);
    }
  }

  function routeToEdit() {
    router.push(`/admin/form?type=category&isEdit=true&id=${id}`)
  }
  // async function fetchCategoryById() {
  //   try {
  //     const docSnapshot = await firestore()
  //       .collection('categories')
  //       .doc(id)
  //       .get();

  //     // @ts-ignore: exists is a property, not a function
  //     if (docSnapshot.exists) {
  //       const categoryData = {
  //         id: docSnapshot.id,
  //         ...docSnapshot.data()
  //       } as Category;

  //       setCategory(categoryData);
  //       return;
  //     }

  //   } catch (err) {
  //     setError("שגיאה בטעינת הקטגוריה: " + (err instanceof Error ? err.message : String(err)));
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  function navigateToLesson() {
    router.push({ pathname: '/lesson/[index]', params: { index: '0' } })
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error || !category) {
    console.log("🔍 ~ CategoryDetails ~ app/(app)/(back_button)/category/[id].tsx:105 ~ category:", category)
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

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="relative">
          <Image
            source={{ uri: "https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113343/4_1_no5ofb.png" }}
            style={{
              width: '100%',
              height: 550,
              marginTop: -insets.top,
            }}
            resizeMode="cover"
          />

          <BackButton />

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

          <View className="mt-10 gap-3">
            <TouchableOpacity
              className="rounded-md py-3 mb-3"
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
      </ScrollView>
    </View>
  );
}
