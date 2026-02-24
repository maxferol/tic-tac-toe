const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

let currentPlayer = CROSS;

function cellClickHandler(row, col) {
    if (isGameOver) {
        return;
    }
    if (field[row][col] !== 0) {
        return;
    }

    renderSymbolInCell(currentPlayer, row, col);
    field[row][col] = currentPlayer;
    checkWin(field);
    currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
}


function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

// task 8
function resetClickHandler() {
    field = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    isGameOver = false;
    currentPlayer = CROSS;
    renderGrid(3);
}

// Ставит в случайное место -1 //task 10
function crossZeroRobot(field) {
    let row = Math.floor(Math.random() * field.length);
    let col = Math.floor(Math.random() * field.length);
    while (field[row][col] != 0) {
        row = Math.floor(Math.random() * field.length);
        col = Math.floor(Math.random() * field.length);
    }
    field[row][col] = -1;
    renderSymbolInCell(ZERO, row, col);
}


//task 4 - 5
let isGameOver = false;

function checkWin(field) {
    const size = field.length;
    let winner = null;
    let winCoords = [];

    for (let i = 0; i < size; i++) {
        if (field[i][0] !== 0 && field[i].every(val => val === field[i][0])) {
            winner = field[i][0];
            winCoords = field[i].map((_, j) => [i, j]);
        }
        if (field[0][i] !== 0 && field.every(row => row[i] === field[0][i])) {
            winner = field[0][i];
            winCoords = field.map((_, j) => [j, i]);
        }
    }

    if (field[0][0] !== 0 && field.every((row, i) => row[i] === field[0][0])) {
        winner = field[0][0];
        winCoords = field.map((_, i) => [i, i]);
    }
    if (field[0][size - 1] !== 0 && field.every((row, i) => row[size - 1 - i] === field[0][size - 1])) {
        winner = field[0][size - 1];
        winCoords = field.map((_, i) => [i, size - 1 - i]);
    }

    if (winner) {
        isGameOver = true;
        alert('Победил ' + winner);
        winCoords.forEach(([r, c]) => {
            findCell(r, c).style.color = 'red';
        });
        return winner;
    }

    if (field.every(row => row.every(cell => cell !== 0))) {
        isGameOver = true;
        alert('Победила дружба');
        return 'draw';
    }

    return null;
}





/* Test Function */
/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
