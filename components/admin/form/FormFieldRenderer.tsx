import { colors } from '@/constants/styles';
import { FormData, FormField, FormType } from '@/types/forms';
import React from 'react';
import { TextInput, View } from 'react-native';
import { FormDropdown } from './FormDropdown';
import { ImageUploader } from './ImageUploader';
import { VideoUploader } from './VideoUploader';
import { categoryOptions, lessonTypeOptions, promotionalTextOptions } from '@/constants/forms/formOptions';

interface FormFieldRendererProps {
  field: FormField;
  formData: FormData;
  formType: FormType;
  onInputChange: (key: string, value: string) => void;
  mainImages: string[];
  onAddImage: () => void;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
  formData,
  formType,
  onInputChange,
  mainImages,
  onAddImage
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
    case 'image':
      return (
        <ImageUploader
          key={field.key}
          onPress={onAddImage}
          images={mainImages}
          label={field.label}
        />
      );
    case 'video':
      return (
        <VideoUploader
          key={field.key}
          label={field.label}
          onPress={() => console.log('Add video functionality would be implemented here')}
        />
      );
    case 'dropdown':
      // For lesson form, render two dropdowns side by side
      if (formType === 'lesson' && (field.key === 'lessonType' || field.key === 'category')) {
        if (field.key === 'lessonType') {
          return (
            <View key={field.key} className="flex-col mb-4">
              <FormDropdown
                triggerLabel="סוג שיעור"
                options={lessonTypeOptions}
                value={formData.lessonType}
                onValueChange={(value) => onInputChange('lessonType', value as string)}
                containerStyle={{ flex: 1, marginRight: 8 }}
                zIndex={3000}
                zIndexInverse={1000}
              />
              <FormDropdown
                triggerLabel="שיוך לקטגוריה"
                options={categoryOptions}
                value={formData.category}
                onValueChange={(value) => onInputChange('category', value as string)}
                containerStyle={{ flex: 1 }}
                zIndex={2000}
                zIndexInverse={2000}
              />
            </View>
          );
        }
        return null; // Skip the second dropdown as we've already rendered both
      }

      // For promotional form, render a single dropdown
      return (
        <FormDropdown
          key={field.key}
          triggerLabel={field.label}
          options={field.key === 'text' ? promotionalTextOptions : []}
          value={formData[field.key] || ''}
          onValueChange={(value) => onInputChange(field.key, value as string)}
          containerStyle={{ marginBottom: 16 }}
          zIndex={1000}
          zIndexInverse={3000}
        />
      );
    default:
      return null;
  }
};
