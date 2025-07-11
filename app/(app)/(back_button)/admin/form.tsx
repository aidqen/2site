import { DynamicForm } from '@/components/admin/DynamicForm';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function AdminFormPage() {
  const { type = 'lesson', isEdit = 'false' } = useLocalSearchParams<{ 
    type: 'lesson' | 'category' | 'promotional';
    isEdit: string;
  }>();
  
  // Convert string 'true'/'false' to boolean
  const isEditMode = isEdit === 'true';
  
  const handleSubmit = (formData: any) => {
    // Here you would handle the form submission
    // For example, sending data to an API or updating state
    console.log('Form submitted:', formData);
  };

  return (
    <View className="flex-1 bg-white">
      <DynamicForm 
        type={type} 
        isEdit={isEditMode} 
        onSubmit={handleSubmit} 
      />
    </View>
  );
}
