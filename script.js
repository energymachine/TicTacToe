// JavaScript code for Tic-Tac-Toe game functionality

const X_CLASS = 'x';
const O_CLASS = 'o';
let currentPlayer = X_CLASS;
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const winnerModal = document.getElementById('winnerModal');
const winnerMessage = document.getElementById('winnerMessage');
const newGameButton = document.getElementById('newGameButton');
const restartButton = document.getElementById('restartButton');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

// Function to start the game
function startGame() {
    currentPlayer = X_CLASS;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.textContent = ''; // Clear any existing X or O marks
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    statusDisplay.textContent = `${currentPlayer.toUpperCase()}'s Turn`;
}

// Function to handle cell click
function handleClick(event) {
    const cell = event.target;
    const index = Array.from(cell.parentNode.children).indexOf(cell);

    // Place mark
    placeMark(cell, index);

    // Check for win
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        // Switch player
        currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
        statusDisplay.textContent = `${currentPlayer.toUpperCase()}'s Turn`;
        setBoardHoverClass();
    }
}

// Function to place mark
function placeMark(cell, index) {
    cell.classList.add(currentPlayer);
    cell.innerHTML = `<span class="${currentPlayer}-mark"> ${currentPlayer.toUpperCase()} </span>`; // Display X or O in the cell
}

// Function to check for win
function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(player);
        });
    });
}

// Function to check for draw
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

// Function to end the game
function endGame(draw) {
    if (draw) {
        statusDisplay.textContent = 'Draw!';
        openModal('It\'s a Draw!');
    } else {
        statusDisplay.textContent = `${currentPlayer.toUpperCase()} Wins!`;
        openModal(`${currentPlayer.toUpperCase()} Wins!`);
    }
}

// Function to set hover class based on current player
function setBoardHoverClass() {
    document.body.classList.remove(X_CLASS);
    document.body.classList.remove(O_CLASS);
    document.body.classList.add(currentPlayer);
}

// Function to open the winner modal
function openModal(message) {
    winnerMessage.textContent = message;
    winnerModal.style.display = 'block';
}

// Function to close the winner modal
winnerModal.onclick = function(event) {
    if (event.target === winnerModal) {
        winnerModal.style.display = 'none';
    }
}

// Function to start a new game
newGameButton.onclick = function() {
    winnerModal.style.display = 'none';
    startGame(); // Start a new game
}
