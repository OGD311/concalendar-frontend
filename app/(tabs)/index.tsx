import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  
  return (
    <View className="items-center justify-center flex-1 bg-gray-100">
      <Text className="text-xl font-bold text-blue-500">Test with NativeWind!</Text>
      <Text className="mt-4 text-gray-600">This should be styled with Tailwind CSS</Text>
    </View>
  );
}
