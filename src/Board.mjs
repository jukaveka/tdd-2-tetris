import { fill, forEach } from "lodash";

export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rows = this.emptyBoard();
    this.falling = new Array()
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
    if (this.openBlocks("down")) {
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

  blocksAtDirection(direction) {
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

  openBlocks(direction) {
    const blocksAtDirection = this.blocksAtDirection(direction)
    let hasSpace = true;

    blocksAtDirection.forEach((block) => {
      if (this.outOfBounds(direction, block) || this.settledBlock(block)) {
        hasSpace = false;
      }
    })

    return hasSpace;
  }

  outOfBounds(direction, block) {
    if (direction === "left" && block.column === -1) {
      return true;
    } else if (direction === "right" && block.column === this.width) {
      return true;
    } else if (direction === "down" && block.row === this.height) {
      return true;
    }

    return false;
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
    if (this.openBlocks(direction)) {
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
}
