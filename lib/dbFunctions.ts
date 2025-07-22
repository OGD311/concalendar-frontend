import { CONVENTION } from "@/constants/interfaces";
import { getDb } from "./db";

export async function insertConvention({ convention } : { convention: CONVENTION }) {
    console.log(convention.name, convention.active)
    try {
        const db = await getDb();

        await db.runAsync(
            `INSERT INTO conventions (
                name,
                description,
                date_start,
                date_end,
                location,
                venue,
                website_url,
                attendee_count,
                active,
                created_at,
                updated_at,
                latitude,
                longitude
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?)
            ON CONFLICT(name) DO UPDATE SET
                description = excluded.description,
                date_start = excluded.date_start,
                date_end = excluded.date_end,
                location = excluded.location,
                venue = excluded.venue,
                website_url = excluded.website_url,
                attendee_count = excluded.attendee_count,
                active = excluded.active,
                updated_at = CURRENT_TIMESTAMP,
                latitude = excluded.latitude,
                longitude = excluded.longitude;`,
            [
                convention.name,
                convention.description ?? null,
                convention.date_start,
                convention.date_end,
                convention.location,
                convention.venue ?? null,
                convention.website_url,
                convention.attendee_count ?? null,
                convention.active ? 1 : 0,
                convention.latitude ?? null,
                convention.longitude ?? null
            ]
        );

    } catch (error) {
        console.error("Database upsert failed: ", error);
    }
}

export async function getAllConventions(): Promise<CONVENTION[]> {
    try {
        const db = await getDb();

        const result = await db.getAllAsync('SELECT * FROM conventions WHERE active = 1 ORDER BY date_start DESC');

        return result as CONVENTION[];
    } catch (error) {
        console.error("Database fetch failed: ", error);
        return [];
    }
}

export async function getConvention(name: string): Promise<CONVENTION | null> {
    try {
        const db = await getDb();

        const result = await db.getFirstAsync(
            'SELECT * FROM conventions WHERE name = ?',
            [name]
        );

        return result as CONVENTION;
    } catch (error) {
        console.error("Database fetch failed: ", error);
        return null;
    }
}