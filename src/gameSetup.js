export default function createGameSetup(){
    
    const battleship = document.getElementsByClassName("battleship-app")[0];

    const gameSetup = document.createElement("div")
    gameSetup.className = "game-setup"


    const rotate = document.createElement("button")
    rotate.className = "rotate";
    rotate.dataset.axis = "x-axis";
    rotate.textContent = "Rotate";

    const rotateInfo = document.createElement("div")
    rotateInfo.className = "rotate-info";
    rotateInfo.dataset.axis = "x-axis";
    rotateInfo.textContent = "Click button to rotate ship";

    let gameboard = createBoardGrid();


    gameSetup.append(rotate, rotateInfo, gameboard);
    battleship.append(gameSetup)

    // console.log(battleship);
}    
function createBoardGrid(){
    
    const gameBoard = document.createElement("div");
    gameBoard.className = "gameboard";

    const grid = document.createElement("div");
    grid.id = "grid";
    grid.className = "grid-container";

    for (let i = 1; i <= 100; i++){
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        grid.append(cell);

    }
    let ships = createShips();

    const reset = document.createElement("button")
    reset.id = "reset"
    reset.className = "reset"
    reset.textContent = "Reset"

    const submit = document.createElement("button")
    submit.id = "submit"
    submit.className = "submit"
    submit.textContent = "Submit"

    gameBoard.append(grid, ships, reset, submit);

    return gameBoard;
}

function createShips(){

    const ships = document.createElement("div");
    ships.className = "ships";

    const mf = document.createElement("card");
    mf.className = "card active";
    mf.dataset.shiplength = "2"
    mf.dataset.shiptype = "millfalc"

    const mfImg = document.createElement("img");
    mfImg.src = "./images/ships/millfalc.png";

    const mfDiv = document.createElement("div");
    mfDiv.textContent = "Millenium Falcon (2)";

    mf.append(mfImg, mfDiv);

    const tf = document.createElement("card");
    tf.className = "card";
    tf.dataset.shiplength = "3"
    tf.dataset.shiptype = "tiefighter"

    const tfImg = document.createElement("img");
    tfImg.src = "./images/ships/tiefighter.png";

    const tfDiv = document.createElement("div");
    tfDiv.textContent = "Tie Fighter (3)";

    tf.append(tfImg, tfDiv);

    const ls = document.createElement("card");
    ls.className = "card";
    ls.dataset.shiplength = "3"
    ls.dataset.shiptype = "landspeeder"

    const lsImg = document.createElement("img");
    lsImg.src = "./images/ships/landspeeder.png";

    const lsDiv = document.createElement("div");
    lsDiv.textContent = "X-34 (3)";

    ls.append(lsImg, lsDiv);

    const xw = document.createElement("card");
    xw.className = "card";
    xw.dataset.shiplength = "2"
    xw.dataset.shiptype = "xwing"

    const xwImg = document.createElement("img");
    xwImg.src = "./images/ships/x-wing.png";

    const xwDiv = document.createElement("div");
    xwDiv.textContent ="X-Wing (2)";

    xw.append(xwImg, xwDiv);

    const yw = document.createElement("card");
    yw.className = "card";
    yw.dataset.shiplength = "2"
    yw.dataset.shiptype = "ywing"

    const ywImg = document.createElement("img");
    ywImg.src = "./images/ships/y-wing.png";

    const ywDiv = document.createElement("div");
    ywDiv.textContent ="Y-Wing (2)";

    yw.append(ywImg, ywDiv);

    ships.append(mf, tf, ls, xw, yw);
    return ships;
}



