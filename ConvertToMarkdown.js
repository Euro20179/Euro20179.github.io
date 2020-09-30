const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const LOWER = "abcdefghijklmnopqrstuvwxyz"
const NUMBERS = "0123456789"
const upsideDown = {
    a: "\u0250",
    b: "q",
    c: "\u0254",
    d: "p",
    e: "\u01DD",
    f: "\u025f",
    g: "\u0183",
    h: "\u0265",
    i: "\u1D09",
    j: "\u027E",
    k: "\u029E",
    l: "l",
    m: "\u026f",
    n: "u",
    o: "o",
    p: "d",
    q: "b",
    r: "\u0279",
    s: "s",
    t: "\u0287",
    u: "n",
    v: "\u028c",
    w: "\u028d",
    x: "x",
    y: "\u028e",
    z: "z",
    A: "\u2200",
    B: "B",
    C: "\u0186",
    D: "D",
    E: "\u018e",
    F: "\u2132",
    G: "\u2141",
    H: "H",
    I: "I",
    J: "\u017f",
    K: "\ua7b0",
    L: "\u025e",
    M: "\u019c",
    N: "N",
    O: "O",
    P: "\u0500",
    Q: "Q",
    R: "\u1d1a",
    S: "S",
    T: "\ua7b1",
    U: "\u2229",
    V: "\u0245",
    W: "\u028d",
    X: "X",
    Y: "\u2144",
    Z: "Z",
    " ": " ",
    "!": "¡",
    "?": "¿"
}

const circleLetters = {
    A: 9398,
    " ": 32,
    0: 9450,
    1: 9312,
    2: 9313,
    3: 9314,
    4: 9315,
    5: 9316,
    6: 9317,
    7: 9318,
    8: 9319,
    9: 9320
}
for(let x = 1; x < 52; x++){
    circleLetters[CHARS[x]] = circleLetters["A"] + x
}

