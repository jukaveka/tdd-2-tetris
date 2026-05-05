import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { moveMultipleTimes } from "./moveMultipleTimes";

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
       ...TT.....
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
       ....TT....
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
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can't be rotated right if settled blocks block it", () => {
    board.drop(Tetromino.T_SHAPE);
    moveMultipleTimes(board, "down", 5);

    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockRight();
    moveMultipleTimes(board, "left", 2);
    moveMultipleTimes(board, "down", 3);

    board.rotateBlockRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..T.......
       .TTTTT....
       ..T.T.....`
    );
  });

  test("can't be rotated left if settled blocks block it", () => {
    board.drop(Tetromino.T_SHAPE);
    moveMultipleTimes(board, "down", 5);

    board.drop(Tetromino.T_SHAPE);
    board.rotateBlockLeft();
    moveMultipleTimes(board, "right", 2);
    moveMultipleTimes(board, "down", 3);

    board.rotateBlockLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......T...
       ...TTTTT..
       ....T.T...`
    );
  });

  test("will wallkick when rotated next to left wall", () => {
    board.drop(Tetromino.T_SHAPE);

    board.rotateBlockLeft();
    moveMultipleTimes(board, "left", 4);

    board.rotateBlockRight();

    expect(board.toString()).to.equalShape(
      `TTT.......
       .T........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("will wallkick when rotated next to right wall", () => {
    board.drop(Tetromino.T_SHAPE);

    board.rotateBlockRight();
    moveMultipleTimes(board, "right", 5);

    board.rotateBlockLeft();

    expect(board.toString()).to.equalShape(
      `.......TTT
       ........T.
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

    board.rotateBlockRight();

    expect(board.toString()).to.equalShape(
      `.....I....
       .....I....
       .....I....
       .....I....
       ..........
       ..........`
    );
  });

  test("can be rotated right", () => {
    board.drop(Tetromino.I_SHAPE);

    board.rotateBlockLeft();

    expect(board.toString()).to.equalShape(
      `.....I....
       .....I....
       .....I....
       .....I....
       ..........
       ..........`
    );
  });

  test("can be rotated twice", () => {
    board.drop(Tetromino.I_SHAPE);

    board.rotateBlockLeft();
    board.rotateBlockLeft();

    expect(board.toString()).to.equalShape(
      `...IIII...
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can't be rotated right if settled block blocks it", () => {
    board.drop(Tetromino.I_SHAPE);
    moveMultipleTimes(board, "down", 6);

    board.drop(Tetromino.I_SHAPE);
    moveMultipleTimes(board, "down", 4);

    board.rotateBlockRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...IIII...
       ...IIII...`
    );
  });

  test("can't be rotated left if settled block blocks it", () => {
    board.drop(Tetromino.I_SHAPE);
    moveMultipleTimes(board, "down", 6);

    board.drop(Tetromino.I_SHAPE);
    moveMultipleTimes(board, "down", 4);

    board.rotateBlockLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...IIII...
       ...IIII...`
    );
  });

  test("will wallkick when rotated next to left wall", () => {
    board.drop(Tetromino.I_SHAPE);

    board.rotateBlockRight();
    moveMultipleTimes(board, "left", 4);

    board.rotateBlockRight();

    expect(board.toString()).to.equalShape(
      `IIII......
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("will wallkick when rotated next to right wall", () => {
    board.drop(Tetromino.I_SHAPE);

    board.rotateBlockRight();
    moveMultipleTimes(board, "right", 5);

    expect(board.toString()).to.equalShape(
      `.........I
       .........I
       .........I
       .........I
       ..........
       ..........`
    );
  });
});

describe("Falling O-shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("maintains same orientation when rotated right", () => {
    board.drop(Tetromino.O_SHAPE);

    board.rotateBlockRight();

    expect(board.toString()).to.equalShape(
      `....OO....
       ....OO....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("maintains same orientation when rotated left", () => {
    board.drop(Tetromino.O_SHAPE);

    board.rotateBlockLeft();

    expect(board.toString()).to.equalShape(
      `....OO....
       ....OO....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("maintains same orientation when rotated twice", () => {
    board.drop(Tetromino.O_SHAPE);

    board.rotateBlockLeft();
    board.rotateBlockLeft();

    expect(board.toString()).to.equalShape(
      `....OO....
       ....OO....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("maintains same position if rotated next to right wall", () => {
    board.drop(Tetromino.O_SHAPE);
    moveMultipleTimes(board, "right", 4);

    board.rotateBlockRight();

    expect(board.toString()).to.equalShape(
      `........OO
       ........OO
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("maintains same position if rotated next to left wall", () => {
    board.drop(Tetromino.O_SHAPE);
    moveMultipleTimes(board, "left", 4);

    board.rotateBlockLeft();

    expect(board.toString()).to.equalShape(
      `OO........
       OO........
       ..........
       ..........
       ..........
       ..........`
    );
  });
});
