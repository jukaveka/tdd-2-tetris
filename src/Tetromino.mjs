import { RotatingShape } from "./RotatingShape.mjs";

const T_SHAPE_ROWS = [`.T.`, `TTT`, `...`];
const I_SHAPE_ROWS = [`.....`, `.....`, `IIII.`, `.....`, `.....`];
const O_SHAPE_ROWS = [`.OO`, `.OO`, `...`];

export class Tetromino {
  constructor(currentOrientation, orientations) {
    this.currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.orientations = orientations;
  }

  static T_SHAPE = Tetromino.create(T_SHAPE_ROWS, 4, 0);
  static I_SHAPE = Tetromino.create(I_SHAPE_ROWS, 2, 0);
  static O_SHAPE = Tetromino.create(O_SHAPE_ROWS, 1, 0);
  static SINGLE_BLOCK(character) {
    const row = [character];
    return Tetromino.create(row, 1, 0);
  }

  static create(rows, options, current) {
    const shape = RotatingShape.fromArray(rows);
    const orientations = [shape, shape.rotateRight(), shape.rotateRight().rotateRight(), shape.rotateLeft()].slice(
      0,
      options
    );
    return new Tetromino(current, orientations);
  }

  current() {
    return this.orientations[this.currentOrientation].rows;
  }

  toString() {
    return this.orientations[this.currentOrientation].toString();
  }

  rotateRight() {
    return new Tetromino(this.currentOrientation + 1, this.orientations);
  }

  rotateLeft() {
    return new Tetromino(this.currentOrientation - 1, this.orientations);
  }
}
