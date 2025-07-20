import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Convention() {
    const params = useLocalSearchParams();
    console.log(params)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{params.convention}</Text>
    </View>
  );
}
