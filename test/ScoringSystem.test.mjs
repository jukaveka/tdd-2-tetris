import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

// Scoring system requirements

// 1. Has 0 points at start
// 2. Has 0 level at start
// 3. Has 0 lines cleared at start
// 3. Increases x points for one line cleared
// 4. Increases x points for two lines cleared
// 5. Increases level to 1 when 10 lines are cleared
// 6. Increases level to 2 when 20 lines are cleared
// 7. Multiplies points for lines cleared by 2 for level 1
// 8. Multiplies points for lines cleared by 3 for level 2

describe("Scoring system", () => {
  let score;
  beforeEach(() => {
    score = new ScoringSystem();
  });

  test("Has 0 points when created", () => {
    const points = score.points();

    expect(points).toBe(0);
  })

  test("Has 0 level when created", () => {
    const level = score.level();

    expect(level).toBe(0);
  })

  test("Has 0 lines cleared when created", () => {
    const lines = score.lines();

    expect(lines).toBe(0);
  })

  test("Increases points by 40 when one line is cleared", () => {
    score.update(1);
    const points = score.points();

    expect(points).toBe(40);
  })

  test("Increases points by 100 when two lines are cleared at once", () => {
    score.update(2);
    const points = score.points();

    expect(points).toBe(100);
  })

  test("Increases lines by one if one line is cleared", () => {
    score.update(1)
    const lines = score.lines();

    expect(lines).toBe(1);
  })

  test("Increases lines by two if two lines are cleared", () => {
    score.update(2)
    const lines = score.lines();

    expect(lines).toBe(2);
  })

  test("Increases level to one if ten lines are cleared", () => {
    score.setScoringState(360, 0, 9)
    score.update(1)
    const level = score.level();

    expect(level).toBe(1);
  })

  test("Increases level to two if 20 lines are cleared", () => {
    score.setScoringState(720, 1, 18)
    score.update(1)
    score.update(1)
    const level = score.level();

    expect(level).toBe(2);
  })

  test("Increases level by one if threshold of 10 lines are cleared", () => {
    score.setScoringState(800, 1, 19)
    score.update(2)
    const level = score.level();

    expect(level).toBe(2);
  })

  test("Increases points by 80 if one line is cleared at level 1", () => {
    score.setScoringState(400, 1, 10)
    score.update(1)
    const points = score.points();

    expect(points).toBe(480);
  })

  test("Increases points by 300 if two line is cleared at level 2", () => {
    score.setScoringState(800, 2, 20)
    score.update(2)
    const points = score.points();

    expect(points).toBe(1100);
  })
})