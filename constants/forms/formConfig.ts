import { FormField, FormType } from '@/types/forms';

// Form configuration based on type
export const getFormConfig = (type: FormType): FormField[] => {
  const commonFields = [
    {
      key: 'image',
      label: 'תמונות ראשיות',
      type: 'image' as const,
    }
  ];

  switch (type) {
    case 'lesson':
      return [
        {
          key: 'title',
          label: 'כותרת לסרטון',
          type: 'text' as const,
        },
        {
          key: 'video',
          label: 'סרטון',
          type: 'video' as const,
        },
        {
          key: 'image',
          label: 'תמונה ראשית',
          type: 'image' as const,
        },
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
      ];
    case 'category':
      return [
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
        }
      ];
    case 'promotional':
      return [
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
      ];
    default:
      return [];
  }
};
