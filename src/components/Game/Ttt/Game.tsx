"use client";

import "./style.css";
import { SquareValue } from "./types";

import { useState } from "react";

import Board from "./Board";

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([new Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);

    const currentSquares = history[currentMove];

    /** 次に進む */
    const handlePlay = (nextSquares: SquareValue[]) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    };
    /** 履歴を戻る */
    const jumpTo = (nextMove: number) => {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    };
    /** 全削除 */
    const reset = () => {
        setHistory([new Array(9).fill(null)]);
        setCurrentMove(0);
    };

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = "Go to move #" + move;
        } else {
            description = "Go to game start";
        }
        return (
            <li key={move}>
                <button className="btn" onClick={() => jumpTo(move)}>
                    {description}
                </button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <button className="btn" onClick={reset}>
                    Reset
                </button>
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
