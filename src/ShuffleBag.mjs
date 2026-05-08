export class ShuffleBag {
  constructor(tetrominoes) {
    this.tetrominoes = tetrominoes;
    this.shuffled = new Array();
  }

  next() {
    if (this.shuffled.length === 0) {
      this.shuffled = this.shuffle(this.tetrominoes);
    }
    const tetromino = this.shuffled[0];
    this.shuffled = this.shuffled.toSpliced(0, 1);
    return tetromino;
  }

  shuffle() {
    let tetrominoesLeft = this.tetrominoes;
    let shuffledTetrominoes = new Array(this.tetrominoes.length);
    for (let count = 0; count < this.tetrominoes.length; count++) {
      const index = Math.floor(Math.random() * ((tetrominoesLeft.length - 1) + 1));
      const tetromino = tetrominoesLeft[index];
      shuffledTetrominoes[count] = tetromino
      tetrominoesLeft = tetrominoesLeft.toSpliced(index, 1);
    };

    return shuffledTetrominoes;
  }
}