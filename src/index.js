import addPregame from "./pregame";
import createGameSetup from "./gameSetup";

const enemyGameboard = (() => {

    let board = []
    let count = 0;

    for (let row = 0; row < 100; row++){
        board.push("");
    }

    const getBoard = () => board;

    const getField = (row) => {
        return board[row];
    };


    const setField = (row, className) => {
        if (board[row] == ""){
            board[row] = className;
        }
    };

    const getScore = () => {
        return count;
    };

    const updateScore = () => {
        count++;
    };

    const hit = (ship) => {
        enemyShips[ship].hit++;
    };

    const isSunk = (ship) => {
        return enemyShips[ship].hit == enemyShips[ship].length;
    };


    const reset = () => {
        for (let row = 0; row < 100; row++){
            board[row] = "";
            
        }
        count = 0;
        enemyShips.ships = [];
        resetHits();
    }
    
    return {getBoard, getField, setField, getScore, updateScore, hit, isSunk, reset}

})();



const playerGameboard = (() => {

    let board = []
    let count = 0 

    for (let row = 0; row < 100; row++){
        board.push("");
    }

    const getBoard = () => board;

    const getField = (row) => {
        return board[row];
    };


    const setField = (row, className) => {
        if (board[row] == ""){
            board[row] = className;
        }
    };

    const getScore = () => {
        return count;
    };

    const updateScore = () => {
        count++;

    };

    const reset = () => {
        for (let row = 0; row < 100; row++){
            board[row] = "";
            
        }
        count = 0;
        allShips.ships = []

    };

    return {getBoard, getField, setField, getScore, updateScore, reset}

})();


let allShips = {
    mf:{
        className: "",
        top: "",
        left: ""
    },
    tf:{
        className: "",
        top: "",
        left: ""
    },
    ls:{
        className: "",
        top: "",
        left: "",
    },
    xw:{
        className: "",
        top: "",
        left: ""
    },
    yw:{
        className: "",
        top: "",
        left: ""
    },
    ships: [],
    playerGrid: "",
    boardPieces: 0

}



let enemyShips = {
    mf:{
        className: "",
        top: "",
        left: "",
        spots: [], 
        length: 2,
        hit: 0,
        isSunk: false
    },
    tf:{
        className: "",
        top: "",
        left: "",
        spots: [],
        length: 3,
        hit: 0,
        isSunk: false

    },
    ls:{
        className: "",
        top: "",
        left: "",
        spots: [],
        length: 3,
        hit: 0,
        isSunk: false
    },
    xw:{
        className: "",
        top: "",
        left: "",
        spots: [],
        length: 2,
        hit: 0,
        isSunk: false
    },
    yw:{
        className: "",
        top: "",
        left: "",
        spots: [],
        length: 2,
        hit: 0,
        isSunk: false
    },
    ships: []

}


function resetGame(){
    enemyGameboard.reset();
    playerGameboard.reset();
    const battleship = document.getElementsByClassName("battleship-app")[0];
    battleship.textContent = "";
    addPregame();

}

function restartGame(){
    document.getElementById("restart").addEventListener("click", restartBtn, false);
}

function restartBtn(){
    resetGame();
}




function checkWinner(){
    let enemyScore = enemyGameboard.getScore();
    let playerScore = playerGameboard.getScore();
    return enemyScore == 12 || playerScore == 12
}

function getWinner(){

    if (checkWinner()){
        let enemyScore = enemyGameboard.getScore();
        let playerScore = playerGameboard.getScore();
        if (enemyScore > playerScore){
            return "empire"
        }
        else{
            return "rebels"
        }
    }
}

function createUIHit(color){
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute("width", "14");
    svg.setAttribute("height", "14");
    let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute("cx", "7");
    circle.setAttribute("cy", "7");
    circle.setAttribute("r", "7");
    circle.setAttribute("fill", color);
    svg.append(circle);
    return svg;
}


