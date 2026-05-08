export class ShuffleBag {
  constructor(tetrominoes) {
    this.tetrominoes = tetrominoes;
  }

  next() {
    return this.tetrominoes[0];
  }
}