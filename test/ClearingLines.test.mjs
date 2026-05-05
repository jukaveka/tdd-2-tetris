import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { setBoardState } from "./setBoardState";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Line clearing", () => {
  let board;
  beforeEach(() => {
    board = new Board(6, 6);
  });

  test("clears 1 row when full row is settled", () => {
    const falling = [{row: 4, column: 0}, {row: 4, column: 1}, {row: 5, column: 0}, {row: 5, column: 1}];
    const settled = [{row: 5, column: 2}, {row: 5, column: 3}, {row: 5, column: 4}, {row: 5, column: 5}];
    const tetromino = Tetromino.O_SHAPE;
    board = setBoardState(board, falling, settled, tetromino);

    board.tick()

    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ......
       ......
       XX....`
    );
  })
});