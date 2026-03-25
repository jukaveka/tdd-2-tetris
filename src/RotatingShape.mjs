export class RotatingShape {
  constructor() {
    this.rows = [];
    this.width = 0
    this.height = 0
  }

  static fromString(value) {
    const shape = new RotatingShape();
    shape.rows = value.split(`\n`).map((row) => row.trim());

    shape.determineDimensions()

    return shape;
  }

  static fromArray(value) {
    const shape = new RotatingShape();
    shape.rows = value;

    shape.determineDimensions()

    return shape;
  }

  shapeWidth(rows) {
    const blockCounts = rows
      .filter((row) => row.match(/[^.]/))
      .map((row) => row.split(""))
      .map((row) => row.filter((char) => !char.includes(".")))
      .map((row) => row.length)

    return Math.max(...blockCounts)
  }

  shapeHeight(rows) {
    let rotatedRows = []
    for (let i = rows.length - 1; i >= 0; i--) {
      rotatedRows.push(this.rows.map((row) => row[i]).join(""));
    }

    const blockCounts = rotatedRows
      .filter((row) => row.match(/[^.]/))
      .map((row) => row.split(""))
      .map((row) => row.filter((char) => !char.includes(".")))
      .map((row) => row.length)

    return Math.max(...blockCounts)
  }

  determineDimensions() {
    this.width = this.shapeWidth(this.rows);
    this.height = this.shapeHeight(this.rows);
  }

  shapeLength() {
    return this.height >= this.width ? this.height : this.width
  }

  toString() {
    return this.rows.join(`\n`).concat(`\n`);
  }

  rotate(direction) {
    let rotatedRows = [];

    if (direction === "right") {
      for (let i = 0; i < this.shapeLength(); i++) {
        rotatedRows.push(
          this.rows
            .map((row) => row[i])
            .reverse()
            .join("")
        );
      }
    } 

    else if (direction === "left") {
      for (let i = this.shapeLength() - 1; i >= 0; i--) {
        rotatedRows.push(this.rows.map((row) => row[i]).join(""));
      }
    } 

    else {
      throw new Error("Direction given is missing or insufficient")
    }

    if (this.rows.length > this.shapeLength()) {
      rotatedRows = rotatedRows.concat(`.`.repeat(this.rows.length))
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
