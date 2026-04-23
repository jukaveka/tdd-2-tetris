export function moveMultipleTimes(board, direction, count) {
  let timesMoved = 0;

  while (timesMoved < count) {
    if (direction === "right") {
      board.moveBlockRight()
    } else if (direction === "left") {
      board.moveBlockLeft()
    } else if (direction === "down") {
      board.moveBlockDown()
    } else {
      throw Error("No direction matched for moving block")
    }

    timesMoved++
  }
};