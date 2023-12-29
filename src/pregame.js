import {
    createGameSetup,
    toggleShips,
    addHoverEvent,
    rotateEvent,
    resetGrid,
    submitGrid} from "./index.js"

export default function addPregame(){

    const battleship = document.getElementsByClassName("battleship-app")[0];

    const pregame = document.createElement("div")
    pregame.className = "pregame-section"
    const title = document.createElement("h1")
    title.className = "title"
    title.textContent = "Battleship"
    
    const nameForm = document.createElement("div")
    nameForm.className = "name-form"
    const nameInput  = document.createElement("input")
    nameInput.type = "text"
    nameInput.className = "name-input"
    nameInput.id = "name-input"
    nameInput.placeholder = "Player name"
    nameInput.maxLength = "15"
    nameInput.name = "name-input"

    const inputBorder  = document.createElement("span")
    inputBorder.className = "input-border"

    const enterGame  = document.createElement("button")
    enterGame.className = "enter-game"
    enterGame.textContent = "Enter Game";
    enterBattleship(enterGame);
    
    nameForm.append(nameInput, inputBorder)
    pregame.append(title, nameForm, enterGame)
    battleship.append(pregame)
}


function enterBattleship(enterGame){

    enterGame.addEventListener("click", () => {
        console.log("enters");
        const battleship = document.getElementsByClassName("battleship-app")[0];
        battleship.textContent = "";  
        createGame();

    });
}


function createGame(){
    createGameSetup();
    toggleShips();
    addHoverEvent();
    rotateEvent();
    resetGrid();
    submitGrid();
}