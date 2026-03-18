export class RotatingShape {
  constructor() {
    this.shape = ""
  }

  static fromString(value) {
    this.shape = value.split(`\n`).map((row) => row.trim()).join(`\n`).concat`\n`

    console.log(this.shape)

    return this.shape
  }
}