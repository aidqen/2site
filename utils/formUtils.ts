import { Category, Lesson } from "@/types";
import { FormData } from "@/types/forms";

export const extractLessonData = (formData: FormData, type: 'create' | 'update'): Partial<Lesson> => {
  console.log("🚀 ~ extractLessonData ~ formData:", formData)
  if (type === 'create') {
    return {
      name: formData.name || '',
      videoUrl: formData.videoUrl || '',
      description: formData.description,
      index: formData.index || 0,
      imgUrl: formData.imgUrl,
      categoryId: formData.categoryId
    };
  } else {
    return {
      id: formData.id || '',
      name: formData.name || '',
      videoUrl: formData.videoUrl || '',
      description: formData.description,
      index: formData.index || 0,
      imgUrl: formData.imgUrl,
      categoryId: formData.categoryId
    }
  }
}

export const createNewLessonObject = (
  lessonId: string,
  lessonData: Partial<Lesson>,
): Lesson => {
  return {
    id: lessonId,
    name: lessonData.name || '',
    videoUrl: lessonData.videoUrl || '',
    description: lessonData.description || '',
    imgUrl: lessonData.imgUrl || '',
    index: lessonData.index || 0,
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
