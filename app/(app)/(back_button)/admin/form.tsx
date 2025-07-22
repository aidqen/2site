import { DynamicForm } from '@/components/admin/DynamicForm';
import { fetchContentById } from '@/services/lesson.service';
import { Category, Lesson } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

export default function AdminFormPage() {
  const { type = 'lesson', isEdit = 'false', id = '', categoryId = '' } = useLocalSearchParams<{
    type: 'lesson' | 'category' | 'promotional';
    isEdit: string;
    id: string;
    categoryId?: string;
  }>();
  console.log("🚀 ~ AdminFormPage ~ isEdit:",typeof isEdit)
  const [content, setContent] = useState<null | Category | Lesson>(null)
  const category = useSelector((state: any) => state.selectedCategory)
  console.log('category...', category);


  useEffect(() => {
    const fetchContent = async () => {
      if (!id || id === '') return;

      try {
        const result = await fetchContentById(type, id);
        if (result) {
          if (type === 'lesson') {
            console.log('hi');
            const contentWithCategory = { ...result, category: { name: category?.name, id: category?.id } };
            console.log('Content with category:', contentWithCategory);
            setContent(contentWithCategory);
          } else {
            setContent(result);
          }
        } else {
          console.log(`No ${type} found with ID: ${id}`)
        }
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      }
    };

    if (isEdit === 'true' && id) {
      fetchContent();
    }
  }, [id, isEdit, type])


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
        content={content}
      />
    </View>
  );
}
