import {snakeSpeed, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, getSnake, putSnakeHeadOnOppositeSide, getSnakeSpeed} from "./snake.js"
import {update as updateFood, draw as drawFood} from './food.js'
import {outsideGrid, setGridSize} from "./grid.js"

const wallsDeadly = document.getElementById("walls-deadly")

let lastRenderTime = 0;
let gameOver = false
const gameBoard = document.getElementById('game-board')
const score = document.getElementById("score")
const timeElem = document.getElementById('time')

function main(currTime){
    if(gameOver){
        if(confirm(`You lose\nFINAL SCORE: ${getSnake().length}\nFinal Time: ${Math.floor(currTime / 1000)} seconds\nFinal Speed: ${getSnakeSpeed()}\npress ok to continue`)){
            window.location = "/Snake/index.html"
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / snakeSpeed){ //if seconds since last render is less than .5 or 1 seconds / snake speed, return
        return
    }
    lastRenderTime = currTime;
    timeElem.innerHTML = `Time: ${Math.floor(currTime / 1000)} seconds`
    update()
    draw()
}

function update(){
    updateSnake()
    updateFood(gameBoard)
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = '' // clears everything
    drawSnake(gameBoard)
    drawFood(gameBoard)
    score.innerHTML = `Score: ${getSnake().length}`
}

function checkDeath(){
    if(outsideGrid(getSnakeHead()) && !wallsDeadly.checked){
        putSnakeHeadOnOppositeSide()
    }
    gameOver = snakeIntersection() ||(wallsDeadly.checked && outsideGrid(getSnakeHead()))
}

function start(){
    let gridSizeInput = Number(document.getElementById("grid-size").value)
    gameBoard.style.gridTemplateRows = `repeat(${gridSizeInput}, 1fr)`
    gameBoard.style.gridTemplateColumns = `repeat(${gridSizeInput}, 1fr)`
    setGridSize(gridSizeInput)
    window.requestAnimationFrame(main)
}

const startButton = document.createElement('button')
startButton.innerHTML = "Start"
startButton.onclick = ()=>start()
gameBoard.appendChild(startButton)