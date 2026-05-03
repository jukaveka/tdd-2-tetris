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
  });

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
  });

  test("can be rotated twice", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockLeft();
    board.rotateBlockLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can't be rotated right if settled blocks block it", () => {
    board.drop(Tetromino.T_SHAPE);
    moveMultipleTimes(board, "down", 5);

    board.drop(Tetromino.T_SHAPE);
    moveMultipleTimes(board, "down", 2);

    board.rotateBlockRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });

  test("can't be rotated left if settled blocks block it", () => {
    board.drop(Tetromino.T_SHAPE);
    moveMultipleTimes(board, "down", 5);

    board.drop(Tetromino.T_SHAPE);
    moveMultipleTimes(board, "down", 2);

    board.rotateBlockLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });

  test("will wallkick when rotated next to left wall", () => {
    board.drop(Tetromino.T_SHAPE);

    board.rotateBlockRight();
    moveMultipleTimes(board, "left", 4)

    board.rotateBlockRight();

    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........`
    );
  });

  test("will wallkick when rotated next to right wall", () => {
    board.drop(Tetromino.T_SHAPE);

    board.rotateBlockLeft();
    moveMultipleTimes(board, "right", 5)

    board.rotateBlockRight();

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });
});

describe("Falling I-shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("can be rotated right", () => {
    board.drop(Tetromino.I_SHAPE);

    console.log(board.shapeArea)

    expect(board.toString()).to.equalShape(
      `...IIII...
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });
})