export class RotatingShape {
  constructor() {
    this.rows = [];
    this.area = 0
  }

  static fromString(value) {
    const shape = new RotatingShape();
    shape.rows = value.split(`\n`).map((row) => row.trim());

    return shape;
  }

  static fromArray(value) {
    const shape = new RotatingShape();
    shape.rows = value;

    shape.area = shape.calculateArea()

    return shape;
  }

  width(rows) {
    const filtered = rows.filter((row) => row.match(/[^.]/))
    const splitted = filtered.map((row) => row.split(""))
    const blocks = splitted.map((row) => row.filter((char) => !char.includes(".")))
    const blockCounts = blocks.map((row) => row.length)

    return Math.max(...blockCounts)
  }

  calculateArea() {
    const width = this.width(this.rows)

    return width
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
      for (let i = this.rows.length - 1; i >= 0; i--) {
        rotatedRows.push(this.rows.map((row) => row[i]).join(""));
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
