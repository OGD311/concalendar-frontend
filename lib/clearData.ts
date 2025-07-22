import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDb } from "./db";

export default async function clearData() {
    
    await AsyncStorage.clear();
    try {
        const db = await getDb();

        await db.getFirstAsync(
            `DELETE FROM conventions;`
        );

    } catch (error) {
        console.error("Database delete failed: ", error);
    }
}