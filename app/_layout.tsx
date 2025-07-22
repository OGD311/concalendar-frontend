import InitDb from "@/lib/initDb";
import { remoteSync } from "@/lib/sync";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";

export default function RootLayout() {
  useEffect(() => {
    async function initialiseApp() {
      const didSync = await remoteSync();
      console.log(didSync ? 'Data synced' : 'No sync needed'); 
      await InitDb();
    }

    initialiseApp();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
