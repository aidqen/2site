export interface Category {
  id: string;
  name: string;
  img?: string;
  sectionId: string;
  description?: string;
  index?: number;
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  link: string;
  imgUrl: string;
}

export interface Lesson {
  id: string;
  name: string;
  imgUrl?: string;
  description?: string;
  videoUrl: string;
  index?: number;
}
