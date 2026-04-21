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
        if (this.rows[row].squares[column] !== ".") {
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
    this.settleBlocks();

    const reservedFalling = this.falling.toReversed()
    reservedFalling.forEach((square) => {
      const character = this.rows[square.row].squares[square.column]

      const under = this.rows[square.row + 1].squares.split("").toSpliced(square.column, 1, character).join("")
      const current = this.rows[square.row].squares.split("").toSpliced(square.column, 1, ".").join("")

      this.rows[square.row].squares = current
      this.rows[square.row + 1].squares = under
    })

    this.falling = this.fallingBlock();
  }

  openBlocksBelow() {
    const blocksBelow = this.falling.map((block) => {
      return {...block, "row": block.row + 1}
    })

    let hasSpace = true;
    blocksBelow.forEach((block) => {
      if (block.row === this.height) {
        hasSpace = false;
      } else if (this.settledBlock(block)) {
        hasSpace = false;
      }
    })

    return hasSpace;
  }

  openBlocksToRight() {
    const blockstoRight = this.falling.map((block) => {
      return {...block, "column": block.column + 1}
    })

    let hasSpace = true;
    blockstoRight.forEach((block) => {
      if (block.column === this.width) {
        hasSpace = false;
      }
    })

    return hasSpace;
  }

  openBlocksToLeft() {
    const blockToLeft = this.falling.map((block) => {
      return {...block, "column": block.column - 1}
    })

    let hasSpace = true;
    blockToLeft.forEach((block) => {
      if (block.column === -1) {
        hasSpace = false;
      }
    })

    return hasSpace;
  }

  hasFalling() {
    return this.falling.length > 0;
  }

  settleBlocks() {
    if (!this.openBlocksBelow()) {
      this.settled = this.settled.concat(...this.falling)
      this.falling = new Array()
    }
  }

  moveBlockRight() {
    this.falling = this.fallingBlock()
    if (this.openBlocksToRight()) {
      const reservedFalling = this.falling.toReversed()
      reservedFalling.forEach((square) => {
        const character = this.rows[square.row].squares[square.column]

        const current = this.rows[square.row].squares
          .split("")
          .toSpliced(square.column + 1, 1, character)
          .toSpliced(square.column, 1, ".")
          .join("")

        this.rows[square.row].squares = current
      })
    }
  }

  moveBlockLeft() {
    const leftBorderSquares = this.columnSquares(0)
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

  columnSquares(column) {
    return this.rows.map((row) => row.squares[column])
  }
}
