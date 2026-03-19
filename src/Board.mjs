export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rows = this.generateEmptyBoard();
  }

  generateRow(block) {
    let row = { state: "empty" };

    if (!block) {
      row.squares = `.`.repeat(this.width);
    } else {
      row.squares = `.`
        .repeat(this.width / 2)
        .concat(block)
        .concat(`.`.repeat(this.width / 2));
      row.state = "falling";
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
    return this.rows
      .map((row) => row.squares)
      .join(`\n`)
      .concat(`\n`);
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }

    const rowWithBlock = this.generateRow(block);

    this.rows = this.rows.toSpliced(0, 1, rowWithBlock);
  }

  tick() {
    this.checkFallingRow();

    const tempRows = this.rows.toSpliced(0, 0, this.generateRow());
    const stoppedRows = tempRows.filter((row) => row.state === "stopped");
    const movingRows = tempRows.slice(0, this.height - stoppedRows.length);

    this.rows = movingRows.concat(stoppedRows);
  }

  hasFalling() {
    return this.rows.map((row) => row.state === "falling").includes(true);
  }

  checkFallingRow() {
    const stoppedRows = this.rows.filter((row) => row.state === "stopped");
    const lastRow = this.rows[this.rows.length - 1 - stoppedRows.length];

    if (lastRow.squares !== this.generateRow().squares) {
      this.rows[this.rows.length - 1 - stoppedRows.length].state = "stopped";
    }
  }
}
