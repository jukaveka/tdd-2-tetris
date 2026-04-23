import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

// Falling T-shape can be rotated right
// Falling T-shape can be rotated left
// Falling T-shape can be rotated twice (any direction)
// Falling T-shape can't be rotated if rotated block is out of bounds
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
})