import { FormType } from '@/types/forms';

// Dropdown options for form fields
export const lessonTypeOptions = [
  { label: 'אימון כוח', value: 'strength' },
  { label: 'אימון גמישות', value: 'flexibility' },
  { label: 'אימון סיבולת', value: 'endurance' },
  { label: 'אימון משולב', value: 'combined' }
];

export const categoryOptions = [
  { label: 'שיעורים קצרים', value: 'short' },
  { label: 'שיעורים ארוכים', value: 'long' },
];

export const promotionalTextOptions = [
  { label: 'מבצע מיוחד', value: 'special_offer' },
  { label: 'חדש באתר', value: 'new_content' },
  { label: 'המלצת המאמן', value: 'coach_recommendation' },
  { label: 'מוצר החודש', value: 'product_of_month' }
];

// Get form title based on type and edit mode
export const getFormTitle = (type: FormType, isEdit: boolean): string => {
  switch (type) {
    case 'lesson':
      return isEdit ? 'עריכת סרטון' : 'הוספת סרטון חדש';
    case 'category':
      return isEdit ? 'עריכת קטגוריה' : 'הוספת מערך שיעורים';
    case 'promotional':
      return isEdit ? 'עריכת תוכן שיווקי' : 'תוכן שיווקי';
    default:
      return '';
  }
};

// Initial form state
export const getInitialFormState = () => ({
  title: '',
  categoryName: '',
  description: '',
  link: '',
  lessonType: '',
  category: '',
  text: ''
});
