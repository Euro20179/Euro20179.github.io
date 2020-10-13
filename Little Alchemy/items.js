/*
DOCUMENTATION
styling:

name: more like an id should be unique
displayName: the name to show in the inventory and on image
img: the image to show instead of a square
starter: whether or not it will appear at the start of the game
color: the background color of the rectangle, and color of text in inventory
sidebarColor: the color of the inventory text
hoverStyle: the styling for hovernig on the item in inventory

events:

oncreate: a function that gets called when the item is created
onclick: a function that gets called when the item is clicked
*/
var colors = {
    red: "#ff0000",
    orange: "#FFA500",
    yellow: "#ffff00",
    green: "#00ff00",
    blue: "#0000ff",
    indigo: "#4b0082",
    purple: "#800080",
    pink: "#ffc0cb",
    violet: "#ee82ee"
};
//THE ACTUALLY IMPORTANT BIT
var items = [
    {
        name: "water",
        color: "blue",
        starter: true,
        img: "./imgs/water.png"
    },
    {
        name: "time",
        color: "#f0f0f0",
        starter: true,
        textColor: "black",
        sidebarColor: "black"
    },
    {
        name: "pond",
        color: "blue",
        recipe: ["water", "water"]
    },
    {
        name: "lake",
        color: "blue",
        recipe: ["pond", "pond"]
    },
    {
        name: "ocean",
        color: "blue",
        recipe: ["lake", "lake"]
    },
    {
        name: "evaporation",
        color: "#0000ff77",
        recipe: [
            ["water", "sun"],
            ["ocean", "sun"],
            ["lake", "sun"]
        ],
        sidebarColor: "black"
    },
    {
        name: "air",
        color: "transparent",
        textColor: 'black',
        starter: true,
        sidebarColor: "black"
    },
    {
        name: "atmosphere",
        color: "skyblue",
        textColor: "black",
        recipe: ["air", "air"]
    },
    {
        name: "earth",
        color: "brown",
        starter: true,
        recipe: [
            ["time", "mud"],
            ["planet", "water"],
            ["planet", "ocean"]
        ]
    },
    {
        name: "lava",
        color: "red",
        recipe: ["fire", "earth"]
    },
    {
        name: "stone",
        color: "#555555",
        textColor: "white",
        sidebarColor: "black",
        recipe: [
            ["lava", "water"],
            ["lava", "time"]
        ]
    },
    {
        name: "volcano",
        color: "red",
        recipe: [
            ["lava", "earth"],
            ["lava", "mountain"]
        ]
    },
    {
        name: "mountain",
        color: "brown",
        recipe: ["earth", "earth"]
    },
    {
        name: "mountain-range",
        displayName: "mountain range",
        color: "#000088",
        textColor: "#FFFAFA",
        recipe: ["mountain", "mountain"]
    },
    {
        name: 'mud',
        recipe: ["water", "earth"],
        color: "indianred"
    },
    {
        name: "sun",
        color: "yellow",
        oncreate: function (e) {
            alert("HOT");
        },
        recipe: ["fire", "atmosphere"],
        sidebarColor: "gold"
    },
    {
        name: "o2",
        color: "transparent",
        textColor: "black",
        sidebarColor: "black",
        recipe: ["air", "air"]
    },
    {
        name: "fire",
        color: "red",
        starter: true,
        textColor: "white",
        hoverStyle: "color:white;\n        background-color:red;\n        background-image: url(\"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wanowandthen.com%2Fmisc%2Ffire.jpg&f=1&nofb=1\")"
    },
    {
        name: "steam",
        color: "white",
        textColor: "black",
        recipe: ["fire", "water"],
        sidebarColor: "black"
    },
    {
        name: "brick",
        recipe: ["fire", "mud"],
        color: "indianred"
    },
    {
        name: "wall",
        recipe: ["brick", "brick"],
        color: "brown"
    },
    {
        name: "building",
        color: "lightgrey",
        recipe: ["wall", "wall"]
    },
    {
        name: "blue",
        recipe: ["atmosphere", "sun"],
        color: "blue",
        textColor: "white"
    },
    {
        name: "ash",
        color: "black",
        textColor: "white",
        recipe: ["fire", "water"]
    },
    {
        name: "sand",
        color: "BlanchedAlmond",
        recipe: ["ocean", "earth"]
    },
    {
        name: "sky",
        color: "skyblue",
        recipe: ["blue", "atmosphere"]
    },
    {
        name: "moon",
        color: "grey",
        recipe: ["stone", "sky"]
    },
    {
        name: "night",
        color: "black",
        recipe: ["moon", "sky"],
        textColor: "white"
    },
    {
        name: "day",
        color: "yellow",
        recipe: ["sun", "sky"],
        textColor: "black"
    },
    {
        name: "solar-eclipse",
        displayName: "solar eclipse",
        recipe: [
            ["sun", "moon"],
            ["moon", "day"]
        ],
        color: "#88888888",
        textColor: "#00000099",
        sidebarColor: "#00000099"
    },
    {
        name: "satellite",
        color: "#f0f0f0",
        recipe: [
            ["earth", "sun"],
            ["moon", "earth"]
        ],
        sidebarColor: "grey"
    },
    {
        name: "planet",
        color: "limegreen",
        recipe: [
            ["earth", "sun"],
            ["earth", "sky"]
        ]
    },
    {
        name: "moss",
        color: "green",
        textColor: "white",
        sidebarColor: "green",
        recipe: [
            ["water", "stone"],
            ["water", "boulder"]
        ]
    },
    {
        name: "dust",
        color: "#f0f0f0",
        recipe: ["earth", "air"],
        sidebarColor: "black",
        textColor: "black"
    },
    {
        name: "life",
        color: "limegreen",
        recipe: ["ocean", "o2"]
    },
    {
        name: "ocean-animal",
        displayName: "ocean animal",
        color: "blue",
        textColor: "white",
        sidebarColor: "blue",
        recipe: ["life", "ocean"]
    },
    {
        name: "land-animal",
        displayName: "land animal",
        color: "brown",
        textColor: "white",
        sidebarColor: "brown",
        recipe: ["life", "earth"]
    },
    {
        name: "human",
        color: "gainsboro",
        recipe: ["land-animal", "building"]
    },
    {
        name: "love",
        color: "pink",
        recipe: ["human", "human"]
    },
    {
        name: "baby",
        color: "white",
        recipe: ["love", "human"]
    },
    {
        name: "family",
        color: "white",
        recipe: ["baby", "human"]
    },
    {
        name: "fireman",
        color: "red",
        recipe: ["human", "fire"]
    },
    {
        name: "mountaineer",
        color: "blue",
        textColor: "skyblue",
        sidebarColor: "blue",
        recipe: [
            ["human", "mountain"],
            ["human", "mountain-range"]
        ]
    },
    {
        name: "fish",
        color: "turquoise",
        textColor: "blue",
        recipe: ["ocean-animal", "ocean"],
        onmove: function (e) {
            if (Math.random() > .9999)
                alert("just let me be free");
            var moveAmount = 10;
            var moveY = 0;
            var moveX = 0;
            if (Math.random() > .5)
                moveY = Math.floor(Math.random() * moveAmount);
            else
                moveY = Math.floor(Math.random() * moveAmount);
            if (Math.random() > .5)
                moveX = Math.floor(Math.random() * moveAmount);
            else
                moveX = Math.floor(Math.random() * moveAmount);
            e.item.setToPoint(e.event.offsetX - (e.item.width / 2) + moveX, e.event.offsetY - (e.item.height / 2) + moveY);
        },
        overrideMove: true
    },
    {
        name: "natural-habitat",
        displayName: "natural habitat",
        color: "green",
        recipe: [
            ["fish", "ocean"],
        ],
        oncreate: function (e) {
            var creatures = ["fish"];
            if (creatures.indexOf(e.item1.name) >= 0 || creatures.indexOf(e.item2.name) >= 0) {
                alert("You did the right thing and put the animal in it's natural habitat");
            }
        }
    },
    {
        name: "dust-bunny",
        displayName: "dust bunny",
        color: "#f0f0f0",
        recipe: ["dust", "dust"],
        sidebarColor: "black",
        textColor: "black",
        secretItem: true
    },
    {
        name: "monster",
        recipe: [
            ["dust-bunny", "life"]
        ],
        color: "black",
        textColor: "white",
        sidebarColor: "black"
    },
    {
        name: "glass",
        color: "#eeeeeeaa",
        recipe: ["fire", "sand"],
        sidebarColor: "#000000aa",
        onremove: function () {
            new Audio("audio/glass.mp3").play();
        }
    },
    {
        name: "?-glass",
        recipe: ["glass", "*"],
        color: "red",
        "return": function (item, item2) {
            item = item2.name == "glass" ? item : item2;
            if (Object.keys(colors).indexOf(item.name) >= 0) {
                return {
                    name: item.name + "-glass",
                    displayName: item.name + " glass",
                    color: colors[item.name] + "aa",
                    overrideStyling: true,
                    recipe: [item.name, "glass"],
                    isFakeTitle: "this item is generated by the game\n",
                    onremove: function (e) {
                        new Audio("audio/glass.mp3").play();
                    }
                };
            }
            return {
                name: "glass",
                color: "#eeeeeeaa",
                recipe: ["fire", "sand"],
                sidebarColor: "#000000aa",
                onremove: function () {
                    new Audio("audio/glass.mp3").play();
                }
            };
        }
    },
    {
        name: "star",
        color: "orange",
        recipe: ["sun", "night"]
    },
    {
        name: "starry-night",
        color: "black",
        textColor: "white",
        secretItem: true,
        recipe: ["star", "night"]
    },
    {
        name: "color-generator",
        recipe: [
            ["light", "glass"],
            ["sun", "glass"]
        ],
        "return": function (item, item2) {
            var colorName = Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)];
            var choice = colors[colorName];
            return {
                name: colorName,
                color: choice,
                overrideStyling: true,
                isFakeTitle: "This item is generated by the game\n"
            };
        }
    },
    {
        name: "boulder",
        recipe: ["stone", "stone"],
        color: "gray",
        textColor: "white",
        sidebarColor: "gray"
    },
    {
        name: "ancient-stone-or-boulder",
        color: "darkgreen",
        recipe: [
            ["time", "stone"],
            ["moss", "stone"],
            ["time", "boulder"],
            ["moss", "boulder"]
        ],
        "return": function (item, item2) {
            item = item.name == "boulder" || item.name == "stone" ? item : item2;
            return {
                name: "ancient-" + item.name,
                displayName: "ancient " + item.name,
                color: "darkgreen",
                textColor: "white",
                recipe: [
                    [item.name, "time"],
                    [item.name, "moss"]
                ],
                overrideStyling: true
            };
        }
    },
    {
        name: "vine",
        color: "green",
        recipe: [
            ["moss", "tree"],
            ["moss", "time"]
        ]
    },
    {
        name: "house",
        recipe: [
            ["family", "building"],
            ["human", "building"]
        ]
    },
    {
        name: "human-sacrifise",
        displayName: "human sacrifise",
        color: "#8a0707",
        textColor: "white",
        sidebarColor: "#8a0707",
        recipe: [
            ["baby", "volcano"],
            ["human", "volcano"]
        ],
        secretItem: true,
        oncreate: function (e) {
            alert("sacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\n");
        }
    },
];
