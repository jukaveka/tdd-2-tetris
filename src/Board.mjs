export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rows = this.generateEmptyBoard();
  }

  emptyRow() {
    return `.`.repeat(this.width)
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

    const rowWithBlock = `.`
      .repeat(this.width / 2)
      .concat(block)
      .concat(`.`.repeat(this.width / 2));

    this.rows = this.rows.toSpliced(0, 1, rowWithBlock);
  }

  tick() {
    this.rows.pop();
    this.rows.unshift(this.emptyRow());
  }

  hasFalling() {
    const rowsWithBlocks = this.rows.filter((row) => row !== this.emptyRow());

    return rowsWithBlocks.length > 0;
  }
}
