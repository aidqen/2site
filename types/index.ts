import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface Category {
  id: string;
  name: string;
  imgUrl?: string;
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
  index: number;
  categoryId?: string;
  category?: {name: string, id: string}
}

export interface FavoriteLesson {
  id: string;
  name: string;
  imgUrl?: string;
  addedAt: Date | FirebaseFirestoreTypes.FieldValue | number | null;
}
