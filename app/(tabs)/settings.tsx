import clearData from "@/lib/clearData";
import { Button } from "@react-navigation/elements";
import { View } from "react-native";

export default function Settings() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onPressIn={async () => {await clearData()}}>Reset App Data</Button>
    </View>
  );
}
