import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { moveMultipleTimes } from "./moveMultipleTimes";

// Falling T-shape can be rotated right
// Falling T-shape can be rotated left
// Falling T-shape can be rotated twice (any direction)
// Falling T-shape can't be rotated if rotated block overlaps with settled blocks.
// Falling T-shape can wallkick of side border
// Falling T-shape can wallkick of bottom

describe("Falling T-shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  })

  test("can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  })

  test("can be rotated twice", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockLeft()
    board.rotateBlockLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  })

  test("can't be rotated right if settled blocks block it", () => {
    board.drop(Tetromino.T_SHAPE);
    moveMultipleTimes(board, "down", 5)

    board.drop(Tetromino.T_SHAPE)
    board.rotateBlockRight()
    board.rotateBlockRight()
    board.moveBlockLeft()
    moveMultipleTimes(board, "down", 2)

    board.rotateBlockRight()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..TTT.....
       ...TT.....
       ...TTT....`
    );
  })
})