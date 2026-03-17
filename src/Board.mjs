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
    this.rows = this.rows.toSpliced(
      0,
      1,
      `.`
        .repeat(this.width / 2)
        .concat(block)
        .concat(`.`.repeat(this.width / 2))
    );
  }
}
