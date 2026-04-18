import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function moveMultipleTimes(board, direction, count) {
  let timesMoved = 0;

  while (timesMoved < count) {
    if (direction === "right") {
      board.moveBlockRight()
    }

    else if (direction === "left") {
      board.moveBlockLeft()
    }

    else if (direction === "down") {
      board.moveBlockDown()
    }

    else {
      throw Error("No direction matched for moving block")
    }

    timesMoved++
  }
};

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
    moveMultipleTimes(board, "right", 5)

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
    moveMultipleTimes(board, "left", 4)

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
    moveMultipleTimes(board, "down", 5)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  })

  test("stops moving right next to another block on the board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveMultipleTimes(board, "right", 5)
    moveMultipleTimes(board, "down", 5)

    board.drop(Tetromino.O_SHAPE);
    moveMultipleTimes(board, "down", 4)
    moveMultipleTimes(board, "right", 3)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......OO..
       ......OOT.
       .......TTT`
    );
  })
});
