import { CONTENTS } from "../src/lib/constants"


export type ContentId = typeof CONTENTS[keyof typeof CONTENTS];
export type ContentKey = keyof typeof CONTENTS;

// payload（データ）の形を定義
export interface UpdatePayload {
    // id: number;
    // userId: string | null;
    completed?: boolean;
    title?: string;
    category?: string;
    priority?: number;
    explanation?: string;
    progressRate?: number;
    targetDate?: Date | string | null;// Serverでは日付、ブラウザからは文字列、空入力はnull
};


/**
 type: 新しい型の名前を決めます。
keyof: 型から「キー（名前）」だけを盗みます。
typeof: 変数（値）から「型」をコピーします。
CONTENTS: 元になる実体（変数）です。


// 1. まずキーの型を作る（さっきのやつ）
type ContentKey = keyof typeof CONTENTS; 

// 2. そのキーを使って、中身の型を取り出す
type ContentValue = (typeof CONTENTS)[ContentKey];
 */