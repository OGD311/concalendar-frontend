import ConventionCard from "@/components/conventions/ConventionCard";
import { CONVENTION } from "@/constants/interfaces";
import { getAllConventions } from "@/lib/dbFunctions";
import { remoteSync } from "@/lib/sync";
import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [conventions, setConventions] = useState<CONVENTION[]>([]);


  async function loadConventions() {
    try {
      setLoading(true);
      setConventions(await getAllConventions());
      setError(false);
    } catch(e) {
      setError(true);
      console.log(e);
    } finally {
      setLoading(false)
    }
    
  }

  async function reLoadConventions() {
    await remoteSync().then(
      loadConventions
    );
  }

  useEffect(() => {
    loadConventions()
  }, []);
  
  return (
    <View className="items-center justify-center flex-1 bg-gray-100">
      <Text className="text-xl font-bold text-blue-500">Test with NativeWind!</Text>
      <Text className="mt-4 text-gray-600">This should be styled with Tailwind CSS</Text>
      <Button
        onPressIn={async () => {
          await reLoadConventions();
        }}
      >
        Update
      </Button>

      {loading && <Text>Loading</Text>}
      {!loading && error && <Text>Error</Text>}
      {!loading && !error && conventions.length === 0 && <Text>No Conventions</Text>}
      {!loading && !error && conventions.length > 0 && (
        <View className="items-center w-full mt-4">
          {conventions.map((convention) => (
            <ConventionCard key={convention.id} convention={convention}/>
          ))}
        </View>
      )}

    </View>
  );
}
