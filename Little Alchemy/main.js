//TODO: * in a recipe means any item

//TODO: allow a special item with a recipe of item1, * that returns an item that automatically combinds item1s name and * name
const canv = document.getElementById("canv")
const ctx = canv.getContext("2d")
const inventoryDiv = document.getElementById("inv")
const clearButton = document.getElementById("clear-button")
const itemCountDispaly = document.getElementById("item-count")

let itemCount = 0;
let generatedLocalItems = localStorage.getItem("localitems") ? JSON.parse(localStorage.getItem("localitems")) : []
let totalItems = generatedLocalItems.length ? generatedLocalItems.length : 0
for(let i of items){
    if(!i.secretItem)
        totalItems += 1;
}
let recentlyDragged = null;

clearButton.onclick = ()=>{
    for(let item in itemsOnScreen){
        item = itemsOnScreen[item]
        if(item.onboardclear){
            item.onboardclear(inventory)
        }
    }
    itemsOnScreen = {}
}

function removeChildren(element){
    while(element.children.length > 0){
        element.removeChild(element.lastChild)
    }
}

document.getElementById("reset").addEventListener("dblclick", e=>{
    if(confirm("ARE YOU SURE YOU WANT TO RESET PROGRESS?")){
        inventory = []
        itemsOnScreen = {}
        itemBeingDragged = null;
        while(inventoryDiv.children.length > 1){
            if(inventoryDiv.lastChild.innerHTML == "fire") break
            inventoryDiv.removeChild(inventoryDiv.lastChild)
        }
        localStorage.setItem("localitems", "[]")
        localStorage.setItem("inventory", "[]")
        giveStartingItems()
        updateItemCount(-itemCount + 5)
    }
})
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"

canv.width = window.innerWidth / 2
canv.height = window.innerHeight

clearButton.style.top = `${window.innerHeight - clearButton.clientHeight}px`
clearButton.style.left = `${window.innerWidth / 2}px`

let tempInv = JSON.parse(localStorage.getItem("inventory"))
let inventory
if(tempInv) inventory = tempInv
else inventory = []

let itemBeingDragged = null;

class VisualItem{
    constructor(item, x="rand", y="rand"){
        this.item = item
        this.name = this.item.displayName ? this.item.displayName : this.item.name
        this.fontFamily = this.item.fontFamily ? this.item.fontFamily : "arial"
        this.fontSize = this.item.fontSize ? this.item.fontSize : "20px"
        this.width = this.item.width ? this.item.width : ((ctx.measureText(this.name).width) > 50 ? ctx.measureText(this.name).width : 50)
        this.height = this.item.height ? this.item.height : 50
        this.id = ""
        for(let i = 0; i < 20; i++) this.id += chars[Math.floor(Math.random() * chars.length)]
        if(x == "rand") this.x = Math.floor(Math.random() * (canv.clientWidth - this.width));
        else this.x = x;
        if(y == "rand") this.y = Math.floor(Math.random() * (canv.clientHeight - this.height))
        else this.y = y
        this.dragging = false;
        this.onclick = this.item.onclick ? this.item.onclick : ()=>{}
        this.oncreate = this.item.oncreate
        this.onremove = this.item.onremove
        this.onusedinrecipe = this.item.onusedinrecipe
        this.ondblclick = this.item.ondblclick
        this.onboardclear = this.item.onboardclear 
        this.onmove = this.item.onmove
    }
    draw(){
        if(this.item.img){
            ctx.blitImg(this.item.img, this.x, this.y)
        }
        else{
            ctx.drawRect(this.item.color, this.x, this.y, this.width, this.height)
            ctx.drawText(this.name, this.item.textColor ? this.item.textColor : "black", this.item.font ? this.item.font : `${this.fontSize} ${this.fontFamily}`, this.x, this.y + (this.height / 2))
        }
    }
    pointCollide(x, y){
        return (x > this.x && x < this.x + this.width) && (y > this.y && y < this.y + this.height)
    }
    rectCollide(x, y, width, height){
        return (
            this.x < x + width &&
            this.x + this.width > x &&
            this.y < y + height &&
            this.y + this.height > y
        ) //why did i forget this algorithm???
    }
    setToPoint(x, y){
        this.x = x;
        this.y = y
    }   
    startDragging(){
        this.dragging = true;
        itemBeingDragged = this;
        recentlyDragged = null;
    }
    stopDragging(){
        this.dragging = false;
        itemBeingDragged = null;
        recentlyDragged = this;
    }
    inRecipeCount(){
        let recipeCount = 0;
        for(let i of items){
            if(typeof i.recipe == "object"){
                for(let r of i.recipe){
                    if(r.includes(this.item.name))
                        recipeCount++
                }
            }
            else if(r.includes(this.item.name))
                recipeCount++
        }
        return recipeCount
    }
    static itemInRecipeCount(item){
        let recipeCount = 0;
        for(let i of items){
            if(!i.recipe) continue;
            if(typeof i.recipe == "object"){
                for(let r of i.recipe){
                    if(r.includes(item.name)){
                        recipeCount++
                        break
                    }
                }
            }
            else if(i.recipe.includes(item.name))
                recipeCount++
        }
        return recipeCount
    }
}

