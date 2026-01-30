"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SelectBase } from "@/components/Select/SelectBase";

export const Filters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const isValidValue = searchParams.get("isValid") ?? "null";
    const completedValue = searchParams.get("completed") ?? "null";

    const updateFilter = (itemName: string, value: string) => {
        // 1. 現在のパラメータをコピー
        const params = new URLSearchParams(searchParams.toString());
        // 2. 値があればセット、なければ削除（「なし」を選んだ時用）
        if (value !== null && value !== "null") {
            params.set(itemName, value);
        } else {
            params.delete(itemName);
        }
        // 3. 新しいURLへGO！
        router.push(`?${params.toString()}`);
    };
    return (
        <div className="flex items-center gap-4 py-2">
            <div className="text-sm font-bold text-gray-700">削除：</div>
            <SelectBase
                list={[
                    { label: "フィルターなし", value: "null" },
                    { label: "削除", value: "false" },
                    { label: "削除以外", value: "true" },
                ]}
                value={isValidValue}
                classWidth="w-32"
                onChange={(val) => updateFilter("isValid", val)}
            ></SelectBase>

            <div className="text-sm font-bold text-gray-700">完了：</div>
            <SelectBase
                list={[
                    { label: "フィルターなし", value: "null" },
                    { label: "未完了", value: "false" },
                    { label: "完了", value: "true" },
                ]}
                value={completedValue}
                classWidth="w-32"
                onChange={(val) => updateFilter("completed", val)}
            ></SelectBase>
        </div>
    );
};
