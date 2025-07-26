import { Category, Lesson } from "@/types";
import { FormData } from "@/types/forms";

export const extractLessonData = (formData: FormData): Partial<Lesson> => {
  return {
    id: formData.id,
    name: formData.name || '',
    videoUrl: formData.videoUrl || '',
    description: formData.description,
    imgUrl: formData.imgUrl,
    categoryId: formData.categoryId
  };
};

export const createNewLessonObject = (
  lessonId: string,
  lessonData: Partial<Lesson>,
  index: number
): Lesson => {
  return {
    id: lessonId,
    name: lessonData.name || '',
    videoUrl: lessonData.videoUrl || '',
    description: lessonData.description || '',
    imgUrl: lessonData.imgUrl || '',
    index
  };
};

export const getNavigationPath = (type: string, formData: Category | FormData): string | null => {
  if (type === 'category') {
    return `/section/${formData.sectionId}`;
  }
  
  const typedFormData = formData as FormData;
  if (typedFormData.categoryId) {
    return `/category/details/${typedFormData.categoryId}`;
  }
  
  return null;
};
