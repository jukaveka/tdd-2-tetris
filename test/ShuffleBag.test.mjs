import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Shuffle bag", () => {
  let bag; 
  beforeEach(() => {
    bag = new ShuffleBag([Tetromino.I_SHAPE, Tetromino.O_SHAPE, Tetromino.L_SHAPE]);
  })

  test("returns a tetromino", () => {
    expect(bag.next()).to.have.all.keys(Object.keys(Tetromino.I_SHAPE));
  });
})