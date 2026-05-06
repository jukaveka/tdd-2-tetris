import { beforeEach, describe, test, vi } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { setBoardState } from "./setBoardState";
import { Tetromino } from "../src/Tetromino.mjs";


describe("Line clearing", () => {
  let board;
  beforeEach(() => {
    board = new Board(6, 6);
  });

  test("clears 1 row when a row is settled", () => {
    const falling = [
      { row: 4, column: 0 },
      { row: 4, column: 1 },
      { row: 5, column: 0 },
      { row: 5, column: 1 },
    ];
    const settled = [
      { row: 5, column: 2 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ];
    const tetromino = Tetromino.O_SHAPE;
    board = setBoardState(board, falling, settled, tetromino);

    board.tick();

    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ......
       ......
       XX....`
    );
  });

  test("clears 2 adjacent rows when two rows are settled", () => {
    const falling = [
      { row: 4, column: 0 },
      { row: 4, column: 1 },
      { row: 5, column: 0 },
      { row: 5, column: 1 },
    ];
    const settled = [
      { row: 4, column: 2 },
      { row: 4, column: 3 },
      { row: 4, column: 4 },
      { row: 4, column: 5 },
      { row: 5, column: 2 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ];
    const tetromino = Tetromino.O_SHAPE;
    board = setBoardState(board, falling, settled, tetromino);

    board.tick();

    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ......
       ......
       ......`
    );
  });

  test("clears 2 non-adjacent rows when two non-adjacent rows are settled", () => {
    const falling = [
      { row: 3, column: 0 },
      { row: 3, column: 1 },
      { row: 4, column: 0 },
      { row: 4, column: 1 },
      { row: 5, column: 0 },
      { row: 5, column: 1 },
    ];
    const settled = [
      { row: 3, column: 2 },
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 2 },
      { row: 4, column: 4 },
      { row: 4, column: 5 },
      { row: 5, column: 2 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ];
    const tetromino = Tetromino.O_SHAPE;
    board = setBoardState(board, falling, settled, tetromino);

    board.tick();

    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ......
       ......
       XXX.XX`
    );
  });

  test("clear no rows when block is still falling", () => {
    const falling = [
      { row: 4, column: 0 },
      { row: 4, column: 1 },
      { row: 5, column: 0 },
      { row: 5, column: 1 },
    ];
    const settled = [
      { row: 5, column: 2 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ];
    const tetromino = Tetromino.O_SHAPE;
    board = setBoardState(board, falling, settled, tetromino);

    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ......
       XX....
       XXXXXX`
    );
  });

  test("calls score update method about removed rows", () => {
    const falling = []
    const settled = [
      { row: 5, column: 0 },
      { row: 5, column: 1 },
      { row: 5, column: 2 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ];
    const tetromino = Tetromino.O_SHAPE;
    board = setBoardState(board, falling, settled, tetromino);

    board.tick();
    board.notifyLineClear(1);

    expect(board.score.value).toBe(1)
  })
});
