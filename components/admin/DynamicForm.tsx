import { MainButton } from '@/components/ui/MainButton';
import { getFormConfig } from '@/constants/forms/formConfig';
import { getFormTitle, getInitialFormState } from '@/constants/forms/formOptions';
import { colors } from '@/constants/styles';
import { FormData, FormType } from '@/types/forms';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormFieldRenderer } from './form/FormFieldRenderer';

interface DynamicFormProps {
  type: FormType;
  isEdit: boolean;
  onSubmit: (formData: FormData) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  type,
  isEdit,
  onSubmit,
}) => {
  const router = useRouter();
  
  // Get form fields configuration
  const formFields = getFormConfig(type);
  
  // Get form title
  const formTitle = getFormTitle(type, isEdit);
  
  // Set up form state
  const [formData, setFormData] = useState<FormData>(getInitialFormState());
  const [mainImages, setMainImages] = useState<string[]>([]);
  
  // Form event handlers
  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleAddImage = () => {
    // This would typically integrate with image picker
    console.log('Add image functionality would be implemented here');
  };
  
  // Determine the submit button text based on isEdit
  const submitButtonText = isEdit ? 'עדכון' : 'הוספה';

  return (
    <SafeAreaView className="flex-1 relative bg-white" style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
      {/* Form Header */}
      <View className="flex-row items-center mb-6">
        <Text
          className="text-[24px] font-bold flex-1 text-right"
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
            mainImages={mainImages}
            onAddImage={handleAddImage}
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