function clickEnemyEvent(){
    document.getElementById("enemy-grid").addEventListener("click", clickEnemyGrid, false);

}




async function clickEnemyGrid(e){
    if (e.target.classList.contains('cell') && !e.target.classList.contains('disabled') && !e.target.disabled){
        disableUI();
        showWaitingIndicator();
        e.target.classList.add("disabled");
        let index = Number(e.target.dataset.index);
        let ship = enemyGameboard.getField(index-1)
        if (ship){
            let svg = createUIHit("#e61e1e");
            e.target.append(svg);
            enemyGameboard.hit(ship);
            showEnemyShip(ship);
            enemyGameboard.updateScore(); //if player hits enemyboard update score


        }
        else{
            let svg = createUIHit("#19a6db");
            e.target.append(svg);

        }
        if (checkWinner()){
            let winner = getWinner()
            createModal(winner);
            restartGame();
            return;
        }
        
        else{
            try{
                await delay(500);
                await waitForOtherPlayer();
                enableUI();
                hideWaitingIndicator();
    
            }
            catch (error){
                console.error('Error while waiting for the other player:', error);
                enableUI();
                hideWaitingIndicator();
            }

        }
       
    }

}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function disableUI() {
    // Disable grid
    var nodes = document.getElementById("enemy-grid").getElementsByTagName('*');
    for(var i = 0; i < nodes.length; i++){
        nodes[i].disabled = true;
    }
  }
  
function enableUI(){
    // Enable grid
    var nodes = document.getElementById("enemy-grid").getElementsByTagName('*');
    for(var i = 0; i < nodes.length; i++){
        nodes[i].disabled = false;
    }
  }


function showWaitingIndicator(){
    document.getElementById("enemy-grid").style.cursor = "wait";
    document.body.style.cursor = 'wait';
    
}

function hideWaitingIndicator(){
    document.getElementById("enemy-grid").style.cursor = "pointer";
    document.body.style.cursor = 'auto';  
}


function waitForOtherPlayer() {
    return new Promise(resolve => {
        let data  = getComputerData();
        addPlayerSpot(data.cell, data.hit);
      setTimeout(() => {
        resolve();
      }, 100); 
    });
}
  
function getComputerData(){
    let hit = Math.floor(Math.random() * 100) + 1 //hit is anywhere between 1 -100
    let parent = document.getElementById("grid");
    let cell = parent.querySelector("[data-index='" + hit + "']")
    
    while (cell.classList.contains("hit")){
        hit = Math.floor(Math.random() * 100) + 1;
        cell = parent.querySelector("[data-index='" + hit + "']")
    }
    cell.classList.add("hit");
    return {cell, hit} 
}


function createModal(winner){

    const battleship = document.getElementsByClassName("battleship-app")[0];

    let modal = document.createElement("div");
    modal.id = "modal";
    modal.className = "modal-popup";

    let modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";

    let header = document.createElement("h3");
    header.className = "winner";
    let logo = document.createElement("div");
    logo.className = "logo";
    let img = document.createElement("img");
    if (winner == "empire"){
        header.textContent = "You win this round"
        img.src = "./images/logo/empire.png"
        img.className = "empire-logo"
    }
    else{
        header.textContent = "You lose this round"
        img.src = "./images/logo/rebel.png"
        img.className = "rebel-logo"
    }
    logo.append(img);
    let restart = document.createElement("button");
    restart.className = "restart";
    restart.textContent = "Restart"
    restart.id = "restart";

    modalContainer.append(header, logo, restart);
    modal.append(modalContainer);
    battleship.append(modal);

}

function addPlayerSpot(cell, hit){
    if (playerGameboard.getField(hit)){
        let svg = createUIHit("#e61e1e");
        playerGameboard.updateScore(); //if computer hits update score
        cell.append(svg);
        if (checkWinner()){
            let winner = getWinner();
            createModal(winner);
            restartGame();
            disableUI();
            //enable modal 
        }

    }
    else{
        let svg = createUIHit("#19a6db");  
        cell.append(svg);   
    }
}


