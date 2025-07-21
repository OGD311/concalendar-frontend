import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Convention() {
  const params = useLocalSearchParams();
  const conventionName = params.convention;
  
  return (
    <>
    <Stack.Screen options={{ headerTitle: conventionName as string }} />
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      >
      <Text>{conventionName}</Text>
    </View>
    </>
  );
}
