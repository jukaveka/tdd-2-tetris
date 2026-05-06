export class ScoringSystem {
  #points = 0;
  #level = 0;
  #lines = 0;
  #bases = [40, 100]

  setScoringState(points, level, lines) {
    this.#points = points;
    this.#level = level;
    this.#lines = lines;
  }

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

  levelUp(lines) {
    const oldLinesModulo = this.lines() % 10;
    const newLinesModulo = (this.lines() + lines) % 10;

    return newLinesModulo === 0 || (oldLinesModulo > 5 && newLinesModulo < 4)
  }

  update(lines) {
    this.#points = this.#points + this.#bases[lines - 1];

    if (this.levelUp(lines)) {
      this.#level = this.#level + 1;
    }

    this.#lines = this.#lines + lines;

  }
}