import { CONVENTION } from "@/constants/interfaces";
import { getConvention } from "@/lib/dbFunctions";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Convention() {
  const params = useLocalSearchParams();
  const conventionParam = params.convention;
  const conventionName = Array.isArray(conventionParam) ? conventionParam[0] : conventionParam;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [convention, setConvention] = useState<CONVENTION | null>();
  
  useEffect(() => {

    async function loadConvention(conventionName: string) {
      try {
        setLoading(true);
        setConvention(await getConvention(conventionName));
        setError(false);
      } catch(e) {
        setError(true);
        console.log(e);
      } finally {
        setLoading(false)
      }

    }

    loadConvention(conventionName);

  }, [conventionName])
 
  
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
      
      {loading && <Text>Loading</Text>}
      {!loading && error && <Text>Error</Text>}
      {!loading && !error && convention === null && <Text>Convention Not Found</Text>}
      {!loading && !error && convention && (
        <View className="items-center w-full mt-4">
          <Text>
            {convention.id} {convention.name}
            
          </Text>
        </View>
      )}
    </View>
    </>
  );
}
