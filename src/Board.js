import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 2, ncols = 2, chanceLightStartsOn = 0.4 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    let i = 0;
    while (i < nrows) {
      let j = 0;
      let boardRow = [];
      while (j < ncols) {
        let rand = Math.floor(Math.random() * 10) + 1;
        if (rand > (chanceLightStartsOn * 10)) {
          boardRow.push(false);
        } else {
          boardRow.push(true);
        }
        j++;
      }
      initialBoard.push(boardRow);
      i++;
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === false) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
          if (y - 1 >= 0) boardCopy[y - 1][x] = !boardCopy[y - 1][x];
          if (y + 1 < nrows) boardCopy[y + 1][x] = !boardCopy[y + 1][x];
          if (x - 1 >= 0) boardCopy[y][x - 1] = !boardCopy[y][x - 1];
          if (x + 1 < ncols) boardCopy[y][x + 1] = !boardCopy[y][x + 1];
        }

      };
      let boardCopy = [];
      for (let i = 0; i < oldBoard.length; i++) {
        boardCopy.push(oldBoard[i].slice());
      }
      // TODO: Make a (deep) copy of the oldBoard
      flipCell(y, x, boardCopy);
      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  return (
    <div>{hasWon() ?
      <div>
        <h1 className='Board-winMsg'>You win!</h1>
        <button className='Board-restart' onClick={() => setBoard(createBoard())}>Restart</button>
      </div>
      :
      <table className='Board-table'>
        <tbody>
          {board.map((r, idx) =>
            <tr key={idx}>{r.map((c, index) =>
              <Cell key={`${idx}-${index}`} isLit={c === true ? true : false} flipCellsAroundMe={() => flipCellsAround(`${idx}-${index}`)} />)}
            </tr>
          )}
        </tbody>
      </table>
    }
    </div>
  )


  // make table board

  // TODO
}

export default Board;
