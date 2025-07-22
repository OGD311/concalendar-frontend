import { getDb } from "./db";

export default async function InitDb() {
    try {
        const db = await getDb();

        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS conventions (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL
            );
        `);
    } catch (error) {
        console.error("Database initialization failed:", error);
    }
}