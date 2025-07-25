// import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Category, Lesson } from '@/types';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, where } from '@react-native-firebase/firestore';
import { getDownloadURL, getStorage, ref } from '@react-native-firebase/storage';
import { fetchCategoryById } from './category.service';

export const getStorageDownloadUrl = async (path?: string): Promise<string> => {
  if (!path) {
    return '';
  }
  
  try {
    const storage = getStorage();
    const fileRef = ref(storage, path);
    const url = await getDownloadURL(fileRef);
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
    
    const db = getFirestore();
    const lessonsRef = collection(db, 'lessons');
    const q = query(
      lessonsRef,
      where('categoryId', '==', categoryId),
      where('index', '==', numericIndex),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    
    const docSnap = querySnapshot.docs[0];
    if (!docSnap) {
      console.error("No lesson found with the specified index");
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
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



export const fetchLessonById = async (lessonId: string): Promise<Lesson | null> => {
  try {
    const db = getFirestore();
    const lessonRef = doc(db, 'lessons', lessonId);
    const docSnap = await getDoc(lessonRef);
    
    if (!docSnap.exists()) {
      console.log('No lesson found with the specified ID');
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
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

export const fetchLessonsByCategory = async (categoryId: string): Promise<Lesson[]> => {
  try {
    const db = getFirestore();
    const lessonsRef = collection(db, 'lessons');
    const q = query(
      lessonsRef,
      where('categoryId', '==', categoryId),
      orderBy('index')
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || '',
        videoUrl: data.videoUrl || '',
        imgUrl: data.imgUrl || '',
        description: data.description || '',
        index: data.index || 0
      };
    });
  } catch (error) {
    console.error('Error fetching lessons by category:', error);
    return [];
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
        return await fetchCategoryById(id);
      
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
    return null;
  }
};

export const deleteLesson = async (lessonId: string): Promise<{ status: string }> => {
  try {
    const db = getFirestore();
    const lessonRef = doc(db, 'lessons', lessonId);
    await deleteDoc(lessonRef);
    console.log(`Deleted lesson ${lessonId}`);
    
    return { status: 'success' };
  } catch (error) {
    console.error('Error deleting lesson:', error);
    return { status: 'error' };
  }
};

/**
 * Creates a new lesson in Firestore
 * @param lessonData The lesson data to create
 * @returns Object with status and the created lesson ID
 */
export const createLesson = async (lessonData: Partial<Lesson>): Promise<{ status: string; lessonId?: string }> => {
  try {
    // Extract only the fields we need for the lesson
    const { name, imgUrl, description, videoUrl, categoryId } = lessonData;
    
    if (!name || !videoUrl || !categoryId) {
      console.error('Missing required fields for lesson creation');
      return { status: 'error' };
    }
    
    // Get the next available index for this category
    const db = getFirestore();
    const lessonsRef = collection(db, 'lessons');
    const q = query(
      lessonsRef,
      where('categoryId', '==', categoryId),
      orderBy('index', 'desc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    let nextIndex = 1; // Default to 1 if no lessons exist
    
    if (!querySnapshot.empty) {
      const lastLesson = querySnapshot.docs[0].data();
      nextIndex = (lastLesson.index || 0) + 1;
    }
    
    // Create the new lesson document
    const newLessonRef = doc(collection(db, 'lessons'));
    await newLessonRef.set({
      name,
      imgUrl: imgUrl || '',
      description: description || '',
      videoUrl,
      categoryId,
      index: nextIndex,
      createdAt: Date.now() // Use regular JS timestamp
    });
    
    console.log(`Created lesson ${newLessonRef.id}`);
    return { status: 'success', lessonId: newLessonRef.id };
  } catch (error) {
    console.error('Error creating lesson:', error);
    return { status: 'error' };
  }
};

/**
 * Updates an existing lesson in Firestore
 * @param lessonData The lesson data to update, must include id
 * @returns Object with status of the operation
 */
export const updateLesson = async (lessonData: Partial<Lesson>): Promise<{ status: string }> => {
  try {
    const { id, name, imgUrl, description, videoUrl, categoryId } = lessonData;
    
    if (!id || !name || !videoUrl) {
      console.error('Missing required fields for lesson update');
      return { status: 'error' };
    }
    
    const db = getFirestore();
    const lessonRef = doc(db, 'lessons', id);
    
    // Update only the fields that are provided
    const updateData: Record<string, any> = {
      name,
      videoUrl,
      updatedAt: Date.now() // Use regular JS timestamp
    };
    
    if (imgUrl !== undefined) updateData.imgUrl = imgUrl;
    if (description !== undefined) updateData.description = description;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    
    await lessonRef.update(updateData);
    
    console.log(`Updated lesson ${id}`);
    return { status: 'success' };
  } catch (error) {
    console.error('Error updating lesson:', error);
    return { status: 'error' };
  }
};