function randomGenerator(arr){
    const randomElement = arr[Math.floor(Math.random() * arr.length)];
    return randomElement;

}


function showEnemyShip(ship){
    if (enemyGameboard.isSunk(ship)){
        let grid = document.getElementById("enemy-grid");
        let shipName = enemyShips[ship].className;
        let shipImg = grid.querySelector('.' + shipName);
        shipImg.style.display = "block";
    }
}


function resetHits(){
    let ships = ["mf", "tf", "ls", "xw", "yw"] 

    ships.forEach(ship => {
        enemyShips[ship].hit = 0;
      })
}


function generateEnemyGrid(){
    let axes = ["x-axis", "y-axis"] //randomly select axis
    let ships = [["mf", 2], ["tf", 3], ["ls", 3], ["xw", 2],["yw", 2]] //randomly select ship for placement
    let ship;
    enemyShips.ships = []

    for(var i = ships.length-1;i>= 0;i--){
        let shipIndex= Math.floor(Math.random() * ships.length); 
        let index = Math.floor(Math.random() * 100) + 1; //random move on board
        ship = ships[shipIndex]; 
        ships.splice(shipIndex, 1);

        let axis = randomGenerator(axes);



        if (axis == 'x-axis'){
            let start = index;
            let end = (start - 1) + Number(ship[1]);
            while (!availableSpots(start, end, enemyShips.ships, axis) || !checkHorizontalEdge(start, ship[1])){
                start = Math.floor(Math.random() * 100) + 1;
                end = (start - 1) + Number(ship[1]);

            }
            index = start; 
           
            while (start <= end){
                enemyShips.ships.push(start);
                enemyGameboard.setField(start-1, ship[0]);
                enemyShips[ship[0]].spots.push(start);
                start++;
            }
            addEnemyShip(index, ship[0], axis)

        }
        else{
            let start = index;
            let end = index + (10 * (Number(ship[1]) - 1))
            while (!availableSpots(start, end, enemyShips.ships, axis) || end > 100){
                start = Math.floor(Math.random() * 100) + 1;
                end = start + (10 * (Number(ship[1]) - 1))
            }
            index = start; 
            
            while (start <= end){
                enemyShips.ships.push(start);
                enemyShips[ship[0]].spots.push(start);
                enemyGameboard.setField(start-1, ship[0]);
                start = start + 10;
            }
            addEnemyShip(index, ship[0], axis);
        }

    }

}


