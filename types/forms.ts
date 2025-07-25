// Form types
export type FormType = 'lesson' | 'category' | 'promotional';

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'mainImg' | 'dropdown' | 'video' | 'image' | 'imgUrl';
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface FormData {
  id?: string;
  title?: string;
  name?: string;
  categoryName?: string;
  description?: string;
  link?: string;
  lessonType?: string;
  category?: string;
  imgUrl?: string;
  videoUrl?: string;
  categoryId?: string;
  sectionId: "long" | "short";
}
