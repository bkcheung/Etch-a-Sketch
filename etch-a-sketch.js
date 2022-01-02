function createGridStyle(numSquares){
    const styleElement = document.querySelector('#gridStyle');
    let styleContent = `.gridContainer { grid-template-columns: repeat(${numSquares}, 1fr);}`;
    styleElement.textContent = styleContent;
}

function createDiv(){
    const squareDiv = document.createElement('div');
    squareDiv.classList.add('squareDiv');
    container.append(squareDiv);
}

function rainbowMode(element){
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    element.style = `background: rgb(${r},${g},${b}, 0.8);`;
}

function colorMode(element){
    const userColor = document.querySelector('#colorPick').value;
    element.style = `background: ${userColor};`;
}

function modeSelect(element, sketchMode){
    switch (sketchMode) {
        case 'colorMode': 
            colorMode(element);
            break;
        case 'rainbowMode': 
            rainbowMode(element)
            break;
    }
}

function hover(element, sketchMode){
    element.addEventListener('mouseenter', e => {
        element.classList.add('hovered');
        modeSelect(element, sketchMode);
    });
    // element.addEventListener('touchstart', e => element.classList.add('hovered'));
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

function clearHover(){
    const squareDiv = document.querySelectorAll('.squareDiv');
    squareDiv.forEach(div => {
        div.classList.remove('hovered');
        div.style = "";
    });
}

function resize(newRes){
    container.textContent ="";
    createGrid(newRes);
}

const container = document.querySelector('.gridContainer');
const single = document.querySelector('#colorMode');
const colorPick = document.querySelector('#colorPick');
const rainbow = document.querySelector('#rainbowMode');
const mono = document.querySelector('#monochromeMode');
const clear = document.querySelector('#clear');
const resDisplay = document.querySelector('.resolution');
const resolution = document.querySelector('#resRange');

let sketchMode = 'colorMode';

createGrid(resolution.value);

single.addEventListener('click', ()=>{
    sketchMode = 'colorMode';
    etchSketch(sketchMode);
})

colorPick.addEventListener('change', ()=>{
    sketchMode = 'colorMode';
    etchSketch(sketchMode);
})

rainbow.addEventListener('click', ()=>{
    sketchMode = 'rainbowMode';
    etchSketch(sketchMode);
})

clear.addEventListener('click', ()=>{
    clearHover();
})

resolution.addEventListener('change', ()=>{
    newRes = resolution.value;
    resDisplay.textContent = `${newRes}x${newRes}`
    resize(newRes);
})