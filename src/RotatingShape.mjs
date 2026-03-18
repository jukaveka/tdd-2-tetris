export class RotatingShape {
  constructor() {
    this.rows = []
  }

  static fromString(value) {
    const shape = new RotatingShape()
    shape.rows = value.split(`\n`).map((row) => row.trim())

    console.log(shape)

    return shape
  }

  toString() {
    return this.rows.join(`\n`).concat(`\n`)
  }

  rotateRight() {
    let newShape = [this.rows.map(row => row[0]).reverse().join(""), "", ""]
    newShape[1] = newShape[1].concat(this.rows[2][1])
    newShape[1] = newShape[1].concat(this.rows[1][1])
    newShape[1] = newShape[1].concat(this.rows[0][1])
    newShape[2] = newShape[2].concat(this.rows[2][2])
    newShape[2] = newShape[2].concat(this.rows[1][2])
    newShape[2] = newShape[2].concat(this.rows[0][2])
    return newShape.join(`\n`).concat(`\n`)
  }
}