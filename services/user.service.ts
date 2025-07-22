import { FavoriteLesson, Lesson } from '@/types';
import firestore from '@react-native-firebase/firestore';


export async function removeLessonFromFavorites(
  userId: string | undefined,
  lessonId: string
) {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('favoriteLessons')
      .doc(lessonId)
      .delete();
    return {status: 'success'}
  } catch (err) {
    console.error('Failed to add favorite lesson:', err);
    return {status: 'error', message: (err as Error).message}
  }
}

export async function addLessonToFavorites(
  userId: string | undefined,
  lesson: Lesson
): Promise<{lesson: FavoriteLesson | null, status: string}> {

  try {
    const lessonToSave = {
      id: lesson.id,
      name: lesson.name,
      imgUrl: lesson.imgUrl,
      addedAt: firestore.FieldValue.serverTimestamp()
    }
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('favoriteLessons')
      .doc(lesson.id)
      .set(lessonToSave);
      console.log(`Lesson ${lesson.id} added to favorites`);
      return {lesson: lessonToSave, status: 'success'}
    } catch (e) {
    return {lesson: null, status: 'error'}
  }
};

export const getFavoriteLessons = async (
  userId: string
): Promise<FavoriteLesson[]> => {
  try {
    const snap = await firestore()
      .collection('users')
      .doc(userId)
      .collection('favoriteLessons')
      .orderBy('addedAt', 'desc')    // newest first
      .get();

    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        imgUrl: data.imgUrl,
        addedAt: data.addedAt,
      };
    });
  } catch (e) {
    console.error('Error fetching favorites:', e);
    throw e;
  }
};