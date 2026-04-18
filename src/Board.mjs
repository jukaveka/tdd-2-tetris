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
      row.squares = this.emptySquares(this.width);
    } else {
      const startSquares = Math.floor((this.width - filledBlocks.length) / 2);
      const endSquares = this.width - (startSquares + filledBlocks.length);

      row.squares = this.emptySquares(startSquares).concat(filledBlocks).concat(this.emptySquares(endSquares));

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

  emptySquares(count) {
    return `.`.repeat(count);
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

    for (let row = 0; row < block.length; row++) {
      const newRow = this.newRow(block[row]);
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

  moveBlockRight() {
    const rightBorderSquares = this.rows.map((row) => row.squares[row.squares.length - 1])
    if (!rightBorderSquares.some((square) => square.match(/[^.]/))) {
      this.rows = this.rows.map((row) => {
        if (row.state === "falling") {
          let newSquares = row.squares.slice(0, row.squares.length - 1).padStart(row.squares.length, `.`);
          return { ...row, squares: newSquares };
        }

        return row;
      });
    }
  }

  moveBlockLeft() {
    const leftBorderSquares = this.rows.map((row) => row.squares[0])
    if (!leftBorderSquares.some((square) => square.match(/[^.]/))) {
      this.rows = this.rows.map((row) => {
        if (row.state === "falling") {
          let newSquares = row.squares.slice(1, row.squares.length).padEnd(row.squares.length, `.`);
          return { ...row, squares: newSquares };
        }

        return row;
      });
    }
  }

  moveBlockDown() {
    this.tick()
  }
}
