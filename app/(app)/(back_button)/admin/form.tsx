import { DynamicForm } from '@/components/admin/DynamicForm';
import { Category, Lesson } from '@/types';
import firestore from '@react-native-firebase/firestore';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function AdminFormPage() {
  const { type = 'lesson', isEdit = 'false', id = '' } = useLocalSearchParams<{ 
    type: 'lesson' | 'category' | 'promotional';
    isEdit: string;
    id: string;
  }>();
  const [editableContent, setEditableContent] = useState<null | Category | Lesson>(null)

  useEffect(() => {
    firestore()
    .collection('categories')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        setEditableContent(doc.data() as Category)
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
  }, [id, isEdit])
  
  
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
        editableContent={editableContent}
        setEditableContent={setEditableContent}
      />
    </View>
  );
}
