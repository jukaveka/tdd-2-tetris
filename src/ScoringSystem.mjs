export class ScoringSystem {
  #points = 0;
  #level = 0;
  #lines = 0;

  constructor() {
    this.#points;
    this.#level;
    this.#lines;
  };

  points() {
    return this.#points;
  }

  level() {
    return this.#level;
  }

  lines() {
    return this.#lines;
  }
}