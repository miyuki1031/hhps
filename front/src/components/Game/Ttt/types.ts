
export type SquareValue = "X" | "O" | null;

// export type TargetNo = number;
// エラー→Remove this redundant type alias and replace its occurrences with "number".
// こういうのは冗長的だから直接指定しろ！ってことらしい。ないと怒るけど切り出すと文句を言ってくる


export type PropsBoard = {
    xIsNext: boolean
    squares: SquareValue[]
    onPlay : (nextSquares: SquareValue[]) => void
}

export type PropsSquare = {
    value: "X" | "O" | null; // より厳格に3パタンだけに
    onSquareClick: () => void; // 親からクリックイベント時に発行するイベんンと指定
};