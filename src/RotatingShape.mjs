export class RotatingShape {
  constructor() {
    this.rows = [];
  }

  static fromString(value) {
    const shape = new RotatingShape();
    shape.rows = value.split(`\n`).map((row) => row.trim());

    return shape;
  }

  static fromArray(value) {
    const shape = new RotatingShape();
    shape.rows = value;

    return shape;
  }

  toString() {
    return this.rows.join(`\n`).concat(`\n`);
  }

  rotateRight() {
    let rotatedRows = [];
    for (let i = 0; i < this.rows.length; i++) {
      rotatedRows.push(
        this.rows
          .map((row) => row[i])
          .reverse()
          .join("")
      );
    }

    return RotatingShape.fromArray(rotatedRows);
  }

  rotateLeft() {
    return this.rotateRight().rotateRight().rotateRight();
  }
}
