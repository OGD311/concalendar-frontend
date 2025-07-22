import ConventionCard from "@/components/conventions/ConventionCard";
import Loader from "@/components/loader";
import { CONVENTION } from "@/constants/interfaces";
import { addFavourite, getAllFavourites, removeFavourite } from "@/lib/favourites";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Bookmarks() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [conventions, setConventions] = useState<CONVENTION[]>([]);

  async function loadFavourites() {
    try {
      setLoading(true);
      setConventions(await getAllFavourites());
      setError(false);
    } catch(e) {
      setError(true);
      console.log(e);
    } finally {
      setLoading(false)
    }
    
  }

  useEffect(() => {
    loadFavourites()
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavourites();
    }, [])
  );


  const toggleFavourite = async (id: number, isFavourite: boolean) => {
    if (isFavourite) {
      await removeFavourite(id);
    } else {
      await addFavourite(id);
    }

    await loadFavourites();
  };
  
  return (
    <View 
      className="flex flex-col justify-center h-full text-center" 
    >
      <View className="h-16 bg-white" />
      <ScrollView
        className="w-full"
        contentContainerClassName="flex flex-grow justify-center items-center"
      >
        {loading && <Loader />}
        {!loading && error && <Text>Error</Text>}

        {!loading && !error && conventions.length === 0 && <Text>No bookmarks yet!</Text>}
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
