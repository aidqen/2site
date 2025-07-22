// import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Category, Lesson } from '@/types';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const getStorageDownloadUrl = async (path?: string): Promise<string> => {
  if (!path) {
    return '';
  }
  
  try {
    const url = await storage()
      .ref(path)
      .getDownloadURL();
    return url;
  } catch (error) {
    console.error('Error getting download URL:', error);
    throw error;
  }
};

export const fetchLessonByIndex = async (
  categoryId: string,
  lessonIndex: string | number
): Promise<Lesson | null> => {
  try {
    const numericIndex = typeof lessonIndex === 'string' 
      ? parseInt(lessonIndex) 
      : lessonIndex;
    
    const querySnapshot = await firestore()
      // .collection('categories')
      // .doc(categoryId)
      .collection('lessons')
      .where('categoryId', '==', categoryId)
      .where('index', '==', numericIndex)
      .limit(1)
      .get();
    
    const doc = querySnapshot.docs[0];
    console.log("🚀 ~ doc:", doc)
    if (!doc) {
      console.error("No lesson found with the specified index");
      return null;
    }

    const data = doc.data();
    return {
      id: doc.id,
      name: data.name || '',
      videoUrl: data.videoUrl || '',
      imgUrl: data.imgUrl,
      description: data.description,
      index: data.index
    };
  } catch (error) {
    console.error("Error fetching lesson:", error);
    throw error;
  }
};

export const fetchLessonsByCategory = async (categoryId: string): Promise<Lesson[]> => {
  try {
    const querySnapshot = await firestore()
      // .collection('categories')
      // .doc(categoryId)
      .collection('lessons')
      .where('categoryId', '==', categoryId)
      .orderBy('index')
      .get();
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log("🚀 ~ fetchLessonsByCategory ~ data:", data)
      return {
        id: doc.id,
        name: data.name || '',
        videoUrl: data.videoUrl || '',
        imgUrl: data.imgUrl,
        description: data.description,
        index: data.index
      };
    });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }
};

export const fetchCategoryById = async (categoryId: string): Promise<Category | null> => {
  try {
    const doc = await firestore()
      .collection('categories')
      .doc(categoryId)
      .get();
    
    if (!doc.exists) {
      console.log('No category found with the specified ID');
      return null;
    }

    const data = doc.data();
    return {
      id: doc.id,
      name: data?.name || '',
      imgUrl: data?.imgUrl,
      sectionId: data?.sectionId || '',
      description: data?.description,
      index: data?.index
    };
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

export const fetchLessonById = async (lessonId: string): Promise<Lesson | null> => {
  try {
    const doc = await firestore()
      .collection('lessons')
      .doc(lessonId)
      .get();
    
    if (!doc.exists) {
      console.log('No lesson found with the specified ID');
      return null;
    }

    const data = doc.data();
    return {
      id: doc.id,
      name: data?.name || '',
      videoUrl: data?.videoUrl || '',
      imgUrl: data?.imgUrl,
      description: data?.description,
      index: data?.index
    };
  } catch (error) {
    console.error("Error fetching lesson:", error);
    throw error;
  }
};



export const fetchContentById = async (
  type: 'category' | 'lesson' | 'promotional',
  id: string,
): Promise<Category | Lesson | null> => {
  try {
    if (!id) return null;
    
    switch (type) {
      case 'category':
        const category = await fetchCategoryById(id);
        console.log("🚀 ~ category:::", category)
        return category
      
      case 'lesson':
        return await fetchLessonById(id);
      
      case 'promotional':
        console.log('Promotional content fetching not implemented yet');
        return null;
      
      default:
        console.error(`Unknown content type: ${type}`);
        return null;
    }
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    throw error;
  }
};

