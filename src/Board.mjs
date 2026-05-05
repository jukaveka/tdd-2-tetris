export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rows = this.emptyBoard();
    this.falling = new Array();
    this.tetromino = null;
    this.shapeArea = null;
    this.settled = new Array();
  }

  emptyRow() {
    return this.emptySquares(this.width);
  }

  emptyBoard() {
    let emptyBoard = [];

    for (let i = 0; this.height > i; i++) {
      emptyBoard = emptyBoard.concat(this.emptyRow());
    }

    return emptyBoard;
  }

  emptySquares(count) {
    return `.`.repeat(count);
  }

  toString() {
    return this.rows.join(`\n`).concat(`\n`);
  }

  drop(shape) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }

    this.tetromino = shape;
    this.shapeArea = this.determineShapeArea(this.tetromino);
    const shapePositions = this.determineShapePositions(this.tetromino)

    shapePositions.forEach((square) => {
      this.replaceAtPosition(square.row, square.column, this.tetromino.character);
    });

    this.falling = this.fallingSquares();
  }

  settledSquare(square) {
    const matchingSquare = this.settled.filter((settledSquare) => (settledSquare.row === square.row) & (settledSquare.column === square.column));
    return matchingSquare.length > 0;
  }

  fallingSquare(square) {
    const matchingSquare = this.falling.filter((fallingSquare) => (fallingSquare.row === square.row) & (fallingSquare.column === square.column));
    return matchingSquare.length > 0;
  }

  fallingSquares() {
    let positions = [];

    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        if (this.rows[row][column] !== ".") {
          const square = { row: row, column: column };
          if (!this.settledSquare(square)) {
            positions.push(square);
          }
        }
      }
    }
    return positions;
  }

  tick() {
    if (this.openSquares("down")) {
      this.moveBlock("down");
    } else {
      this.settleBlocks();
    }
  }

  replaceAtPosition(row, column, character) {
    this.rows[row] = this.rows[row].split("").toSpliced(column, 1, character).join("");
  }

  squaresAtDirection(direction) {
    const squares = this.falling.map((square) => {
      let row = square.row;
      let column = square.column;
      const increments = this.directionIncrements(direction)

      return { row: row + increments.row, column: column + increments.column };
    });

    return squares;
  }

  openSquares(direction) {
    const squares = this.squaresAtDirection(direction);
    let hasSpace = true;

    squares.forEach((square) => {
      if (this.outOfBounds(square) || this.settledSquare(square)) {
        hasSpace = false;
      }
    });

    return hasSpace;
  }

  outOfBounds(square) {
    const left = square.column === -1;
    const right = square.column === this.width;
    const bottom = square.row === this.height;

    return left || right || bottom;
  }

  hasFalling() {
    return this.falling.length > 0;
  }

  settleBlocks() {
    this.settled = this.settled.concat(...this.falling);
    this.falling = new Array();
  }

  moveBlock(direction) {
    if (this.openSquares(direction)) {
      const increments = this.directionIncrements(direction)

      const newPositions = this.falling.map((square) => {
        return { row: square.row + increments.row, column: square.column + increments.column };
      });

      this.falling.forEach((square) => {
        this.replaceAtPosition(square.row, square.column, ".");
      });

      newPositions.forEach((square) => {
        this.replaceAtPosition(square.row, square.column, this.tetromino.character);
      });

      this.falling = this.fallingSquares();
      this.shapeArea = {
        ...this.shapeArea,
        topRow: this.shapeArea.topRow + increments.row,
        leftColumn: this.shapeArea.leftColumn + increments.column,
      };
    }
  }

  moveBlockRight() {
    this.moveBlock("right");
  }

  moveBlockLeft() {
    this.moveBlock("left");
  }

  moveBlockDown() {
    this.tick();
  }

  rotateBlockRight() {
    const rotatedShape = this.tetromino.rotateRight();
    this.rotateBlock(rotatedShape);
  }

  rotateBlockLeft() {
    const rotatedShape = this.tetromino.rotateLeft();
    this.rotateBlock(rotatedShape);
  }

  rotateBlock(rotatedShape) {
    let newPositions = this.determineShapePositions(rotatedShape)
    newPositions = this.wallkick(newPositions);

    if (this.validPositions(newPositions)) {
      this.falling.forEach((square) => {
        this.replaceAtPosition(square.row, square.column, ".");
      });

      newPositions.forEach((square) => {
        this.replaceAtPosition(square.row, square.column, this.tetromino.character);
      });

      this.falling = this.fallingSquares();
      this.tetromino = rotatedShape;
    }
  }

  validPositions(newPositions) {
    let valid = true;

    newPositions.forEach((square) => {
      if (this.settledSquare(square)) {
        valid = false;
      }
    });

    return valid;
  }

  wallkick(newPositions) {
    let positions = new Array();
    const columns = newPositions.map((square) => square.column);
    const rows = newPositions.map((square) => square.row);

    if (columns.some((column) => column < 0)) {
      positions = newPositions.map((square) => {
        return { ...square, column: square.column + this.shapeArea.leftColumn * -1 };
      });
    } else if (columns.some((column) => column >= this.width)) {
      positions = newPositions.map((square) => {
        return { ...square, column: square.column - 1 };
      });
    } else if (rows.some((row) => row < 0)) {
      positions = newPositions.map((square) => {
        return { ...square, row: square.row + this.shapeArea.topRow * -1 };
      });
    } else {
      positions = newPositions;
    }

    return positions;
  }

  determineShapeArea(shape) {
    const height = shape.current().length;
    const width = shape.current()[0].length;
    const leftColumn = Math.floor((this.width - height) / 2);
    const topMargin = shape.current().findIndex((row) => /[A-Z]/.test(row));
    const topRow = 0 - topMargin;
    return { topRow, leftColumn, width, height };
  }

  determineShapePositions(shape) {
  let shapePositions = new Array();

  const splittedRows = shape.current().map((row) => row.split(""));
    splittedRows.forEach((row, rowIndex) =>
      row.forEach((column, columnIndex) => {
        if (/[A-Z]/.test(column)) {
          shapePositions.push({
            row: rowIndex + this.shapeArea.topRow,
            column: columnIndex + this.shapeArea.leftColumn,
          });
        }
      })
    );

    return shapePositions;
  }

  directionIncrements(direction) {
    let row = 0;
    let column = 0;

    if (direction === "right") {
      column = 1;
    } else if (direction === "left") {
      column = -1;
    } else if (direction === "down") {
      row = 1;
    }

    return {row, column}
  }
}
