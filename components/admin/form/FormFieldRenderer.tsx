import { categoryOptions, lessonTypeOptions } from '@/constants/forms/formOptions';
import { colors } from '@/constants/styles';
import { FormData, FormField, FormType } from '@/types/forms';
import React from 'react';
import { TextInput, View } from 'react-native';
import { FormDropdown } from './FormDropdown';
import { ImageUploader } from './ImageUploader';
import { MainFileUploader } from './MainFileUploader';

interface FormFieldRendererProps {
  field: FormField;
  formData: FormData;
  formType: FormType;
  onInputChange: (key: string, value: string) => void;
  mainImages: string[];
  onAddImage: () => void;
  editableContent?: any;
  setEditableContent?: (content: any) => void;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
  formData,
  formType,
  onInputChange,
  mainImages,
  onAddImage,
  editableContent,
  setEditableContent
}) => {

  switch (field.type) {
    case 'text':
      return (
        <TextInput
          key={field.key}
          value={formData[field.key] || ''}
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
            value={formData[field.key] || ''}
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
    case 'images':
      return (
        <ImageUploader
          key={field.key}
          onPress={onAddImage}
          images={mainImages}
          label={field.label}
        />
      );
    case 'video':
    case 'mainImage':
      return (
        <MainFileUploader
          key={field.key}
          label={field.label}
        />
      );
    case 'dropdown':
      // For lesson form, render two dropdowns side by side
      if (formType === 'lesson' && (field.key === 'lessonType' || field.key === 'category')) {
        if (field.key === 'lessonType') {
          return (
            <View key={field.key} style={{ marginBottom: 16 }}>
              {/* <View style={{ marginBottom: 16 }}> */}
                <FormDropdown
                  type="lesson"
                  triggerLabel="סוג שיעור"
                  options={lessonTypeOptions}
                  value={formData.lessonType}
                  onValueChange={(value) => onInputChange('lessonType', value as string)}
                  dropDownDirection="BOTTOM"
                  zIndex={3000}
                />
              {/* </View>
              
              <View style={{ marginTop: 16 }}> */}
                <FormDropdown
                  type="category"
                  triggerLabel="שיוך לקטגוריה"
                  options={categoryOptions}
                  value={formData.category}
                  onValueChange={(value) => onInputChange('category', value as string)}
                  dropDownDirection="TOP"
                  zIndex={2000}
                />
              {/* </View> */}
            </View>
          );
        }
        return null; // Skip the second dropdown as we've already rendered both
      }

    default:
      return null;
  }
};