function addEnemyShip(index, shipType, axis){
    let top = (Math.ceil(index/10) -1) * 10;
    let left = ((index - 1) % 10) * 10;
    let grid = document.getElementById("enemy-grid");
    let player = "enemy";

    if (axis == "x-axis"){
        if (shipType == "mf"){
            let src = "./images/ships/millfalc.png"
            createShipToAdd("img-enemy-mf", grid, src, top, left, player);
            enemyShips.mf.className = "img-enemy-mf";
            enemyShips.mf.top = top + "%";
            enemyShips.mf.left = left + "%";

        }
        else if  (shipType == "tf"){

            let src = "./images/ships/tiefighter.png" 
            createShipToAdd("img-enemy-tf", grid, src, top, left, player);
            enemyShips.tf.className = "img-enemy-tf";
            enemyShips.tf.top = top + "%";
            enemyShips.tf.left = left + "%";

   
            
        }
        else if  (shipType == "ls"){

            let src = "./images/ships/landspeeder.png";
            createShipToAdd("img-enemy-ls", grid, src, top, left, player);
            enemyShips.ls.className = "img-enemy-ls";
            enemyShips.ls.top = top + "%";
            enemyShips.ls.left = left + "%";

        
        }
        else if  (shipType == "xw"){

            let src = "./images/ships/x-wing.png"
            createShipToAdd("img-enemy-xw", grid, src, top, left, player);
            enemyShips.xw.className = "img-enemy-xw";
            enemyShips.xw.top = top + "%";
            enemyShips.xw.left = left + "%";
        
       
        }
        else if  (shipType == "yw"){

            let src = "./images/ships/y-wing.png";
            createShipToAdd("img-enemy-yw", grid, src, top, left, player);
            enemyShips.yw.className = "img-enemy-yw";
            enemyShips.yw.top = top + "%";
            enemyShips.yw.left = left + "%";


        }
    
    }
    else if (axis == "y-axis"){
        if (shipType == "mf"){

            let src = "./images/ships/millfalc-y.png"
            createShipToAdd("img-enemy-mf-y", grid, src, top, left, player);
            enemyShips.mf.className = "img-enemy-mf-y";
            enemyShips.mf.top = top + "%";
            enemyShips.mf.left = left + "%";

        }
        else if  (shipType == "tf"){

            let src = "./images/ships/tiefighter-y.png" 
            createShipToAdd("img-enemy-tf-y", grid, src, top, left, player);
            enemyShips.tf.className = "img-enemy-tf-y";
            enemyShips.tf.top = top + "%";
            enemyShips.tf.left = left + "%";

            
        }
        else if  (shipType == "ls"){

            let src = "./images/ships/landspeeder-y.png"
            createShipToAdd("img-enemy-ls-y", grid, src, top, left, player);
            enemyShips.ls.className = "img-enemy-ls-y";
            enemyShips.ls.top = top + "%";
            enemyShips.ls.left = left + "%";


            
        }
        else if  (shipType == "xw"){

            let src = "./images/ships/x-wing-y.png"
            createShipToAdd("img-enemy-xw-y", grid, src, top, left, player);
            enemyShips.xw.className = "img-enemy-xw-y";
            enemyShips.xw.top = top + "%";
            enemyShips.xw.left = left + "%";


 
            
        }
        else if  (shipType == "yw"){

            let src = "./images/ships/y-wing-y.png";
            createShipToAdd("img-enemy-yw-y", grid, src, top, left, player);
            enemyShips.yw.className = "img-enemy-yw-y";
            enemyShips.yw.top = top + "%";
            enemyShips.yw.left = left + "%";
    
        }
    }

}
    

function getShipLength(){
    let element = document.querySelector('.ships > .card.active');
    if (element){
        return Number(element.dataset.shiplength);}
    else{
        return 0;
    }
}


function getShipType(){
    let activeShip = document.querySelector('.ships > .card.active');
    return activeShip.dataset.shiptype;

}

function toggleShips(){
    let ships = document.querySelectorAll(".ships > *");
    ships.forEach((ship) => {
        ship.addEventListener('click', (e) => {
          var activeShip = document.querySelector(".ships> .active");
          activeShip.classList.remove('active');
          ship.classList.add('active');
        });
      });
}


function addHoverEvent(){
    document.getElementById("grid").addEventListener("mousemove", hoverShipLength, false);
    document.getElementById("grid").addEventListener("mouseout", hoverOut, false);
    document.getElementById("grid").addEventListener("click", addShip, false);

}



function rotateEvent(){
    let rotate = document.querySelector(".rotate")
    
    rotate.addEventListener("click", (e) =>{
        let currentAxis = e.target.dataset.axis;
        
        if (currentAxis == "x-axis"){
            currentAxis = "y-axis";
        }
        else{
            currentAxis = "x-axis";
        }
        e.target.dataset.axis = currentAxis;
        getAxis();
    });
    
}

function getAxis(){
    
    let rotate = document.querySelector(".rotate");
    return rotate.dataset.axis;
}

