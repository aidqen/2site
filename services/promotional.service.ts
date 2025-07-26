import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from '@react-native-firebase/firestore';
import { router } from 'expo-router';

/**
 * Promotional item interface
 */
export interface PromotionalItem {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  link: string;
}

/**
 * Fetch all promotional items from Firebase
 * @returns Array of promotional items
 */
export const fetchPromotionalItems = async (): Promise<PromotionalItem[]> => {
  try {
    const db = getFirestore();
    const promotionalRef = collection(db, 'promotional');
    const querySnapshot = await getDocs(promotionalRef);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || '',
        description: data.description || '',
        imgUrl: data.imgUrl || '',
        link: data.link || ''
      };
    });
  } catch (error) {
    console.error('Error fetching promotional items:', error);
    return [];
  }
};

/**
 * Add a new promotional item to Firebase
 * @param item Promotional item data (without id)
 * @returns Object with status and id of the created item
 */
export const addPromotionalItem = async (
  item: Omit<PromotionalItem, 'id'>
): Promise<{ status: 'success' | 'error'; id?: string }> => {
  try {
    const db = getFirestore();
    const promotionalRef = collection(db, 'promotional');
    
    const docRef = await addDoc(promotionalRef, {
      name: item.name,
      description: item.description,
      imgUrl: item.imgUrl,
      link: item.link
    });
    
    return { status: 'success', id: docRef.id };
  } catch (error) {
    console.error('Error adding promotional item:', error);
    return { status: 'error' };
  }
};

/**
 * Delete a promotional item from Firebase
 * @param id ID of the promotional item to delete
 * @returns Object with operation status
 */
export const deletePromotionalItem = async (
  id: string
): Promise<{ status: 'success' | 'error' }> => {
  try {
    const db = getFirestore();
    const promotionalDocRef = doc(db, 'promotional', id);
    
    await deleteDoc(promotionalDocRef);
    
    return { status: 'success' };
  } catch (error) {
    console.error('Error deleting promotional item:', error);
    return { status: 'error' };
  }
};

export const updatePromotionalItem = async (
  id: string,
  item: Omit<PromotionalItem, 'id'>
): Promise<{ status: 'success' | 'error' }> => {
  try {
    const db = getFirestore();
    const promotionalDocRef = doc(db, 'promotional', id);
    
    await updateDoc(promotionalDocRef, {
      name: item.name || '',
      description: item.description || '',
      imgUrl: item.imgUrl || '',
      link: item.link || ''
    });
    router.push('/home')
    
    return { status: 'success' };
  } catch (error) {
    console.error('Error updating promotional item:', error);
    return { status: 'error' };
  }
};

export const fetchPromotionalItemById = async (id: string): Promise<PromotionalItem | null> => {
  try {
    if (!id) return null;
    
    const db = getFirestore();
    const promotionalDocRef = doc(db, 'promotional', id);
    const docSnap = await getDoc(promotionalDocRef);
    
    if (!docSnap.exists()) {
      console.log('No promotional item found with ID:', id);
      return null;
    }
    
    const data = docSnap.data();
    if (!data) {
      console.log('Document data is undefined for ID:', id);
      return null;
    }
    
    return {
      id: docSnap.id,
      name: data.name || '',
      description: data.description || '',
      imgUrl: data.imgUrl || '',
      link: data.link || ''
    };
  } catch (error) {
    console.error('Error fetching promotional item by ID:', error);
    return null;
  }
};
