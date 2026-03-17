export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rows = this.generateEmptyBoard();
  }

  generateEmptyBoard() {
    let emptyBoard = [];

    for (let i = 0; this.height > i; i++) {
      const emptyRow = `.`.repeat(this.width);
      emptyBoard = emptyBoard.concat(emptyRow);
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
    const newRow = `.`.repeat(this.width);
    this.rows.unshift(newRow);
  }

  hasFalling() {
    const rowsWithBlocks = this.rows.filter((row) => row !== `.`.repeat(this.width));

    return rowsWithBlocks.length > 0;
  }
}
