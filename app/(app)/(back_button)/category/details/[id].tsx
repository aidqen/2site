import { ConfirmationModal } from '@/components/ConfirmationModal';
import { EditButton } from '@/components/EditButton';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { PageContainer } from '@/components/PageContainer';
import { SectionPreview } from '@/components/SectionPreview';
import { deleteLesson } from '@/services/lesson.service';
import { SET_CATEGORY_LESSONS } from '@/store/reducer';
import { Lesson } from '@/types';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function CategoryDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const dispatch = useDispatch();
    const category = useSelector((state: any) => state.selectedCategory)
    const lessons = useSelector((state:any) => state.categoryLessons)
    console.log("🚀 ~ CategoryDetails ~ lessons:", lessons)
    const [isEdit, setIsEdit] = useState(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    // Lesson deletion state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [lessonToDelete, setLessonToDelete] = useState<{id: string, name: string} | null>(null);

    useEffect(() => {
        // fetchCategoryLessons()
    }, [])

    // async function fetchCategoryLessons() {
    //     try {
    //         setLoading(true);
    //         // Get category details
    //         // const snapshot = await firestore()
    //         //     .collection('categories')
    //         //     .doc(id)
    //         //     .get();
    //         // setCategory(snapshot.data() as Category);

    //         // Get lessons for this category
    //         const lessonsSnapshot = await firestore()
    //             .collection('categories')
    //             .doc(id)
    //             .collection('lessons')
    //             .orderBy('index')
    //             .get();

    //         // Map the lessons data and include the document ID
    //         setLessons(lessonsSnapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ...doc.data()
    //         })) as Lesson[]);
    //     } catch (error) {
    //         console.error('Error fetching category and lessons:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // Navigate to lesson detail page
    const handleLessonPress = (lessonId: string) => {
        router.push(`/lesson/${lessonId}`);
    };
    
    // Handle delete button press
    function handleDeletePress(lessonId: string) {
        const lessonToRemove = lessons?.find((lesson: Lesson) => lesson.id === lessonId);
        if (lessonToRemove) {
            setLessonToDelete({
                id: lessonToRemove.id,
                name: lessonToRemove.name
            });
            setShowDeleteModal(true);
        }
    }
    
    // Handle cancel delete
    function handleCancelDelete() {
        setShowDeleteModal(false);
        setLessonToDelete(null);
    }
    
    // Handle confirm delete
    async function handleConfirmDelete() {
        if (!lessonToDelete || isDeleting) return;
        
        setIsDeleting(true);
        try {
            const result = await deleteLesson(lessonToDelete.id);
            if (result.status === 'success') {
                if (lessons) {
                    const updatedLessons = lessons.filter((lesson: Lesson) => lesson.id !== lessonToDelete.id);
                    dispatch({ type: SET_CATEGORY_LESSONS, lessons: updatedLessons });
                }
            } else {
                console.error('Failed to delete lesson');
            }
        } catch (error) {
            console.error('Error deleting lesson:', error);
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
            setLessonToDelete(null);
        }
    }

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState message={error || "אירעה שגיאה בטעינת השיעורים"} />;
    }

    return (
        <View className="flex-1 bg-white py-16">
            <Stack.Screen options={{ headerShown: false }} />
            <EditButton isEdit={isEdit} onPress={() => setIsEdit(!isEdit)}/>
            <PageContainer
                title={category?.name || 'שם הקטגוריה'}
                description={category?.description}
                paddingBottom={40}
                plusBtnAction={() => router.push('/admin/form?isEdit=false&type=lesson')}
            >
                <View style={{ width: '100%', flex: 1 }}>
                    {lessons && lessons.length > 0 ? (
                        <FlatList
                            data={lessons}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <SectionPreview
                                    id={item.id}
                                    imgUrl={item.imgUrl}
                                    title={item.name}
                                    onPress={() => isEdit ? router.push(`/admin/form?isEdit=true&type=lesson&id=${item.id}`) : handleLessonPress(item.id)}
                                    isEdit={isEdit}
                                    onDelete={handleDeletePress}
                                    isLesson={true}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ gap: 20, paddingBottom: 60 }}
                        />
                    ) : (
                        <ErrorState message="לא נמצאו שיעורים בקטגוריה זו" />
                    )}
                </View>
            </PageContainer>
            
            {/* Confirmation Modal */}
            <ConfirmationModal
                visible={showDeleteModal}
                title="מחיקת שיעור"
                message={lessonToDelete ? `אתה בטוח שאתה רוצה להסיר את "${lessonToDelete.name}"? לא יהיה ניתן להחזיר את השיעור לאחר ההסרה` : "האם אתה בטוח שאתה רוצה להסיר את השיעור זה? לא יהיה ניתן להחזיר את השיעור לאחר המחיקה"}
                confirmText="הסר"
                isLoading={isDeleting}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </View>
    )
}
