import { Computer, TreePalm, Package} from "lucide-react";
/**
 * Todo用共有設定
*/
export const TODO_CATEGORY = {
    "WORK": { category: "WORK", text: "仕事", color: "badge-primary", label: Computer },
    "PRIVATE": { category: "PRIVATE", text: "プライベート", color: "badge-secondary", label: TreePalm },
    "OTHER": { category: "OTHER", text: "その他", color: "badge-secondary", label: Package },
} as const;

export const TODO_PRIORITY = {
  0: { text: "低", },
  1: { text: "中", },
  2: { text: "高", },
} as const;



