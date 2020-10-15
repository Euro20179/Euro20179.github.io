/*
DOCUMENTATION
styling:

name: more like an id should be unique
displayName: the name to show in the inventory and on image
img: the image to show instead of a square
starter: whether or not it will appear at the start of the game
color: the background color of the rectangle, and color of text in inventory
sidebarColor: the color of the inventory text
inventoryHover: the styling for hovernig on the item in inventory

events:

oncreate: a function that gets called when the item is created
onclick: a function that gets called when the item is clicked
*/
const CSS_COLOR_NAMES = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
];
var colors = {
    red: "#ff0000",
    orange: "#FFA500",
    yellow: "#ffff00",
    green: "#00ff00",
    blue: "#0000ff",
    indigo: "#4b0082",
    purple: "#800080",
    pink: "#ffc0cb",
    violet: "#ee82ee",
};
//THE ACTUALLY IMPORTANT BIT
const items = [
    {
        name: "water",
        color: "blue",
        starter: true,
        img: "./imgs/water.png",
        width: 67,
        height: 50,
        hoverText: "water",
        hoverTextStyle: "color:blue"
    },
    {
        name: "time",
        color: "#f0f0f0",
        starter: true,
        textColor: "black",
        sidebarColor: "black",
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
        sidebarColor: "black",
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
        recipe: ["air", "air"],
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
        recipe: ["earth", "earth"],
    },
    {
        name: "mountain-range",
        displayName: "mountain range",
        color: "#000088",
        textColor: "#FFFAFA",
        recipe: ["mountain", "mountain"],
    },
    {
        name: 'mud',
        recipe: ["water", "earth"],
        color: "indianred"
    },
    {
        name: "sun",
        color: "yellow",
        oncreate: (e) => {
            alert("HOT");
        },
        recipe: ["fire", "atmosphere"],
        sidebarColor: "gold",
        hoverText: "HOT",
        hoverTextStyle: "color:red"
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
        inventoryHover: `color:white;
        background-color:red;
        background-image: url("https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wanowandthen.com%2Fmisc%2Ffire.jpg&f=1&nofb=1")`,
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
        textColor: "white",
        onclick: (e) => {
            e.canvas.style.backgroundColor = "blue";
        },
        onremove: (e) => {
            e.canvas.style.backgroundColor = "Linen";
        }
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
        recipe: ["ocean", "o2"],
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
        recipe: [
            ["land-animal", "building"],
            ["building", "life"]
        ]
    },
    {
        name: "love",
        color: "pink",
        recipe: ["human", "human"]
    },
    {
        name: "baby",
        color: "white",
        recipe: ["love", "human"],
        sidebarColor: "black"
    },
    {
        name: "family",
        color: "white",
        recipe: ["baby", "human"],
        sidebarColor: "black"
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
        onmove: (e) => {
            if (Math.random() > .9999)
                alert("just let me be free");
            const moveAmount = 10;
            let moveY = 0;
            let moveX = 0;
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
        oncreate: (e) => {
            let creatures = ["fish"];
            if (creatures.indexOf(e.item1.name) >= 0 || creatures.indexOf(e.item2.name) >= 0) {
                alert(`You did the right thing and put the animal in it's natural habitat`);
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
        secretItem: true,
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
        onremove: () => {
            new Audio("audio/glass.mp3").play();
        }
    },
    {
        name: "red-glass",
        recipe: ["glass", "red"],
        color: "#ff0000aa",
        onremove: () => {
            new Audio("audio/glass.mp3").play();
        }
    },
    {
        name: "star",
        color: "orange",
        recipe: ["sun", "night"],
    },
    {
        name: "starry-night",
        color: "black",
        textColor: "white",
        secretItem: true,
        recipe: ["star", "night"],
    },
    {
        name: "red",
        recipe: [
            ["light", "glass"],
            ["sun", "glass"]
        ],
        color: "red",
        onclick: (e) => {
            e.canvas.style.backgroundColor = "red";
        },
        onremove: (e) => {
            e.canvas.style.backgroundColor = "linen";
        }
    },
    {
        name: "orange-glass",
        recipe: ["glass", "orange"],
        color: "#ffa500aa",
        onremove: () => {
            new Audio("audio/glass.mp3").play();
        }
    },
    {
        name: "orange",
        recipe: [
            ["light", "glass"],
            ["sun", "glass"]
        ],
        color: "orange",
        onclick: (e) => {
            e.canvas.style.backgroundColor = "orange";
        },
        onremove: (e) => {
            e.canvas.style.backgroundColor = "linen";
        }
    },
    {
        name: "yellow-glass",
        recipe: ["glass", "yellow"],
        color: "#ffff00aa",
        onremove: () => {
            new Audio("audio/glass.mp3").play();
        }
    },
    {
        name: "yellow",
        recipe: [
            ["light", "glass"],
            ["sun", "glass"]
        ],
        color: "yellow",
        onclick: (e) => {
            e.canvas.style.backgroundColor = "yellow";
        },
        onremove: (e) => {
            e.canvas.style.backgroundColor = "linen";
        }
    },
    {
        name: "green-glass",
        recipe: ["glass", "green"],
        color: "#00ff00aa",
        onremove: () => {
            new Audio("audio/glass.mp3").play();
        }
    },
    {
        name: "green",
        recipe: [
            ["light", "glass"],
            ["sun", "glass"]
        ],
        color: "green",
        onclick: (e) => {
            e.canvas.style.backgroundColor = "green";
        },
        onremove: (e) => {
            e.canvas.style.backgroundColor = "linen";
        }
    },
    {
        name: "blue-glass",
        recipe: ["glass", "blue"],
        color: "#0000ffaa",
        onremove: () => {
            new Audio("audio/glass.mp3").play();
        }
    },
    {
        name: "blue",
        recipe: [
            ["light", "glass"],
            ["sun", "glass"]
        ],
        color: "blue",
        onclick: (e) => {
            e.canvas.style.backgroundColor = "blue";
        },
        onremove: (e) => {
            e.canvas.style.backgroundColor = "linen";
        }
    },
    {
        name: "pink-glass",
        recipe: ["glass", "pink"],
        color: "#ffc0cbaa",
        onremove: () => {
            new Audio("audio/glass.mp3").play();
        }
    },
    {
        name: "pink",
        recipe: [
            ["light", "glass"],
            ["sun", "glass"]
        ],
        color: "pink",
        onclick: (e) => {
            e.canvas.style.backgroundColor = "pink";
        },
        onremove: (e) => {
            e.canvas.style.backgroundColor = "linen";
        }
    },
    {
        name: "indigo-glass",
        recipe: ["glass", "indigo"],
        color: "#4b0082",
        onremove: () => {
            new Audio("audio/glass.mp3").play();
        }
    },
    {
        name: "indigo",
        recipe: [
            ["light", "glass"],
            ["sun", "glass"]
        ],
        color: "indigo",
        onclick: (e) => {
            e.canvas.style.backgroundColor = "indigo";
        },
        onremove: (e) => {
            e.canvas.style.backgroundColor = "linen";
        }
    },
    {
        name: "violet-glass",
        recipe: ["glass", "violet"],
        color: "#ee82eeaa",
        onremove: () => {
            new Audio("audio/glass.mp3").play();
        }
    },
    {
        name: "violet",
        recipe: [
            ["light", "glass"],
            ["sun", "glass"]
        ],
        color: "violet",
        onclick: (e) => {
            e.canvas.style.backgroundColor = "violet";
        },
        onremove: (e) => {
            e.canvas.style.backgroundColor = "linen";
        }
    },
    {
        name: "boulder",
        recipe: ["stone", "stone"],
        color: "gray",
        textColor: "white",
        sidebarColor: "gray",
    },
    {
        name: "ancient-stone-or-boulder",
        color: "darkgreen",
        secretItem: true,
        recipe: [
            ["time", "stone"],
            ["moss", "stone"],
            ["time", "boulder"],
            ["moss", "boulder"]
        ],
        return: (item, item2) => {
            item = item.name == "boulder" || item.name == "stone" ? item : item2;
            return {
                name: `ancient-${item.name}`,
                displayName: `ancient ${item.name}`,
                color: "darkgreen",
                textColor: "white",
                recipe: [
                    [item.name, "time"],
                    [item.name, "moss"]
                ],
                overrideStyling: true,
            };
        }
    },
    {
        name: "vine",
        color: "green",
        recipe: [
            ["moss", "tree"],
            ["moss", "time"]
        ],
    },
    {
        name: "house",
        color: "skyblue",
        recipe: [
            ["family", "building"],
            ["human", "building"]
        ],
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
        oncreate: (e) => {
            alert("sacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\nsacrafise\n");
        }
    },
    {
        name: "neighborhood",
        color: "skyblue",
        recipe: [
            ["house", "house"]
        ]
    },
    {
        name: "flying-fish",
        displayName: "flying fish",
        color: "skyblue",
        textColor: "orange",
        sidebarColor: "orange",
        recipe: [
            ["fish", "atmosphere"],
            ["fish", "sky"],
            ["fish", "air"]
        ]
    },
    {
        name: "bird",
        color: "black",
        textColor: "white",
        sidebarColor: "black",
        recipe: ["life", "air"]
    },
    {
        name: "tool",
        color: "grey",
        textColor: "white",
        sidebarColor: "grey",
        recipe: [
            ["stone", "human"]
        ]
    },
    {
        name: "shovel",
        color: "brown",
        recipe: ["tool", "earth"]
    },
    {
        name: "dirt",
        color: "darkgoldenrod",
        textColor: "beige",
        sidebarColor: "darkgoldenrod",
        recipe: ["shovel", "earth"]
    },
    {
        name: "worm",
        color: "brown",
        textColor: "white",
        sidebarColor: "brown",
        recipe: [
            ["land-animal", "dirt"],
            ["life", "dirt"]
        ]
    },
    {
        name: "grass",
        color: "green",
        recipe: ["earth", "life"]
    },
    {
        name: "field",
        color: "limegreen",
        textColor: "black",
        sidebarColor: "limegreen",
        recipe: ["grass", "grass"]
    },
    {
        name: "farmer",
        color: "lightgrey",
        textColor: "black",
        sidebarColor: "black",
        recipe: ["human", "field"]
    },
    {
        name: "wheat",
        color: "wheat",
        recipe: [
            ["farmer", "field"]
        ]
    },
    {
        name: "cow",
        color: "brown",
        textColor: "white",
        sidebarColor: "brown",
        recipe: ["land-animal", "grass"]
    },
    {
        name: "milk",
        color: "white",
        textColor: "black",
        sidebarColor: "black",
        recipe: [
            ["cow", "tool"]
        ]
    },
    {
        name: "butcher",
        color: "red",
        recipe: [
            ["human", "cow"]
        ]
    },
    {
        name: "meat",
        color: "red",
        recipe: [
            ["cow", "butcher"]
        ]
    },
    {
        name: "bread",
        color: "wheat",
        recipe: [
            ["wheat", "wheat"],
            ["baker", "wheat"]
        ]
    },
    {
        name: "baker",
        color: "wheat",
        recipe: ["bread", "human"]
    },
    {
        name: "balogna-sandwich",
        color: "coral",
        displayName: "balogna sandwich",
        textColor: "black",
        sidebarColor: "coral",
        recipe: ["bread", "meat"],
    },
    {
        name: "turkey-sandwich",
        color: "coral",
        displayName: "turkey sandwich",
        textColor: "black",
        sidebarColor: "coral",
        recipe: ["bread", "meat"],
    },
    {
        name: "chicken-sandwich",
        color: "coral",
        displayName: "chicken sandwich",
        textColor: "black",
        sidebarColor: "coral",
        recipe: ["bread", "meat"],
    },
    {
        name: "ham-sandwich",
        color: "coral",
        displayName: "ham sandwich",
        textColor: "black",
        sidebarColor: "coral",
        recipe: ["bread", "meat"],
    },
    {
        name: "plant",
        color: "green",
        recipe: [
            ["o2", "water"],
            ["water", "mud"],
            ["sun", "dirt"],
            ["water", "dirt"]
        ]
    },
    {
        name: "tree",
        color: "brown",
        textColor: "white",
        sidebarColor: "brown",
        recipe: [
            ["plant", "time"]
        ]
    },
    {
        name: "axe",
        color: "brown",
        textColor: "white",
        sidebarColor: "brown",
        recipe: ["tree", "tool"]
    },
    {
        name: "log",
        color: "brown",
        textColor: "white",
        sidebarColor: "brown",
        recipe: ["tree", "axe"]
    },
    {
        name: "campfire",
        color: "red",
        recipe: ["log", "fire"]
    },
    {
        name: "charcoal",
        color: "black",
        textColor: "white",
        sidebarColor: "black",
        recipe: [
            ["fire", "log"],
            ["fire", "tree"]
        ]
    },
    {
        name: "smoke",
        color: "grey",
        textColor: "white",
        sidebarColor: "grey",
        recipe: [
            ["fire", "log"],
            ["fire", "tree"]
        ]
    },
    {
        name: "wildfire",
        color: "orange",
        recipe: [
            ["fire", "tree"],
            ["fire", "grass"]
        ]
    },
    {
        name: "cup",
        color: "white",
        sidebarColor: "black",
        recipe: [
            ["water", "tool"]
        ]
    },
    {
        name: "water-bottle",
        displayName: "water bottle",
        color: "blue",
        recipe: ["water", "tool"]
    },
    {
        name: "pollution",
        color: "limegreen",
        recipe: [
            ["water-bottle", "ocean"]
        ]
    },
    {
        name: "river",
        color: "blue",
        recipe: [
            ["water", "mountain"]
        ]
    },
    {
        name: "delta",
        color: "green",
        recipe: ["river", "ocean"]
    }
];
function getItemByName(name) {
    let item;
    for (item of items) {
        if (item.name == name) {
            return item;
        }
    }
}
