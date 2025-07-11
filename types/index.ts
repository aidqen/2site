export interface Category {
  id: string;
  name?: string;
  img?: string;
  sectionId: string;
  explanation?: string;
  index?: number;
}

export interface Section {
  id: string;
  title: string;
  description: string;
}
