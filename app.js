function orchestrateNewGrid(){ 
    //clear down existing grid
   removeGrid();

   //draw the new grid
   drawGrid();

   //store the created cells and listen to them for events
   listenToCells();

}

function drawGrid() {
 
    //get the latest value from user input
    let squareGrid = userCanvasSize.value;
    const canvas = document.querySelector('.canvas');

    for (let i = 0; i < squareGrid * squareGrid; i++) {
        //create a div for each cell and append it to the canvas
        let div = document.createElement("div");
        div.classList.add(`cell`, `cell-${i}`, `cell-border`);
        canvas.append(div);
    }

    //apply how many cells there should be per column based on the user input
    canvas.style.gridTemplateColumns = `repeat(${squareGrid}, 1fr)`;

}

//iterate through each cell and remove it from the DOM
function removeGrid() {
    document.querySelectorAll('.cell').forEach(cell => cell.remove());
}

function listenToCells(){
    //find all the cells
    let canvasCells = document.querySelectorAll('.cell');

    //listen to hover on the cells so we can change colour
    canvasCells.forEach(cell => cell.addEventListener ('mouseenter', colourCell));
}

function colourCell(){
    if (mode == 'white-mode') {
        this.style.backgroundColor = 'white';
    } else if (mode == 'eraser-mode') {
        this.style.backgroundColor = '';
    } else if (mode == 'rainbow-mode') {
        this.style.backgroundColor = generateRandomRGB();
    }
}

function generateRandomRGB(){
    let rgb = 'rgb('

    for (i = 0; i < 3; i++) {
        if (i < 2) {
            rgb +=  `${Math.floor(Math.random() * 99)}, `;
        } else {
            rgb +=  `${Math.floor(Math.random() * 99)})`; 
        }
    }
    return(rgb);
}

function toggleBorders(){
    console.log('toggle');
    document.querySelectorAll('.cell').forEach(cell => cell.classList.toggle("cell-border"));
    toggleBorder.classList.toggle("selected");
}

function selectMode(){
    //end the function if the mode selected is already activated 
    if (this.id == mode) {
        return;
    }

    //get the button of the mode crrently existed and change the class so no longer active
    const currentSelectedBtn = document.getElementById(mode);
    currentSelectedBtn.classList.toggle("selected");

    //update the mode variable and highlight selected button
    mode = this.id;
    this.classList.toggle("selected");
    
;}

const userCanvasSize = document.getElementById('number');
const toggleBorder = document.getElementById('borders');
const clearBtn = document.getElementById('clear');
const modeBtns = document.querySelectorAll('.mode');

//draw the first grid based on default value
orchestrateNewGrid();

//default the mode to standard
let mode = "white-mode"


//listen for changes on thee size of the canvas
userCanvasSize.addEventListener('change', 
orchestrateNewGrid); 

//listener to toggle the grid on or off
toggleBorder.addEventListener('click', toggleBorders);

//listener to clear the grid
clearBtn.addEventListener('click', orchestrateNewGrid);


//listener for mode changes
modeBtns.forEach(btn => btn.addEventListener('click', selectMode));

generateRandomRGB();