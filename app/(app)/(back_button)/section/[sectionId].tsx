import { ConfirmationModal } from "@/components/ConfirmationModal";
import { EditButton } from "@/components/EditButton";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { PageContainer } from "@/components/PageContainer";
import { SectionPreview } from "@/components/SectionPreview";
import { sections } from "@/constants/mockData";
import { deleteCategory, fetchCategoriesBySectionId } from "@/services/category.service";
import { SET_SELECTED_CATEGORY } from "@/store/reducer";
import { Category, Section } from "@/types";
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";

export default function SectionDetails() {
  const { sectionId } = useLocalSearchParams();
  const dispatch = useDispatch()

  const [section, setSection] = useState<Section | null>(null);
  const [categories, setCategories] = useState<Category[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{id: string, name: string} | null>(null);
  const router = useRouter()

  

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
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
      await fetchSectionCategories();
      setError(null);
      setLoading(false);
    }
    
    loadData();
  }, [sectionId]); // Add sectionId as dependency to refetch when it changes

  async function fetchSectionCategories() {
    try {
      const foundCats = await fetchCategoriesBySectionId(sectionId as string);
      setCategories(foundCats);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories');
    }
  }

  function handleCategoryPress(category: Category) {
    dispatch({ type: SET_SELECTED_CATEGORY, category })
    router.push({ pathname: "/category/[categoryId]", params: { categoryId: category.id } });
  };

  function navigateToCategoryEdit(category: Category) {
    dispatch({ type: SET_SELECTED_CATEGORY, category })
    router.push(`/admin/form?isEdit=true&type=category&id=${category.id}`);
  }
  
  function handleDeletePress(categoryId: string) {
    const categoryToRemove = categories?.find(category => category.id === categoryId);
    if (categoryToRemove) {
      setCategoryToDelete({
        id: categoryToRemove.id,
        name: categoryToRemove.name
      });
      setShowDeleteModal(true);
    }
  }

  function handleCancelDelete() {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  }

  async function handleConfirmDelete() {
    if (!categoryToDelete || isDeleting) return;
    
    setIsDeleting(true);
    try {
      const result = await deleteCategory(categoryToDelete.id);
      if (result.status === 'success') {
        if (categories) {
          const updatedCategories = categories.filter(category => category.id !== categoryToDelete.id);
          setCategories(updatedCategories);
        }
      } else {
        console.error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  }
  
  useFocusEffect(
    useCallback(() => {
      if (sectionId) {
        fetchSectionCategories();
      }
      
      // No cleanup function needed
      return () => {};
    }, [sectionId, fetchSectionCategories])
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error || !section) {
    return <ErrorState message={error || "לא נמצא מידע על קטגוריה זו"} />;
  }

  if (!categories || categories.length === 0) {
    return <ErrorState message="לא נמצאו מערכי שיעורים עבור קטגוריה זו" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} className="pt-16">
      <Stack.Screen options={{ headerShown: false }} />

      <EditButton onPress={() => setIsEdit(!isEdit)} isEdit={isEdit}/>

      <PageContainer
        title={section.title}
        description={section.description}
        plusBtnAction={() => router.push('/admin/form?isEdit=false&type=category')}
      >
        <View style={{ width: '100%', flex: 1 }}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SectionPreview
                id={item.id}
                title={item.name}
                imgUrl={item.imgUrl}
                onPress={() => isEdit ? navigateToCategoryEdit(item) : handleCategoryPress(item)}
                isEdit={isEdit}
                onDelete={handleDeletePress}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 20, paddingBottom: 60 }} // Increased bottom padding
          />
        </View>
      </PageContainer>

      {/* Confirmation Modal */}
      <ConfirmationModal
        visible={showDeleteModal}
        title="מחיקת קטגוריה"
        message={categoryToDelete ? `אתה בטוח שאתה רוצה להסיר את "${categoryToDelete.name}"? לא יהיה ניתן להחזיר את הקטגוריה לאחר ההסרה` : "האם אתה בטוח שאתה רוצה להסיר את הקטגוריה זו? לא יהיה ניתן להחזיר את הקטגוריה לאחר המחיקה"}
        confirmText="הסר"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </SafeAreaView>
  );
}