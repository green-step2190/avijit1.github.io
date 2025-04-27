// Variables for the game state
let currentPlayer = 'X';
let gameBoard = ['','','','','','','','',''];
let gameId = ''; // Will store the generated game ID

// Function to create a random 6-character Game ID
function generateGameId() {
  return Math.random().toString(36).substring(2, 8); // Generates a random 6-character ID
}

// Function to create a new game
function createGame() {
  gameId = generateGameId();  // Generates a new game ID
  alert(`Game created! Share this game ID: ${gameId}`);
  localStorage.setItem('gameId', gameId);  // Store the game ID in localStorage
  document.getElementById('gameIdDisplay').innerText = `Game ID: ${gameId}`; // Display the game ID
  resetGame();
}

// Function to join a game by entering the Game ID
function joinGame() {
  const enteredGameId = document.getElementById('joinGameIdInput').value;
  if (enteredGameId === gameId) {
    alert(`Joining game with ID: ${gameId}`);
    loadGame();
  } else {
    alert('Invalid Game ID. Please try again.');
  }
}

// Function to reset the game board
function resetGame() {
  gameBoard = ['','','','','','','','',''];
  currentPlayer = 'X';
  renderBoard();
}

// Function to render the game board
function renderBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = ''; // Clear the board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.innerText = gameBoard[i];
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
  }
}

// Handle click event for each cell
function handleClick(index) {
  if (gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    renderBoard();
    checkWinner();
  }
}

// Function to check if there's a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      alert(`${gameBoard[a]} wins!`);
      resetGame();
      return;
    }
  }

  if (!gameBoard.includes('')) {
    alert('It\'s a tie!');
    resetGame();
  }
}

// Initialize the game board
renderBoard();
