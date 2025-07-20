import { CONVENTION } from "@/constants/interfaces";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function ConventionCard({ convention } : { convention: CONVENTION}) {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.navigate(`${convention.name}`)}>
            <Text>
                {convention.name}
            </Text>
        </TouchableOpacity>
    )
}