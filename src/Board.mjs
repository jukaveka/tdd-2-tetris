export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rows = this.generateEmptyBoard();
    this.falling = false;
  }

  generateRow(block) {
    if (!block) {
      return `.`.repeat(this.width);
    } else {
      return `.`.repeat(this.width / 2).concat(block).concat(`.`.repeat(this.width / 2));
    }
  }

  generateEmptyBoard() {
    let emptyBoard = [];

    for (let i = 0; this.height > i; i++) {
      emptyBoard = emptyBoard.concat(this.generateRow());
    }

    return emptyBoard;
  }

  toString() {
    return this.rows.join(`\n`).concat(`\n`);
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }

    this.falling = true;

    const rowWithBlock = this.generateRow("X")

    this.rows = this.rows.toSpliced(0, 1, rowWithBlock);
  }

  tick() {
    const lastRowWithBlock = this.rows.findLastIndex((row) => row !== this.generateRow());

    if (lastRowWithBlock !== this.height - 1) {
      this.rows.pop();
      this.rows.unshift(this.generateRow());
    } else {
      this.falling = false;
    }
  }

  hasFalling() {
    return this.falling;
  }
}
