import { getInputDirection } from "./input.js"
import {gridSize} from "./grid.js"

const getFaster = document.getElementById("get-faster")
const snakeSpeedInput = document.getElementById("snake-speed")
const snakeSpeedBonusIncromentInput = document.getElementById('bonus-snake-speed')
const snakeColor = document.getElementById("snake-color")
export let snakeSpeed = Number(snakeSpeedInput.value) // how many times the snake moves per second
const snakeBody = [
    {x: 11, y:11},
]
let newSegments = 0;

export function update(){
    addSegments()
    snakeSpeed = Number(snakeSpeedInput.value)
    const inputDir = getInputDirection()
    for(let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i + 1] = {...snakeBody[i]} // {...snakeBody[i]} creates a new object instead of a reference
    }

    snakeBody[0].x += inputDir.x
    snakeBody[0].y += inputDir.y
}

export function draw(gameBoard){
    snakeBody.forEach(segment =>{
        const snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.backgroundColor = snakeColor.value
        snakeElement.classList.add("snake")
        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(amount){
    newSegments += amount
    if(getFaster.checked){
        snakeSpeed += Math.random() + Number(snakeSpeedBonusIncromentInput.value)
        snakeSpeedInput.value = snakeSpeed
    }
}

export function onSnake(position, {ignoreHead = false} = {}){
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return false;
        
        return equalPositions(segment, position)
    })
}

export function getSnakeHead(){
    return snakeBody[0]
}

export function snakeIntersection(){
    return onSnake(getSnakeHead(), {ignoreHead: true})
}

export function getSnake(){
    return snakeBody
}
export function putSnakeHeadOnOppositeSide(){
    if(snakeBody[0].x < 1){
        snakeBody[0].x = gridSize
    }
    else if(snakeBody[0].x > gridSize){
        snakeBody[0].x = 1;
    }
    else if(snakeBody[0].y > gridSize){
        snakeBody[0].y = 1
    }
    else if(snakeBody[0].y < 1){
        snakeBody[0].y = gridSize
    }
}

export function getSnakeSpeed(){
    return snakeSpeedInput.value;
}

function equalPositions(position1, position2){
    return position1.x === position2.x && position1.y === position2.y
}

function addSegments(){
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    newSegments = 0;
}
