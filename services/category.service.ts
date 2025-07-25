import { Category } from '@/types';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from '@react-native-firebase/firestore';

// Category type definition
// export interface Category {
//   id?: string;
//   name: string;
//   description: string;
//   imgUrl: string;
//   index: number;
//   sectionId: 'long' | 'short';
// }

export const fetchCategoriesBySection = async (sectionId: 'long' | 'short'): Promise<Array<{label: string, value: string}>> => {
  try {
    const db = getFirestore();
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, where('sectionId', '==', sectionId));
    const categoriesSnapshot = await getDocs(q);
    
    if (!categoriesSnapshot.empty) {
      return categoriesSnapshot.docs.map(docSnap => ({
        label: docSnap.data().name || '',
        value: docSnap.id
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching categories by section:', error);
    throw error;
  }
};

/**
 * Creates a new category in Firestore
 * @param category The category object to create
 * @returns Object with status and the created category (including ID)
 */
export const createCategory = async (category: Omit<Category, 'id'>): Promise<{ status: string; category: Category | null }> => {
  try {
    const db = getFirestore();
    const categoriesRef = collection(db, 'categories');
    const categoryRef = await addDoc(categoriesRef, {
      name: category.name,
      description: category.description || '',
      imgUrl: category.imgUrl || '',
      index: category.index,
      sectionId: category.sectionId,
    });
    
    const newCategory = { 
      ...category, 
      id: categoryRef.id 
    };
    
    return { 
      status: 'success', 
      category: newCategory 
    };
  } catch (error) {
    console.error('Error creating category:', error);
    return { 
      status: 'error', 
      category: null 
    };
  }
};



export const fetchCategoryById = async (categoryId: string): Promise<Category | null> => {
  try {
    const db = getFirestore();
    const categoryRef = doc(db, 'categories', categoryId);
    const docSnap = await getDoc(categoryRef);
    
    if (!docSnap.exists()) {
      console.log('No category found with the specified ID');
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
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
/**
 * Updates an existing category in Firestore
 * @param category The category object with updated fields
 * @returns Object with status and the updated category
 */
export const updateCategory = async (category: Category): Promise<{ status: string; category: Category | null }> => {
  try {
    if (!category.id) {
      throw new Error('Category ID is required for updates');
    }
    
    const db = getFirestore();
    const categoryRef = doc(db, 'categories', category.id);
    
    await updateDoc(categoryRef, {
      name: category.name,
      description: category.description,
      imgUrl: category.imgUrl,
      index: category.index,
      sectionId: category.sectionId,
    });
    
    return { 
      status: 'success', 
      category 
    };
  } catch (error) {
    console.error('Error updating category:', error);
    return { 
      status: 'error', 
      category: null 
    };
  }
};

/**
 * Deletes a category from Firestore and all lessons associated with it
 * @param categoryId The ID of the category to delete
 * @returns Object with status of the operation
 */
export const deleteCategory = async (categoryId: string): Promise<{ status: string }> => {
  try {
    const db = getFirestore();
    
    // First, find all lessons with this categoryId
    const lessonsRef = collection(db, 'lessons');
    const q = query(lessonsRef, where('categoryId', '==', categoryId));
    const lessonsSnapshot = await getDocs(q);
    
    // Check if there are any lessons to delete
    if (!lessonsSnapshot.empty) {
      // Delete all lessons with this categoryId
      const lessonDeletionPromises = lessonsSnapshot.docs.map(lessonDoc => {
        return deleteDoc(doc(db, 'lessons', lessonDoc.id));
      });
      
      // Wait for all lesson deletions to complete
      await Promise.all(lessonDeletionPromises);
      console.log(`Deleted ${lessonsSnapshot.docs.length} lessons for category ${categoryId}`);
    } else {
      console.log(`No lessons found for category ${categoryId}`);
    }
    
    // Then delete the category itself
    const categoryRef = doc(db, 'categories', categoryId);
    await deleteDoc(categoryRef);
    console.log(`Deleted category ${categoryId}`);
    
    return { status: 'success' };
  } catch (error) {
    console.error('Error deleting category and its lessons:', error);
    return { status: 'error' };
  }
};

/**
 * Fetches all categories for a specific section
 * @param sectionId The section ID to filter categories by
 * @returns Array of Category objects
 */
export const fetchCategoriesBySectionId = async (sectionId: string): Promise<Category[]> => {
  try {
    const db = getFirestore();
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, where('sectionId', '==', sectionId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(docSnap => {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Category
    });
  } catch (error) {
    console.error('Error fetching categories by section ID:', error);
    return [];
  }
};
