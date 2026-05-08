import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

// Returns a tetromino
// Returns a different tetromino than first one taken (at start)
// Returns each given tetromino once (per tetrominoes given)
// Reshuffles bag when all tetrominoes have been taken from bag

describe("Shuffle bag", () => {
  let bag; 
  const tetrominoes = [Tetromino.I_SHAPE, Tetromino.O_SHAPE, Tetromino.L_SHAPE];
  beforeEach(() => {
    bag = new ShuffleBag(tetrominoes);
  })

  test("returns a tetromino (assuming tetrominoes given as parameter)", () => {
    expect(bag.next()).to.have.all.keys(Object.keys(Tetromino.I_SHAPE));
  });

  test("returns a different tetromino after first one", () => {
    const first = bag.next();
    const second = bag.next();
    expect(first).to.not.deep.equal(second);
  })
})