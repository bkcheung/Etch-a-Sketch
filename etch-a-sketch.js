function createGridStyle(numSquares){
    const styleElement = document.querySelector('#gridStyle');
    let styleContent = `.gridContainer { display: grid; max-width: 500px; grid-template-columns: repeat(${numSquares}, 1fr);}`;
    styleElement.textContent = styleContent;
}

function createDiv(){
    const squareDiv = document.createElement('div');
    squareDiv.classList.add('squareDiv');
    container.append(squareDiv);
}

function createGrid(numSquares){
    createGridStyle(numSquares);
    for(i=0; i<numSquares; i++){ 
        for(j=0; j<numSquares; j++){
            createDiv();}
    }
}

function hover(element, className){
    element.addEventListener('mouseenter', e => element.classList.add(className));
    element.addEventListener('touchstart', e => element.classList.add(className));
}

function etchSketch(){
    const squareDiv = document.querySelectorAll('.squareDiv');
    squareDiv.forEach(div => {
        hover(div, 'hovered');
    });
}

const container = document.querySelector('.gridContainer');
const clear = document.querySelector('#clear');
let numSquares = 0;
createGrid(16);
etchSketch();

clear.addEventListener('click', ()=>{
    numSquares = 0;
    container.textContent = "";
    while(numSquares===0 || numSquares>100 || numSquares < 0){
        numSquares = window.prompt('Enter number of squares per side (1 to 100)');
    }
    createGrid(numSquares);
    etchSketch();
})