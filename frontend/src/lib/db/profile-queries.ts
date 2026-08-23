import { db } from "@/db";
import { ProfileSchema, ApiResponse } from '../definitions';
import { profileTable } from '@/db/schema/profile';

import { apiResponse } from './response';

export async function fetchProfile(): Promise<ApiResponse<ProfileSchema>> {
    try {
        const data = await db.select().from(profileTable);
        console.log("data")

        console.log(data)
        return apiResponse.success(data[0] as ProfileSchema);
    } catch (error) {
        console.error('Database Error:', error);
        return apiResponse.error('Database Error:' + error)
    }
}
