import { CONVENTION } from "@/constants/interfaces";
import { getDb } from "./db";

export async function insertConvention({ convention } : { convention: CONVENTION }) {
    console.log(convention.name)
    try {
        const db = await getDb();

        await db.runAsync(
            `INSERT INTO conventions (name)
            VALUES (?)
            ON CONFLICT(name) DO NOTHING;`,
            [convention.name]
        );
    } catch (error) {
        console.error("Database upsert failed: ", error);
    }
}

export async function getAllConventions(): Promise<CONVENTION[]> {
    try {
        const db = await getDb();

        const result = await db.getAllAsync('SELECT * FROM conventions');

        return result as CONVENTION[];
    } catch (error) {
        console.error("Database fetch failed: ", error);
        return [];
    }
}