const textEditor = document.querySelector('.text-editor')
const preview = document.querySelector('.preview')
const cusotmMdChkbx = document.getElementById("custom")
const textEditorinnerHTML = localStorage.getItem("TEXT")
const fileReader = document.getElementById("fileReader")
const contextMenuColorpicker = document.getElementById("context-menu-color-picker")
let InterprateLive = document.getElementById("live-interprate").checked
let Preview = document.getElementById("previews").checked
let tabs = []
let DarkMode = document.getElementById("darkmode").checked
let TypingElem = false;
let currTypingElem = []
let extraElemTextLength = 0;
let elementInnerHTML;
let AutoCompleteElements = document.getElementById("autocomplete-elements").checked

textEditor.style.backgroundColor = document.getElementById("text-editor-color").value
textEditor.style.color = document.getElementById("text-editor-text-color").value

preview.style.backgroundColor = document.getElementById("preview-color").value
preview.style.color = document.getElementById("preview-text-color").value

setDarkMode()
function setDarkMode(){
    const body = document.getElementsByTagName("body")[0]
    if(DarkMode){
        body.classList="darkmode"
    }else body.classList=""

}

function invertHex(hex) {
  return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
}

function turnOffAllOtherTabs(currTab){
    for(let tab of tabs){
        tab.turnOff()
    }
    currTab.turnOn()
}

class Tab{
    constructor(tab, tabTitle){
        this.tab = tab
        this.tabTitle = tabTitle
        this.tabTitle.addEventListener("click", (e)=>{
            for(let tab of tabs){
                tab.turnOff()
            }
            this.turnOn()
        })
        tabs.push(this)
    }
    turnOff(){
        this.tab.classList = "bar-section-off"
        this.tabTitle.classList = "bar-section-title title-off"
    }
    turnOn(){
        this.tab.classList="bar-section-on"
        this.tabTitle.classList = "bar-section-title title-on"
    }
}

const homeTab = new Tab(document.getElementById("home"), document.getElementById("home-title"))
const insertTab = new Tab(document.getElementById("insert"), document.getElementById('insert-title'))
const fileTab = new Tab(document.getElementById("file"), document.getElementById("file-title"))
const optionsTab = new Tab(document.getElementById("options"), document.getElementById("options-title"))
const UIOptionsTab = new Tab(document.getElementById("ui-options"), document.getElementById("ui-title"))
const helpTab = new Tab(document.getElementById("help"), document.getElementById("help-title"))

let currTab = homeTab
turnOffAllOtherTabs(currTab)

