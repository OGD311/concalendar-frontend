import { CONVENTION } from "@/constants/interfaces";
import { displayDates } from "@/utils/dates";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ConventionCard({ convention, onToggleFavourite } : { convention: CONVENTION, onToggleFavourite: (id: number, isFavourite: boolean) => void }) {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.navigate(`/${convention.name}`)}
            className="items-center w-11/12 h-56 p-4 mt-5 rounded-md bg-slate-300"
        >
            <Text className="text-xl">{convention.name}</Text>
            <Text className="text-md text-slate-700">{displayDates(convention.date_start, convention.date_end)}</Text>
            <Text className="w-4/5">
                {convention !== null && convention.description
                    ? convention.description.length >= 100
                        ? convention.description.substring(0, 100) + "..."
                        : convention.description
                    : ""}
            </Text>
                {convention.location ? 
                    <View className="flex flex-row items-center mt-auto mb-5">
                        <FontAwesome name="map-marker" color={""} size={18}/>
                        <Text className="ml-2 text-lg">
                            {convention.location}
                        </Text> 
                    </View>
                    : <></> 
                }
            <TouchableOpacity
                className="absolute right-5 top-3"
                onPress={() => onToggleFavourite(convention.id, convention.is_favourite)}
            >
                <FontAwesome
                    name={convention.is_favourite ? "bookmark" : "bookmark-o"}
                    size={32}
                    color={convention.is_favourite ? "goldenrod" : ""}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}