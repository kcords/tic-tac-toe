

//! Square listener
const pieces = document.querySelectorAll('.square');

pieces.forEach( piece => {
  piece.addEventListener('click', e => {
    let row = e.target.classList[1];
    let col = e.target.classList[2];
    e.target.innerText = setPiece(row, col);
  })
})

//! Piece placement
const setPiece = (row, col) => {
  if (!board[row][col] && !gameOver) {
    let placedPiece = currentPlayer;
    board[row][col] = placedPiece;
    gameOver = checkScore();
    document.getElementById('score').innerText =
      gameOver ? `${currentPlayer} has won the game!` : '';
    !gameOver ? togglePlayer() : null;
    return placedPiece;
  }
  return board[row][col];
}

//! Current Player
let currentPlayer = 'X';

const togglePlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  document.getElementById('player').innerText = currentPlayer;
}

//! Score Checker

let gameOver = false;

//checks each row/col to see if all values are same and not empty
const checkScore = () => {
  const rowOne = [board.r1.c1, board.r1.c2, board.r1.c3]
    .every( (v, i, a) => v && v === a[0] );
  const rowTwo = [board.r2.c1, board.r2.c2, board.r2.c3]
    .every( (v, i, a) => v && v === a[0] );
  const rowThree = [board.r3.c1, board.r3.c2, board.r3.c3]
    .every( (v, i, a) => v && v === a[0] );
  const colOne = [board.r1.c1, board.r2.c1, board.r3.c1]
    .every( (v, i, a) => v && v === a[0] );
  const colTwo = [board.r1.c2, board.r2.c2, board.r3.c2]
    .every( (v, i, a) => v && v === a[0] );
  const colThree = [board.r1.c3, board.r2.c3, board.r3.c3]
    .every( (v, i, a) => v && v === a[0] );
  const diagL = [board.r1.c1, board.r2.c2, board.r3.c3]
    .every( (v, i, a) => v && v === a[0] );
  const diagR = [board.r1.c3, board.r2.c2, board.r3.c1]
    .every( (v, i, a) => v && v === a[0] );

  return rowOne || rowTwo || rowThree
    || colOne || colTwo || colThree
    || diagR || diagL;
}

//! Board Reset
document.getElementById('reset')
  .addEventListener('click', () => {
    console.log('reset initiated')
    board = newBoard();
    pieces.forEach( piece => {
      piece.innerText = '';
    })
    currentPlayer = 'X';
    document.getElementById('player').innerText = currentPlayer;
    document.getElementById('score').innerText = '';
    gameOver = false;
  })

//! Board initialization
const newBoard = () => {
  return {
    r1: {c1: '', c2: '', c3: ''},
    r2: {c1: '', c2: '', c3: ''},
    r3: {c1: '', c2: '', c3: ''}
  }
}

let board = newBoard();