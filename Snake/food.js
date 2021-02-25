import {onSnake, expandSnake} from "./snake.js"
import {randomGridPosition} from './grid.js'

const expansionRateInput = document.getElementById("snake-eat-increase")
const foodAmountInput = document.getElementById('food-amount')
const foodColor = document.getElementById("food-color")
let foods = []
for(let i = 0; i < Number(foodAmountInput.value); i++){
    foods.push(getRandomFoodPos())
}

export function update(){
    for(let i = 0; i < Number(foodAmountInput.value); i++){
        let food = foods[i]
        if(!food){
            foods[i] = getRandomFoodPos()
            continue;
        }
        if(onSnake(food)){
            expandSnake(Number(expansionRateInput.value))
            foods[i] = getRandomFoodPos()
        }
    }
}

export function draw(gameBoard){
    for(let food of foods){
        const foodElement = document.createElement("div")
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.style.backgroundColor = foodColor.value
        foodElement.classList.add("food")
        gameBoard.appendChild(foodElement)
    }
}

function getRandomFoodPos(){
    let newFoodPos;
    while(newFoodPos == null || onSnake(newFoodPos)){
        newFoodPos = randomGridPosition()
    }
    return newFoodPos
}