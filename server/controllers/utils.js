const drawGame = board => {
  const occupiedSquares = board.filter(square => { if (square) return square }).length;
  return occuppiedSquares > 8 ? true : false;
};


const isWinner = board => {
  if (checkRow(board)) {
    return checkRow(board);
  }
  if (checkColumn(board)) {
    return checkColumn(board);
  }
  if (checkDiagonal(board)) {
    return checkDiagonal(board);
  }
  return false;
};


function checkRow(board) {
  const topRowWinner = (board[0] === board[1] && board[1] === board[2]);
  const middleRowWinner = (board[3] === board[4] && board[4] === board[5]);
  const bottomRowWinner = (board[6] === board[7] && board[7] === board[8]);
  if (topRowWinner) {
    return [0, 1, 2];
  }
  if (middleRowWinner) {
    return [3, 4, 5];
  }
  if (bottomRowWinner) {
    return [6, 7, 8];
  }
  return false;
};


function checkColumn(board) {
  const leftColumn = (board[0] === board[3] && board[3] === board[6]);
  const middleColumn = (board[1] === board[4] && board[4] === board[7]);
  const rightColumn = (board[2] === board[5] && board[5] === board[8]);
  if (leftColumn) {
    return [0, 3, 6];
  }
  if (middleColumn) {
    return [1, 4, 7];
  }
  if (rightColumn) {
    return [2, 5, 8];
  }
  return false;
};


function checkDiagonal(board) {
  const majorDiagonal = (board[2] === board[4] && board[4] === board[6]);
  const minorDiagonal = (board[0] === board[4] && board[4] === board[8]);
  if (majorDiagonal) {
    return [2, 4, 6];
  }
  if (minorDiagonal) {
    return [0, 4, 8];
  }
  return false;
};


module.exports = {
  drawGame,
  isWinner
};