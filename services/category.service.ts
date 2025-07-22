import { Category } from '@/types';
import firestore from '@react-native-firebase/firestore';

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
    const categoriesSnapshot = await firestore()
      .collection('categories')
      .where('sectionId', '==', sectionId)
      .get();
    
    if (!categoriesSnapshot.empty) {
      return categoriesSnapshot.docs.map(doc => ({
        label: doc.data().name || '',
        value: doc.id
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
    const categoryRef = await firestore().collection('categories').add({
      name: category.name,
      description: category.description || '',
      imgUrl: category.imgUrl || '',
      index: category.index,
      sectionId: category.sectionId,
      createdAt: firestore.FieldValue.serverTimestamp(),
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
    
    const categoryRef = firestore().collection('categories').doc(category.id);
    
    await categoryRef.update({
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
 * Deletes a category from Firestore
 * @param categoryId The ID of the category to delete
 * @returns Object with status of the operation
 */
export const deleteCategory = async (categoryId: string): Promise<{ status: string }> => {
  try {
    await firestore().collection('categories').doc(categoryId).delete();
    return { status: 'success' };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { status: 'error' };
  }
};

/**
 * Fetches a single category by ID
 * @param categoryId The ID of the category to fetch
 * @returns The category object or null if not found
 */
// export const fetchCategoryById = async (categoryId: string): Promise<Category | null> => {
//   try {
//     const categoryDoc = await firestore().collection('categories').doc(categoryId).get();
    
//     if (categoryDoc.exists()) {
//       return {
//         id: categoryDoc.id,
//         ...categoryDoc.data() as Omit<Category, 'id'>
//       };
//     }
    
//     return null;
//   } catch (error) {
//     console.error('Error fetching category by ID:', error);
//     return null;
//   }
// };
