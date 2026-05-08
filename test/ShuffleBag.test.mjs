import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

// Returns a tetromino
// Returns a different tetromino than first one taken (at start)
// Returns each given tetromino once (per tetrominoes given)
// Reshuffles bag when all tetrominoes have been taken from bag

const tetrominoReducer = (tetrominoes, tetromino) => tetrominoes.set(tetromino, (tetrominoes.get(tetromino) || 0) + 1);

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

  test("returns all tetrominoes once (assuming each tetromino given once as parameter)", () => {
    let original = tetrominoes.reduce(tetrominoReducer, new Map());
    const taken = new Array();
    for (let count = 0; count < tetrominoes.length; count++) {
      const tetromino = bag.next();
      taken.push(tetromino)
    }
    const shuffled = taken.reduce(tetrominoReducer, new Map());

    const originalCounts = new Set();
    const shuffledCounts = new Set();
    original.forEach((count) => {
      originalCounts.add(count);
    })
    shuffled.forEach((count) => {
      shuffledCounts.add(count);
    });

    expect(originalCounts).to.deep.equal(shuffledCounts);
  })
})