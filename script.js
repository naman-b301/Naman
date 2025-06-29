let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let vsComputer = false;

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const statusDisplay = document.getElementById('status');
const gameBoard = document.getElementById('game-board');

function setMode(mode) {
  vsComputer = (mode === 'computer');
  resetGame();
  gameActive = true;
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;
  renderBoard();
}

function renderBoard() {
  gameBoard.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleCellClick(index));
    gameBoard.appendChild(cellElement);
  });
}

function handleCellClick(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWinner()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  } else if (!board.includes("")) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;

  if (vsComputer && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let emptyIndices = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  handleCellClick(randomIndex);
}

function checkWinner() {
  return winningConditions.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;
  renderBoard();
}
