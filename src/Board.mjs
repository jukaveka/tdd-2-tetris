import { fill, forEach } from "lodash";

export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rows = this.emptyBoard();
  }

  newRow(filledBlocks) {
    let row = { state: "empty" };

    if (!filledBlocks) {
      row.squares = `.`.repeat(this.width);
    } else {
      const startSquares = Math.floor((this.width - filledBlocks.length) / 2);
      const endSquares = this.width - (startSquares + filledBlocks.length);

      row.squares = `.`.repeat(startSquares).concat(filledBlocks).concat(`.`.repeat(endSquares));

      row.state = "falling";
    }

    return row;
  }

  emptyBoard() {
    let emptyBoard = [];

    for (let i = 0; this.height > i; i++) {
      emptyBoard = emptyBoard.concat(this.newRow());
    }

    return emptyBoard;
  }

  toString() {
    return this.rows
      .map((row) => row.squares)
      .join(`\n`)
      .concat(`\n`);
  }

  drop(shape) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }

    const block = shape.current();
    let rowsWithBlock = [];

    for (let i = 0; i < block.length; i++) {
      const newRow = this.newRow(block[i]);
      rowsWithBlock.push(newRow);
    }

    this.rows = this.rows.toSpliced(0, block.length, ...rowsWithBlock);
  }

  tick() {
    this.checkFallingRow();

    const tempRows = this.rows.toSpliced(0, 0, this.newRow());
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

    if (lastRow.squares !== this.newRow().squares) {
      this.rows.forEach((row) => {
        if (row.state === "falling") {
          row.state = "stopped";
        }
      });
    }
  }
}
