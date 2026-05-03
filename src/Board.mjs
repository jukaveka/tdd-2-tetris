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

  newRow(filledBlocks) {
    let row;

    if (!filledBlocks) {
      row = this.emptySquares(this.width);
    } else {
      const startSquares = Math.floor((this.width - filledBlocks.length) / 2);
      const endSquares = this.width - (startSquares + filledBlocks.length);

      row = this.emptySquares(startSquares).concat(filledBlocks).concat(this.emptySquares(endSquares));
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
    return this.rows.join(`\n`).concat(`\n`);
  }

  drop(shape) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }

    this.tetromino = shape;
    this.shapeArea = this.determineShapeArea(this.tetromino)

    let shapePositions = new Array();

    const splittedRows = shape.current().map((row) => row.split(""));
    splittedRows.forEach((row, rowIndex) =>
      row.forEach((column, columnIndex) => {
        if (/[A-Z]/.test(column)) {
          shapePositions.push({ row: rowIndex + this.shapeArea.topRow, column: columnIndex + this.shapeArea.leftColumn });
        }
      })
    );

    shapePositions.forEach((square) => {
      this.replaceAtPosition(square.row, square.column, this.tetromino.character)
    })

    this.falling = this.fallingBlock();
  }

  settledBlock(square) {
    const matchingBlock = this.settled.filter((block) => (block.row === square.row) & (block.column === square.column));
    return matchingBlock.length > 0;
  }

  fallingBlock() {
    let positions = [];

    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        if (this.rows[row][column] !== ".") {
          const square = { row: row, column: column };
          if (!this.settledBlock(square)) {
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

      if (direction === "right") {
        column = column + 1;
      } else if (direction === "left") {
        column = column - 1;
      } else if (direction === "down") {
        row = row + 1;
      }

      return { row: row, column: column };
    });

    return squares;
  }

  openSquares(direction) {
    const squares = this.squaresAtDirection(direction);
    let hasSpace = true;

    squares.forEach((square) => {
      if (this.outOfBounds(square) || this.settledBlock(square)) {
        hasSpace = false;
      }
    });

    return hasSpace;
  }

  outOfBounds(square) {
    const left = square.column === -1
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
      let rowIncrement = 0;
      let columnIncrement = 0;

      if (direction === "right") {
        columnIncrement = 1;
      } else if (direction === "left") {
        columnIncrement = -1;
      } else if (direction === "down") {
        rowIncrement = 1;
      }

      const newPositions = this.falling.map((square) => {
        return { row: square.row + rowIncrement, column: square.column + columnIncrement };
      });

      this.falling.forEach((square) => {
        this.replaceAtPosition(square.row, square.column, ".");
      });

      newPositions.forEach((square) => {
        this.replaceAtPosition(square.row, square.column, this.tetromino.character);
      });

      this.falling = this.fallingBlock();
      this.shapeArea = {
        ...this.shapeArea,
        topRow: this.shapeArea.topRow + rowIncrement,
        leftColumn: this.shapeArea.leftColumn + columnIncrement,
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
    let newPositions = new Array();

    const splittedRows = rotatedShape.current().map((row) => row.split(""));
    splittedRows.forEach((row, rowIndex) =>
      row.forEach((column, columnIndex) => {
        if (/[A-Z]/.test(column)) {
          newPositions.push({ row: rowIndex + this.shapeArea.topRow, column: columnIndex + this.shapeArea.leftColumn });
        }
      })
    );

    newPositions = this.wallkick(newPositions)

    if (this.validPositions(newPositions)) {
      this.falling.forEach((square) => {
        this.replaceAtPosition(square.row, square.column, ".");
      });

      newPositions.forEach((square) => {
        this.replaceAtPosition(square.row, square.column, this.tetromino.character);
      });

      this.falling = this.fallingBlock();
      this.tetromino = rotatedShape;
    }
  }

  validPositions(newPositions) {
    let valid = true;

    newPositions.forEach((square) => {
      if (this.settledBlock(square)) {
        valid = false;
      }
    })

    return valid;
  }

  wallkick(newPositions) {
    let positions = new Array();
    const columns = newPositions.map((square) => square.column);

    if (columns.includes(-1)) {
      positions = newPositions.map((square) => {return {...square, column: square.column + 1}});
    } else if (columns.includes(this.width)) {
      positions = newPositions.map((square) => {return {...square, column: square.column - 1}});
    } else {
      positions = newPositions;
    }

    return positions;
  }

  determineShapeArea(shape) {
    const height = shape.current().length;
    const width = shape.current()[0].length;
    const leftColumn = Math.floor((this.width - height) / 2);
    return { topRow: 0, leftColumn: leftColumn, width, height };
  }
}
