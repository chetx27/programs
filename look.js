const cells = document.querySelectorAll(".cell");
const winnerMessage = document.getElementById("winnerMessage");
const restartButton = document.getElementById("restartButton");
let currentPlayer = "X";
let board = Array(9).fill(null);
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (board[index] || winnerMessage.textContent) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWinner()) {
        winnerMessage.textContent = `Player ${currentPlayer} Wins!`;
    } else if (board.every(cell => cell)) {
        winnerMessage.textContent = "It's a Tie!";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWinner() {
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === currentPlayer)
    );
}
function restartGame() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    winnerMessage.textContent = "";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);
