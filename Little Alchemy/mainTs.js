var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");
var inventoryDiv = document.getElementById("inv");
var clearButton = document.getElementById("clear-button");
var itemCountDispaly = document.getElementById("item-count");
var colorPicker = document.getElementById("color-picker");
var search = document.getElementById('inv-search');
search.style.width = inventoryDiv.clientWidth + "px";
var params = new URLSearchParams(window.location.search);
var canvColor = params.get("color");
if (canvColor) {
    canvColor = canvColor.replace("*", "#");
    canv.style.backgroundColor = canvColor;
}
var itemCount = 0;
var generatedLocalItems = localStorage.getItem("localitems") ? JSON.parse(localStorage.getItem("localitems")) : [];
var totalItems = generatedLocalItems.length ? generatedLocalItems.length : 0;
for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
    var i = items_1[_i];
    if (!i.secretItem)
        totalItems += 1;
}
var recentlyDragged = null;
clearButton.onclick = function () {
    for (var i in itemsOnScreen) {
        var item = itemsOnScreen[i];
        if (item.onboardclear) {
            item.onboardclear(inventory);
        }
    }
    itemsOnScreen = {};
};
itemCountDispaly.addEventListener("click", function (e) {
    colorPicker.click();
});
colorPicker.oninput = function () {
    canv.style.backgroundColor = colorPicker.value;
    itemCountDispaly.style.color = "#" + invertHex(colorPicker.value.replace("#", ""));
};
function removeChildren(element) {
    while (element.children.length > 0) {
        element.removeChild(element.lastChild);
    }
}
document.getElementById("reset").addEventListener("dblclick", function (e) {
    if (confirm("ARE YOU SURE YOU WANT TO RESET PROGRESS?")) {
        inventory = [];
        itemsOnScreen = {};
        itemBeingDragged = null;
        while (inventoryDiv.children.length > 1) {
            if (inventoryDiv.lastChild.innerHTML == "fire")
                break;
            inventoryDiv.removeChild(inventoryDiv.lastChild);
        }
        localStorage.setItem("localitems", "[]");
        localStorage.setItem("inventory", "[]");
        giveStartingItems();
        updateItemCount(-itemCount + 5);
    }
});
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
canv.width = window.innerWidth / 2;
canv.height = window.innerHeight;
clearButton.style.top = window.innerHeight - clearButton.clientHeight + "px";
clearButton.style.left = window.innerWidth / 2 + "px";
var tempInv = JSON.parse(localStorage.getItem("inventory"));
var inventory;
if (tempInv)
    inventory = tempInv;
else
    inventory = [];
