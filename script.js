const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let winningCells = []; 

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
    
    cells.forEach(cell => {
        cell.style.backgroundColor = "";
        cell.style.color = "";
    });
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        if (!running) {
            this.style.animation = "shake 0.5s";
            setTimeout(() => {
                this.style.animation = "";
            }, 500);
        }
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
    cell.style.animation = "pop 0.3s";
    setTimeout(() => {
        cell.style.animation = "";
    }, 300);
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            winningCells = condition; // Store winning cells
            break;
        }
    }

    if(roundWon){
        highlightWinningCells();
        statusText.textContent = `${currentPlayer} wins!`;
        statusText.style.color = "#2ecc71"; 
        running = false;
        animateGameOver("win");
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        statusText.style.color = "#e74c3c"; 
        running = false;
        animateGameOver("draw");
    }
    else{
        changePlayer();
    }
}

function highlightWinningCells() {
    winningCells.forEach(index => {
        cells[index].style.backgroundColor = "#2ecc71";
        cells[index].style.color = "white";
    });
}

function animateGameOver(result) {
    const gameContainer = document.querySelector(".gameConatiner");
    gameContainer.classList.add("game-over");
    
    if (result === "win") {
        cells.forEach(cell => {
            if (!winningCells.includes(parseInt(cell.getAttribute("cellIndex")))) {
                cell.style.opacity = "0.6";
            }
        });
    } else {
        
        cells.forEach(cell => {
            cell.style.backgroundColor = "#e74c3c";
            cell.style.color = "white";
            cell.style.opacity = "0.6";
        });
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    statusText.style.color = ""; 
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "";
        cell.style.color = "";
        cell.style.opacity = "";
    });
    document.querySelector(".gameConatiner").classList.remove("game-over");
    running = true;
    winningCells = [];
};