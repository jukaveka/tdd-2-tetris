export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rows = this.generateEmptyBoard();
    this.falling = false;
  }

  emptyRow() {
    return `.`.repeat(this.width);
  }

  generateEmptyBoard() {
    let emptyBoard = [];

    for (let i = 0; this.height > i; i++) {
      emptyBoard = emptyBoard.concat(this.emptyRow());
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

    const rowWithBlock = `.`
      .repeat(this.width / 2)
      .concat(block)
      .concat(`.`.repeat(this.width / 2));

    this.rows = this.rows.toSpliced(0, 1, rowWithBlock);
  }

  tick() {
    const lastRowWithBlock = this.rows.findLastIndex((row) => row !== this.emptyRow());

    if (lastRowWithBlock !== this.height - 1) {
      this.rows.pop();
      this.rows.unshift(this.emptyRow());
    } else {
      this.falling = false;
    }
  }

  hasFalling() {
    return this.falling;
  }
}
