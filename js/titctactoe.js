let activePlayer='X'; //assigning variable for whose turn it is
let selectedSquares=[];// variable to store array of moves. used to determine winner

function placeXOrO(squareNumber) { //creating function 

if (!selectedSquares.some(element=>element.includes(squareNumber))) {//condition ensures that there is nothing in the square

let select=document.getElementById(squareNumber);//assigning variable to retrieve html elelment id which was clicked

if (activePlayer==='X') { //condition that checks who's turn it is

    select.style.backgroundImage='url("images/x.png")';//selects the x image if x is placed

} else { //if conditions are not met than O will be placed

select.style.backgroundImage='url("images/o.png")';//if active player is O the O will be placed

}
selectedSquares.push(squareNumber+activePlayer);//squarenumber and active player are concatennated together and added to array

checkWinConditions();//function to check win condtion
if (activePlayer ==='X') {//If active player is X than change it to O
    activePlayer='O';//If active player is O
} else { 
    activePlayer='X';//change it to X
}
audio('./media/place.mp3');//play audio for placing X or O
if(activePlayer==='O') { //checking if its computers turn
    disableClick();//disabling click so computer can make a turn
    setTimeout(function (){ computersTurn(); }, 1000);//function that makes computer wait for 1 second before placing an image and enabling click

}
return true;
}
function computersTurn() { //This function is for computer to select random square
let success = false;//boolean for the while loop
let pickASquare;//Variable that stores number
while(!success){//checking if square is selected aleady
pickASquare=String(Math.floor(Math.random()*9));///A random number between 0 and 8 os selected
    if (placeXOrO(pickASquare)) { //check if the square isnt selected already
        placeXOrO(pickASquare); //call the function
        success=true; //ending the loop
    };
}
}
}
//checked

function checkWinConditions() {//parces the array to search for win conditions
if  (arrayIncludes('0X','1X','2X')) {drawWinLine(50,100,558,100);} //draws line if squares 0 1 2 are X
else if  (arrayIncludes('3X','4X','5X')) {drawWinLine(50,304,558,304);} //draws line if squares 3 4 5 are  X
else if  (arrayIncludes('6X','7X','8X')) {drawWinLine(50,508,558,508);} //draws line if squares 6 7 8 are  X
else if  (arrayIncludes('0X','3X','6X')) {drawWinLine(100,50,100,558);} //draws line if squares 0 3 6 are the X
else if  (arrayIncludes('1X','4X','7X')) {drawWinLine(304,50,304,558);} //draws line if 1 4 7 are X
else if  (arrayIncludes('2X','5X','8X')) {drawWinLine(508,50,508,558);} ///draws line if 3 4 5 are X
else if  (arrayIncludes('6X','4X','2X')) {drawWinLine(100,508,510,90);} //draws line if squares 6 4 2 are the X
else if  (arrayIncludes('0X','4X','8X')) {drawWinLine(100,100,520,520);} //draws line if 0 4 8 are X
else if  (arrayIncludes('0O','1O','2O')) {drawWinLine(50,100,558,100);} //draws line if squares 0 1 2 are O
else if  (arrayIncludes('3O','4O','5O')) {drawWinLine(50,304,558,304);} //draws line if squares 3 4 5 are O
else if  (arrayIncludes('6O','7O','8O')) {drawWinLine(50,508,558,508);} //draws line if squares 6 7 8 are O
else if  (arrayIncludes('0O','3O','6O')) {drawWinLine(100,50,100,558);} //draws line if squares 0 3 6 are the O
else if  (arrayIncludes('1O','4O','7O')) {drawWinLine(304,50,304,558);} //draws line if 1 4 7 are O
else if  (arrayIncludes('2O','5O','8O')) {drawWinLine(508,50,508,558);} ///draws line if 3 4 5 are O
else if  (arrayIncludes('6O','4O','2O')) {drawWinLine(100,508,510,90);} //draws line if squares 6 4 2 are the O
else if  (arrayIncludes('0O','4O','8O')) {drawWinLine(100,100,520,520);} //draws line if 0 4 8 are O
else if (selectedSquares.length >=9) {//checks if all squares are selected and there is no winner
    audio('./media/tie.mp3');//plays the sound for when its a tie
    setTimeout(function() { resetGame();},1000) // setting a .3 second timer before calling resetGame function
}
function arrayIncludes(squareA, squareB,squareC) {//Checks if an array has 3 strings used to check for the win conidtion
const a=selectedSquares.includes(squareA);//variable to check for 3 in a row
const b=selectedSquares.includes(squareB);//variable to check for 3 in a row
const c=selectedSquares.includes(squareC);//variable to check for 3 in a row
if (a===true && b===true && c===true){return true;}//condition to check if 3 sqyares are selected and if it is exectues drwWinLine function
}
}
function disableClick() {// disables click while computer takes turn
body.style.pointerEvents='none';//makes it unclickable
setTimeout(function(){body.style.pointerEvents='auto';},1000 ); //makes squares clickable after 1second
}
function audio(audioURL) {// audio function
    let audio =new Audio(audioURL);// create an audio object 
    audio.play();//play method for playing audio sound
}
function drawWinLine(coordX1,coordY1,coordX2,coordY2) { //use html canvas to draw win lines
    const canvas=document.getElementById('win-lines'); //used to access html canvas element
    const c=canvas.getContext('2d');//get access to methods and properties to use on canvas
    let x1=coordX1, //indicates where start of lines x axis is 
    y1=coordY1,//indicates where start of lines y axis is 
    x2=coordX2,//indicates where end of lines x axis is 
     y2=coordY2,////indicates where end of lines y axis is 
    x=x1,//stores temporary x axis data 
    y=y1;//stores temporary y axis data
    function animateLineDrawing() {//function to animate the line
        const animationLoop=requestAnimationFrame(animateLineDrawing);//this variable creates the loop for when the gagme ends it restarts
        c.beginPath();
        c.fillStyle = "rgba(0, 0, 0, 255)";
        c.fillRect(0, 0, canvas.width, canvas.height);    
        c.stroke();
        
        
        if (x1 <= x2 && y1 <= y2) {
            if(x < x2) {x += 10;}
            if (y < y2) {y += 10;}
            if(x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop);}
        }
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x +=10;}
            if (y >y2)  {y-+10;}
            if(x >= x2 **y <= y2) {cancelAnimationFrame(animationLoop);}
        }
    }
    function clear(){
        const animationLoop=requestAnimationFrame(clear);
        c.clearRect(0,0,608,608);
        cancelAnimationFrame(animationLoop);
    }
    disableClick();
    audio('./media/wingame.mp3');
    animateLineDrawing();
    setTimeout(function () {clear(); resetGame();},1000);
}
    function resetGame() {
        for (let i = 0; i < 9 ; i++){
            let square= document.getElementById(String(i));
            square.style.backgroundimage=''
        }
            selectedSquares=[];
        }
    
    





