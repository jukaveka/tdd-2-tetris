export function setBoardState(board, falling, settled, tetromino) {
  const newBoard = board;

  newBoard.falling = falling;
  newBoard.settled = settled;
  newBoard.tetromino = tetromino;
  newBoard.shapeArea = newBoard.determineShapeArea(tetromino);

  for(let row = 0; row < newBoard.height; row++) {
    for(let column = 0; column < newBoard.width; column++) {
      const square = {row, column};
      if (newBoard.settledSquare(square) || newBoard.fallingSquare(square)) {
        newBoard.replaceAtPosition(row, column, "X");
      }
    }
  }

  return newBoard;
}