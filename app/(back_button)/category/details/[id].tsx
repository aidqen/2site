import { useLocalSearchParams } from "expo-router";

export default function CategoryDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <></>
    )
}
