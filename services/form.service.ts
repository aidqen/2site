import { ADD_NEW_CATEGORY_LESSON, SET_SELECTED_CATEGORY, UPDATE_LESSON_CATEGORIES } from "@/store/reducer";
import { Category, Lesson } from "@/types";
import { FormData } from "@/types/forms";
import { createNewLessonObject, extractLessonData } from "@/utils/formUtils";
import { navigateAfterFormSubmit } from "@/utils/navigationUtils";
import { Alert } from "react-native";
import { Dispatch } from "redux";
import { createCategory, updateCategory } from "./category.service";
import { createLesson, updateLesson } from "./lesson.service";

export const handleCategoryUpdate = async (
  formData: Category,
  dispatch: Dispatch
): Promise<{ status: string }> => {
  const result = await updateCategory(formData);
  
  if (result.status === 'success') {
    dispatch({ type: SET_SELECTED_CATEGORY, category: formData });
    navigateAfterFormSubmit('category', formData);
    return { status: 'success' };
  }
  
  return { status: 'error' };
};

export const handleCategoryCreate = async (
  formData: Category
): Promise<{ status: string }> => {
  const result = await createCategory(formData);
  
  if (result.status === 'success') {
    navigateAfterFormSubmit('category', formData);
  }
  
  return { status: result.status };
};

export const handleLessonUpdate = async (
  formData: FormData,
  dispatch: Dispatch,
  categoryLessons: Lesson[]
): Promise<{ status: string }> => {
  const lessonData = extractLessonData(formData, 'update');
  
  const result = await updateLesson(lessonData);
  if (result.status === 'success') {
    if (categoryLessons) {
      dispatch({ type: UPDATE_LESSON_CATEGORIES, lessonData });
    }
    navigateAfterFormSubmit('lesson', formData);
    return { status: 'success' };
  } else {
    Alert.alert('שגיאה', 'אירעה שגיאה בעדכון השיעור');
    return { status: 'error' };
  }
};

export const handleLessonCreate = async (
  formData: FormData,
  dispatch: Dispatch,
  categoryLessons: Lesson[]
): Promise<{ status: string }> => {
  const lessonData = extractLessonData({...formData, index: categoryLessons.length + 1}, 'create');
  console.log("🚀 ~ lessonData:", lessonData)
  
  try {
    const result = await createLesson(lessonData);
    
    if (result.status === 'success' && result.lessonId) {
      if (categoryLessons && lessonData.categoryId) {
        const newLesson = createNewLessonObject(
          result.lessonId,
          lessonData
        );
        
        dispatch({
          type: ADD_NEW_CATEGORY_LESSON,
          lesson: newLesson
        });
      }
      
      navigateAfterFormSubmit('lesson', formData);
      return { status: 'success' };
    } else {
      Alert.alert('שגיאה', 'אירעה שגיאה ביצירת השיעור');
      return { status: 'error' };
    }
  } catch (error) {
    console.error('Error creating lesson:', error);
    Alert.alert('שגיאה', 'אירעה שגיאה ביצירת השיעור');
    return { status: 'error' };
  }
};
