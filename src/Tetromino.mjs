import { RotatingShape } from "./RotatingShape.mjs";

const T_SHAPE_ROWS = [`.T.`, `TTT`, `...`];

export class Tetromino {
  constructor(rows) {
    this.shape = RotatingShape.fromArray(rows);
  }

  static T_SHAPE = new Tetromino(T_SHAPE_ROWS);

  toString() {
    return this.shape.toString();
  }

  rotateRight() {
    return this.shape.rotateRight();
  }

  rotateLeft() {
    return this.shape.rotateLeft();
  }
}
