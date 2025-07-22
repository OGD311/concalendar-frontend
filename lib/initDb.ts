import { getDb } from "./db";

export default async function InitDb() {
    try {
        const db = await getDb();

        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS conventions (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL UNIQUE
            );

            CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_name ON conventions(name);
        `);
    } catch (error) {
        console.error("Database initialization failed:", error);
    }
}