/**
 * Types for the form components
 */

export type FormType = 'video' | 'category' | 'promotional';

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'dropdown';
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface FormConfig {
  fields: FormField[];
  title: string;
}

export interface FormData {
  [key: string]: string | null;
}
