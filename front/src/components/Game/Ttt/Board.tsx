"use client";

import { PropsBoard } from "./types";
import { CalculateWinner } from "./utils";

import Square from "./Square";

export default function Board({
    xIsNext,
    squares,
    onPlay,
}: Readonly<PropsBoard>) {
    if (!squares) {
        return <div>読み込み中...またはデータが届いていません</div>;
    }
    const handleClick = (i: number) => {
        // squaresに各マス目の押した情報が入っている
        const nextSquares = squares.slice();
        // ターゲットがnullじゃない場合、また勝負がついたらここまで
        if (
            squares === undefined ||
            nextSquares[i] !== null ||
            CalculateWinner(squares)
        ) {
            return;
        }
        // マス目に今の順番をセット
        nextSquares[i] = xIsNext ? "X" : "O";

        onPlay(nextSquares);
    };

    const winner = CalculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div>{status}</div>
            <div className="board-row">
                <Square
                    value={squares[0]}
                    onSquareClick={() => handleClick(0)}
                />
                <Square
                    value={squares[1]}
                    onSquareClick={() => handleClick(1)}
                />
                <Square
                    value={squares[2]}
                    onSquareClick={() => handleClick(2)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={squares[3]}
                    onSquareClick={() => handleClick(3)}
                />
                <Square
                    value={squares[4]}
                    onSquareClick={() => handleClick(4)}
                />
                <Square
                    value={squares[5]}
                    onSquareClick={() => handleClick(5)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={squares[6]}
                    onSquareClick={() => handleClick(6)}
                />
                <Square
                    value={squares[7]}
                    onSquareClick={() => handleClick(7)}
                />
                <Square
                    value={squares[8]}
                    onSquareClick={() => handleClick(8)}
                />
            </div>
        </>
    );
}
