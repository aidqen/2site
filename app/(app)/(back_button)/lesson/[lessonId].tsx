import { EditButton } from "@/components/EditButton";
import { colors } from "@/constants/styles";
import { useUser } from "@/hooks/useUser";
import { fetchLessonById, getStorageDownloadUrl } from "@/services/lesson.service";
import { addLessonToFavorites, removeLessonFromFavorites } from "@/services/user.service";
import { FavoriteLesson, Lesson } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import CastContext, { CastButton, CastState, useCastSession, useCastState, useRemoteMediaClient } from "react-native-google-cast";
import Video, { VideoRef } from "react-native-video";
import { useSelector } from "react-redux";

export default function LessonPage() {
    const router = useRouter()
    const client = useRemoteMediaClient();
    const session = useCastSession()
    const castState = useCastState()
    console.log("🚀 ~ LessonPage ~ client:", client)

    const { lessonId } = useLocalSearchParams();
    const videoRef = useRef<VideoRef>(null)

    const { user, refreshUserData } = useUser()
    const category = useSelector((state: any) => state.selectedCategory)
    const categoryLessons = useSelector((state: any) => state.categoryLessons)
    console.log("🚀 ~ file: [lessonId].tsx:25 ~ categoryLessons:", categoryLessons)
    const [lesson, setLesson] = useState<Lesson | null>(null)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
    const [mediaState, setMediaState] = useState({
        videoUri: '',
        imageUri: '',
        isPaused: true,
        initialPlay: false,
        loading: true
    });
    const [index, setIndex] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [loading, setLoading] = useState(true)
    const castButtonRef = useRef(null)

    useEffect(() => {
        play()
    }, [client])

    const play = async () => {
        if (castState === CastState.CONNECTED && client && lesson && lesson.videoUrl) {
          await client.loadMedia({
            mediaInfo: {
              contentUrl: lesson.videoUrl,
              contentType: 'video/mp4',
            //   metadata: { title: 'My Video' },
            },
            autoplay: true,
          })
        }
      }
    

    useEffect(() => {
        if (Number(index) < Number(categoryLessons.length)) {
            setNextBtnEnabled(true)
        } else {
            setNextBtnEnabled(false)
        }
    }, [categoryLessons, index])


    // Use useFocusEffect to refresh data when navigating back to this screen
    useFocusEffect(
        useCallback(() => {
            fetchLesson();
            isLessonFavorite();

            // No cleanup function needed
            return () => { };
        }, [category, lessonId, categoryLessons])
    );



    useEffect(() => {
        if (lesson) {
            if (lesson.videoUrl) {
                getStorageDownloadUrl(lesson.videoUrl)
                    .then((url: string) => changeMediaState('videoUri', url))
                    .catch(console.error)
                    .finally(() => setLoading(false));
            } else {
                setLoading(false);
            }

            if (lesson.imgUrl) {
                getStorageDownloadUrl(lesson.imgUrl)
                    .then((url: string) => changeMediaState('imageUri', url))
                    .catch(console.error);
            }
        }
    }, [lesson]);


    function changeMediaState(key: string, value: boolean | string) {
        setMediaState(prev => ({ ...prev, [key]: value }));
    }
    const castToTV = async () => {
        const shown = await CastContext.showCastDialog()
        console.log("🚀 ~ castToTV ~ shown:", shown)

    };

    function isLessonFavorite() {
        const favoriteLessons = user?.favoriteLessons
        if (favoriteLessons && favoriteLessons?.length > 0) {
            console.log("🚀 ~ isLessonFavorite ~ lessonId:", lessonId)
            const isLessonFavorite = favoriteLessons?.some((favLesson: FavoriteLesson) => {
                console.log("🚀 ~ isLessonFavorite ~ favLesson.id:", favLesson.id)
                return favLesson.id === lessonId
            })
            setIsFavorite(isLessonFavorite)
        }
    }
    async function fetchLesson() {
        try {
            if (category?.id && lessonId) {
                const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;

                const lesson = categoryLessons?.find((lesson: Lesson) => lesson.id === lessonIdString);
                if (lesson) {
                    setLesson(lesson);
                    setIndex(lesson.index)
                } else {
                    const lessonData = await fetchLessonById(lessonIdString);
                    if (lessonData) {
                        setLesson(lessonData);
                        setIndex(lessonData.index)
                    } else {
                        Alert.alert('No lesson found')
                        router.back()
                    }
                }
            }
        } catch (err) {
            console.error("Error fetching lesson:", err);
            setLesson(null);
        } finally {
            setLoading(false);
        }
    }


    function handlePlayPause() {
        if (!mediaState.initialPlay) {
            changeMediaState('initialPlay', true)
        }
        changeMediaState('isPaused', !mediaState.isPaused);
    };

    function navigateToNextLesson() {
        const currentIndex = Number(Array.isArray(index) ? index[0] : index);
        const nextIndex = currentIndex + 1;

        const nextLesson = categoryLessons?.find((lesson: Lesson) => lesson.index === nextIndex);

        if (nextLesson) {
            router.push({ pathname: `/lesson/[lessonId]`, params: { lessonId: nextLesson.id } });
        }
    }

    async function onAddToFavoriteLessons() {
        if (lesson && user?.uid) {
            const { lesson: favoriteLesson, status } = await addLessonToFavorites(user?.uid, lesson)
            if (status === 'error') {
                return Alert.alert('אירעה תקלה, נסה שוב מאוחר יותר')
            }
            if (status === 'success') {
                setIsFavorite(true)
                refreshUserData()
            }
        }
    }

    async function onRemoveFromFavoriteLessons() {
        if (isFavorite && lesson && user?.uid) {
            const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;
            const { status } = await removeLessonFromFavorites(user.uid, lessonIdString)
            if (status === 'success') {
                setIsFavorite(false)
                refreshUserData()
            } else {
                Alert.alert('An error occured')
            }
        }
    }

    function navigateToEditLesson() {
        router.push(`/admin/form?type=lesson&isEdit=true&id=${lesson?.id}&categoryId=${category?.id}`)
    }


    return (
        <View className="flex-1 justify-between bg-white py-16 px-4">
            <EditButton onPress={navigateToEditLesson} />
            <View className="w-full items-center ">
                <Text className="text-2xl font-bold text-center rtl:text-right" style={{ color: colors.primaryDarker }}>
                    {category?.name}
                </Text>
            </View>

            <View className="mb-6">
                <View className="relative rounded-lg overflow-hidden">
                    <Video
                        ref={videoRef}
                        source={{ uri: mediaState.videoUri }}
                        className="w-full h-56 rounded-lg"
                        style={{ width: '100%', height: 246 }} // 56 tailwind units = 224px
                        resizeMode="cover"
                        paused={mediaState.isPaused}
                        // onLoad={() => console.log('Video loaded')}
                        onError={(error) => console.error('Video error:', error)}
                        repeat={false}
                        controls={!mediaState.initialPlay ? false : true}
                        playInBackground
                    />
                    {mediaState.isPaused && (
                        <TouchableOpacity
                            className="absolute inset-0 items-center justify-center"
                            onPress={handlePlayPause}
                        >
                            <Image source={{ uri: mediaState.imageUri }} className="w-full h-full rounded-lg" />
                            <View className="absolute w-16 h-16 rounded-full bg-white/30 items-center justify-center"
                                style={{ backgroundColor: colors.primaryDarker }}>
                                <Ionicons name="play" size={36} color="white" />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View className="w-full items-center gap-2">
                    <Text className="text-2xl font-bold mt-4 text-center">
                        {lesson?.name}
                    </Text>
                    <Text className="text-xl ">
                        {lesson?.description}
                    </Text>
                </View>
            </View>

            <View className="mt-10 mb-[25%] px-5 gap-2">
                    <CastButton />
                <TouchableOpacity
                    className="rounded-md py-3 mb-3"
                    style={{ backgroundColor: colors.primaryDarker }}
                    activeOpacity={0.8}
                    onPress={castToTV}
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
                    style={{ backgroundColor: isFavorite ? colors.primaryRed : colors.secondary }}
                    activeOpacity={0.8}
                    onPress={isFavorite ? onRemoveFromFavoriteLessons : onAddToFavoriteLessons}
                >
                    <Text
                        className="text-white text-center font-bold text-[23px]"
                        style={{ fontFamily: "IBMPlexSansHebrew-SemiBold" }}
                    >
                        {isFavorite ? 'הסרה מהמועדפים' : 'הוספה למועדפים'}
                    </Text>
                </TouchableOpacity>
            </View>

            {nextBtnEnabled && <TouchableOpacity
                className="absolute bottom-16 left-1/2 -translate-x-1/2 items-center mb-6 flex-row justify-center"
                onPress={navigateToNextLesson}
            >
                <Ionicons name="chevron-back" size={20} color={'#576697'} />
                <Text className="font-extrabold text-2xl" style={{ color: '#576697' }}>הבא </Text>
            </TouchableOpacity>}
        </View>
    );
}
