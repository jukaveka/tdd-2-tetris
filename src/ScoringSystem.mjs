export class ScoringSystem {
  #points = 0;
  #level = 0;
  #lines = 0;
  #bases = [40, 100]

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
    this.#points = this.#points + this.#bases[lines - 1]
    this.#lines = 1;
  }
}