const EMOJIS = {
    bking: "\u265a",
    bqueen: "\u265b",
    brook: "\u265c",
    bbishop: "\u265d",
    bknight: "\u265e",
    bpawn: "\u265f",
    wking: "\u2654",
    wqueen: "\u2655",
    wrook: "\u2656",
    wbishop: "\u2657",
    wknight: "\u2658",
    wpawn: "\u2659",
    dice: "🎲",
    dice1: "\u2680",
    dice2: "\u2681",
    dice3: "\u2682",
    dice4: "\u2683",
    dice5: "\u2684",
    dice6: "\u2685",
    card_spade: "\u2660",
    card_club: "\u2663",
    card_heart: "\u2665",
    card_diamond: "\u2666",
    card_hollow_spade: "\u2664",
    card_hollow_club: "\u2667",
    card_hollow_heart: "\u2661",
    card_hollow_diamond: "\u2662",
    male: "\u2642",
    female: "\u2640",
    middot: "\u00b7",
    degree: "\u00b0",
    quarter_note: "\u2669",
    eighth_note: "\u266a",
    beamed_eighth_note: "\u266b",
    beamed_sixteenth_note: "\u266c",
    g_cleff: "&#119070;",
    quarter_rest: "&#119101;",
    eighth_rest: "&#119102;",
    whole_note: "&#119133;",
    half_note: "&#119134;",
    sixteenth_note: "&#119137;",
    paragraph: "\u00b6",
    cent: "\u00a2",
    bitcoin: "\u20bf",
    euro_sign: "\u20ac",
    pound_sign: "\u00a3",
    world_map: "&#128506;",
    waffle: "🧇",
    ice: "🧊",
    brown_square: "🟫",
    purple_square: "🟪",
    blue_square: "🟦",
    yellow_square: "🟨",
    orange_square: "🟧",
    green_square: "🟩",
    red_square: "🟥",
    brown_circle: "🟤",
    purplse_circle: "🟣",
    green_circle: "🟢",
    yellow_circle: "🟡",
    orange_circle: "🟠",
    axe: "🪓",
    kite: "🪁",
    light_skin: "🏻",
    medium_light_skin: "🏼",
    medium_skin: "🏽",
    medium_dark_skin: "🏾",
    dark_skin: "🏿",
    jsmile: "&#12484;",
    shrug: "¯\\&lowbar;(ツ)\_/¯",
    upsidedown_e: "¡",
    upsidedown_q: "¿"
}
const imgEmotes = {
    java: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.softexia.com%2Fwp-content%2Fuploads%2F2017%2F04%2FJava-logo.png&f=1&nofb=1",
    c: 'https://cdn.iconscout.com/icon/free/png-256/c-programming-569564.png',
    cpp: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsdtimes.com%2Fwp-content%2Fuploads%2F2018%2F03%2Fcpppp.png&f=1&nofb=1',
    javascript: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F99%2FUnofficial_JavaScript_logo_2.svg%2F1200px-Unofficial_JavaScript_logo_2.svg.png&f=1&nofb=1',
    python: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcode.fb.com%2Fwp-content%2Fuploads%2F2016%2F05%2F2000px-Python-logo-notext.svg_.png&f=1&nofb=1',
    markdown: "fav.png",
    html: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-download.com%2Fwp-content%2Fuploads%2F2017%2F07%2FHTML5_badge.png&f=1&nofb=1",
    css: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2FLogos%2Fcss31600.png&f=1&nofb=1",
    autohotkey: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.warer.com%2Fmedia%2Fauto_hotkey-logo.png&f=1&nofb=1"
}
regexes = [
[
/(?<!\\)\\RAND(?:\{([0-9]+) ([0-9]+)\})?\\/g,
(_, one=null, two=null)=>{
    if(!one){
        one = 0;
        two = 100;
    }
    return Math.floor((Math.random() * two) + 1)
}
],
[
/(?<!\\):U_([0-9]+):/g,
(_, chr)=>{
    return String.fromCodePoint(chr);
}
],
[
/(?<!\\)\\EMOJI\\/g,
()=>{
    return String.fromCodePoint(Math.floor(Math.random() * (129003 - 127744) + 127744))
}
],
[
/(?<!\\)\\UPPER\\/g,
UPPER
],
[
/(?<!\\)\\LOWER\\/g,
LOWER
],
[
/(?<!\\)\\NUMBERS\\/g,
NUMBERS
],
[
/(?<!\\)([0-9\.]+)\/\/([0-9\.]+)/g, //fractions
"$1⁄$2"
],
[
/(?<!\\)--->/g, //rarrow
"→"
],
[
/(?<!\\)==>/g,
"⇒"
],
[
/(?<!\\)-=>/g,
"⇶"
],
[
/(?<!\\)<---/g,
"←"
],
[
/(?<!\\)<==/g,
"⇐"
],
[
/(?<!\\)\|=>/g,
"⇨"
],
[
/(?<!\\)<=\|/g,
"⇦"
],
[
/(?<!\\)\|\\v/g,
"↓"
],
[
/(?<!\\)\|\\\^/g,
"↑"
],
[
/(?<!\\)> ?''(.*)''(?:\[([^\]]+)\])?/g,
(_, quote, author=null)=>{
    if(author){
        return `<blockquote>❝<i>${quote}</i>❞<br>&emsp;-<i>_${author}_</i></blockquote>`
    }
    return `<blockquote>❝<i>${quote}</i>❞</blockquote>`
}
],
[
/(?<!\\)''(.*)''/g,
"❝$1❞"
],
[
/(?<!\\)\((\*| )\)\s?(?!\()/g,
(_, checked)=> `<input type="radio" ${checked === "*" ? "checked" : ""} disabled>`
],
[
/(?<!\\)\{(?:\*|style|css)"(.+)" ?([^\}]+)\}/g,
"<span style='$1'>$2</span>"
],
[
/(?<!\\)\[(\.)?( |x)\]\s?(?!\()/g,
(_, interactive, checked)=> `<input type="checkbox" ${checked === "x" ? "checked" : ""} ${!interactive ? "disabled" : ""}>`
],
[
/(?<!\\)\{g#:?(?:"|')([^\-\n]*, ?)?rainbow(?:"|')(.*)\}/g,
"<span style='background-image:linear-gradient($1 #ff0000, #00ff00, #0000ff, #ff0000)'>$2</span>"
],
[
/(?<!\\)\{g#:?("|')(.*), ?([^,\}]*)\1([^\}]*)\}/g,
"<span style='background-image:linear-gradient($2, $3)'>$4</span>"
],
[
/(?<!\\)\{#:?([^ \n\}:]+)(?::| )?([^\}]*)\}/g,
(_, color, content)=>{
    return color.match(/(?:[0-f]{6}|[0-f]{8})/) ? `<span style="color:#${color}">${content}</span>` : `<span style="color:${color}">${content}</span>`
}
],
[
/(?<!\\)\{s(?!\.|[a-z]):?([^ \n]+) ([^\}]*)\}/g,
"<span style='font-size:$1'>$2</span>"
],
[
/(?<!\\)\{f(?:"|')([^"'\n]+)(?:"|')(?::| )?([^\}]*)\}/g,
"<span style='font-family:$1'>$2</span>"
],
[
/(?<!\\)(\[|\|)\=([0-9]+)(?: ?out ?| ?outof ?)([0-9]+)\=(?:\]|\|)(?:\[(.+)\])?/g,
(_, meterOrProgress, value, max, title)=> `<${meterOrProgress === '|' ? "meter" : "progress"} value="${value}" max="${max}" title="${title ? title : ""}"></${meterOrProgress === '|' ? "meter" : "progress"}>`
],
[
/(?<!\\)\{b('|")([^\n"']*)\1 ?([^\}]*)\}/g,
"<span style='border: $2'>$3</span>"
],
[
/(?<!\\)\{b\^:?('|")([^"'\n]*)\1 ?([^\}]*)\}/g,
"<span style='border-top: $2'>$3</span>"
],
[
/(?<!\\)\{bv:?('|")([^"'\n]*)\1 ?([^\}]*)\}/g,
"<span style='border-bottom: $2'>$3</span>"
],
[
/(?<!\\)\{l:?('|")([^"'\n]*)\1 ?([^\}]*)\}/g,
"<span style='border-left: $2'>$3</span>"
],
[
/(?<!\\)\{b>:?('|")([^"'\n]*)\1 ?([^\}]*)\}/g,
"<span style='border-right: $2'>$3</span>"
],
[
/(?<!\\)\{bg(?:#|:)?([^ \n]+)(.*)\}/g,
'<span style="background-color:$1">$2</span>'
],
[
/(?<!\\)\((C|R)\)/g,
(_, CR)=> CR == "C" ? "©" : "®"
],
[
/(?<!\\)\<-->/g,
"↔"
],
[
/(?<!\\)\|(\*|>)/g,
(_, type)=> type === "*" ? "⚑" : "🚩"
],
[
/(?<!\\):reg:([a-z]):/g,
":regional&lowbar;indicator_$1:"
],
[
/(?<!\\)(?:\[([^\n\]]*)\])?\\(\^|_)\[([^\]\n]*)\](?:\[([^\]\n]*)\])?/g,
(_, color, upDown, contents, title)=> `<${upDown === "^" ? "sup" : "sub"} style='color:${color ? color : ""}' title='${title ? title : ""}'>${contents}</${upDown === "^" ? "sup" : "sub"}>`
],
[
/(?<!\\)(?:D(?:ISP(?:LAY)?)?=? ?\[(.*)\]|("|')([^\n\2]+)\2)\s*?T?(?:OOL)?T?(?:IP)?=? ?\[(.*)\]/g,
'<span title="$4">$1$3</span>'
],
[
/(?<!\\)"(.+)"\s*\.{3}(.*)/g,
"<details><summary>$1</summary>$2</details>"
],
[
/(?<!\\)\{(k(?:ey)?|(?:cmd|samp|k(?:ey)?)):([^\}]+)\}/g,
(_, type, contents)=>`<${type != "k" && type != "key" ? type : "kbd"}>${contents}</${type != "k" && type != "key" ? type : "kbd"}>`
],
[
/(?<!\\)(?:\[(.*)\])?\*-([^-\*]+)-\*(?:\[([^\]\n]+)\])?/g,
"<mark title='$3' style='background-color:$1'>$2</mark>"
],
[
/(?<!\\)#([^ \-\n]+)(?:-{3,}|<hr>)/g,
'<hr style="background-color:$1;color:$1" />'
],
[
/(?<![\\#])(#{1,6}) ?(.+) \[#([^\]]+)\]/g,
(_, heading, contents, id)=> `<h${heading.length} id=${id}>${contents}`
],
[
/(?<!\\)\[(\.)?([0-9]+)->([0-9]+)\](?:\{?([0-9]+)\})?/g,
(_, disabled, min, max, value)=> `${min}<input type="range" min="${min}" max="${max}" value="${value}" ${!disabled ? "disabled" : ""}>${max}`
],
[
/(?<!\\)\[(.+)\](?: ?(.*))?:(?: |\n(?: |    )?)?(?:\[|\()(.*)(?:\)|\])/g,
(_, word, speech, def)=>`<u>${word}</u>${speech ? " (" + speech + ")" : ""}:<br><dfn style='margin-left:1.5em;display:block'>${def}</dfn>`
],
[
/(?<!\\)#\[([^\]]*)\]([^\n]*)/g,
"<span id='$1'>$2</span>"
], 
[
/(?<!\\|!)\[([^\]]*)\]\(([^ \)]+) ([^\)]*)\)/g, //here because it doesn't do titles
'<a title="$3" href="$2">$1</a>'
],
[
/(?<!\\)(?:\[([^\]]+)\])?\^\^_([^_\^\^\n]*)_\^\^(?:\[([^\n\]]+)\])?/g,
'<span style="text-decoration:overline double $1" title="$3">$2</span>'
],
[
/(?<!\\)(?:\[([^\]]+)\])?\^_([^_\^\n]*)_\^(?:\[([^\n\]]+)\])?/g,
'<span style="text-decoration:overline $1" title="$3">$2</span>'
],
[
/(?<!\\)(?:\[([^\]]+)\])?\^\.([^\.\^\n]*)\.\^(?:\[([^\n\]]+)\])?/g,
'<span style="text-decoration:overline dotted $1" title="$3">$2</span>'
],
[
/(?<!\\)(?:\[([^\]]+)\])?\^~([^~\^\n]*)~\^(?:\[([^\n\]]+)\])?/g,
'<span style="text-decoration:overline wavy $1" title="$3">$2</span>'
],
[
/(?<!\\)(?:\[([^\]]+)\])?\._([^_\.\n]+)_\.(?:\[([^\n\]]+)\])?/g,
'<span style="text-decoration:underline dotted $1" title="$3">$2</span>'
],
[
/(?<!\\)(?:\[([^\]]+)\])?~_([^_~\n]+)_~(?:\[([^\n\]]+)\])?/g,
'<span style="text-decoration:underline wavy $1" title="$3">$2</span>'
],
[
/(?<!\\)(?:\[([^\]]+)\])?__([^__\n]+)__(?:\[([^\n\]]+)\])?/g,
'<span style="text-decoration:underline double $1" title="$3">$2</span>'
],
[
/(?<!\\|!?\[.*\]\(.*|:.*)(?:\[([^\]]+)\])?_([^_\n]+)_(?:\[([^\n\]]+)\])?(?!.*:)/g,
"<u style='text-decoration:underline $1' title='$3'>$2</u>"
],
[
/(?<!\\)\|->([^\|]+)<-\|/g,
"<center>$1</center>"
],
[
/(?<!\\)\|->([^\|]+)\|/g,
"<p style='text-align:right'>$1</p>"
],
[
/(?<!\\)\|([^\|]+)<-\|/g,
"<p style='text-align:left'>$1</p>"
],
[
/(?<!\\)\{shadow:?(?:('|")([^\1\n]+)\1)? ?([^\}]*)\}/g,
"<span style='text-shadow:$2'>$3</span>"
],
[
/(?<!\\)\{(?:\.|class)("|')(.+)\1 ?(.+)\}/g,
"<span class='$2'>$3</span>"
],
[
/(?<!\\)(?<=(?:\* ?)?)(?:\.|>)(PRO|CON):?(.*)/g,
(_, PC, contents)=>{
    let Pro = PC === "PRO"
    return `<span style="color:${Pro ? "green" : "red"}>${Pro ? "✓" : "☒"} ${contents}</span>`
}
],
[
/(?<!\\)A!\[([^\n\]]+)\]/g,
"<audio controls='controls' src='$1'>"
],
[
/(?<!\\)\{(?:scroll|move|shift):?\[?(?:(?:dir)?:?(?:"|')([^\n"]+)(?:"|'))? ?(?:w?(?:idth)?:?(?:"|')([^\n"]+)(?:"|'))? ?(?:h?(?:eight)?:?(?:"|')([^\n"]+)(?:"|'))? ?(?:s?(?:croll)?(?:amount)?(?:peed)?:?(?:"|')([^\n"]+)(?:"|'))?\]?:? ?([^\n\}]+)\}/g, //this is the craziest regexp i've ever made it doesn't even do that much lmao
"<marquee direction='$1' height='$3' width='$2' scrollamount='$4'>$5</marquee>"
],
[
/(?<!\\)\{(?:white)?space:? ?(?:([^\n ]+))?(?:(?: a:?)?([^\n\}]+))?\}/g,
"<c-spacer color='$1' amount='$2'></c-spacer>"
],
[
/(?<!\\)\\olm(?:arker)?:([0-9]+)\\?([^\n\\]+)\\/g,
(_, layer, to)=>{
    console.log(layer, to)
    let selector = "ol"
    layer = parseInt(layer)
    for(let i = 0; i < layer;i++){
        selector += " li "
    }
    let listStyleType = null;
    if(to.match("TYPE:")){
        listStyleType = to.split("TYPE:")[1]
        return `<style>
${selector}{
    list-style-type: ${listStyleType}
}
${selector} li{
    list-style-type:inherit;
}
</style>`
    }
    return `<style>
    ${selector.trim()}::marker{
        content: "${to}\\00a0";
    }
    ${selector} li::marker{
        content:inherit;
    }
</style>`
}
],
[
/(?<!\\)\\ulm(?:arker)?:([0-9]+)\\?([^\n\\]+)\\/g,
(_, layer, to)=>{
    console.log(layer, to)
    let selector = "ul"
    layer = parseInt(layer)
    for(let i = 0; i < layer;i++){
        selector += " li "
    }
    let listStyleType = null;
    if(to.match("TYPE:")){
        listStyleType = to.split("TYPE:")[1]
        return `<style>
${selector}{
    list-style-type: ${listStyleType}
}
${selector} li{
    list-style-type:inherit;
}
</style>`
    }
    return `<style>
    ${selector.trim()}::marker{
        content: "${to}\\00a0";
    }
    ${selector} li::marker{
        content:inherit;
    }
</style>`
}
],
[
/(?<!\\)\\INCLUDE:(SHADOW|LIMARKER|SOFTBLINK|BLINK|PLACEHOLDER|KBD|SAMP|CMD)\\/g,
(_, include)=>{
    switch(include){
        case "SHADOW":
            return `
<style>
shadow{
text-shadow: .2em .2em 2px lightgrey;
}
</style>
`
        case "LIMARKER":
            return `
<style>
li[marker]::marker{
content:attr(marker);
}
</style>`
        case "SOFTBLINK":
            return `
<style>
softblink{
animation: soft-blinking linear infinite;
animation-duration:1000ms;
}
@keyframes soft-blinking{
	0%{
		color:inherit;
        text-shadow:inherit;
	}
	50%{
		color:transparent;
        text-shadow:none;
	}
}
</style>
`
        case "BLINK":
            return `
<style>
blink{
animation: blinking linear infinite;
animation-duration:1000ms;
}
@keyframes blinking{
	0%{
		color:inherit;
		background-color:inherit;
        text-shadow:inherit;
	}   
	49%{
		color:inherit;
		background-color:inherit;
        text-shadow:inherit;
	}
	50%{
		color:transparent;	
		background-color:transparent;
        text-shadow:none;
	}
	100%{
		color:transparent;
		background-color:transparent;
        text-shadow:none;
	}
}
</style>
`
        case "PLACEHOLDER":
            return `
<style>
placeholder{
color: grey;
user-select:none;
}
</style>
`
        case "KBD":
            return `<style>
kbd{
background-color:#fafbfc;
border:1px solid #d1d5da;
border-bottom-color:#c6cbd1;
border-radius:3px;
box-shadow:inset 0 -1px 0 #c6cbd1;
color:#444d56;display:inline-block;
font:.8em SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
line-height:.9em;
padding:3px 5px;
vertical-align:middle
}</style>`
        case "SAMP":
        case "CMD":
            return `<style>
${include}{
    font-family:monospace, monospace;
    color:green;
    background-color:black;
    padding:2px;
}
${include}::selection{
    background-color:white;
}</style>`
    }
}
],
[
/(?<!\\)\{id:? ?([^\n\}]+)\}/g,
'<span id="$1"></PRIVATE-BLANK-ELEMENT>'
],
[
/(?<!\\)\\(FONT|SIZE|COLOR|CUSTOM):(.*)\\/g,
(_, type, value)=>{
    switch(type){
        case "FONT":
            return `<div style='font-family:${value}'>`
        case "SIZE":
            return `<div style='font-size:${value}'>`
        case "COLOR":
            return `<div style='color:${value}'>`
        case "CUSTOM":
            return `<div style="${value}">`
    }
}
],
[
/(?<!\\)\\THEME:(.*)\\/g,
(_, theme)=>{
    return `<link rel="stylesheet" type="text/css" href="./Themes/${theme}.css" id="_theme">`
}
],
[
/(?<!\\)\{cur(?:sor)?:? ?([^\n:]*):([^\}]+)\}/g,
'<span style="cursor:$1">$2</span>'
],
[
/(?<!\\)\\count:([^\n]+)((?:\n)re)?\\/g,
(_, search, Re)=>{
    if(Re){
         return [...preview.textContent.matchAll(search)].length
    }
    return preview.textContent.split(search).length - 1
}
],
[
/(?<!\\)\\;(.*)\\/g,
"<!--$1-->"
],
[
/(?<!\\):([a-z0-9_]+):/g,
(_, name)=>{
    if(EMOJIS[name]) return EMOJIS[name]
    else if(imgEmotes[name]) return `<img src="${imgEmotes[name]}" align="absmiddle" style="width:1em">`
    return `:${name}:`
}
],
[
/(?<!\\)\\(?:(?:S|s(?:pecial)?)|c(?:ustom)?)\\/g,
""
]
]
function convert(value, custom=true){
    if(custom){
        for(let x of value.matchAll(/(?:\[|<)(?:var:|\$)([^=]*)=(.*)(?:\]|>)/g)){
            regex = new RegExp(`(?:\\[|<)${x[1]}(?:>|\\])`, "g")
            value = value.replace(x[0], "")
            value = value.replace(regex, x[2])
        }
        let replaces = [...value.matchAll(/(?<!\\)\\replace:?(.+)\n(.*)((?:\n)re)?\\/g)]
        for(let match of replaces){
            value = value.replace(match[0], "")
        }
        for(let match of replaces){
            if(match[3]){
                value = value.replace(new RegExp(match[1], "gm"), match[2])
            }else value = value.replaceAll(match[1], match[2])
        }
        for(let regexReplace of regexes){
            value = value.replace(regexReplace[0], regexReplace[1])
        }
    }
    return converter.makeHtml(value)
}

String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};