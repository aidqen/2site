import { BackButton } from "@/components/BackButton";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { PageContainer } from "@/components/PageContainer";
import { SectionPreview } from "@/components/SectionPreview";
import { CATEGORIES, SECTIONS } from "@/constants/mockData";
import { Category, Section } from "@/types";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

/**
 * SectionDetails page displays categories for a specific section
 * based on the section ID from the route parameters
 */
export default function SectionDetails() {
  // Get section ID from URL params
  const params = useLocalSearchParams();
  const sectionId = params.id as string;
  
  // State for section data
  const [section, setSection] = useState<Section | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch section data
  useEffect(() => {
    if (!sectionId) {
      setError("No section ID provided");
      setLoading(false);
      return;
    }

    // Find the section with the matching ID
    const foundSection = SECTIONS.find(s => s.id === sectionId);
    
    if (!foundSection) {
      setError("Section not found");
      setLoading(false);
      return;
    }
    
    // Find categories for this section
    const foundCategories = CATEGORIES.filter(
      category => category.sectionId === sectionId
    );
    
    setSection(foundSection);
    setCategories(foundCategories);
    setError(null);
    setLoading(false);
  }, [sectionId]);

  // Handle category selection
  const handleCategoryPress = (id: string) => {
    // Navigate to category details or handle the action
    console.log(`Category ${id} pressed`);
    router.push({ pathname: "/category/[id]", params: { id } });
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
      <BackButton />
      <Stack.Screen options={{ headerShown: false }} />

      <PageContainer
        title={section.title}
        description={section.description}
        paddingBottom={20}
      >
        {categories.map((category) => (
          <SectionPreview
            key={category.id}
            section={category}
            onPress={() => handleCategoryPress(category.id)}
          />
        ))}
      </PageContainer>
    </SafeAreaView>
  );
}