import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { PageContainer } from "@/components/PageContainer";
import { SectionPreview } from "@/components/SectionPreview";
import { sections } from "@/constants/mockData";
import { SET_SELECTED_CATEGORY } from "@/store/reducer";
import { Category, Section } from "@/types";
import firestore from '@react-native-firebase/firestore';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";

export default function SectionDetails() {
  const { sectionId } = useLocalSearchParams();
  const dispatch = useDispatch()

  const [section, setSection] = useState<Section | null>(null);
  const [categories, setCategories] = useState<Category[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    if (!sectionId) {
      setError("No section ID provided");
      setLoading(false);
      return;
    }

    const foundSection = sections.find(s => s.id === sectionId);

    if (!foundSection) {
      setError("Section not found");
      setLoading(false);
      return;
    }

    setSection(foundSection);
    fetchSectionCategories()
    setError(null);
    setLoading(false);
  }, []);

  async function fetchSectionCategories() {
    const snapshot = await firestore()
      .collection('categories')
      .where('sectionId', '==', sectionId)
      .get(); 
    const foundCats: Category[] = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      } as Category
    })
    setCategories(foundCats)
  }

  const handleCategoryPress = (category: Category) => {
    dispatch({ type: SET_SELECTED_CATEGORY, category })
    router.push({ pathname: "/category/[categoryId]", params: { categoryId: category.id } });
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !section) {
    return <ErrorState message={error || "לא נמצא מידע על סקשן זה"} />;
  }

  if (!categories || categories.length === 0) {
    return <ErrorState message="לא נמצאו קטגוריות עבור סקשן זה" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} className="py-16">
      <Stack.Screen options={{ headerShown: false }} />

      <PageContainer
        title={section.title}
        description={section.description}
        paddingBottom={20}
        plusBtnAction={() => router.push('/admin/form?isEdit=false&type=category')}
      >
        <View style={{ width: '100%' }}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SectionPreview
                id={item.id}
                title={item.name}
                imgUrl={item.imgUrl}
                onPress={() => handleCategoryPress(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
          />
        </View>
      </PageContainer>
    </SafeAreaView>
  );
}