class Upsidedown extends HTMLElement{
    connectedCallback(){
        let newStr = "";
        let Close = true;
        for(let char of this.innerHTML){
            if(char == "<"){
                Close = false;
            }
            else if(Close){
                if(char in upsideDown) newStr += upsideDown[char];
                else newStr += char;
                continue;
            }
            else if(char == ">" && !Close){
                Close = true;
            }
            newStr += char;
        }
        this.innerHTML = newStr;
    }
}
class Circled extends HTMLElement{
    connectedCallback(){
        let newStr = "";
        let Close = true;
        for(let char of this.innerHTML){
            if(char == "<"){
                Close = false;
            }
            else if(Close){
                if(char in circleLetters) newStr += String.fromCharCode(circleLetters[char])
                else newStr += char;
                continue;
            }
            else if(char == ">"){
                Close = true;
            }
            newStr += char;
        }
        this.innerHTML = newStr;
    }
}
class threeDGlasses extends HTMLElement{
    connectedCallback(){
        this.style.textShadow = this.textShadow
        this.style.color = this.color
    }
    get textShadow(){
        if(this.style.textShadow){
            return this.style.textShadow
        }
        return ".3em .2em red"
    }
    get color(){
        if(this.style.color){
            return this.style.color;
        }
        return "blue"
    }
}
class Unicode extends HTMLElement{
    connectedCallback(){
        let newStr = "";
        let Close = true;
        let currCode = "";
        for(let char of this.innerHTML){
            if(char == "<"){
                Close = false;
                newStr += String.fromCodePoint(parseInt(currCode)) + " "
                currCode = ""
            }
            else if(char === " " && Close && currCode){
                newStr += String.fromCodePoint(parseInt(currCode)) + " "
                currCode = ""
                continue;
            }
            else if(Close){
                if(parseInt(char) >= 0) currCode += parseInt(char)
                else newStr += char
                continue;
            }
            else if(char == ">"){
                Close = true;
            }
            newStr += char;
        }
        newStr += String.fromCodePoint(currCode) + " "
        this.innerHTML = newStr;
    }
}
class Rainbow extends HTMLElement{
    connectedCallback(){
        this.style.backgroundImage = `linear-gradient(${this.direction}, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)`
        this.style.color = this.color
        this.style.position = this.position
        if(this.absolute){
            this.style.position = "absolute"
        }
    }
    get position(){
        if(this.style.position){
            return this.style.position
        }
        return "static"
    }
    get absolute(){
        return this.getAttribute("absolute") != null
    }
    get color(){
        if(this.style.color){
            return this.style.color
        }
        return "black"
    }
    get direction(){
        if (this.getAttribute("direction")){
            return this.getAttribute("direction")
        }
        return "to right"
    }
    get spin(){
        if(this.getAttribute('spin')){
            return this.getAttribute('spin')
        }
        return false;
    }
    set direction(val="0deg"){
        this.setAttribute('direction', val)
    }
}

class Choose extends HTMLElement{
    connectedCallback(){
        if(this.items){
            const choice = this.items.split("|")[Math.floor(Math.random() * this.items.split("|").length)]
            this.innerHTML = this.innerHTML.replace(/(?:\{value\}|\$1)/g, choice)
        }
    }
    get items(){
        return this.getAttribute("items")
    }
}

class Rand extends HTMLElement{
    connectedCallback(){
        if(!this.answer){
            this.genNumber()
        }
        this.innerHTML = this.innerHTML.replace(/(?:\{value\}|\$1)/g, this.answer)
    }
    genNumber(){
        this.answer = (Math.random() * (this.max - this.min) + this.min).toFixed(this.round)
    }
    get max(){
        const _max = this.getAttribute("max")
        return _max ? parseInt(_max) : 100
    }
    get min(){
        const _min = this.getAttribute("min")
        return _min ? parseInt(_min) : 1
    }
    get round(){
        const _round = this.getAttribute("round")
        return _round ? parseInt(_round) : 0
    }
}

class Spacer extends HTMLElement{
    connectedCallback(){
        this.style.paddingLeft = this.padding
        this.style.backgroundColor = this.color
    }
    get color(){
        return this.style.backgroundColor ? this.style.backgroundColor : this.getAttribute("color")
    }
    get padding(){
        if(this.getAttribute("amount")){
            if(parseInt(this.amount.slice(-1)) >= 0) return this.amount +  "ch"
            return this.amount
        }
        return this.style.paddingLeft ? this.style.paddingLeft : "1ch"
    }
    get amount(){
        return this.getAttribute("amount")
    }
}

customElements.define('c-upsidedown', Upsidedown)
customElements.define('c-circled', Circled)
customElements.define('c-rainbow', Rainbow)
customElements.define("c-3d", threeDGlasses)
customElements.define("c-choose", Choose)
customElements.define("c-random", Rand)
customElements.define("c-unicode", Unicode)
customElements.define("c-spacer", Spacer)

var SyncScrolling = document.getElementById("syncscrolling").checked;
const converter = new showdown.Converter({
    tables: true,
    strikethrough: true,
    simplifiedAutoLink:true,
    tables: true,
    ghCodeBlocks: true,
    emoji:true,
    parseImgDimensions:true
})

if(textEditorinnerHTML){
    textEditor.value = textEditorinnerHTML
}

