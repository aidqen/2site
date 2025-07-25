import { FormField, FormType } from '@/types/forms';
import React from 'react';
import { View } from 'react-native';
import { FormDropdown } from './FormDropdown';

interface DropdownFieldRendererProps {
  field: FormField;
  formType: FormType;
  value: string | number | null | { id: string; name: string };
  onValueChange: (key: string, value: string) => void;
  selectedSection: 'long' | 'short';
  setSelectedSection: (type: 'long' | 'short') => void;
}

export const DropdownFieldRenderer: React.FC<DropdownFieldRendererProps> = ({
  field,
  formType,
  value,
  onValueChange,
  selectedSection,
  setSelectedSection
}) => {
  // Handle different dropdown types based on field.key
  switch (field.key) {
    case 'lessonType':
      return (
        <View key={field.key} style={{ marginBottom: 0 }}>
          <FormDropdown
            type="category"
            triggerLabel={field.label}
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
        </View>
      );

    case 'category':
      return (
        <View key={field.key} style={{ marginBottom: 0 }}>
          <FormDropdown
            type="lesson"
            triggerLabel={field.label}
            value={value || ''}
            onValueChange={(value) => onValueChange(field.key, value ? value.toString() : '')}
            dropDownDirection="TOP"
            zIndex={2000}
            selectedSection={selectedSection}
          />
        </View>
      );
      
    case 'sectionId':
      return (
        <View key={field.key} style={{ marginBottom: 0 }}>
          <FormDropdown
            type="category"
            triggerLabel={field.label}
            value={value || ''}
            onValueChange={(value) => onValueChange(field.key, value ? value.toString() : '')}
            dropDownDirection="BOTTOM"
            zIndex={3000}
            selectedSection={selectedSection}
          />
        </View>
      );

    default:
  }
};
