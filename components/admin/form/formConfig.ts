import { FormConfig, FormType } from './types';

/**
 * Get form configuration based on form type and edit mode
 */
export const getFormConfig = (type: FormType, isEdit: boolean): FormConfig => {
  const commonFields = [
    {
      key: 'image',
      label: 'תמונות ראשיות',
      type: 'image' as const,
    }
  ];
  
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
  
  switch (type) {
    case 'video':
      return {
        title: getTitleText(),
        fields: [
          {
            key: 'title',
            label: 'כותרת לסרטון',
            type: 'text' as const,
          },
          ...commonFields,
          {
            key: 'description',
            label: 'הסבר על הסרטון',
            type: 'textarea' as const,
          },
          {
            key: 'lessonType',
            label: 'סוג שיעור',
            type: 'dropdown' as const,
          },
          {
            key: 'category',
            label: 'שיוך לקטגוריה',
            type: 'dropdown' as const,
          }
        ]
      };
    case 'category':
      return {
        title: getTitleText(),
        fields: [
          {
            key: 'categoryName',
            label: 'שם הקטגוריה',
            type: 'text' as const,
          },
          ...commonFields,
          {
            key: 'description',
            label: 'הסבר על סוגי האימונים',
            type: 'textarea' as const,
          },
          {
            key: 'category',
            label: 'שיוך לקטגוריה',
            type: 'dropdown' as const,
          }
        ]
      };
    case 'promotional':
      return {
        title: getTitleText(),
        fields: [
          {
            key: 'title',
            label: 'כותרת',
            type: 'text' as const,
          },
          ...commonFields,
          {
            key: 'link',
            label: 'לינק לאתר חיצוני',
            type: 'text' as const,
          },
          {
            key: 'text',
            label: 'טקסט',
            type: 'dropdown' as const,
          }
        ]
      };
    default:
      return {
        title: '',
        fields: []
      };
  }
};
