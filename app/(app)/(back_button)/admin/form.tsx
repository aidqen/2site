import { DynamicForm } from '@/components/admin/DynamicForm';
import { fetchContentById } from '@/services/lesson.service';
import { Category, Lesson, PromotionalItem } from '@/types';
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
  const [content, setContent] = useState<null | Category | Lesson | PromotionalItem>(null)
  const category = useSelector((state: any) => state.selectedCategory)


  useEffect(() => {
    const fetchContent = async () => {
      if (!id || id === '') return;

      try {
        const result = await fetchContentById(type, id);
        if (result) {
          if (type === 'lesson') {
            const contentWithCategory = { ...result, category: { name: category?.name, id: category?.id } };
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