function addBorder(){
    let size=document.getElementById('border-size').value; 
    let unit = document.getElementById('border-unit').value;
    let line = document.getElementById('border-line-types').value; 
    let color = document.getElementById('border-color').value;
    let direction = document.getElementById('border-direction').value
    startEndTypeInTextArea(`{b${direction}'${size}${unit} ${line} ${color}'`, '}')
}

function addSpace(){
    let color = document.getElementById("space-color").value
    let amount = document.getElementById("space-amount").value
    let unit = document.getElementById("space-unit").value
    addTextTypeInTextArea(`{space${color} ${amount}${unit}}`)
}

function addMarquee(){
    let dir = document.getElementById("marquee-direction").value;
    let width = document.getElementById("marquee-width").value;
    let height = document.getElementById('marquee-height').value
    let speed = document.getElementById("marquee-speed").value;
    let unit = document.getElementById("marquee-unit").value;
    startEndTypeInTextArea(`{move[dir"${dir}"w"${width}${unit}"h"${height}${unit}"s"${speed}"] `, "}")
}

function addShadow(){
    let unit = document.getElementById('shadow-dir-unit').value;
    let right = document.getElementById('shadow-right').value;
    let down = document.getElementById('shadow-down').value;
    let color = document.getElementById('shadow-color').value;
    let blur = document.getElementById('shadow-blur').value;
    let blurUnit = document.getElementById("shadow-blur-unit").value;
    startEndTypeInTextArea(`{shadow'${right}${unit} ${down}${unit} ${blur}${blurUnit} ${color}'`, '}')
}