var itemBeingDragged = null;
var VisualItem = /** @class */ (function () {
    function VisualItem(item, x, y) {
        this.item = item;
        this.name = this.item.displayName ? this.item.displayName : this.item.name;
        this.fontFamily = this.item.fontFamily ? this.item.fontFamily : "arial";
        this.fontSize = this.item.fontSize ? this.item.fontSize : "20px";
        this.width = this.item.width ? this.item.width : ((ctx.measureText(this.name).width) > 50 ? ctx.measureText(this.name).width : 50);
        this.height = this.item.height ? this.item.height : 50;
        this.id = "";
        for (var i = 0; i < 20; i++)
            this.id += chars[Math.floor(Math.random() * chars.length)];
        this.x = x;
        this.y = y;
        this.dragging = false;
        this.onclick = this.item.onclick ? this.item.onclick : function () { };
        this.oncreate = this.item.oncreate;
        this.onremove = this.item.onremove;
        this.onusedinrecipe = this.item.onusedinrecipe;
        this.ondblclick = this.item.ondblclick;
        this.onboardclear = this.item.onboardclear;
        this.onmove = this.item.onmove;
    }
    VisualItem.prototype.draw = function () {
        if (this.item.img) {
            blitImg(this.item.img, this.x, this.y);
        }
        else {
            drawRect(this.item.color, this.x, this.y, this.width, this.height);
            drawText(this.name, this.item.textColor ? this.item.textColor : "black", this.fontSize + " " + this.fontFamily, this.x, this.y + (this.height / 2));
        }
    };
    VisualItem.prototype.pointCollide = function (x, y) {
        return (x > this.x && x < this.x + this.width) && (y > this.y && y < this.y + this.height);
    };
    VisualItem.prototype.rectCollide = function (x, y, width, height) {
        return (this.x < x + width &&
            this.x + this.width > x &&
            this.y < y + height &&
            this.y + this.height > y); //why did i forget this algorithm???
    };
    VisualItem.prototype.setToPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    VisualItem.prototype.startDragging = function () {
        this.dragging = true;
        itemBeingDragged = this;
        recentlyDragged = null;
    };
    VisualItem.prototype.stopDragging = function () {
        this.dragging = false;
        itemBeingDragged = null;
        recentlyDragged = this;
    };
    VisualItem.prototype.inRecipeCount = function () {
        var recipeCount = 0;
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var i = items_2[_i];
            if (typeof i.recipe == "object") {
                for (var _a = 0, _b = i.recipe; _a < _b.length; _a++) {
                    var r = _b[_a];
                    if (r.includes(this.item.name))
                        recipeCount++;
                }
            }
            else if (i.recipe.includes(this.item.name))
                recipeCount++;
        }
        return recipeCount;
    };
    VisualItem.itemInRecipeCount = function (item) {
        var recipeCount = 0;
        for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
            var i = items_3[_i];
            if (!i.recipe)
                continue;
            if (typeof i.recipe == "object") {
                for (var _a = 0, _b = i.recipe; _a < _b.length; _a++) {
                    var r = _b[_a];
                    if (r.includes(item.name)) {
                        recipeCount++;
                        break;
                    }
                }
            }
            else if (i.recipe.includes(item.name))
                recipeCount++;
        }
        for (var _c = 0, generatedLocalItems_1 = generatedLocalItems; _c < generatedLocalItems_1.length; _c++) {
            var i = generatedLocalItems_1[_c];
            if (!i.recipe)
                continue;
            if (typeof i.recipe == "object") {
                for (var _d = 0, _e = i.recipe; _d < _e.length; _d++) {
                    var r = _e[_d];
                    if (r.includes(item.name)) {
                        recipeCount++;
                        break;
                    }
                }
            }
            else if (i.recipe.includes(item.name))
                recipeCount++;
        }
        return recipeCount;
    };
    return VisualItem;
}());
var itemsOnScreen = {};
function giveStartingItems() {
    for (var _i = 0, items_4 = items; _i < items_4.length; _i++) {
        var item = items_4[_i];
        if (item.starter) {
            if (!isInInventory(item)) {
                addToInventory(item);
            }
            updateInventory(item);
            addItem(item);
        }
    }
}
giveStartingItems();
function updateItemCount(amount) {
    if (amount === void 0) { amount = 1; }
    itemCount += amount;
    itemCountDispaly.innerHTML = "Items: " + itemCount + "/" + totalItems;
}
function checkRecipeMatches(item1, item2) {
    var itemMatches = [];
    for (var _i = 0, items_5 = items; _i < items_5.length; _i++) {
        var item = items_5[_i];
        if (!item.recipe)
            continue;
        if (typeof item.recipe[0] == "object") {
            for (var _a = 0, _b = item.recipe; _a < _b.length; _a++) {
                var recipe_1 = _b[_a];
                if (_.isEqual(recipe_1.sort(), [item1.item.name, item2.item.name].sort()))
                    itemMatches.push(item);
            }
        }
        var recipe = __spreadArrays(item.recipe);
        if (_.isEqual(recipe, ["*", "*"]))
            itemMatches.push(item);
        else if (recipe.indexOf("*") >= 0) {
            recipe[recipe.indexOf("*")] = item1.item.name;
            if (_.isEqual(recipe.sort(), [item1.item.name, item2.item.name].sort()))
                itemMatches.push(item);
            else {
                recipe[recipe.indexOf(item1.item.name)] = item2.item.name;
                if (_.isEqual(recipe.sort(), [item1.item.name, item2.item.name].sort())) {
                    itemMatches.push(item);
                }
            }
        }
        else if (_.isEqual(recipe.sort(), [item1.item.name, item2.item.name].sort())) {
            itemMatches.push(item);
        }
    }
    return itemMatches;
}
function isItemOnScreen(item) {
    var itemnames = [];
    for (var i in itemsOnScreen) {
        var item_1 = itemsOnScreen[i];
        itemnames.push(item_1.name);
    }
    return itemnames.includes(item.name);
}
function isItemOnSidebar(item) {
    return document.getElementById(item.name) ? true : false;
}
function isInInventory(item) {
    for (var _i = 0, inventory_2 = inventory; _i < inventory_2.length; _i++) {
        var i = inventory_2[_i];
        if (i.name == item.name) {
            return true;
        }
    }
}
function getTimeStampFromItem(item) {
    var createdAt = item.timeCreated;
    var _a = createdAt.split(" at "), mdy = _a[0], hms = _a[1];
    var _b = mdy.split("/"), month = _b[0], d = _b[1], y = _b[2];
    var _c = hms.split(":"), h = _c[0], m = _c[1], s = _c[2];
    var date = new Date(y, month, d, h, m, s);
    return Date.parse(date.toString());
}
function addToInventory(item) {
    var d = new Date();
    item.timeCreated = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear() + " at " + d.getHours() + ":" + (String(d.getMinutes()).length > 1 ? d.getMinutes() : "0" + d.getMinutes()) + ":" + (String(d.getSeconds()).length > 1 ? d.getSeconds() : "0" + d.getSeconds()); //a formatted timestamp
    inventory.push(item); //add to inventory
    localStorage.setItem("inventory", JSON.stringify(inventory)); //add to local storage
}
function removeFromInventory(item) {
    if (inventory.indexOf(item) >= 0) {
        inventory.splice(inventory.indexOf(item), 1);
    }
}
function itemHasUpdated(item) {
    for (var _i = 0, items_6 = items; _i < items_6.length; _i++) {
        var realItem = items_6[_i];
        if (_.isEqual(realItem, item)) {
            return false;
        }
    }
    return true;
}
function updateInventory(item) {
    var elem;
    var isReal;
    var inRecipe;
    search.style.width = inventoryDiv.clientWidth + "px";
    var _loop_1 = function (item_2) {
        if (!isItemOnSidebar(item_2)) {
            isReal = false;
            inRecipe = false;
            for (var _i = 0, items_7 = items; _i < items_7.length; _i++) {
                var realItem = items_7[_i];
                if (realItem.name == item_2.name) {
                    isReal = true;
                }
                if (realItem.recipe) {
                    if (typeof realItem.recipe === "object") {
                        for (var _a = 0, _b = realItem.recipe; _a < _b.length; _a++) {
                            var recipe = _b[_a];
                            if (recipe.includes(item_2.name)) {
                                inRecipe = true;
                                break;
                            }
                        }
                    }
                    else if (realItem.recipe.includes(item_2.name)) {
                        inRecipe = true;
                    }
                }
            }
            var style = document.createElement('style');
            var styleNode = "p#" + item_2.name + "{color: " + (item_2.sidebarColor ? item_2.sidebarColor : item_2.color) + ";";
            if (!item_2.overrideStyling) {
                if (!isReal)
                    styleNode += item_2.isFakeStyling ? item_2.isFakeStyling : "text-decoration:underline wavy orange;cursor:help;";
                if (!inRecipe) {
                    styleNode += item_2.notInRecipeStyle ? item_2.notInRecipeStyle : "font-style: italic;cursor:help;";
                }
            }
            else {
                if (!isReal)
                    styleNode += item_2.isFakeStyling ? item_2.isFakeStyling : "";
                if (!inRecipe)
                    styleNode += item_2.notInRecipeStyle ? item_2.notInRecipeStyle : "";
            }
            styleNode += "}";
            if (item_2.hoverStyle) {
                styleNode += "p#" + item_2.name + ":hover{" + item_2.hoverStyle + "}";
            }
            style.appendChild(document.createTextNode(styleNode));
            inventoryDiv.appendChild(style);
            elem = document.createElement("p");
            var title = "";
            title += "Created at: " + item_2.timeCreated + "\n\n";
            if (!isReal || !inRecipe) {
                if (!isReal)
                    title += item_2.isFakeTitle ? item_2.isFakeTitle : "This item has been removed\nif you clear cache or anything of the sort this item could dissappear\n";
                if (!inRecipe)
                    title += item_2.notInRecipeTitle ? item_2.notInRecipeTitle : "This item is not used in any recipes\n";
            }
            elem.title = title;
            elem.innerHTML = item_2.displayName ? item_2.displayName : item_2.name;
            elem.id = item_2.name;
            elem.onclick = function () {
                addItem(item_2, null, null, true, true);
            };
            elem.oncontextmenu = function (e) {
                e.preventDefault();
                alert("Item Info:\n\nUsed in: " + VisualItem.itemInRecipeCount(item_2) + " recipes\n" + (item_2.recipe ? "Ways to create this item: " + (typeof item_2.recipe[0] == "object" ? item_2.recipe.length : 1) : "") + "\n\nDiscovered at: " + item_2.timeCreated);
            };
            inventoryDiv.appendChild(elem);
        }
    };
    for (var _i = 0, inventory_3 = inventory; _i < inventory_3.length; _i++) {
        var item_2 = inventory_3[_i];
        _loop_1(item_2);
    }
}
function removeFromSideBar(item) {
    if (isItemOnSidebar(item)) {
        inventoryDiv.removeChild(document.getElementById(item.name));
    }
}
function addItem(item, x, y, addAnyway, duplicate) {
    if (addAnyway === void 0) { addAnyway = false; }
    if (duplicate === void 0) { duplicate = false; }
    if (!x) {
        x = Math.floor(Math.random() * canv.width);
    }
    if (!y) {
        y = Math.floor(Math.random() * canv.height);
    }
    if (!isItemOnScreen(item) || addAnyway) {
        if (duplicate) {
            itemsOnScreen[item.name + String(Math.random())] = new VisualItem(item, x, y);
        }
        else
            itemsOnScreen[item.name] = new VisualItem(item, x, y);
    }
}
var lastTime = 0;
function main(time) {
    var deltaTime = time - lastTime;
    ctx.clearRect(0, 0, canv.width, canv.height); //resets the canvas
    var itemFound = false; //a variable to see if there has been an item crafted
    for (var i in itemsOnScreen) {
        var item = itemsOnScreen[i];
        item.draw(); //draw the item
        if (!itemFound) { //if no item was crafted
            for (var i2 in itemsOnScreen) { //go through all the items on the screen again
                var item2 = itemsOnScreen[i2];
                //if item is item2 or either item is being dragged or both items were not recently dragged, continue
                if (item.id === item2.id || item.dragging || item2.dragging || (recentlyDragged != item && recentlyDragged != item2))
                    continue;
                if (item.rectCollide(item2.x, item2.y, item2.width, item2.height)) { //sees if the 2 items are colliding
                    if (item.onusedinrecipe) //item onusedinrecipeevent
                        item.onusedinrecipe(item, item2);
                    if (item2.onusedinrecipe) //same as above
                        item2.onusedinrecipe(item, item2);
                    var crafted = checkRecipeMatches(item, item2); //gets all recipes that have both items in it
                    for (var _i = 0, crafted_1 = crafted; _i < crafted_1.length; _i++) { //goes through all the items of the crafted
                        var c = crafted_1[_i];
                        var craft = void 0; //wrapper variable for either the plain crafted, or if the item has a return item
                        if (c["return"]) { //craft is returned item
                            craft = c["return"](item, item2);
                            if (!craft)
                                window.requestAnimationFrame(main);
                        }
                        else
                            craft = c; //otherwise craft is the crafted item
                        if (!isInInventory(craft)) {
                            updateItemCount(); //increase items owned by 1
                            addToInventory(craft); //add crafted to inventory
                            updateInventory(craft); //update the sidebar
                            if (c["return"]) { //if crafted.return, (these items are not stored in code, so they must be stored in local storage)
                                totalItems++; //the total items in the game ++
                                updateItemCount(0); //updates the count display
                                generatedLocalItems.push(craft); //adds the crafted to the generated local items
                                localStorage.setItem("localitems", JSON.stringify(generatedLocalItems)); //puts the generated local items in localstorage
                            }
                            if (c.oncreate) {
                                c.oncreate({
                                    x: mean(item.x, item2.x),
                                    y: mean(item.y, item2.y),
                                    item1: item,
                                    item2: item2,
                                    inventory: inventory,
                                    itemsOnScreen: itemsOnScreen,
                                    deltaTime: deltaTime,
                                    time: time
                                });
                            }
                        }
                        addItem(craft, mean(item.x, item2.x), mean(item.y, item2.y));
                    }
                    itemFound = true;
                    break;
                }
            }
        }
    }
    lastTime = time;
    window.requestAnimationFrame(main);
}
//makes sure that all the items are given to player before updating item count at start
for (var _a = 0, inventory_1 = inventory; _a < inventory_1.length; _a++) {
    var i = inventory_1[_a];
    if (!i.secretItem)
        updateItemCount();
}
//start the main gameloop
window.requestAnimationFrame(main);
//reverses an array and returns it
function reverse(array) {
    var newArray = __spreadArrays(array);
    newArray.reverse();
    return newArray;
}
search.addEventListener('input', function (e) {
    if (search.value == "") {
        //when there is nothing in the search this resets it back to the initial order
        resetSideBar();
    }
    for (var _i = 0, inventory_4 = inventory; _i < inventory_4.length; _i++) {
        var item = inventory_4[_i];
        if (item.name.indexOf(search.value) < 0) {
            removeFromSideBar(item);
        }
        else if (item.name.indexOf(search.value) >= 0) {
            updateInventory(item);
        }
    }
});
//moves the item
canv.addEventListener("click", function (e) {
    for (var _i = 0, _a = reverse(Object.keys(itemsOnScreen)); _i < _a.length; _i++) { //goes through items in reverse order idk why
        var item = _a[_i];
        item = itemsOnScreen[item];
        if (item.pointCollide(e.offsetX, e.offsetY)) { //makes sure mouse collides with item
            if (!itemBeingDragged) { //if there is no item being dragged currently
                item.onclick({ event: e, inventory: inventory, itemsOnScreen: itemsOnScreen, item: item, canvas: canv }); //trigger the item on click event
                if (!item.item.overrideClick)
                    item.startDragging(); //make the item drag
                break;
            }
            else if (itemBeingDragged == item) { //if the item currently being dragged is this item
                if (item.item.onstopdragging)
                    item.item.onstopdragging({ event: e, inventory: inventory, itemsOnScreen: itemsOnScreen, item: item, canvas: canv });
                if (!item.item.overrideStopDragging)
                    item.stopDragging(); //stop from dragging
                break;
            }
        }
    }
});
//duplicates the item
var clickedItem;
canv.addEventListener("dblclick", function (e) {
    for (var _i = 0, _a = reverse(Object.keys(itemsOnScreen)); _i < _a.length; _i++) { //goes through items on the screen in reverse order  (idk why)
        var item = _a[_i];
        item = itemsOnScreen[item];
        if (item.pointCollide(e.offsetX, e.offsetY)) { //makes sure the click was on element
            clickedItem = item; //sets the item that is currently clicked to this item
        }
    }
    for (var _b = 0, items_8 = items; _b < items_8.length; _b++) {
        var item = items_8[_b];
        if (clickedItem.name === item.name) {
            if (item.ondblclick) { //if there's the ondblclick event for the item trigger it
                item.ondblclick({ event: e, inventory: inventory, itemsOnScreen: itemsOnScreen, item: item, canvas: canv });
            }
            if (!item.overrideDblClick)
                addItem(item, e.offsetX, e.offsetY, true, true); //add item to the screen
            break;
        }
    }
});
//removes item from canvas
canv.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    for (var item in itemsOnScreen) {
        var i = itemsOnScreen[item];
        if (i.pointCollide(e.offsetX, e.offsetY)) { //makes sure the click was on the element
            if (i.onremove) {
                i.onremove({ event: e, inventory: inventory, itemsOnScreen: itemsOnScreen, item: i, canvas: canv });
            }
            delete itemsOnScreen[item];
        }
    }
});
//moves the item with the mouse
document.addEventListener("mousemove", function (e) {
    for (var i in itemsOnScreen) {
        var item = itemsOnScreen[i];
        if (item.dragging) { //makes sure it was clicked previously
            if (item.onmove)
                item.onmove({ event: e, inventory: inventory, itemsOnScreen: itemsOnScreen, item: item, canvas: canv });
            if (!item.item.overrideMove)
                item.setToPoint(e.offsetX - (item.width / 2), e.offsetY - (item.height / 2));
        }
    }
});
var typing = false;
search.addEventListener("focusin", function (e) {
    e.preventDefault();
    typing = true;
});
search.addEventListener("focusout", function (e) { return typing = false; });
document.addEventListener("keypress", function (e) {
    if (!typing && !isBrowser(/chrome/)) {
        search.value = e.key;
    }
    search.focus();
    typing = true;
});
document.addEventListener("keydown", function (e) {
    if (e.ctrlKey) {
        switch (e.key) {
            case "1":
                inventory.sort(function (a, b) { return a.name > b.name; });
                e.preventDefault();
                break;
            case "2":
                inventory.sort(function (a, b) { return a.name < b.name; });
                e.preventDefault();
                break;
            case "3":
                inventory.sort(function (a, b) { return getTimeStampFromItem(a) > getTimeStampFromItem(b); });
                e.preventDefault();
                break;
            case "4":
                inventory.sort(function (a, b) { return getTimeStampFromItem(a) < getTimeStampFromItem(b); });
                e.preventDefault();
                break;
            case "5":
                inventory.sort(function (a, b) { return VisualItem.itemInRecipeCount(a) > VisualItem.itemInRecipeCount(b); });
                e.preventDefault();
                break;
            case "6":
                inventory.sort(function (a, b) { return VisualItem.itemInRecipeCount(a) < VisualItem.itemInRecipeCount(b); });
                e.preventDefault();
                break;
            case "/":
                alert("ctrl + 1: alphabetical sort\nctrl + 2: reverse alphabetical\nctrl + 3: oldest-newest\nctrl + 4: newest-oldest\nctrl + 5: used in most recipes\nctrl + 6: used in least recipes");
                e.preventDefault();
        }
        resetSideBar();
    }
    else if (e.key == "Escape") {
        search.value = "";
        resetSideBar();
    }
});
function resetSideBar() {
    for (var _i = 0, inventory_5 = inventory; _i < inventory_5.length; _i++) {
        var item = inventory_5[_i];
        removeFromSideBar(item);
    }
    for (var _a = 0, inventory_6 = inventory; _a < inventory_6.length; _a++) {
        var item = inventory_6[_a];
        updateInventory(item);
    }
}
//wrapper around putting a rectangle on a canvas
function drawRect(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
//wrapper around putting text on a canvas
function drawText(text, color, font, x, y) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
}
//wrapper around putting an image on a canvas
function blitImg(imgSrc, x, y) {
    var img = document.createElement("img");
    img.src = imgSrc;
    ctx.drawImage(img, x, y);
}
//mean function finds the mean of values
function mean() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var sum = 0;
    for (var _a = 0, arguments_1 = arguments; _a < arguments_1.length; _a++) {
        var num = arguments_1[_a];
        sum += num;
    }
    return sum / arguments.length;
}
//more for debugging, adds item by name/id
function giveItemByName(itemName) {
    for (var _i = 0, items_9 = items; _i < items_9.length; _i++) {
        var item = items_9[_i];
        if (item.name == itemName) {
            if (!isInInventory(item)) {
                updateItemCount();
                addToInventory(item);
                updateInventory(item);
            }
        }
    }
}
//more for debugging, removes item by name/id
function removeItemByName(itemName) {
    for (var _i = 0, inventory_7 = inventory; _i < inventory_7.length; _i++) {
        var item = inventory_7[_i];
        if (item.name == itemName) {
            updateItemCount(-1);
            removeFromInventory(item);
            removeFromSideBar(item);
        }
    }
}
function findItemByName(itemName) {
    for (var _i = 0, items_10 = items; _i < items_10.length; _i++) {
        var item = items_10[_i];
        if (item.name == itemName) {
            return item;
        }
    }
}
window.addEventListener("resize", function (e) {
    //puts the  clear button by the bottom right of canvas
    clearButton.style.top = window.innerHeight - clearButton.clientHeight + "px";
    clearButton.style.left = window.innerWidth / 2 + "px";
    //puts each item in the same relative place
    for (var i in itemsOnScreen) {
        var item = itemsOnScreen[i];
        var percentX = item.x / canv.width; //the percents keep the item at the same-ish relative position on the canvas
        var percentY = item.y / canv.height;
        item.x = Math.floor(window.innerWidth / 2 * percentX);
        item.y = window.innerHeight * percentY;
        if (item.x <= 0) {
            item.x = 0;
        }
        else if (item.x > window.innerWidth / 2 - item.width) {
            item.x = window.innerWidth / 2 - item.width;
        }
        if (item.y <= 0) {
            item.y = 0;
        }
        else if (item.y > window.innerHeight - item.height) {
            item.y = window.innerHeight - item.height;
        }
    }
    //resizes the canvas
    canv.width = window.innerWidth / 2;
    canv.height = window.innerHeight;
});
function invertHex(hex) {
    return (Number("0x1" + hex) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
}
function isBrowser(browserId) {
    return browserId.test(navigator.userAgent.toLocaleLowerCase());
}
function choice(array) {
    return array[Math.floor(Math.random() * array.length)];
}