let itemsOnScreen = {}

function giveStartingItems(){
    for(let item of items){
        if(item.starter){
            if(!isInInventory(item)){
                addToInventory(item)
            }
            updateInventory(item)
            addItem(item)
        }
    }
}

giveStartingItems()

function updateItemCount(amount=1){
    itemCount += amount
    itemCountDispaly.innerHTML = `Items: ${itemCount}/${totalItems}`
}

function checkRecipeMatches(item1, item2){
    let itemMatches = []
    for(let item of items){
        if(!item.recipe) continue;
        if(typeof item.recipe[0] == "object"){
            for(let recipe of item.recipe){
                if(_.isEqual(recipe.sort(), [item1.item.name, item2.item.name].sort())) 
                    itemMatches.push(item)
            }
        }
        recipe = [...item.recipe]
        if(_.isEqual(recipe, ["*", "*"]))
            itemMatches.push(item)
        else if(recipe.indexOf("*") >= 0){
            recipe[recipe.indexOf("*")] = item1.item.name
            if(_.isEqual(recipe.sort(), [item1.item.name, item2.item.name].sort()))
                itemMatches.push(item)
            else{
                recipe[recipe.indexOf(item1.item.name)] = item2.item.name
                if(_.isEqual(recipe.sort(), [item1.item.name, item2.item.name].sort())){
                    itemMatches.push(item)
                }
            }
        }
        else if(_.isEqual(recipe.sort(), [item1.item.name, item2.item.name].sort())){
            itemMatches.push(item)
        }
    }
    return itemMatches
}

function isItemOnScreen(item){
    let itemnames = []
    for(let i in itemsOnScreen){
        i = itemsOnScreen[i]
        itemnames.push(i.name)
    }
    return itemnames.includes(item.name)
}

function isItemOnSidebar(item){
    return document.getElementById(item.name) ? true : false
}

function isInInventory(item){
    for(let i of inventory){
        if(i.name == item.name){
            return true
        }
    }
}

