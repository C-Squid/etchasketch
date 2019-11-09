const container = document.querySelector('#container');
const board = document.querySelector('#board');
const clear = document.querySelector('#clear');
const colors = document.querySelector('#colors');
const bw = document.querySelector('#bw');
const darken = document.querySelector('#darken');
let dimension = 16;
let boardDiv;
let colorChoice = 'black';

function drawBlack() {
    container.removeChild(boardDiv);
    colorChoice = 'black';
    createGrid(dimension);
}
function drawColor() {
    container.removeChild(boardDiv);
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    colorChoice = `rgb(${r}, ${g}, ${b})`;
    createGrid(dimension);
}

function createGrid(dimension) {
    boardDiv = document.createElement('div');
    boardDiv.setAttribute('id', 'board')
    boardDiv.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;
    boardDiv.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
    for (i = 1; i <= (dimension**2); i++) {
        let newDiv = document.createElement('div');
        newDiv.setAttribute('id', `box${i}`);
        newDiv.setAttribute('class', 'box');
        newDiv.addEventListener('mouseover', function(e){
            e.target.style.backgroundColor = colorChoice;
        });
        boardDiv.appendChild(newDiv);
    }
    container.appendChild(boardDiv);
}

function sizePrompt() {
    let userInput = prompt('How many squares per side?', 16);
    dimension = parseInt(userInput);
    if (userInput === null) {
        return;
    } else if (isNaN(dimension)) {
        alert('You must input a number');
        sizePrompt();
    } else if (dimension <= 0) {
        alert('You must input a positive integer');
        sizePrompt();
    } else {
        container.removeChild(boardDiv);
        createGrid(dimension);
    }
}

clear.addEventListener('click', () => {
    sizePrompt();
});

bw.addEventListener('click', () => drawBlack());
colors.addEventListener('click', () => drawColor());

createGrid(16);

