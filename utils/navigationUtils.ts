import { Category } from "@/types";
import { FormData } from "@/types/forms";
import { router } from "expo-router";

export const navigateToSection = (sectionId: string) => {
  router.push({
    pathname: "/section/[sectionId]",
    params: { sectionId }
  });
};

export const navigateToCategoryDetails = (categoryId: string) => {
  router.push(`/category/details/${categoryId}`);
};

export const navigateAfterFormSubmit = (type: string, formData: Category | FormData) => {
  if (type === 'category') {
    navigateToSection(formData.sectionId);
    return;
  }
  
  const typedFormData = formData as FormData;
  if (typedFormData.categoryId) {
    navigateToCategoryDetails(typedFormData.categoryId);
  } else {
    router.back();
  }
};
