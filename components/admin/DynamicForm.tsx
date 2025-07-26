import { MainButton } from '@/components/ui/MainButton';
import { getFormConfig } from '@/constants/forms/formConfig';
import { getFormTitle, getInitialFormState } from '@/constants/forms/formOptions';
import { colors } from '@/constants/styles';
import { handleCategoryCreate, handleCategoryUpdate, handleLessonCreate, handleLessonUpdate } from '@/services/form.service';
import { addPromotionalItem, updatePromotionalItem } from '@/services/promotional.service';
import { Category, PromotionalItem } from '@/types';
import { FormData, FormType } from '@/types/forms';

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
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

  // Use FormData as the base type since it has all the fields we need
  const [formData, setFormData] = useState<FormData>(content || getInitialFormState({ type }));
  console.log("🚀 ~ file: DynamicForm.tsx:37 ~ formData:", formData)
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

  
  // Main submit handler with direct handling of all form types
  const handleSubmit = async () => {
    switch (type) {
      case 'category': {
        let result;
        
        if (isEdit) {
          result = await handleCategoryUpdate(formData as Category, dispatch);
        } else {
          result = await handleCategoryCreate(formData as Category);
        }
        break;
      }
        
      case 'lesson': {
        let result;
        
        if (isEdit) {
          result = await handleLessonUpdate(formData as FormData, dispatch, categoryLessons);
        } else {
          result = await handleLessonCreate(formData as FormData, dispatch, categoryLessons);
        }
        break;
      }
      case 'promotional': {
        let result;
        if (isEdit) {
          if (formData.id) {
            result = await updatePromotionalItem(formData.id, {
              name: formData.name || '',
              description: formData.description || '',
              imgUrl: formData.imgUrl || '',
              link: formData.link || ''
            })
          }
        } else {
          result = await addPromotionalItem(formData as Omit<PromotionalItem, 'id'>)
        }
        break;
      }
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
