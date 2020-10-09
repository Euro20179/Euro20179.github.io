const canv = document.getElementById("canvas")
const ctx = canv.getContext("2d")
let astroidSpeed = 1;
let score = 0;
let astroidsAtOnce = 1;
class Lazar{
    color = "red"
    speed = 20;
    width = 3;
    height = 30;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    static shoot(){
        return new Lazar(firerer.x + (firerer.width / 2), firerer.y - firerer.height)
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        this.y -= this.speed
        if(this.y < 0){
            lazars.pop(lazars.indexOf(this))
        }
    }
}

class Astroid{
    color = "black"
    width = 50
    height = 50
    id = String(Math.random())
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        this.y += this.speed
        if(this.y > canv.height){
            delete astroids[this.id]
            if(confirm(`Game Over\nFinal score: ${score}`)){
                window.location = "/"
            }
        }
    }
}

function lazarCollideAstroid(astroid, lazar){
    if(lazar.x >= astroid.x && 
    lazar.x <= astroid.x + astroid.width &&
    lazar.y <= astroid.y - astroid.height
    ){
        score += 1;
        scoreDiv.innerHTML = `Score: ${score}`
        if(score % 20 == 0) astroidsAtOnce += 1
        astroidSpeed += Math.random() / 4;
        //changes the speed of the shooter thing
        //if random > .7 (30%) speed decreases instead of increases
        if(Math.random() > .7) firerer.changeSpeed(Math.random() * -Math.random());
        else firerer.changeSpeed(Math.random() * Math.random());
        lazars.pop(lazars.indexOf(lazar))
        delete astroids[astroid.id]
    }
}

let firerer = {
    x: canv.width / 2,
    y: canv.height - 60,
    moveing: null,
    color: "red",
    width: 50,
    height: 20,
    speed: 5,
    Shooting: false,
    moveLeft:()=>{
        if(firerer.x <= firerer.speed)
            firerer.x = canv.width - firerer.width;
        firerer.x -= firerer.speed;
    },
    moveRight:()=>{
        if(firerer.x >= canv.width - firerer.width - firerer.speed)
            firerer.x = 0
        firerer.x += firerer.speed;
    },
    move:()=>{
        switch(firerer.moveing){
            case "left": firerer.moveLeft();break;
            case "right": firerer.moveRight(); break;
        }
    },
    draw(){
        ctx.fillStyle = firerer.color
        ctx.fillRect(firerer.x, firerer.y, firerer.width, firerer.height)
    },
    changeSpeed(amnt){
        firerer.speed += amnt;
    },
}

let lazars = []
let astroids = {}

document.addEventListener("keydown", e=>{
    switch(e.key){
        case "ArrowLeft":
            firerer.moveing = "left"
            break;
        case "ArrowRight":
            firerer.moveing = "right"
            break;
        case " ":
            lazars.append(Lazar.shoot())
    }
})

let lastFrame = 0;
function main(time){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    firerer.move()
    firerer.draw()
    for(let lazar of lazars){
        lazar.draw()
        for(let i in astroids){
            lazarCollideAstroid(astroids[i], lazar)
        }
    }
    for(let key in astroids){
        astroids[key].draw()
    }

    if(Object.keys(astroids).length < astroidsAtOnce){
        let astroid = new Astroid(Math.floor(Math.random() * (canv.width - 50)), 0, astroidSpeed)
        astroids[astroid.id] = astroid
    }
    window.requestAnimationFrame(main)
    lastFrame = time
}


window.requestAnimationFrame(main)

Array.prototype.append = Array.prototype.push
Astroid.prototype.width = 50