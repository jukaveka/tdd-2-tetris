const T_SHAPE_ORIENTATIONS = [
  [`....`, `TTT.`, `.T..`, `....`],
  [`.T..`, `TT..`, `.T..`, `....`],
  [`....`, `.T..`, `TTT.`, `....`],
  [`.T..`, `.TT.`, `.T..`, `....`]
];
const I_SHAPE_ORIENTATIONS = [
  [`....`, `IIII`, `....`, `....`],
  [`..I.`, `..I.`, `..I.`, `..I.`]
];
const O_SHAPE_ORIENTATIONS = [
  [`....`, `.OO.`, `.OO.`, `....`]
];
const L_SHAPE_ORIENTATIONS = [
  [`....`, `LLL.`, `L...`, `....`],
  [`LL..`, `.L..`, `.L..`, `....`],
  [`....`, `..L.`, `LLL.`, `....`],
  [`.L..`, `.L..`, `.LL.`, `....`]
]

export class Tetromino {
  constructor(currentOrientation, orientations, character) {
    this.currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.orientations = orientations;
    this.character = character;
  }

  static T_SHAPE = Tetromino.create(T_SHAPE_ORIENTATIONS, 0, "T");
  static I_SHAPE = Tetromino.create(I_SHAPE_ORIENTATIONS, 0, "I");
  static O_SHAPE = Tetromino.create(O_SHAPE_ORIENTATIONS, 0, "O");
  static L_SHAPE = Tetromino.create(L_SHAPE_ORIENTATIONS, 0, "L")
  static SINGLE_BLOCK(character) {
    const row = [[character]];
    return Tetromino.create(row, 0, character);
  }

  static create(shapeOrientations, currentOrientation, character) {
    let orientations = new Array();

    shapeOrientations.forEach((orientation) => {
      const orientationRows = orientation
      orientations.push(orientationRows)
    })

    return new Tetromino(currentOrientation, orientations, character);
  }

  current() {
    return this.orientations[this.currentOrientation];
  }

  toString() {
    return this.orientations[this.currentOrientation].join("\n").concat("\n");
  }

  rotateRight() {
    return new Tetromino(this.currentOrientation + 1, this.orientations, this.character);
  }

  rotateLeft() {
    return new Tetromino(this.currentOrientation - 1, this.orientations, this.character);
  }
}
