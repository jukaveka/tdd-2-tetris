export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.positions = this.generatePositions()
  }

  generatePositions() {
    return [`.`.repeat(this.width), `.`.repeat(this.width), `.`.repeat(this.width)]
  }

  toString() {
    return this.positions.join(`\n`).concat(`\n`);
  }

  drop(block) {;
    this.positions = this.positions.toSpliced(
      0,
      1,
      `.`
        .repeat(this.width / 2)
        .concat(block)
        .concat(`.`.repeat(this.width / 2))
    );
  }
}
