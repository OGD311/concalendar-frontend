import { CONVENTION } from "@/constants/interfaces";
import { getDb } from "./db";

export async function getAllFavourites(): Promise<CONVENTION[]> {
    try {
        const db = await getDb();

        const result = await db.getAllAsync(`
            SELECT conventions.*
            FROM conventions 
            INNER JOIN favourites ON conventions.id = favourites.convention_id
            ORDER BY conventions.start_date DESC;    
        `);

        return result as CONVENTION[];
    } catch (error) {
        console.error("Database fetch failed: ", error);
        return [];
    }
}


export async function addFavourite(id: number) {
    try {
        const db = await getDb();

        await db.runAsync(`
            INSERT INTO favourites (convention_id)
            VALUES (?);
        `, [id])
    } catch (error) {
        console.error("Database insert failed: ", error);
    }
}

export async function removeFavourite(id: number) {
    try {
        const db = await getDb();

        await db.runAsync(`
            DELETE FROM favourites WHERE convention_id = ?;
        `, [id])
    } catch (error) {
        console.error("Database insert failed: ", error);
    }
}
