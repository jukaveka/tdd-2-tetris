import { RotatingShape } from "./RotatingShape.mjs";

const T_SHAPE_ROWS = [`.T.`, `TTT`, `...`];
const I_SHAPE_ROWS = [`.....`, `.....`, `IIII.`, `.....`, `.....`]

export class Tetromino {
  constructor(currentOrientation, orientations) {
    this.currentOrientation = currentOrientation
    this.orientations = orientations
  }

  static T_SHAPE = Tetromino.create(T_SHAPE_ROWS, 4, 0);
  // static I_SHAPE = new Tetromino(I_SHAPE_ROWS);

  static create(rows, options, current) {
    const shape = RotatingShape.fromArray(rows)
    const orientations = [
      shape,
      shape.rotateRight(),
      shape.rotateRight().rotateRight(),
      shape.rotateLeft()
    ].slice(0, options)
    console.log(orientations)
    return new Tetromino(current, orientations)
  }

  toString() {
    return this.orientations[this.currentOrientation].toString();
  }

  rotateRight() {
    return new Tetromino(this.currentOrientation + 1, this.orientations);
  }

  rotateLeft() {
    return this.shape.rotateLeft();
  }
}