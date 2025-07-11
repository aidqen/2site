// Form types
export type FormType = 'lesson' | 'category' | 'promotional';

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'dropdown' | 'video';
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface FormData {
  title: string;
  categoryName: string;
  description: string;
  link: string;
  lessonType: string;
  category: string;
  text: string;
  [key: string]: string;
}
