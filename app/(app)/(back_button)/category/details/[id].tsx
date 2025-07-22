import { EditButton } from '@/components/EditButton';
import { PageContainer } from '@/components/PageContainer';
import { SectionPreview } from '@/components/SectionPreview';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function CategoryDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const category = useSelector((state: any) => state.selectedCategory)
    const lessons = useSelector((state:any) => state.categoryLessons)
    const [isEdit, setIsEdit] = useState(false)
    // const [category, setCategory] = useState<Category | null>(null);
    // const [lessons, setLessons] = useState<Lesson[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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

    return (
        <View className="flex-1 bg-white py-16">
            <EditButton isEdit={isEdit} onPress={() => setIsEdit(!isEdit)}/>
            <PageContainer
                title={category?.name || 'שם הקטגוריה'}
                description={category?.description}
                paddingBottom={20}
                plusBtnAction={() => router.push('/admin/form?isEdit=false&type=lesson')}
            >
                <View style={{ width: '100%' }}>
                    {lessons && lessons.length > 0 && (
                        <FlatList
                            data={lessons}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <SectionPreview
                                    id={item.id}
                                    imgUrl={item.imgUrl}
                                    title={item.name}
                                    onPress={() => handleLessonPress(item.id)}
                                    isLesson={true}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
                        />
                    )}
                </View>
            </PageContainer>
        </View>
    )
}