function dropHandler(e){
    e.preventDefault();
    const fr = new FileReader();
    fr.onload=()=>{
        textEditor.value = fr.result
        preview.innerHTML = convert(fr.result, custom=cusotmMdChkbx.checked)
    }
    fr.readAsText(e.dataTransfer.files[0])
}
function dragOverHandler(ev) {
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

function addOLULInclude(){
    let types = document.getElementById("ul-ol-types").value
    if(types){
        addTextTypeInTextArea(`\\${document.getElementById('ul-ol').value}marker:${document.getElementById('list-layer').value}\\TYPE:${types}\\`)
    }else addTextTypeInTextArea(`\\${document.getElementById('ul-ol').value}marker:${document.getElementById('list-layer').value}\\${document.getElementById('marker-text').value}\\`)
}

function addToCurrElem(e){
    if(currTypingElem[currTypingElem.length - 1] === " " && TypingElem){
        extraElemTextLength += 1;
        return;
    }
    else if(TypingElem && e.key == "Backspace"){
        currTypingElem.length -= 1
    }
    else if(TypingElem && e.key.length === 1 && e.key != "<"){
        currTypingElem.push(e.key)
    }
    if(TypingElem && !currTypingElem.length){
        TypingElem = false;
        extraElemTextLength = 0;
    }
}

document.addEventListener("keydown", e=>{
    if(e.altKey && e.key == "q"){
        preview.printMe()
    }
    if(e.altKey && e.shiftKey && e.ctrlKey){
        switch(e.key){
            case "S": 
                saveFile();       
                document.getElementById("download").click()    
                e.preventDefault()    
                break;
            case "B":
                savePlain();
                document.getElementById("download-plain").click();
                e.preventDefault()
                break;
            case "P":
                savePDF();
                e.preventDefault()
                break; 
        }
    }
})

let PreviewMode = false;
preview.addEventListener("click", e=>{
    if(e.altKey){
        if(!PreviewMode){
            const editingBar = document.getElementById('editing-bar')
            editingBar.classList = "editing-bar-off"
            preview.style.width = "100%";
            preview.style.height = "100%";
            textEditor.style.display = "none"
            PreviewMode = true;
        }
        else{
            const editingBar = document.getElementById('editing-bar')
            editingBar.classList = "editing-bar"
            preview.style.width = "50%";
            preview.style.height = "100%";
            textEditor.style.display = "initial"
            PreviewMode = false;
        }
        e.preventDefault();
    }
})

textEditor.addEventListener('keydown', e=>{
    if(AutoCompleteElements){
        //starts the element
        if(e.key == "<"){
            elementInnerHTML = [textEditor.selectionStart, textEditor.selectionEnd]
            textEditor.setRangeText("<", textEditor.selectionStart, textEditor.selectionStart)
            textEditor.setSelectionRange(textEditor.selectionStart + 1, textEditor.selectionStart + 1)
            TypingElem = true;
            e.preventDefault()
        }
        //ends the typing element
        else if(TypingElem && e.key == ">"){
            if(["hr", "wbr", "br"].indexOf(currTypingElem.join("")) < 0){

                addTextTypeInTextArea(">")

                //+2 is the length of < and >
                //extraElemTextLength is the stuff like style=
                textEditor.setSelectionRange(elementInnerHTML[1] + currTypingElem.length + 2 + extraElemTextLength, elementInnerHTML[1] + currTypingElem.length + 2 + extraElemTextLength)
                textEditor.setRangeText(`</${currTypingElem.join("")}>`)
                currTypingElem = []
                TypingElem = false;
                elementInnerHTML = []
                e.preventDefault();
            }
            currTypingElem = []
            TypingElem = false;
            elementInnerHTML = []
        }
        //appends to curr element if applicable
        else if(TypingElem){
            addToCurrElem(e)
        }
    }
    if(!e.ctrlKey && !e.altKey && !e.shiftKey){
        switch (e.key) {
            case "Tab":
                startEndTypeInTextArea("	", "")
                e.preventDefault()        
                break;
            case "F6":
                DarkMode = !DarkMode
                setDarkMode()
                e.preventDefault()
                break
            case "F4":
                document.getElementById("custom").click()
                e.preventDefault()
                break
            case "F2":
                document.getElementById("live-interprate").click()
                e.preventDefault()
                break;
            case "F1":
                preview.innerHTML = convert(textEditor.value, custom=cusotmMdChkbx.checked)
                e.preventDefault()
                break;
            default:
                break;
        }
    }
    //ctrl + shift + key
    else if(e.ctrlKey  && !e.shiftKey && !e.altKey){
        switch(e.key){
            case "q": typeInTextarea("''''", 2); e.preventDefault(); break;                
            case ",": startEndTypeInTextArea("\\_[", "]"); e.preventDefault(); break;
            case ".": startEndTypeInTextArea("\\^[", "]"); e.preventDefault(); break;
            case "b": typeInTextarea("****", 2); e.preventDefault(); break;
            case "u": typeInTextarea("__"); e.preventDefault(); break;
            case "r": typeInTextarea("~__~", 2); e.preventDefault(); break;
            case "d": typeInTextarea(".__.", 2); e.preventDefault(); break;
            case "h": typeInTextarea("*--*", 2); e.preventDefault(); break;
            case "i": typeInTextarea('**'); e.preventDefault(); break;     
            case "e": typeInTextarea("``"); e.preventDefault(); break;           
            case "s": typeInTextarea('~~~~', 2); e.preventDefault(); break;
            case "p": addTextTypeInTextArea(">PRO: ");e.preventDefault();break;
            case "1": fileTab.tabTitle.click();e.preventDefault(); break
            case "2": homeTab.tabTitle.click();e.preventDefault();break;
            case "3": insertTab.tabTitle.click();e.preventDefault();break;
            case "4": helpTab.tabTitle.click();e.preventDefault();break;
            case "5": UIOptionsTab.tabTitle.click();e.preventDefault();break;
            case "6": optionsTab.tabTitle.click();e.preventDefault();break;
            case "k": startEndTypeInTextArea("[](", ")", {cursor: 1}); e.preventDefault();break
            case "y": startEndTypeInTextArea("[", "]:()", {cursor:-1, defaultCursor:1});e.preventDefault();break;
            case "'":
                addOLULInclude()
                e.preventDefault();break;
        }
    }
    //ctrl + shift + key
    else if(e.ctrlKey && e.shiftKey && !e.altKey){
        switch(e.key){
        case "U":
            typeInTextarea('^__^', 2); e.preventDefault(); break;
        case "R":
            typeInTextarea('^~~^', 2); e.preventDefault(); break;
        case "D":
            typeInTextarea('^..^', 2); e.preventDefault(); break;
        case "?":
            startEndTypeInTextArea("> ''", "''[]"); e.preventDefault(); break;
        case "F":
            startEndTypeInTextArea("{f'' ", "}", {cursor:3, defaultCursor:3}); e.preventDefault(); break;
        case "E":
            const editingBar = document.getElementById('editing-bar')
            if(editingBar.classList.contains("editing-bar-off")){
                editingBar.classList = "editing-bar"
            }
            else{
                editingBar.classList = "editing-bar-off"
            }
            
            e.preventDefault()
            break;
        case "S": 
            let currTextSize = document.getElementById("text-size").value
            const currTextUnit = document.getElementById("text-units").value
            if (parseInt(currTextSize.slice(-1)) >= 0){
                currTextSize += currTextUnit
            }
            startEndTypeInTextArea(`{s${currTextSize} `, "}")
            e.preventDefault()
            break;
        case "Z":
            const currColorSelected = document.getElementById("text-color").value
            startEndTypeInTextArea(`{${currColorSelected}:`, "}")
            e.preventDefault()
            break; 
        case "T":
            startEndTypeInTextArea('|', '||\n|---|---|\n|||');e.preventDefault();break;
        case "K":
            startEndTypeInTextArea("{key:", "}");e.preventDefault();break;
        case ":":
            startEndTypeInTextArea("{cmd:", "}");e.preventDefault();break;       
        case "!":
            startEndTypeInTextArea(`<c-3d>`, `</c-3d>`); e.preventDefault(); break
        case "@":
            startEndTypeInTextArea("<c-rainbow>", "</c-rainbow>"); e.preventDefault(); break
        case "#":
            startEndTypeInTextArea("<c-upsidedown>", "</c-upsidedown>"); e.preventDefault(); break;
        case "$":
            startEndTypeInTextArea("<c-circled>", "</c-circled>"); e.preventDefault(); break;
        case "%":
            startEndTypeInTextArea("<c-unicode>", "</c-unicode>"); e.preventDefault(); break;
        case "^":
            startEndTypeInTextArea("<c-choose items=''>", "</c-choose>"); e.preventDefault(); break;
        case "&":
            startEndTypeInTextArea("<c-random min=0 max=100 round=0>", "</c-random>"); e.preventDefault(); break;
        case "*":
            startEndTypeInTextArea("<c-spacer></c-spacer>", "");e.preventDefault();break;
        case "{":
            startEndTypeInTextArea("|", "<-|");e.preventDefault();break;
        case "}": startEndTypeInTextArea("|->", "|");e.preventDefault();break;
        case "|": startEndTypeInTextArea("|->", "<-|");e.preventDefault();break;
        }
    }
    //alt + ctrl + key
    else if(e.altKey && e.ctrlKey && !e.shiftKey){
        switch(e.key){
            case "u":
                typeInTextarea("____", 2),
                e.preventDefault();
                break
            case "p": addTextTypeInTextArea(">CON: ");e.preventDefault(); break
            case "i":startEndTypeInTextArea("```\n", "\n```");e.preventDefault();break;
        }
    }
    else if(e.altKey && e.ctrlKey && e.shiftKey && e.key == "U"){
        typeInTextarea("^^__^^", 3),
        e.preventDefault();
    }
    else if(e.altKey && e.ctrlKey && e.shiftKey && e.key == "F"){
        addTextTypeInTextArea("\\FONT: arial\\\n")
        e.preventDefault();
    }
    else if(e.altKey && e.key == "p"){
        contextMenuColorpicker.click();
    }
    else if(e.altKey && e.key == "i"){
        typeInTextarea("``")
        e.preventDefault();
    }
    else if(e.altKey && e.key === "s"){
        addShadow()
        e.preventDefault()
    }
    else if(e.altKey && e.key == "h"){
        addSpace();
        e.preventDefault()
    }
    else if(e.altKey &&e.key == "b"){
        addBorder()
        e.preventDefault()
    }

    //alt + shift + key
    else if(e.altKey && e.shiftKey && e.ctrlKey){
        switch(e.key){
            case "O": document.getElementById('fileReader').click(); e.preventDefault(); break; 
            case "Z":
                 let currBGColorSelected = document.getElementById("background-color").value
                startEndTypeInTextArea(`[${currBGColorSelected}]*-`, "-*")
                e.preventDefault()           
                break;  
        }
    }    
})

function updateSpaceButton(){
    if(Preview){
        let color = document.getElementById("space-color").value;
        let amount = document.getElementById("space-amount").value;
        let amountUnit = document.getElementById("space-unit").value;
        let spaceButton = document.getElementById("space-button")
        spaceButton.style.marginLeft=amount + amountUnit
        spaceButton.style.backgroundColor = color;
    }
}

function updateBorderButton(){
    if(Preview){
        let size=document.getElementById('border-size').value; 
        let unit = document.getElementById('border-unit').value;
        let line = document.getElementById('border-line-types').value; 
        let color = document.getElementById('border-color').value;
        let side = document.getElementById("border-direction").value;
        const borderButton = document.getElementById('border-button')
        borderButton.style.border = "";
        switch(side){
            case ">":
                borderButton.style.borderRight = `${size}${unit} ${line} ${color}`; break
            case "<":
                borderButton.style.borderLeft = `${size}${unit} ${line} ${color}`; break
            case "v":
                borderButton.style.borderBottom = `${size}${unit} ${line} ${color}`; break;
            case "^":
                borderButton.style.borderTop = `${size}${unit} ${line} ${color}`; break
            default:
                borderButton.style.border = `${size}${unit} ${line} ${color}`; break
        }
    }
}

function updateShadowButton(){
    if(Preview){
        let unit = document.getElementById('shadow-dir-unit').value;
        let right = document.getElementById('shadow-right').value;
        let down = document.getElementById('shadow-down').value;
        let color = document.getElementById('shadow-color').value;
        let blur = document.getElementById('shadow-blur').value;
        let blurUnit = document.getElementById("shadow-blur-unit").value;
        const shadowButton = document.getElementById('shadow-button')
        shadowButton.style.textShadow = `${right}${unit} ${down}${unit} ${blur}${blurUnit} ${color}`
    }
}
cusotmMdChkbx.addEventListener('click', e=>{
    if(InterprateLive){
        let value  = textEditor.value
        preview.innerHTML = convert(value, custom=cusotmMdChkbx.checked)
    }
})

textEditor.addEventListener('input', (e)=>{
    if(InterprateLive){
        let { value } = e.target;
        //matches the variable things like [VAR:x=y]
        preview.innerHTML = convert(value, custom=cusotmMdChkbx.checked)
        localStorage.setItem("TEXT", textEditor.value)
    }
})
textEditor.addEventListener('click', (e)=>{
    textEditor.dispatchEvent(new Event('input'))
})

document.getElementById("color-picker-menu-item").addEventListener("click", (e)=>{
    let left = e.clientX;
    let top = e.clientY;
    contextMenuColorpicker.style.left = left;
    contextMenuColorpicker.style.top = top;
    contextMenuColorpicker.click()
})

contextMenuColorpicker.addEventListener("change", e=>{
    addTextTypeInTextArea(contextMenuColorpicker.value.split("#")[1])
})
function saveFile(){
    const downloadB = document.getElementById("download")
    let file = new Blob([preview.innerHTML], {type:"text/markdown"})
    downloadB.href = URL.createObjectURL(file)
    downloadB.download = "converted.md"
}
function savePDF(){
    html2pdf()
    .set({
        image: {type: "jpeg", quality: 1}
    })
    .from(preview)
    .save()
}
function savePlain(){
    const downloadB = document.getElementById("download-plain")
    let file = new Blob([textEditor.value], {type:"text/markdown"})
    downloadB.href = URL.createObjectURL(file)
    downloadB.download = "Plain.md"
}

fileReader.addEventListener("change", (e)=>{
    const fr = new FileReader();
    fr.onload=()=>{
        textEditor.value = fr.result
        preview.innerHTML = convert(fr.result, custom=cusotmMdChkbx.checked)
    }
    fr.readAsText(fileReader.files[0])

})

function insertAtCurosr(text, el=document.activeElement, selectMode="end"){
    const [start, end] = [el.selectionStart, el.selectionEnd]
    el.setRangeText(text, start, end, selectMode)
}

function checkBox(elementId) {
    const inputE = document.getElementById(elementId)
    inputE.checked = !inputE.checked
}

var pScroll = false;
var eScroll = false;

preview.addEventListener("scroll", (e)=>{
    if(!SyncScrolling) return;
    if(eScroll){
        eScroll = false;
        return;
    }
    pScroll = true;
    let percent = preview.scrollTop / (preview.scrollHeight - preview.clientHeight)
    textEditor.scrollTop = percent * (textEditor.scrollHeight - textEditor.clientHeight)
})


textEditor.addEventListener("scroll", (e)=>{
    if(!SyncScrolling) return;
    if(pScroll){
        pScroll = false;
        return;
    }
    eScroll = true;
    let percent = textEditor.scrollTop / (textEditor.scrollHeight - textEditor.clientHeight)
    preview.scrollTop = percent * (preview.scrollHeight - preview.clientHeight)
})

/**
 * 
 * @param {string} newText 
 * @param {number} endSpot
 */
function typeInTextarea(newText, endSpot=1){
    let el = textEditor
    let [start, end] = [el.selectionStart, el.selectionEnd];
    el.setRangeText(newText.substring(0, endSpot), start, start, 'end')
    el.setRangeText(newText.substring(endSpot, newText.length), end + endSpot, end + endSpot)
    if(start != end) end += endSpot
    el.setSelectionRange(end + endSpot, end + endSpot)
}
/**
 * 
 * @param {string} startText 
 * @param {string} endText 
 */
function startEndTypeInTextArea(startText, endText, options=null){
    let el = textEditor
    let [start, end] = [el.selectionStart, el.selectionEnd];
    if(options){
        if(options.special){
            if (el.value.slice(start, end).match(options.specialMatch)){
                startText = options["special"].start
                endText = options["special"].end
            }
        }
    }
    el.setRangeText(startText, start, start, 'end') //the start text placement
    el.setRangeText(endText, end + startText.length, end + startText.length) //the end text  placement
    if(start != end) end += endText.length
    let cursorStart = end + startText.length
    //default cursor is when it's replacing no text
    //cursor is when it's putting text in the new text
    if(options){
        if(options.cursor){
            if(options.defaultCursor && start==end){
                cursorStart = start + options.defaultCursor
            }
            else if(options.cursor < 0){
                cursorStart += options.cursor
            }else cursorStart = start + options.cursor
        }
    }
    el.setSelectionRange(cursorStart, cursorStart)
}

function addTextTypeInTextArea(text){
    let el = textEditor
    el.setRangeText(text)
    el.setSelectionRange(el.selectionEnd + text.length, el.selectionEnd + text.length)
}

HTMLElement.prototype.printMe = printMe;
function printMe(query){
  var myframe = document.createElement('IFRAME');
  myframe.domain = document.domain;
  myframe.style.position = "absolute";
  myframe.style.top = "-10000px";
  document.body.appendChild(myframe);
  myframe.contentDocument.write(this.innerHTML) ;
  myframe.focus();
  myframe.contentWindow.print();
  myframe.parentNode.removeChild(myframe) ;// remove frame
   // wait for images to load inside iframe
  window.focus();
 }