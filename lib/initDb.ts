import { getDb } from "./db";

export default async function InitDb() {
    try {
        const db = await getDb();
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS conventions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                description TEXT,

                date_start TEXT,
                date_end TEXT,
                location TEXT,
                venue TEXT,

                website_url TEXT,
                attendee_count INTEGER,

                active INTEGER DEFAULT 1,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

                latitude REAL,
                longitude REAL
            );

            CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_name ON conventions(name);
        
        
            CREATE TABLE IF NOT EXISTS favourites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                convention_id INTEGER NOT NULL,
                FOREIGN KEY (convention_id) REFERENCES conventions(id) ON DELETE CASCADE
            );
        `);

        console.log("DB done")
    } catch (error) {
        console.error("Database initialization failed:", error);
    }
}