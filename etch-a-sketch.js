function createDiv(){
    const squareDiv = document.createElement('div');
    squareDiv.classList.add('squareDiv');
    container.append(squareDiv);
}

function createDivGrid(){
    for(i=0; i<16; i++){ createDiv();
        for(j=0; j<16; j++){ createDiv();}
    }
}

function hover(element, className){
    element.addEventListener('mouseenter', e => element.classList.add(className));
}

function etchSketch(){
    const squareDiv = document.querySelectorAll('.squareDiv');
    squareDiv.forEach(div => {
        hover(div, 'hovered');
    });
}

const container = document.querySelector('.gridContainer');
createDivGrid();
etchSketch();
