
import {
    ProfileSchema
} from '../definitions';
import { profileTable } from '../../db/schema/profile';

// Make sure to install the 'pg' package 
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });

export async function fetchProfile(): Promise<ProfileSchema[]> {
    try {
        const data = await db.select().from(profileTable);
        return data as ProfileSchema[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch fetchProfile');
    }
}
