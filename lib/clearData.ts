import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDb } from "./db";
import InitDb from "./initDb";

export default async function clearData() {
  await AsyncStorage.clear();

  try {
    const db = await getDb();

    await db.runAsync(`DROP TABLE IF EXISTS conventions`);
    await db.runAsync(`DROP TABLE IF EXISTS favourites`);

  } catch (error) {
    console.error("Database delete failed: ", error);
  }

  await InitDb();
}