function addToInventory(item){
    let d = new Date()
    item.timeCreated = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}` //a formatted timestamp

    inventory.push(item) //add to inventory
    localStorage.setItem("inventory", JSON.stringify(inventory)) //add to local storage
}
function removeFromInventory(item){
    if(inventory.indexOf(item) >= 0){
        inventory.splice(inventory.indexOf(item), 1)
    }
}

function itemHasUpdated(item){
    for(let realItem of items){
        if(_.isEqual(realItem, item)){
            return false
        }
    }
    return true;
}

function updateInventory(item){
    let elem
    let isReal
    let inRecipe
    for(let item of inventory){
        if(!isItemOnSidebar(item)){
            isReal = false;
            inRecipe = false;
            for(let realItem of items){
                if(realItem.name == item.name){
                    isReal = true
                }
                if(realItem.recipe){
                    if(typeof realItem.recipe === "object"){
                        for(let recipe of realItem.recipe){
                            if(recipe.includes(item.name)){
                                inRecipe = true;
                                break;
                            }
                        }
                    }
                    else{
                        if(realItem.recipe.includes(item.name)){
                            inRecipe = true;
                        }
                    }
                }
            }
            let style = document.createElement('style')
            style.appendChild(document.createTextNode(`p#${item.name}{color: ${item.sidebarColor ? item.sidebarColor : item.color};${!item.overrideStyling ? `${isReal? "" : `text-decoration:underline wavy orange;cursor:help;`}${inRecipe ? "" : item.notInRecipeStyling ? item.notInRecipeStyling : "font-style: italic;cursor:help;"}` : ""}}`))
            if(item.hoverStyle){
                style.appendChild(document.createTextNode(`p#${item.name}:hover{${item.hoverStyle}}`)) 
            }
            if(item.selectionStyle){
                style.appendChild(document.createTextNode(`p#${item.name}::selection{${item.selectionStyle}}`)) 
            }
            inventoryDiv.appendChild(style)
            elem = document.createElement("p")
            title = ""
            title += `Created at: ${item.timeCreated}\n\n`
            if(!isReal || !inRecipe){
                if(!isReal) title += item.isFakeTitle ? item.isFakeTitle : "This item has been removed\nif you clear cache or anything of the sort this item could dissappear\n"
                if(!inRecipe) title += item.notInRecipeTitle ? item.notInRecipeTitle : "This item is not used in any recipes\n"
            }
            elem.title = title
            elem.innerHTML = item.displayName ? item.displayName : item.name
            elem.id = item.name
            elem.onclick = ()=>{
                addItem(item, "rand", "rand", true, true)
            }
            elem.oncontextmenu = (e)=>{
                e.preventDefault()
                alert(`Item Info:\n\nUsed in: ${VisualItem.itemInRecipeCount(item)} recipes\n${item.recipe ? `Ways to create this item: ${typeof item.recipe[0] == "object" ? item.recipe.length : 1}` : ""}\n\nDiscovered at: ${item.timeCreated}`)
            }
            inventoryDiv.appendChild(elem)
        }   
    }
}

function removeFromSideBar(item){
    if(isItemOnSidebar(item)){
        inventoryDiv.removeChild(document.getElementById(item.name))
    }
}

function addItem(item, x="rand", y="rand", addAnyway=false, duplicate=false){
    if(!isItemOnScreen(item) || addAnyway){
        if(duplicate){
            itemsOnScreen[item.name + String(Math.random())] = new VisualItem(item, x, y)
        }
        else itemsOnScreen[item.name] = new VisualItem(item, x, y)
    }
}

