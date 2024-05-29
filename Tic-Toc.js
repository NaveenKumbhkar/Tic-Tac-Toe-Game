const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGamebtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

let winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

initFunction();

function initFunction(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box ,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box-${index+1}`;
    });
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}  

function turnSwap(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Currnet Player - ${currentPlayer}`;
}

function checkGameOver(){
    let ans = "";
    winningPosition.forEach((position) => {
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
    && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]] ))
    {
        if(gameGrid[position[0]] === "X"){
            ans = "X";
        }
        else{
            ans = "O";
        }

        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        });

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
    });
    
    if(ans !== ""){
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGamebtn.classList.add("active");
        return;
    }

    let count = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            count++;
        }
    });

    if(count === 9){
        gameInfo.innerText = `Game Tied !!!`;
        newGamebtn.classList.add("active");
    }

}

function handleGame(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        if(currentPlayer === "O"){
            boxes[index].classList.add("O");
        }
        else{
            boxes[index].classList.remove("O");
        }
       
        boxes[index].style.pointerEvents = "none";
        turnSwap();
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleGame(index);
    });
});

newGamebtn.addEventListener("click",initFunction);