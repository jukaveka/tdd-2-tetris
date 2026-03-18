export class RotatingShape {
  constructor() {
    this.rows = []
  }

  static fromString(value) {
    const shape = new RotatingShape()
    shape.rows = value.split(`\n`).map((row) => row.trim())

    return shape
  }

  static fromArray(value) {
    const shape = new RotatingShape()
    shape.rows = value

    return shape
  }

  toString() {
    return this.rows.join(`\n`).concat(`\n`)
  }

  rotateRight() {
    let rotatedRows = []
    for (let i = 0; i < this.rows.length; i++) {
       rotatedRows.push(this.rows.map(row => row[i]).reverse().join(""))
    }

    return RotatingShape.fromArray(rotatedRows)
  }

  rotateLeft() {
    let rotatedRows = ["", "", ""]
    rotatedRows[0] = this.rows.map((row) => row[2]).join("")
    rotatedRows[1] = rotatedRows[1].concat(this.rows[0][1])
    rotatedRows[1] = rotatedRows[1].concat(this.rows[1][1])
    rotatedRows[1] = rotatedRows[1].concat(this.rows[2][1])
    rotatedRows[2] = rotatedRows[2].concat(this.rows[0][0])
    rotatedRows[2] = rotatedRows[2].concat(this.rows[1][0])
    rotatedRows[2] = rotatedRows[2].concat(this.rows[2][0])
    return rotatedRows.join("\n").concat("\n")
  }
}