function main(time){
    ctx.clearRect(0, 0, canv.width, canv.height) //resets the canvas

    let itemFound = false; //a variable to see if there has been an item crafted
    for(let item in itemsOnScreen){
        item = itemsOnScreen[item]

        item.draw() //draw the item

        if(!itemFound){ //if no item was crafted
            for(let item2 in itemsOnScreen){ //go through all the items on the screen again
                item2 = itemsOnScreen[item2]
                //if item is item2 or either item is being dragged or both items were not recently dragged, continue
                if(item.id === item2.id || item.dragging || item2.dragging || (recentlyDragged != item && recentlyDragged != item2)) continue;

                if(item.rectCollide(item2.x, item2.y, item2.width, item2.height)){ //sees if the 2 items are colliding
                    if(item.onusedinrecipe) //item onusedinrecipeevent
                        item.onusedinrecipe(item, item2)

                    if(item2.onusedinrecipe) //same as above
                        item2.onusedinrecipe()

                    let crafted = checkRecipeMatches(item, item2) //gets all recipes that have both items in it

                    for(let c of crafted){ //goes through all the items of the crafted
                        let craft //wrapper variable for either the plain crafted, or if the item has a return item
                        if(c.return){ //craft is returned item
                            craft = c.return(item, item2)
                            if(!craft)
                                window.requestAnimationFrame(main)
                        }
                        else craft = c //otherwise craft is the crafted item

                        if(!isInInventory(craft)){
                            updateItemCount() //increase items owned by 1
                            addToInventory(craft) //add crafted to inventory
                            updateInventory(craft) //update the sidebar
                            if(c.return){ //if crafted.return, (these items are not stored in code, so they must be stored in local storage)
                                totalItems++ //the total items in the game ++
                                updateItemCount(0) //updates the count display
                                generatedLocalItems.push(craft) //adds the crafted to the generated local items
                                localStorage.setItem("localitems", JSON.stringify(generatedLocalItems)) //puts the generated local items in localstorage
                            }
                            if(c.oncreate){
                                c.oncreate({
                                    x: mean(item.x, item2.x),
                                    y: mean(item.y, item2.y),
                                    item1: item,
                                    item2: item2,
                                    inventory: inventory,
                                    itemsOnScreen: itemsOnScreen
                                })
                            }
                        }
                        addItem(craft, mean(item.x, item2.x), mean(item.y, item2.y))
                    }
                    itemFound = true;
                    break;
                }
            }
        }
    }
    window.requestAnimationFrame(main)
}

//makes sure that all the items are given to player before updating item count at start
for(let i of inventory){
    if(!i.secretItem)
        updateItemCount()
}

//start the main gameloop
window.requestAnimationFrame(main)

//reverses an array and returns it
function reverse(array){
    let newArray = [...array]
    newArray.reverse()
    return newArray
}

const search = document.getElementById('inv-search')
search.addEventListener('input', e=>{
    if(search.value == ""){
        //when there is nothing in the search this resets it back to the initial order
        for(let item of inventory){
            removeFromSideBar(item)
        }
        for(let item of inventory){
            updateInventory(item)
        }
    }
    for(let item of inventory){
        if(item.name.indexOf(search.value) < 0){
            removeFromSideBar(item)
        }
        else if(item.name.indexOf(search.value) > 0){
            updateInventory(item)
        }
    }
})

//moves the item
canv.addEventListener("click", e=>{
    for(let item of reverse(Object.keys(itemsOnScreen))){ //goes through items in reverse order idk why
        item = itemsOnScreen[item]
        if(item.pointCollide(e.offsetX, e.offsetY)){ //makes sure mouse collides with item
            if(!itemBeingDragged) { //if there is no item being dragged currently
                item.onclick({event: e, inventory: inventory, itemsOnScreen: itemsOnScreen, item: item, canvas: canv}) //trigger the item on click event
                if(!item.item.overrideClick)
                    item.startDragging() //make the item drag
                break;
            }
            else if(itemBeingDragged == item){ //if the item currently being dragged is this item
                item.stopDragging() //stop from dragging
                break;
            } 
        }
    }
})

//duplicates the item
let clickedItem
canv.addEventListener("dblclick", e=>{
    for(let item of reverse(Object.keys(itemsOnScreen))){ //goes through items on the screen in reverse order  (idk why)
        item = itemsOnScreen[item]
        if(item.pointCollide(e.offsetX, e.offsetY)){ //makes sure the click was on element
            clickedItem = item //sets the item that is currently clicked to this item
        }
    }
    for(let item of items){
        if(clickedItem.name === item.name){
            if(item.ondblclick){ //if there's the ondblclick event for the item trigger it
                item.ondblclick({event: e, inventory: inventory, itemsOnScreen: itemsOnScreen, item: item, canvas: canv})
            }
            if(!item.overrideDblClick)
                addItem(item, e.offsetX, e.offsetY, true, true) //add item to the screen
            break;
        }
    }
})

