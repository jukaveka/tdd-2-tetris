import { fill, forEach } from "lodash";

export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rows = this.emptyBoard();
    this.falling = new Array()
    this.tetromino = null;
    this.shapeArea = null;
    this.settled = new Array()
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
    return this.rows
      .join(`\n`)
      .concat(`\n`);
  }

  drop(shape) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }

    this.shape = shape;
    const height = shape.current().length;
    const width = shape.current()[0].length;
    const leftColumn = Math.floor((this.width - height) / 2);
    this.shapeArea = {"topRow": 0, "leftColumn": leftColumn, width, height};

    const block = shape.current().filter((row) => (/[A-Z]/.test(row)));
    let rowsWithBlock = [];

    for (let row = 0; row < block.length; row++) {
        const newRow = this.newRow(block[row]);
        rowsWithBlock.push(newRow);
    };

    this.rows = this.rows.toSpliced(0, block.length, ...rowsWithBlock);
    this.falling = this.fallingBlock()
  }

  settledBlock(square) {
    const matchingBlock = this.settled.filter((block) => block.row === square.row & block.column === square.column)
    return matchingBlock.length > 0
  }

  fallingBlock() {
    let positions = [];

    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        if (this.rows[row][column] !== ".") {
          const square = {"row": row, "column": column};
          if (!this.settledBlock(square)) {
            positions.push(square);
          }
        }
      }
    }
    return positions
  }

  tick() {
    if (this.openSquares("down")) {
      const reservedFalling = this.falling.toReversed()
      reservedFalling.forEach((square) => {
        const character = this.rows[square.row][square.column]

        const under = this.rows[square.row + 1].split("").toSpliced(square.column, 1, character).join("")
        const current = this.rows[square.row].split("").toSpliced(square.column, 1, ".").join("")

        this.rows[square.row] = current
        this.rows[square.row + 1] = under
      })

      this.falling = this.fallingBlock();
    } else {
      this.settleBlocks()
    }

  }

  squaresAtDirection(direction) {
    const blocks = this.falling.map((block) => {
      let row = block.row;
      let column = block.column;

      if (direction === "right") {
        column = column + 1;
      } else if (direction === "left") {
        column = column - 1
      } else if (direction === "down") {
        row = row + 1
      }

      return {"row": row, "column": column};
    })

    return blocks
  }

  openSquares(direction) {
    const squares = this.squaresAtDirection(direction)
    let hasSpace = true;

    squares.forEach((square) => {
      if (this.outOfBounds(direction, square) || this.settledBlock(square)) {
        hasSpace = false;
      }
    })

    return hasSpace;
  }

  outOfBounds(direction, block) {
    const left = (direction === "left" && block.column === -1)
    const right = (direction === "right" && block.column === this.width)
    const bottom = (direction === "down" && block.row === this.height)

    return left || right || bottom;
  }

  hasFalling() {
    return this.falling.length > 0;
  }

  settleBlocks() {
    this.settled = this.settled.concat(...this.falling)
    this.falling = new Array()
  }

  moveSideways(direction) {
    this.falling = this.fallingBlock()
    if (this.openSquares(direction)) {
      let increment;
      let block;

      if (direction === "right") {
        increment = 1;
        block = this.falling.toReversed();
      } else if (direction === "left") {
        increment = -1;
        block = this.falling;
      }

      block.forEach((square) => {
        const character = this.rows[square.row][square.column]

        const row = this.rows[square.row]
          .split("")
          .toSpliced(square.column + increment, 1, character)
          .toSpliced(square.column, 1, ".")
          .join("")

        this.rows[square.row] = row
      })
    }
  }

  moveBlockRight() {
    this.moveSideways("right")
  }

  moveBlockLeft() {
    this.moveSideways("left")
  }

  moveBlockDown() {
    this.tick()
  }

  rotateBlockRight() {
    this.shape = this.shape.rotateRight()
    const rotatedShape = this.shape.current()

    for (let row = 0; row < rotatedShape.length; row++) {
      const fullRow = this.rows[row].split("")
      const shapeRow = rotatedShape[row].split("")

      const newRow = fullRow.toSpliced(this.shapeArea.leftColumn, this.shapeArea.width, ...shapeRow).join("")
      this.rows[row] = newRow
    }
  }
}
