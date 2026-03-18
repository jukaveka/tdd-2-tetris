export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rows = this.generateEmptyBoard();
  }

  generateRow(block) {
    let row = {falling: false, stopped: false};

    if (!block) {
      row.squares = `.`.repeat(this.width);
    } else {
      row.squares = `.`.repeat(this.width / 2).concat(block).concat(`.`.repeat(this.width / 2));
      row.falling = true
    }

    return row;
  }

  generateEmptyBoard() {
    let emptyBoard = [];

    for (let i = 0; this.height > i; i++) {
      emptyBoard = emptyBoard.concat(this.generateRow());
    }

    return emptyBoard;
  }

  toString() {
    return this.rows.map((row) => row.squares).join(`\n`).concat(`\n`);
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }

    const rowWithBlock = this.generateRow(block)

    this.rows = this.rows.toSpliced(0, 1, rowWithBlock);
  }

  tick() {
    const lastRow = this.rows[this.rows.length - 1]

    if (lastRow.squares !== this.generateRow().squares) {
      this.rows[this.rows.length - 1].falling = false
      this.rows[this.rows.length - 1].stopped = true
    }

    const tempRows = this.rows.toSpliced(0, 0, this.generateRow());
    const stoppedRows = tempRows.filter((row) => row.stopped === true);
    const movingRows = tempRows.slice(0, this.height - stoppedRows.length)

    this.rows = movingRows.concat(stoppedRows)
  }

  hasFalling() {
    return this.rows.map((row) => row.falling === true).includes(true);
  }
}
