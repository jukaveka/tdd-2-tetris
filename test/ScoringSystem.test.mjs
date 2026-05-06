import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

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
    score.setScoringState(0, 1, 10)
    score.update(1)
    const points = score.points();

    expect(points).toBe(80);
  })

  test("Increases points by 300 if two lines is cleared at level 2", () => {
    score.setScoringState(0, 2, 20)
    score.update(2)
    const points = score.points();

    expect(points).toBe(300);
  })

  test("Increases points by 1200 if three lines is cleared at level 3", () => {
    score.setScoringState(0, 3, 30)
    score.update(3)
    const points = score.points();

    expect(points).toBe(1200);
  })

  test("Increases points by 6000 if four lines is cleared at level 4", () => {
    score.setScoringState(0, 4, 40)
    score.update(4)
    const points = score.points();

    expect(points).toBe(6000);
  })
})