function hoverShipLength(e){
    let currentAxis = getAxis();
    let shipLength = getShipLength();


    if (e.target.classList.contains('cell') && !e.target.classList.contains('disabled')){
        document.body.style.cursor = 'grab';
        if (currentAxis == "x-axis"){
            let start = Number(e.target.dataset.index);
            let end = (start - 1) + shipLength;

            if (checkHorizontalEdge(start, shipLength)){
   
                let hoveredSpots = document.querySelectorAll('.grid-container div:nth-child(n+' + start+'):nth-child(-n+' + end + ')');
                hoveredSpots.forEach(spot => {
                    spot.setAttribute("style", "background-color:#e3ddcd")});
    
       
            }
            else{
                e.target.setAttribute("style", "background-color:#D22B2B");
                document.body.style.cursor = 'not-allowed';

            }
        
        }
        else{ 
            let index = Number(e.target.dataset.index);
            let end = index + (10 * (shipLength - 1))
            if (end <= 100){

                while (index <= end){
                    let spot = document.querySelector('.grid-container div:nth-child(n+' + index+')');
                    spot.setAttribute("style", "background-color:#e3ddcd");
                    index = index + 10;

                }
            }
            else{
                e.target.setAttribute("style", "background-color:#D22B2B;");
                document.body.style.cursor = 'not-allowed';
            }
            setLocation();
            
        }
    }
    setLocation();

}

function horizontalCells(e, shipLength){
    let start = Number(e.target.dataset.index);
    let end = (e.target.dataset.index - 1) + shipLength;
    return document.querySelectorAll('.grid-container div:nth-child(n+' + start+'):nth-child(-n+' + end + ')');
}


function hoverOut(e){
    document.body.style.cursor = 'auto';
    let shipLength = getShipLength();
    let currentAxis = getAxis();

    if (e.target.classList.contains('cell')){
        if (currentAxis == 'x-axis'){
            let hoveredSpots = horizontalCells(e, shipLength);
            hoveredSpots.forEach(spot => {
                spot.setAttribute("style", "background-color:rgba(255, 255, 255, 0.2);")

            });    
            setLocation();
        }
        else{
            let index = Number(e.target.dataset.index);
            let end = index + (10 * (shipLength - 1))
            
            while (index <= end){
                let spot = document.querySelector('.grid-container div:nth-child(n+' + index+')');
                if (spot){
                    spot.setAttribute("style", "background-color:rgba(255, 255, 255, 0.2);");
                } 
                setLocation();  
                index = index + 10;
            }

            
        }
        
    
    }
    
}


function availableSpots(start, end, arr, currentaxis){
    //checks if the spot on the grid is available or taken by other ships

    if (currentaxis == 'x-axis'){
        for (let i=start; i <= end; i++){
            if (arr.includes(i)){
                return false;
            }
        }

    }
    else{
        for (let i=start; i <= end; i += 10){
            if (arr.includes(i)){
                return false;
            }
        }
    }
    return true; 
}

function checkHorizontalEdge(start, shipLength){
    //checks if the horizontal ship is off the edge

    let totalSpots;
    if (start % 10 > 0){
        totalSpots = 10 - (start % 10) 
    }
    else{
        totalSpots = 0
        }
    
    return totalSpots >= shipLength -1
}

function addShip(e){
    let shipLength = getShipLength();
    let currentAxis = getAxis();
    let shipType = getShipType();

    if (e.target.classList.contains('cell') && !e.target.classList.contains('disabled')){
        if (currentAxis == 'x-axis'){
            let start = Number(e.target.dataset.index);
            let end = (start - 1) + shipLength;
            if (availableSpots(start, end, allShips.ships, currentAxis) && checkHorizontalEdge(start, shipLength)){
                while (start <= end){
                    allShips.ships.push(start);
                    let spot = document.querySelector('.grid-container div:nth-child(n+' + start+')');
                    spot.setAttribute("style", "background-color:rgba(255, 255, 255, 0.2);");
                    spot.classList.add("disabled");
                    playerGameboard.setField(start, shipType);
                    start++; 
                    
                }
    
                let index = Number(e.target.dataset.index);
                shipToGrid(index, shipType, currentAxis);

            }

        }
        else{

            
            let index = Number(e.target.dataset.index);
            let end = index + (10 * (shipLength - 1))
   
            if (availableSpots(index, end, allShips.ships, currentAxis) && end <= 100){
            while (index <= end){
                allShips.ships.push(index);
                let spot = document.querySelector('.grid-container div:nth-child(n+' + index+')');
                spot.setAttribute("style", "background-color:rgba(255, 255, 255, 0.2);");
                spot.classList.add("disabled");
                playerGameboard.setField(index, shipType);
                index = index + 10;
            }
            index = Number(e.target.dataset.index);
            shipToGrid(index, shipType, currentAxis);
        }
    }

    }
}

