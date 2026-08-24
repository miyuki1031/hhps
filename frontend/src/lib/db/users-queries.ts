'use server';
import { db } from "@/db";

import { auth } from "@/auth";

import { ApiResponse } from '../definitions';
// import { DEFAULT_CONFIG } from '../constants';
import { usersTable } from '@/db/schema/users';

import { eq } from 'drizzle-orm';
import { apiResponse } from './response';

type RoleData = {
    isGuest: boolean;
    isLoginMaster: boolean;
    isLoginUser: boolean;
};
/** 管理者・ユーザチェック */
export async function checkRoll(): Promise<
    ApiResponse<RoleData>
> {
    const session = await auth();
    const rolls: RoleData = {
        isGuest: true,
        isLoginMaster: false,
        isLoginUser: false,
    };
    if (!session?.user?.email) {
        return apiResponse.success(rolls);
    }

    const query = db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, session.user.email));
    try {
        const response = await query;
        rolls.isGuest = false;
        if (response.length !== 0) {
            // 管理者
            rolls.isLoginMaster = true;
        } else {
            rolls.isLoginUser = true;
        }
        return apiResponse.success(rolls);
    } catch (error) {
        console.error('Database Error:', error)
        return apiResponse.success(rolls);
    }
}