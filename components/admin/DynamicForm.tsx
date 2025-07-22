import { MainButton } from '@/components/ui/MainButton';
import { getFormConfig } from '@/constants/forms/formConfig';
import { getFormTitle, getInitialFormState } from '@/constants/forms/formOptions';
import { colors } from '@/constants/styles';
import { createCategory, updateCategory } from '@/services/category.service';
import { SET_SELECTED_CATEGORY } from '@/store/reducer';
import { Category } from '@/types';
import { FormData, FormType } from '@/types/forms';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
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
  console.log("🚀 ~ isEdit:", isEdit)
  console.log("🚀 ~ type:", type)
  const dispatch = useDispatch()
  const formFields = getFormConfig(type);
  console.log("🚀 ~ formFields:", formFields)
  const formTitle = getFormTitle(type, isEdit);
  const [selectedSection, setSelectedSection] = useState<'long' | 'short'>('short')
  const [formData, setFormData] = useState<Category | FormData>(content || getInitialFormState());
  console.log("🚀 ~ formData:", formData)


  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content])


  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    if (type === 'category') {
      if (isEdit) {
        updateCategory(formData as Category)
        dispatch({type: SET_SELECTED_CATEGORY, category: formData as Category})
      } else {
        createCategory(formData as Category)
      }
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
