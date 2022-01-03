function clearHover(){
    const squareDiv = document.querySelectorAll('.squareDiv');
    squareDiv.forEach(div => {
        div.classList.remove('hovered');
        div.setAttribute('hover-count',0);
        div.style = "";
    });
}

function resize(newRes){
    container.textContent ="";
    createGrid(newRes);
}

function colorMode(element){
    const userColor = document.querySelector('#colorPick').value;
    element.style = `background: ${userColor};`;
}

function rainbowMode(element){
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    element.style = `background: rgb(${r},${g},${b}, 0.8);`;
}

function shadingMode(element){
    let hoverCount = element.getAttribute('hover-count')
    let opacity = hoverCount/10;
    console.log(opacity);
    element.style = `background: rgb(0,0,0,${opacity});`
}

function eraserMode(element){
    element.style = `background: rgb(255,255,255);`
}

function removeSelectStyle(){
    single.classList.remove('selected');
    rainbow.classList.remove('selected');
    shade.classList.remove('selected');
    eraser.classList.remove('selected');
    return;
}

function modeSelect(element, sketchMode){
    switch (sketchMode) {
        case 'colorMode': 
            colorMode(element);
            break;
        case 'rainbowMode': 
            rainbowMode(element)
            break;
        case 'shadingMode':
            shadingMode(element)
            break;
        case 'eraser':
            eraserMode(element)
            break;
    }
}

function shadeHover(element){
    let currentCount = parseInt(element.getAttribute('hover-count'));
    if(currentCount < 10){
        currentCount += 1;
        element.setAttribute('hover-count',currentCount);
    }
}

function hover(element, sketchMode){
    element.addEventListener('mouseenter', e => {
        if(sketchMode==='shadingMode'){
            shadeHover(element);
        }
        modeSelect(element, sketchMode);
    });
    element.addEventListener('touchmove', e => {
        // get XY coords of element
        let clientX = e.touches[0].clientX;
        let clientY = e.touches[0].clientY;
        let selectedEl = document.elementFromPoint(clientX, clientY)

        if(sketchMode==='shadingMode'){
            shadeHover(selectedEl);
        }
        if(selectedEl.className==='squareDiv'){
            modeSelect(selectedEl, sketchMode);
            console.log(selectedEl);
        }
    });
}

function etchSketch(sketchMode){
    const squareDiv = document.querySelectorAll('.squareDiv');
    squareDiv.forEach(div => {
        hover(div, sketchMode);
    });
}

function createGrid(numSquares){
    createGridStyle(numSquares);
    for(i=0; i<numSquares; i++){ 
        for(j=0; j<numSquares; j++){
            createDiv();}
    }
    etchSketch(sketchMode);
}

function createDiv(){
    const squareDiv = document.createElement('div');
    squareDiv.classList.add('squareDiv');
    squareDiv.setAttribute('hover-count',0);
    container.append(squareDiv);
}

function createGridStyle(numSquares){
    const styleElement = document.querySelector('#gridStyle');
    let styleContent = `.gridContainer { grid-template-columns: repeat(${numSquares}, 1fr);}`;
    styleElement.textContent = styleContent;
}

const container = document.querySelector('.gridContainer');
const single = document.querySelector('#colorMode');
const colorPick = document.querySelector('#colorPick');
const rainbow = document.querySelector('#rainbowMode');
const shade = document.querySelector('#shadingMode');
const eraser = document.querySelector('#eraser');
const clear = document.querySelector('#clear');
const resDisplay = document.querySelector('.resolution');
const resolution = document.querySelector('#resRange');

let sketchMode = 'colorMode';
createGrid(resolution.value);

single.addEventListener('click', ()=>{
    removeSelectStyle();
    single.classList.add('selected');
    sketchMode = 'colorMode';
    etchSketch(sketchMode);
})

colorPick.addEventListener('change', ()=>{
    removeSelectStyle();
    single.classList.add('selected');
    sketchMode = 'colorMode';
    etchSketch(sketchMode);
})

rainbow.addEventListener('click', ()=>{
    removeSelectStyle();
    rainbow.classList.add('selected');
    sketchMode = 'rainbowMode';
    etchSketch(sketchMode);
})

eraser.addEventListener('click', ()=>{
    removeSelectStyle();
    eraser.classList.add('selected');
    sketchMode = 'eraser';
    etchSketch(sketchMode);
})

shade.addEventListener('click', ()=>{
    removeSelectStyle();
    shade.classList.add('selected');
    sketchMode = 'shadingMode';
    etchSketch(sketchMode);
})

clear.addEventListener('click', ()=>{
    clearHover();
})

resolution.addEventListener('change', ()=>{
    newRes = resolution.value;
    resDisplay.textContent = `Grid: ${newRes}x${newRes}`
    resize(newRes);
})