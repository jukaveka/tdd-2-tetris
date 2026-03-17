export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.positions = `.`.repeat(width).concat(`\n`).repeat(height)
  }

  toString() {
    return this.positions;
  }

  drop(block) {
    let oldPositions = this.positions.split("\n")
    const positions = oldPositions.toSpliced(0, 1, `.X.`)
    this.positions = positions.join(`\n`)
  }
}
