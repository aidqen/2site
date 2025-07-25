import { MainButton } from '@/components/ui/MainButton';
import { getFormConfig } from '@/constants/forms/formConfig';
import { getFormTitle, getInitialFormState } from '@/constants/forms/formOptions';
import { colors } from '@/constants/styles';
import { createCategory, updateCategory } from '@/services/category.service';
import { createLesson, updateLesson } from '@/services/lesson.service';
import { SET_CATEGORY_LESSONS, SET_SELECTED_CATEGORY } from '@/store/reducer';
import { Category, Lesson } from '@/types';
import { FormData, FormType } from '@/types/forms';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { FormFieldRenderer } from './form/FormFieldRenderer';

interface DynamicFormProps {
  type: FormType;
  isEdit: boolean;
  onSubmit: (formData: FormData) => void;
  content?: any;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  type,
  isEdit,
  onSubmit,
  content
}) => {
  // Move all hooks to the top level of the component
  const router = useRouter();
  const dispatch = useDispatch();
  const categoryLessons = useSelector((state: any) => state.categoryLessons);
  
  const [formData, setFormData] = useState<Category | FormData>(content || getInitialFormState({ type }));
  const [selectedSection, setSelectedSection] = useState<'long' | 'short'>('short');
  
  const formFields = getFormConfig(type);
  const formTitle = getFormTitle(type, isEdit);

  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);


  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    switch (type) {
      case 'category':
        if (isEdit) {
          updateCategory(formData as Category)
          dispatch({ type: SET_SELECTED_CATEGORY, category: formData as Category })
        } else {
          createCategory(formData as Category)
        }
        router.push({ pathname: '/section/[sectionId]', params: { sectionId: formData.sectionId } })
        break;
      case 'lesson':
        // Show loading indicator or disable button here if needed
        if (isEdit) {
          // Type assertion to handle FormData | Category union
          const typedFormData = formData as FormData;
          
          // Extract only the fields needed for lesson update
          const lessonData: Partial<Lesson> = {
            id: typedFormData.id,
            name: typedFormData.name || '',
            videoUrl: typedFormData.videoUrl || '',
            description: typedFormData.description,
            imgUrl: typedFormData.imgUrl,
            categoryId: typedFormData.categoryId
          };
          
          updateLesson(lessonData)
            .then(result => {
              if (result.status === 'success') {
                // Update Redux state if needed
                if (categoryLessons) {
                  const updatedLessons = categoryLessons.map((lesson: Lesson) => 
                    lesson.id === lessonData.id ? { ...lesson, ...lessonData } : lesson
                  );
                  dispatch({ type: SET_CATEGORY_LESSONS, lessons: updatedLessons });
                }
                
                // Navigate back to the category details page
                if (typedFormData.categoryId) {
                  router.push(`/category/details/${typedFormData.categoryId}`);
                } else {
                  router.back();
                }
              } else {
                Alert.alert('שגיאה', 'אירעה שגיאה בעדכון השיעור');
              }
            })
            .catch(error => {
              console.error('Error updating lesson:', error);
              Alert.alert('שגיאה', 'אירעה שגיאה בעדכון השיעור');
            });
        } else {
          // Type assertion to handle FormData | Category union
          const typedFormData = formData as FormData;
          
          // Extract only the fields needed for lesson creation
          const lessonData: Partial<Lesson> = {
            name: typedFormData.name || '',
            videoUrl: typedFormData.videoUrl || '',
            description: typedFormData.description,
            imgUrl: typedFormData.imgUrl,
            categoryId: typedFormData.categoryId
          };
          
          createLesson(lessonData)
            .then(result => {
              if (result.status === 'success' && result.lessonId) {
                // If we have category lessons in Redux, update them
                if (categoryLessons && typedFormData.categoryId) {
                  const newLesson: Lesson = {
                    id: result.lessonId,
                    name: lessonData.name || '',
                    videoUrl: lessonData.videoUrl || '',
                    description: lessonData.description || '',
                    imgUrl: lessonData.imgUrl || '',
                    index: categoryLessons.length + 1
                  };
                  
                  dispatch({ 
                    type: SET_CATEGORY_LESSONS, 
                    lessons: [...categoryLessons, newLesson] 
                  });
                }
                
                // Navigate back to the category details page
                if (typedFormData.categoryId) {
                  router.push(`/category/details/${typedFormData.categoryId}`);
                } else {
                  router.back();
                }
              } else {
                Alert.alert('שגיאה', 'אירעה שגיאה ביצירת השיעור');
              }
            })
            .catch(error => {
              console.error('Error creating lesson:', error);
              Alert.alert('שגיאה', 'אירעה שגיאה ביצירת השיעור');
            });
        }
        break;

      default:
        break;
    }
  };

  const handleAddImage = () => {
    console.log('Add image functionality would be implemented here');
  };

  const submitButtonText = isEdit ? 'עדכון' : 'הוספה';

  return (
    <SafeAreaView className="flex-1 relative bg-white" style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
      {/* Form Header */}
      <View className="flex-row items-center mb-6">
        <Text
          className="text-[24px] font-bold flex-1 text-center"
          style={{ color: colors.primaryDarker }}
        >
          {formTitle}
        </Text>
      </View>

      {/* Form Fields */}
      <ScrollView
        className="flex-1"
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {formFields.map(field => (
          <FormFieldRenderer
            key={field.key}
            field={field}
            formData={formData}
            formType={type}
            onInputChange={handleInputChange}
            image={formData?.imgUrl ? formData.imgUrl : ''}
            onAddImage={handleAddImage}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        ))}
      </ScrollView>

      {/* Form Footer with Submit Button */}
      <View style={{
        position: 'absolute',
        bottom: 68,
        left: 16,
        right: 16,
        alignItems: 'center'
      }}>
        <MainButton
          title={submitButtonText}
          variant="filled"
          color={colors.secondary}
          onPress={handleSubmit}
          containerStyle={{ marginVertical: 16, height: 47 }}
        />
      </View>
    </SafeAreaView>
  );
};
