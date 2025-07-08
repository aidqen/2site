import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthInput } from '@/components/auth/AuthInput';
import { MainButton } from '@/components/ui/MainButton';
import { colors } from '@/constants/styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

type FormType = 'video' | 'category' | 'promotional';

interface DynamicFormProps {
  type: FormType;
  isEdit: boolean;
  onSubmit: (formData: any) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  type,
  isEdit,
  onSubmit,
}) => {
  const router = useRouter();
  
  // Form titles based on type
  const getTitleText = () => {
    switch (type) {
      case 'video':
        return isEdit ? 'עריכת סרטון' : 'הוספת סרטון חדש';
      case 'category':
        return isEdit ? 'עריכת קטגוריה' : 'הוספת מערך שיעורים';
      case 'promotional':
        return isEdit ? 'עריכת תוכן שיווקי' : 'תוכן שיווקי';
      default:
        return '';
    }
  };
  
  // Initial form state based on type
  const getInitialFormState = () => {
    switch (type) {
      case 'video':
        return {
          title: '',
          description: '',
          mainImage: null,
        };
      case 'category':
        return {
          categoryName: '',
          mainImage: null,
        };
      case 'promotional':
        return {
          title: '',
          link: '',
          mainImage: null,
        };
      default:
        return {};
    }
  };
  
  const [formData, setFormData] = useState(getInitialFormState());
  const [mainImages, setMainImages] = useState<string[]>([]);
  
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
  
  const handleBack = () => {
    router.back();
  };
  
  const renderVideoForm = () => (
    <>
      <AuthInput
        label="כותרת לסרטון"
        value={formData.title}
        onChangeText={(value) => handleInputChange('title', value)}
      />
      
      <View className="mb-4">
        <Text className="font-ibm-regular text-sm text-[#333] mb-1 text-right">תמונות ראשיות</Text>
        <View className="flex-row justify-end gap-2 mb-4">
          {mainImages.length > 0 ? (
            mainImages.map((image, index) => (
              <View key={index} className="w-20 h-20 bg-gray-200 rounded-md" />
            ))
          ) : (
            <TouchableOpacity 
              onPress={handleAddImage}
              className="w-20 h-20 bg-white border border-[#4D8E99] rounded-md items-center justify-center"
            >
              <Ionicons name="add" size={32} color={colors.primaryDarker} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <View className="mb-4">
        <Text className="font-ibm-regular text-sm text-[#333] mb-1 text-right">הסבר על הסרטון</Text>
        <AuthInput
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
          multiline
          numberOfLines={4}
          className="h-32 pt-2"
        />
      </View>
      
      <View className="flex-row">
        <MainButton
          title="סוג שיעור"
          variant="outlined"
          onPress={() => {}}
          containerStyle={{ flex: 1, marginRight: 8 }}
        />
        <MainButton
          title="שיוך לקטגוריה"
          variant="outlined"
          onPress={() => {}}
          containerStyle={{ flex: 1 }}
        />
      </View>
    </>
  );
  
  const renderCategoryForm = () => (
    <>
      <AuthInput
        label="שם הקטגוריה"
        value={formData.categoryName}
        onChangeText={(value) => handleInputChange('categoryName', value)}
      />
      
      <View className="mb-4">
        <Text className="font-ibm-regular text-sm text-[#333] mb-1 text-right">תמונות ראשיות</Text>
        <View className="flex-row justify-end gap-2 mb-4">
          <TouchableOpacity 
            onPress={handleAddImage}
            className="w-20 h-20 bg-white border border-[#4D8E99] rounded-md items-center justify-center"
          >
            <Ionicons name="add" size={32} color={colors.primaryDarker} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View className="mb-4">
        <Text className="font-ibm-regular text-sm text-[#333] mb-1 text-right">הסבר על סוגי האימונים</Text>
        <AuthInput
          multiline
          numberOfLines={4}
          className="h-32 pt-2"
        />
      </View>
    </>
  );
  
  const renderPromotionalForm = () => (
    <>
      <AuthInput
        label="כותרת"
        value={formData.title}
        onChangeText={(value) => handleInputChange('title', value)}
      />
      
      <View className="mb-4">
        <Text className="font-ibm-regular text-sm text-[#333] mb-1 text-right">תמונות ראשיות</Text>
        <View className="flex-row justify-end gap-2 mb-4">
          <TouchableOpacity 
            onPress={handleAddImage}
            className="w-20 h-20 bg-white border border-[#4D8E99] rounded-md items-center justify-center"
          >
            <Ionicons name="add" size={32} color={colors.primaryDarker} />
          </TouchableOpacity>
        </View>
      </View>
      
      <AuthInput
        label="לינק לאתר חיצוני"
        value={formData.link}
        onChangeText={(value) => handleInputChange('link', value)}
      />
      
      <MainButton
        title="טקסט"
        variant="outlined"
        onPress={() => {}}
        containerStyle={{ marginTop: 8 }}
      />
    </>
  );
  
  const renderFormByType = () => {
    switch (type) {
      case 'video':
        return renderVideoForm();
      case 'category':
        return renderCategoryForm();
      case 'promotional':
        return renderPromotionalForm();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingHorizontal: 16 }}>
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={handleBack} className="p-2">
          <Ionicons name="chevron-back" size={24} color={colors.primaryDarker} />
        </TouchableOpacity>
        <Text
          className="text-[24px] font-bold flex-1 text-right"
          style={{ color: colors.primaryDarker }}
        >
          {getTitleText()}
        </Text>
      </View>
      
      <View className="flex-1">
        {renderFormByType()}
      </View>
      
      <MainButton
        title="הוספה"
        variant="filled"
        color={colors.primaryDarker}
        onPress={handleSubmit}
        containerStyle={{ marginVertical: 16 }}
      />
    </SafeAreaView>
  );
};
