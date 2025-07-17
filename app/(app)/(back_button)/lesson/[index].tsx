import { colors } from "@/constants/styles";
import { Lesson } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Video, { VideoRef } from "react-native-video";
import { useSelector } from "react-redux";

export default function LessonPage() {
    const router = useRouter()
    const { index } = useLocalSearchParams();
    const category = useSelector((state: any) => state.selectedCategory)
    const categoryLessons = useSelector((state:any) => state.categoryLessons)
    console.log("🔍 ~ LessonPage ~ app/(app)/(back_button)/lesson/[index].tsx:16 ~ categoryLessons:", categoryLessons)
    console.log("🔍 ~ LessonPage ~ app/(app)/(back_button)/lesson/[index].tsx:12 ~ index:", index)
    const [videoUri, setVideoUri] = useState('')
    const [imageUri, setImageUri] = useState('')
    const [loading, setLoading] = useState(true)


    const [lesson, setLesson] = useState<Lesson | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isPaused, setIsPaused] = useState(true)
    const [isHover, setIsHover] = useState(false)
    const videoRef = useRef<VideoRef>(null)
    const [initialPlay, setInitialPlay] = useState(false)

    // const videoUrl = "yt1z.net - פילאטיס עם כיסא בשילוב כדור וגומייה עם ד״ר דפנה כספי (720p).mp4";
    // const imageUrl = '10 2.png'


    useEffect(() => {
        fetchLesson();
    }, [category, index]);

    useEffect(() => {
        if (lesson && lesson.videoUrl) {
            storage()
                .ref(lesson.videoUrl)
                .getDownloadURL()
                .then((url: string) => setVideoUri(url))
                .catch(console.error)
                .finally(() => setLoading(false));

            if (lesson.imgUrl) {
                storage()
                    .ref(lesson.imgUrl)
                    .getDownloadURL()
                    .then((url: string) => setImageUri(url))
                    .catch(console.error);
            }
        }
    }, [lesson]);

    async function fetchLesson() {
        try {

            if (category?.id && index) {
                const lessonToSave = await firestore()
                    .collection('categories')
                    .doc(category?.id)
                    .collection('lessons')
                    .where('index', '==', parseInt(index as string))
                    .limit(1)
                    .get()
                    .then((querySnapshot) => {
                        const doc = querySnapshot.docs[0];
                        if (!doc) {
                            console.error("No lesson found with the specified index");
                            return null;
                        }

                        const data = doc.data();
                        const lessonData: Lesson = {
                            id: doc.id,
                            name: data.name || '',
                            videoUrl: data.videoUrl || '',
                            imgUrl: data.imgUrl,
                            description: data.description,
                            index: data.index
                        };

                        setLesson(lessonData);
                        return lessonData;
                    })
                    .catch((error) => {
                        console.error("Error fetching lesson:", error);
                        return null;
                    })

                console.log("🔍 ~ LessonPage ~ app/(app)/(back_button)/lesson/[index].tsx:40 ~ lessonToSave:", lessonToSave);
            }
        } catch (err) {
            console.error("Error fetching lesson:", err);
        } finally {
            setLoading(false)
        }
    }


    function handlePlayPause() {
        if (!initialPlay) {
            setInitialPlay(true)
        }
        setIsPaused(!isPaused);
        setIsPlaying(!isPaused);
    };

    function navigateToNextLesson() {
        
        router.push({ pathname: `/lesson/[index]`, params: { index: (index as string) + 1 } })
    }

    return (
        <View className="flex-1 justify-between bg-white py-16 px-4">
            <View className="w-full items-center ">
                <Text className="text-2xl font-bold text-center rtl:text-right" style={{ color: colors.primaryDarker }}>
                    {category?.name}
                </Text>
            </View>

            <View className="mb-6">
                <View className="relative rounded-lg overflow-hidden">
                    <Video
                        ref={videoRef}
                        source={{ uri: videoUri }}
                        className="w-full h-56 rounded-lg"
                        style={{ width: '100%', height: 246 }} // 56 tailwind units = 224px
                        resizeMode="cover"
                        paused={isPaused}
                        onLoad={() => console.log('Video loaded')}
                        onError={(error) => console.error('Video error:', error)}
                        repeat={false}
                        controls={!initialPlay ? false : true}
                        playInBackground
                    />
                    {isPaused && (
                        <TouchableOpacity
                            className="absolute inset-0 items-center justify-center"
                            onPress={handlePlayPause}
                        >
                            <Image source={{ uri: imageUri }} className="w-full h-full rounded-lg" />
                            <View className="absolute w-16 h-16 rounded-full bg-white/30 items-center justify-center"
                                style={{ backgroundColor: colors.primaryDarker }}>
                                <Ionicons name="play" size={36} color="white" />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View className="w-full items-center">

                    <Text className="text-2xl font-bold mt-4 text-center">
                        {lesson?.name}
                    </Text>
                </View>
            </View>

            <View className="mt-10 px-5 gap-2">
                <TouchableOpacity
                    className="rounded-md py-3 mb-3"
                    style={{ backgroundColor: colors.primaryDarker }}
                    activeOpacity={0.8}
                >
                    <Text
                        className="text-white text-center font-bold text-[23px]"
                        style={{ fontFamily: "IBMPlexSansHebrew-SemiBold" }}
                    >
                        להקרנה במסך גדול
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="rounded-md py-3"
                    style={{ backgroundColor: colors.secondary }}
                    activeOpacity={0.8}
                >
                    <Text
                        className="text-white text-center font-bold text-[23px]"
                        style={{ fontFamily: "IBMPlexSansHebrew-SemiBold" }}
                    >
                        הוספה למועדפים
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity className="items-center mb-6 flex-row justify-center" onPress={navigateToNextLesson}>
                <Ionicons name="chevron-back" size={20} color={'#576697'} />
                <Text className="font-extrabold text-2xl" style={{ color: '#576697' }}>הבא </Text>
            </TouchableOpacity>
        </View>
    );
}
