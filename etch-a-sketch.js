function createDiv(){
    const squareDiv = document.createElement('div');
    squareDiv.classList.add('squareDiv');
    container.append(squareDiv);
    return
}

function createDivGrid(){
    for(i=0; i<16; i++){
        createDiv();
        for(j=0; j<16; j++){
            createDiv();
        }
    }
}

const container = document.querySelector('.gridContainer');
createDivGrid();