function shipToGrid(index, shipType, axis){
    let top = (Math.ceil(index/10) -1) * 10;
    let left = ((index - 1) % 10) * 10;
    let grid = document.getElementById("grid");

    if (axis == "x-axis"){
        if (shipType == "millfalc"){
            let src = "./images/ships/millfalc.png"
            createShipToAdd("img-mf", grid, src, top, left);
            allShips.mf.className = "img-mf";
            allShips.mf.top = top + "%";
            allShips.mf.left = left + "%";

        }
        else if  (shipType == "tiefighter"){

            let src = "./images/ships/tiefighter.png" 
            createShipToAdd("img-tf", grid, src, top, left);
            allShips.tf.className = "img-tf";
            allShips.tf.top = top + "%";
            allShips.tf.left = left + "%";

   
            
        }
        else if  (shipType == "landspeeder"){

            let src = "./images/ships/landspeeder.png"
            createShipToAdd("img-ls", grid, src, top, left);
            allShips.ls.className = "img-ls";
            allShips.ls.top = top + "%";
            allShips.ls.left = left + "%";

        
        }
        else if  (shipType == "xwing"){

            let src = "./images/ships/x-wing.png"
            createShipToAdd("img-xw", grid, src, top, left);
            allShips.xw.className = "img-xw";
            allShips.xw.top = top + "%";
            allShips.xw.left = left + "%";
        
       
        }
        else if  (shipType == "ywing"){

            let src = "./images/ships/y-wing.png";
            createShipToAdd("img-yw", grid, src, top, left);
            allShips.yw.className = "img-yw";
            allShips.yw.top = top + "%";
            allShips.yw.left = left + "%";

        }
    
    }
    else if (axis == "y-axis"){
        if (shipType == "millfalc"){

            let src = "./images/ships/millfalc-y.png"
            createShipToAdd("img-mf-y", grid, src, top, left);
            allShips.mf.className = "img-mf-y";
            allShips.mf.top = top + "%";
            allShips.mf.left = left + "%";

        }
        else if  (shipType == "tiefighter"){

            let src = "./images/ships/tiefighter-y.png" 
            createShipToAdd("img-tf-y", grid, src, top, left);
            allShips.tf.className = "img-tf-y";
            allShips.tf.top = top + "%";
            allShips.tf.left = left + "%";

            
        }
        else if  (shipType == "landspeeder"){

            let src = "./images/ships/landspeeder-y.png"
            createShipToAdd("img-ls-y", grid, src, top, left);
            allShips.ls.className = "img-ls-y";
            allShips.ls.top = top + "%";
            allShips.ls.left = left + "%";


            
        }
        else if  (shipType == "xwing"){

            let src = "./images/ships/x-wing-y.png"
            createShipToAdd("img-xw-y", grid, src, top, left);
            allShips.xw.className = "img-xw-y";
            allShips.xw.top = top + "%";
            allShips.xw.left = left + "%";
    
        }
        else if  (shipType == "ywing"){

            let src = "./images/ships/y-wing-y.png";
            createShipToAdd("img-yw-y", grid, src, top, left);
            allShips.yw.className = "img-yw-y";
            allShips.yw.top = top + "%";
            allShips.yw.left = left + "%";
    
        }
    }
        allShips.boardPieces += 1;
        let activeShip = document.querySelector('.ships> .active');
        activeShip.classList.remove("active");
        activeShip.classList.add("disable");
        activeShip.style.display = "none";
        let ship = document.querySelectorAll('.ships > .card:not(.disable)')[0];
        if (ship)
        ship.classList.add("active");

    }



