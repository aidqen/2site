import { colors } from '@/constants/styles';
import { Category } from '@/types';
import { FormData, FormField, FormType } from '@/types/forms';
import React from 'react';
import { TextInput, View } from 'react-native';
import { FormDropdown } from './FormDropdown';
import { ImageUploader } from './ImageUploader';
import { MainFileUploader } from './MainFileUploader';

interface FormFieldRendererProps {
  field: FormField;
  formData: Category | FormData;
  formType: FormType;
  onInputChange: (key: string, value: string) => void;
  image?: string | undefined;
  onAddImage: () => void;
  selectedSection: 'long' | 'short';
  setSelectedSection: (type: 'long' | 'short') => void;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
  formData,
  formType,
  onInputChange,
  image,
  onAddImage,
  selectedSection,
  setSelectedSection
}) => {
  // Helper function to safely access form data properties
  const getFormValue = (key: string): string => {
    return (key in formData) ? (formData as any)[key] || '' : '';
  };

  switch (field.type) {
    case 'text':
      return (
        <TextInput
          key={field.key}
          value={getFormValue(field.key) || ''}
          onChangeText={(value) => onInputChange(field.key, value)}
          placeholder={field.label || field.placeholder}
          placeholderTextColor={colors.primaryDarker}
          className="h-14 border rounded-lg px-4 text-base text-right mb-4"
          style={{
            color: colors.primaryDarker,
            fontSize: 20,
            borderColor: colors.primaryDarker
          }}
        />
      );
    case 'textarea':
      return (
        <View key={field.key} className="mb-4">
          <TextInput
            value={getFormValue(field.key) || ''}
            onChangeText={(value) => onInputChange(field.key, value)}
            placeholder={field.label || field.placeholder}
            placeholderTextColor={colors.primaryDarker}
            multiline
            numberOfLines={4}
            className="h-32 border rounded-lg px-4 pt-2 text-base text-right"
            style={{
              color: colors.primaryDarker,
              borderColor: colors.primaryDarker,
              fontSize: 20,
              textAlignVertical: 'top'
            }}
          />
        </View>
      );
    case 'image':
      return (
        <ImageUploader
          key={field.key}
          onPress={onAddImage}
          image={image}
          label={field.label}
        />
      );
    case 'video':
    case 'mainImg':
      return (
        <MainFileUploader
          key={field.key}
          label={field.label}
          type={field.type}
          fileUrl={getFormValue(field.key)}
          onFileUploaded={(path) => onInputChange(field.key, path)}
        />
      );
    case 'dropdown':
      if (formType === 'lesson' && (field.key === 'lessonType' || field.key === 'category')) {
        if (field.key === 'lessonType') {
          return (
            <View key={field.key} style={{ marginBottom: 16 }}>
              {/* <View style={{ marginBottom: 16 }}> */}
                <FormDropdown
                  type="category"
                  triggerLabel="סוג שיעור"
                  value={selectedSection}
                  onValueChange={(value) => {
                    if (value === 'long' || value === 'short') {
                      setSelectedSection(value);
                    }
                  }}
                  dropDownDirection="BOTTOM"
                  zIndex={3000}
                  selectedSection={selectedSection}
                  />
                <FormDropdown
                  type="lesson"
                  triggerLabel="שיוך לקטגוריה"
                  value={getFormValue('category') || ''}
                  onValueChange={(value) => onInputChange('category', value as string)}
                  dropDownDirection="TOP"
                  zIndex={2000}
                  selectedSection={selectedSection}
                />
            </View>
          );
        }
        return null; // Skip the second dropdown as we've already rendered both
      }

    default:
      return null;
  }
};
