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

  update(lines) {
    if (lines === 1) {
      this.#points = this.#points + 40;
    } else if (lines === 2) {
      this.#points = this.#points + 100;
    }
  }
}