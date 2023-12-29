import allShips from "./index.js"

export default function createGameBoard(){
    const battleship = document.getElementsByClassName("battleship-app")[0];

    const gamePlay = document.createElement("div")
    gamePlay.className = "game-play";

    const empire = createEmpireBoard();
    const rebels = createRebelBoard();
    gamePlay.append(empire, rebels);
    battleship.append(gamePlay);

}

function createEmpireBoard(){

    const empire = document.createElement("div")
    empire.className = "empire"

    const empireHeader = document.createElement("h1");
    empireHeader.className = "empire-header";
    empireHeader.textContent = "EMPIRE";

    const empireGrid = document.createElement("div");
    empireGrid.className = "empire-grid";
    
    let empireGridContainer = allShips.playerGrid;
    empireGridContainer.classList.add("em");

    empireGrid.append(empireGridContainer);
    empire.append(empireHeader, empireGrid);
    return empire;

}

function createRebelBoard(){

    const rebel = document.createElement("div")
    rebel.className = "rebels"

    const rebelHeader = document.createElement("h1");
    rebelHeader.className = "rebels-header";
    rebelHeader.textContent = "REBELS";

    const rebelGrid = document.createElement("div");
    rebelGrid.className = "rebel-grid";
    
    let rebelGridContainer =  document.createElement("div");
    rebelGridContainer.className = "rb grid-container";
    rebelGridContainer.id = "enemy-grid";

    for (let i = 1; i <= 100; i++){
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        rebelGridContainer.append(cell);

    }
    rebelGrid.append(rebelGridContainer);
    rebel.append(rebelHeader, rebelGrid);
    return rebel;
}

