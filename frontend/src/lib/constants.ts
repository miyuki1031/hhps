/**
 * コンストファイル 
 * 
 */

import { House, ListTodo, Mail, NotebookPen, User } from 'lucide-react';
import { DefaultConfig } from '@/lib/definitions';
export const SITE_INFO = {
    STARTYEAR: 2026,
    NAME: 'HappyStarLaB',
    DESCRIPTION: 'こちらはHappyStarLaBです',
    MESSAGE: 'ようこそ。HappyStarLaBです。作りたいものがつくれるエンジニアへ',
    HS: 'はっぴーすたぁ'
};

export const CONTENTS = {
    /**  */
    HOME: {
        NAME: 'HOME',
        DESCRIPTION: 'TOPページ',
        INTRODUCTION: 'TOPページ。AI（Gemini）に作成してもらったTOP画像が目印です。',
        HREF: '/',
        LABEL: House,
        IS_MENU: true,
        IS_ENABLED: true
    },
    ABOUT: {
        NAME: 'ABOUT ME',
        DESCRIPTION: '自己紹介',
        INTRODUCTION: '自己紹介・職務経歴書・サイト構成。<br>職務経歴書→NextJsのServerActionにて作成<br>',
        HREF: '/about',
        LABEL: User,
        COLOR: 'pink',
        IS_MENU: true,
        IS_ENABLED: true
    },
    CONTACT: {
        NAME: 'CONTACT',
        DESCRIPTION: 'お問い合わせ',
        INTRODUCTION: 'お問い合わせはこちらからどうぞ！',
        HREF: '/contact',
        LABEL: Mail,
        COLOR: 'green',
        IS_MENU: true,
        IS_ENABLED: false
    },
    TODO: {
        NAME: 'TODO',
        DESCRIPTION: '開発予定TODOリスト',
        INTRODUCTION: 'NextJsのServerActionにて作成',
        HREF: '/todo',
        LABEL: ListTodo,
        COLOR: 'blue',
        IS_MENU: true,
        IS_ENABLED: true
    },
    NOTES: {
        NAME: 'NOTES',
        DESCRIPTION: '勉強メモ',
        INTRODUCTION: '汗と血と涙とよだれの結晶',
        HREF: '/notes',
        LABEL: NotebookPen,
        COLOR: 'orange',
        IS_MENU: true,
        IS_ENABLED: false
    },
};

export const DEFAULT_CONFIG: DefaultConfig = {
    RESUME_QUERIES: {
        order: 'desc',
        limit: 5,
        page: 'p'
    }
}
