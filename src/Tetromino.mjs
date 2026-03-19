const T_SHAPE_ROWS = [`.T.`, `TTT`, `...`] 

export class Tetromino {
  constructor(rows) {
    this.rows = rows
  }

  static T_SHAPE = new Tetromino(T_SHAPE_ROWS)

  toString() {
    return `.T.\nTTT\n...\n`
  }
}