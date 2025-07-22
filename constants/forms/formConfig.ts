import { FormField, FormType } from '@/types/forms';

// Form configuration based on type
export const getFormConfig = (type: FormType): FormField[] => {

  const mainImageType = {
    key: 'mainImage',
    label: 'תמונה ראשית',
    type: 'mainImage' as const,
  }

  const videoType = {
    key: 'video',
    label: 'סרטון',
    type: 'video' as const,
  }

  const imagesType = {
    key: 'images',
    label: 'תמונה ראשית',
    type: 'images' as const,
  }

  const descriptionsType = {
    key: 'description',
    label: 'הסבר על הסרטון',
    type: 'textarea' as const,
  }

  const dropdownType = {
    key: 'lessonType',
    label: 'סוג שיעור',
    type: 'dropdown' as const,
  }

  switch (type) {
    case 'lesson':
      return [
        {
          key: 'name',
          label: 'כותרת לסרטון',
          type: 'text' as const,
        },
        {
          key: 'videoUrl',
          label: 'סרטון',
          type: 'video' as const,
        },
        {
          key: 'imgUrl',
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
          key: 'name',
          label: 'שם הקטגוריה',
          type: 'text' as const,
        },
        {
          key: 'imgUrl',
          label: 'תמונה ראשית',
          type: 'mainImg' as const,
        },
        {
          key: 'description',
          label: 'הסבר על סוגי האימונים',
          type: 'textarea' as const,
        },
        {
          key: 'sectionId',
          label: 'שיוך לקטגוריה',
          type: 'dropdown' as const,
        }
      ];
    case 'promotional':
      return [
        {
          key: 'name',
          label: 'כותרת',
          type: 'text' as const,
        },
        {
          key: 'imgUrl',
          label: 'תמונה ראשית',
          type: 'mainImg' as const,
        },
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