function resetGrid(){
    let reset = document.getElementById("reset");
    reset.addEventListener("click",  () => {
        let ships = document.querySelectorAll('.ships > .card');
        ships.forEach(ship => {
            ship.classList.remove("disable");
            ship.classList.remove("active");
            ship.style.display = "flex";

        });
        let ship = document.querySelector('.ships > :first-child');
        ship.classList.add("active");
        let disabledCells = document.querySelectorAll(".grid-container > .cell.disabled");
        disabledCells.forEach(cell => {
            cell.classList.remove("disabled");
        });
        removeAllShips();
        allShips.ships = [];
        allShips.boardPieces = 0;
    }, false);

}

function submitGrid(){
    let submit = document.getElementById("submit");
    submit.addEventListener("click",  (e) => {
        if (allShips.boardPieces < 5){
            
            e.target.style.border = "1px solid #ff0000";
            setTimeout(function() {
                e.target.style.border = "1px solid #ffffff33"; 
  
            },300);
            e.preventDefault();
        }
        else{
            let grid = document.getElementById("grid");
            allShips.playerGrid = grid;
            const battleship = document.getElementsByClassName("battleship-app")[0];
            battleship.textContent = ""; 
            createGameBoard();
            generateEnemyGrid();
            clickEnemyEvent();
            hideWaitingIndicator();
        }

        });
}


function createShipToAdd(className, grid, src, top, left, player = "default"){

    const ship = document.createElement("div");
    ship.className = className;
    ship.style.top = top + "%";
    ship.style.left = left + "%"
    if (player == "enemy"){
        ship.style.display = "none";
    }
    const shipImg = document.createElement("img");
    shipImg.src = src;
    ship.appendChild(shipImg);
    grid.append(ship);
}


function setSpot(className, top, left){
    const ship = document.querySelector('.' + className);
    if (ship){
        ship.style.top = top;
        ship.style.left = left;
    }
}

function removeShip(className){

    const ship = document.querySelector('.' + className);
    if (ship){
        ship.remove();
    }
}

function removeAllShips(){

    removeShip("img-mf")
    removeShip("img-mf-y")
   
    removeShip("img-tf")
    removeShip("img-tf-y")
    
    removeShip("img-ls")
    removeShip("img-ls-y")
    
    removeShip("img-xw")
    removeShip("img-xw-y")
    
    removeShip("img-yw")
    removeShip("img-yw-y")

}

function createGameBoard(){
    const battleship = document.getElementsByClassName("battleship-app")[0];

    const gamePlay = document.createElement("div")
    gamePlay.className = "game-play";

    const empire = createEmpireBoard();
    const rebels = createRebelBoard();
    gamePlay.append(empire, rebels);
    battleship.append(gamePlay);

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

function setLocation(){
    
    setSpot("img-mf", allShips.mf.top, allShips.mf.left)
    setSpot("img-mf-y", allShips.mf.top, allShips.mf.left)
   
    setSpot("img-tf", allShips.tf.top, allShips.tf.left)
    setSpot("img-tf-y", allShips.tf.top, allShips.tf.left)
    
    setSpot("img-ls", allShips.ls.top, allShips.ls.left)
    setSpot("img-ls-y", allShips.ls.top, allShips.ls.left)
    
    setSpot("img-xw", allShips.xw.top, allShips.xw.left)
    setSpot("img-xw-y", allShips.xw.top, allShips.xw.left)
    
    setSpot("img-yw", allShips.yw.top, allShips.yw.left)
    setSpot("img-yw-y", allShips.yw.top, allShips.yw.left)

}

export {
    createEmpireBoard,
    createGameSetup,
    toggleShips,
    addHoverEvent,
    rotateEvent,
    resetGrid,
    submitGrid
};

addPregame();