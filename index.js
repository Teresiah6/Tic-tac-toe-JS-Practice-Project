const cells = document.querySelectorAll(".cell");
const statusText= document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
// two dimensional array of indices
const winConditions= [
  [0, 1, 2],
  [3, 4, 5],
  [6,7,8],
  [0, 3,6],
  [1,4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
// Array of place holders ie empty grid
// array of empty strings 
let options = ["", "", "", "", "", "", "", "", ""];
//keep track of current player
let currentPlayer = "X";
//boolean to keep track of if game is running
let running = false; 

initializeGame();

//functions
//setting up before starting
function initializeGame(){
  cells.forEach(cell=>cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked(){
  //create local varibale equal to this referring to cell clicked 
  const cellIndex = this.getAttribute("cellIndex"); // cell index attribute from teh html
  //check if empty
  if(options[cellIndex] != "" ||  !running){
    return;
  }
  updateCell(this, cellIndex);
 //changePlayer();
  checkWinner();


}
function updateCell(cell, index ){
  //the option at the index is set as current player
  options[index] = currentPlayer;
  cells.textContent = currentPlayer;
  console.log('X');


}
function changePlayer(){
  currentPlayer = (currentPlayer == 'X') ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
  console.log('O');

}
function checkWinner(){
  //temporary var
  let roundWon = false;
  //iterate over each inner array of win conditions until we find area where someone won so ["cellA", "CellB", "CellC"]
  for(let i =0; i <winConditions.length; i++){
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    //checking for empty spaces
    if(cellA == "" || cellB =="" || cellC == ""){
      continue;
    }
    //check if aall the cells have the same character
    if(cellA ==cellB && cellB == cellC){
      //we have a winner
      roundWon = true;
      break;
    }
  }
  if(roundWon){
    // update status text
    statusText.textContent = `${currentPlayer} wins`;
    running = false;
  }
  //if doesn't include anty spaces it means there is a draw
  else if(!options.includes("")){
    statusText.textContent = `There's a draw`;
    running = false;

  }
  else{
    changePlayer();
  }

}
function restartGame(){
  currentPlayer = "X";
  let options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent == `${currentPlayer}'s turn`;
  //clear cells
  cells.forEach(cell => cell.textContent= "");
  running = true;

}
