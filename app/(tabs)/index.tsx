import ConventionCard from "@/components/conventions/ConventionCard";
import Loader from "@/components/loader";
import { CONVENTION } from "@/constants/interfaces";
import { getAllConventions } from "@/lib/dbFunctions";
import { addFavourite, removeFavourite } from "@/lib/favourites";
import { remoteSync } from "@/lib/sync";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [conventions, setConventions] = useState<CONVENTION[]>([]);
  const [refreshing, setRefreshing] = useState(false);

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
    setRefreshing(true);
    await remoteSync().then(() => {
      loadConventions();
      setRefreshing(false);
    });
  }

  useEffect(() => {
    loadConventions()
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadConventions();
    }, [])
  );


  const toggleFavourite = async (id: number, isFavourite: boolean) => {
    if (isFavourite) {
      await removeFavourite(id);
    } else {
      await addFavourite(id);
    }

    setConventions(prev =>
      prev.map(c =>
        c.id === id ? { ...c, is_favourite: !isFavourite } : c
      )
    );
  };
  
  return (
    <View 
      className="flex flex-col justify-center h-full text-center" 
    >
      <View className="h-16 bg-white" />
      <ScrollView
        className="w-full"
        contentContainerClassName="flex flex-grow justify-center items-center"
        refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={reLoadConventions} />
        }
      >
        {loading && <Loader />}
        {!loading && error && <Text>Error</Text>}

        {!loading && !error && conventions.length === 0 && <Text>No Conventions</Text>}
        {!loading && !error && conventions.length > 0 && (
          <>
            {conventions.map((convention) => (
              <ConventionCard key={convention.id} convention={convention} onToggleFavourite={toggleFavourite}/>
            ))}
          </>
        )}

      </ScrollView>
    </View>
  );
}
