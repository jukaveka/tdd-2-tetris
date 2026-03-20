export class RotatingShape {
  constructor() {
    this.rows = [];
    this.area = 0
  }

  static fromString(value) {
    const shape = new RotatingShape();
    shape.rows = value.split(`\n`).map((row) => row.trim());

    shape.area = shape.calculateArea()

    return shape;
  }

  static fromArray(value) {
    const shape = new RotatingShape();
    shape.rows = value;

    shape.area = shape.calculateArea()

    return shape;
  }

  width(rows) {
    const blockCounts = rows
      .filter((row) => row.match(/[^.]/))
      .map((row) => row.split(""))
      .map((row) => row.filter((char) => !char.includes(".")))
      .map((row) => row.length)

    return Math.max(...blockCounts)
  }

  calculateArea() {
    const width = this.width(this.rows);

    const rotatedShape = this.rotate("right");
    const height = this.width(rotatedShape);

    return width >= height ? width : height;
  }

  toString() {
    return this.rows.join(`\n`).concat(`\n`);
  }

  rotate(direction) {
    let rotatedRows = [];

    if (direction === "right") {
      for (let i = 0; i < this.rows.length; i++) {
        rotatedRows.push(
          this.rows
            .map((row) => row[i])
            .reverse()
            .join("")
        );
      }
    } else if (direction === "left") {
      for (let i = this.area - 1; i >= 0; i--) {
        rotatedRows.push(this.rows.map((row) => row[i]).join(""));
      }

      if (this.rows.length > this.area) {
          rotatedRows = rotatedRows.concat(`.`.repeat(this.rows.length))
      }
    } else {
      throw new Error("Direction given is missing or insufficient")
    }

    return rotatedRows
  }

  rotateRight() {
    const rotatedRows = this.rotate("right")

    return RotatingShape.fromArray(rotatedRows);
  }

  rotateLeft() {
    const rotatedRows = this.rotate("left")

    return RotatingShape.fromArray(rotatedRows);
  }
}
