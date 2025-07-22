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
                dateStart,
                dateEnd,
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
                dateStart = excluded.dateStart,
                dateEnd = excluded.dateEnd,
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
                convention.dateStart ?? null,
                convention.dateEnd ?? null,
                convention.location ?? null,
                convention.venue ?? null,
                convention.website_url ?? null,
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

        const result = await db.getAllAsync('SELECT * FROM conventions WHERE active = 1');

        return result as CONVENTION[];
    } catch (error) {
        console.error("Database fetch failed: ", error);
        return [];
    }
}