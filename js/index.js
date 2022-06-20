const canvas = document.getElementById('game'); 
const ctx=canvas.getContext('2d');

document.body.addEventListener('keydown', keyDown);

let tileCount = game.clientHeight / 20;
let tileSize = 18;

let speed = 10; // 7 times a second

// array of snake
const snakeParts = [];
let tailLength=4;

//start point for snake
let headX =9;
let headY =9;

// speed of snake
let xvel =0;
let yvel =0;

// store previous move 
let prevX = 0;
let prevY = 0;

// draw apple
appleX=Math.floor(Math.random() * tileCount);
appleY=Math.floor(Math.random() * tileCount);

let score = 0;

function drawGame() {
    changeSnakePosition();
    // game over logic
    let result = isGameOver();
    if(result){
        return;
    }
    
    clearScreen();
    drawApple();
    drawSnake();
    
    checkCollision();
    drawScore();

    setTimeout(drawGame, 1000/speed); // sets update intervals
}

function drawSnake() {
    ctx.fillStyle = "green";
    //loop through snake parts to draw snake
    for(let i=0; i<snakeParts.length; i++){
        let part=snakeParts[i]
        ctx.fillRect(part.x *tileCount, part.y *tileCount, tileSize, tileSize);
    }
    snakeParts.push(new snakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    ctx.fillStyle="orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

    // store previous direction 
    prevX = xvel;
    prevY = yvel;
}

function clearScreen() {
    ctx.fillStyle= 'black';
    ctx.fillRect(0,0, canvas.clientWidth, canvas.clientHeight);
}

function keyDown(event) {
    // up
    if(event.keyCode==38) {
        if (prevY == 1)  // check to make sure not going down
            return;
        yvel = -1; // move one tile up
        xvel = 0;
    }
    // down
    if(event.keyCode==40) {
        if (prevY == -1)
            return;
        yvel = 1; // move one tile down
        xvel = 0;
    }
    // left
    if(event.keyCode==37) {
        if (prevX == 1)
            return;
        yvel = 0; 
        xvel = -1; // move one tile left
    }
    // right
    if(event.keyCode==39) {
        if (prevX == -1)
            return;
        yvel = 0; 
        xvel = 1; // move one tile right
    }
}

function isGameOver() {
    let gameOver = false;
    if(yvel === 0 && xvel === 0){
        return false;
    }

    // if snake hits left wall
    if(headX < 0) {
        gameOver = true;
    } else if (headX === tileCount) { //snake hits right wall
        gameOver = true;
    } else if (headY < 0) {// hits top wall 
        gameOver = true;
    } else if (headY === tileCount) {//snake hits bottom 
        gameOver = true;
    }

    // check if snake hits itself
    for(let i=0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if(headX == part.x  ) {
            if (headY == part.y){
                gameOver = true;
                
                break;
            }
        }
    }


    if(gameOver){
        ctx.fillStyle="white"
        ctx.font="50px verdana"
        ctx.fillText("Game Over!", canvas.clientWidth/6.5, canvas.clientHeight/2)
    }
    return gameOver;
}

function changeSnakePosition() {
    headX = headX + xvel;
    headY = headY + yvel;
}

function drawApple() {
    ctx.fillStyle = "Red";
    // position apple within tile count
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkCollision() {
    if(appleX == headX && appleY == headY) {
        appleX=Math.floor(Math.random() * tileCount);
        appleY=Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        // speed++;

        // make sure apple cannot spawn in snake
        let empty = true;
        while (empty) {
            empty = false;
            for(let i=0; i < snakeParts.length; i++) {
                let part = snakeParts[i];
                if(appleX == part.x  ) {
                    if (appleY == part.y){
                        appleX=Math.floor(Math.random() * tileCount);
                        appleY=Math.floor(Math.random() * tileCount);
                        
                        empty = true;
                        break;
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.fillStyle="white";
    ctx.font="10px verdena";
    ctx.fillText("Score: " + score, canvas.clientWidth-50 ,10);
}

class snakePart {
    constructor(x, y){
        this.x=x;
        this.y=y;
    }
}

drawGame();