//removes item from canvas
canv.addEventListener("contextmenu", e=>{
    e.preventDefault()
    for(let item in itemsOnScreen){
        let i = itemsOnScreen[item]
        if(i.pointCollide(e.offsetX, e.offsetY)){ //makes sure the click was on the element
            if(i.onremove){
                i.onremove({event: e, inventory: inventory, itemsOnScreen: itemsOnScreen, item: item, canvas: canv})
            }
            delete itemsOnScreen[item]
        }
    }
})

//moves the item with the mouse
document.addEventListener("mousemove", e=>{
    for(let item in itemsOnScreen){
        item = itemsOnScreen[item]
        if(item.dragging){ //makes sure it was clicked previously
            if(item.onmove)
                item.onmove({event: e, inventory: inventory, itemsOnScreen: itemsOnScreen, item: item, canvas: canv})
            if(!item.item.overrideMove)
                item.setToPoint(e.offsetX - (item.width / 2), e.offsetY - (item.height / 2))
        }
    }
})
let typing = false
document.addEventListener("keypress", e=>{
    if(!typing){
        search.value = e.key
    }
    search.focus()
    typing = true
})
document.addEventListener("click", e=>typing=false)

//wrapper around putting a rectangle on a canvas
CanvasRenderingContext2D.prototype.drawRect = (color, x, y, width, height)=>{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height)
}

//wrapper around putting text on a canvas
CanvasRenderingContext2D.prototype.drawText = (text, color, font, x, y)=>{
    ctx.fillStyle = color;
    ctx.font = font
    ctx.fillText(text, x, y)
}

//wrapper around putting an image on a canvas
CanvasRenderingContext2D.prototype.blitImg = (imgSrc, x, y)=>{
    let img = document.createElement("img")
    img.src = imgSrc
    ctx.drawImage(img, x, y)
}

//mean function finds the mean of values
function mean(values){
    let sum = 0;
    for(let num of arguments){
        sum += num;
    }
    return sum / arguments.length
}

//more for debugging, adds item by name/id
function giveItemByName(itemName){
    for(item of items){
        if(item.name == itemName){
            if(!isInInventory(item)){
                updateItemCount()
                addToInventory(item)
                updateInventory(item)
            }
        }
    }
}

//more for debugging, removes item by name/id
function removeItemByName(itemName){
    for (item of inventory){
        if(item.name == itemName){
            updateItemCount(-1)
            removeFromInventory(item)
            removeFromSideBar(item)
        }
    }
}

function findItemByName(itemName){
    for(item of items){
        if(item.name == itemName){
            return item
        }
    }
}

window.addEventListener("resize", e=>{
    //puts the  clear button by the bottom right of canvas
    clearButton.style.top = `${window.innerHeight - clearButton.clientHeight}px`
    clearButton.style.left = `${window.innerWidth / 2}px`

    //puts each item in the same relative place
    for(let i in itemsOnScreen){
        let item = itemsOnScreen[i]
        let percentX = item.x / canv.width //the percents keep the item at the same-ish relative position on the canvas
        let percentY = item.y / canv.height
        item.x = Math.floor(window.innerWidth / 2 * percentX)
        item.y = window.innerHeight * percentY
        if(item.x <= 0){
            item.x = 0
        }
        else if(item.x > window.innerWidth / 2 - item.width){
            item.x = window.innerWidth / 2 - item.width
        }
        if(item.y <= 0){
            item.y = 0
        }
        else if(item.y > window.innerHeight - item.height){
            item.y = window.innerHeight - item.height
        }
    }

    //resizes the canvas
    canv.width = window.innerWidth / 2
    canv.height = window.innerHeight
})