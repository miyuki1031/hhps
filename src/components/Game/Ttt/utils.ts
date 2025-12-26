import { SquareValue } from './types'


/**
 * CalculateWinner 勝利判定
 * squares マップ情報を保持
 * 「その関数がReactの『状態（State）』に依存していない独立した計算機だから」
 */
export const CalculateWinner = (squares: SquareValue[]) => {
    // 勝ちパターンのマス目情報
    // 例えば0，1，2の絵柄がそろえればそろえたほうの勝ち
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];



    for (let target of lines) {
        const [a, b, c] = target;

        if (
            squares[a] && // まず、マス a に何かが置かれているか？
            squares[a] === squares[b] && // a と b は同じマークか？
            squares[a] === squares[c] // a と c も同じマークか？
        ) {
            return squares[a];
        }
    }

    return null;
};
