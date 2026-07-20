/**
 * コンストファイル 
 * 
 */

import { House, ListTodo, Mail, NotebookPen, User } from "lucide-react";

export const SITE_INFO = {
    STARTYEAR: 2026,
    NAME: "HappyStarLaB",
    DESCRIPTION: "こちらはHappyStarLaBです",
    MESSAGE: "ようこそ。HappyStarLaBです。作りたいものがつくれるエンジニアへ",
    HS: "はっぴーすたぁ"
};

export const CONTENTS = {
    /**  */
    HOME: {
        NAME: "HOME",
        DESCRIPTION: "TOPページ",
        HREF: "/",
        LABEL: House,
        IS_ENABLED: true
    },
    ABOUT: {
        NAME: "ABOUT ME",
        DESCRIPTION: "自己紹介",
        HREF: "/about",
        LABEL: User,
        COLOR: "pink",
        IS_ENABLED: true
    },
    CONTACT: {
        NAME: "CONTACT",
        DESCRIPTION: "お問い合わせ",
        HREF: "/contact",
        LABEL: Mail,
        COLOR: "green",
        IS_ENABLED: false
    },
    TODO: {
        NAME: "TODO",
        DESCRIPTION: "開発予定TODOリスト",
        HREF: "/todo",
        LABEL: ListTodo,
        COLOR: "blue",
        IS_ENABLED: false
    },
    NOTES: {
        NAME: "NOTES",
        DESCRIPTION: "勉強メモ",
        HREF: "/notes",
        LABEL: NotebookPen,
        COLOR: "orange",
        IS_ENABLED: false
    }

}