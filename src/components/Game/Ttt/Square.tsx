"use client";

import { PropsSquare } from "./types";

export default function Square({
    value,
    onSquareClick,
}: Readonly<PropsSquare>) {
    // 表示ラベル取得用辞書(nullはキーにできない)
    const labels = {
        X: "×",
        O: "〇",
    };

    return (
        <button className="square" onClick={onSquareClick}>
            {value ? labels[value] : ""}
        </button>
    );
}
