/**
 * Constants（コンスタンツ）要はコンストファイルだぞ★
 * 
 */
import { House, ListChecks, User } from "lucide-react";


export const SITE_INFO = {
  NAME: "HappyHalloweenPumpkinStar",
  DESCRIPTION: "HHPSへようこそ！",
  MESSAGE: "作りたいものがつくれるエンジニアへ！",
  TODO: {
    NAME: "Todo",
    DESCRIPTION: "Todo一覧。",
    MESSAGE: "作りたいものがつくれるエンジニアへ！",
  }
};

export const CONTENTS = {
  "HOME": { name: "Home", href: "/", label: House },
  "TODO": { name: "Todo", href: "/todos?isValid=true" , label: ListChecks },
  "PROFILE":  { name: 'Profile' , href: "/profile" , label: User },
  // "GAME": { name: 'Game', href: "/todos" },
  // "PET":  { name: 'Pet' , href: "/todos" },
} as const;

export const INITIALSTATE = { error: null, success: false, messege: "" };

