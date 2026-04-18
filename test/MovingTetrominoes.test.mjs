import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("to right succeeds", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlockRight();

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("to left succeeds", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlockLeft();

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("down succeeds", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlockDown();

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  test("stops at right border of the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  })

  test("stops at left border of the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlockLeft()
    board.moveBlockLeft()
    board.moveBlockLeft()
    board.moveBlockLeft()

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  })

  test("stops at bottom of the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlockDown();
    board.moveBlockDown();
    board.moveBlockDown();
    board.moveBlockDown();
    board.moveBlockDown();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  })
});
