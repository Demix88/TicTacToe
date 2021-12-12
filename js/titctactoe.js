let activePlayer='X'; //assigning variable for whose turn it is
let selectedSquares=[];// variable to store array of moves. used to determine winner

//Place X or O function
function placeXOrO(squareNumber) { //creating function 
    if (!selectedSquares.some(element => element.includes(squareNumber))) {//condition ensures that there is nothing in the square
        let select=document.getElementById(squareNumber);//assigning variable to retrieve html elelment id which was clicked
        if(activePlayer === 'X') { //condition that checks who's turn it is
            select.style.backgroundImage='url("images/x2.png")';//selects the x image if x is placed
        }else {//if conditions are not met than O will be placed
            select.style.backgroundImage='url("images/O2.png")';//if active player is O the O will be placed
        }
        selectedSquares.push(squareNumber+activePlayer);//squarenumber and active player are concatennated together and added to array
        checkWinConditions();//function to check win condtion
        if (activePlayer ==='X') {//If active player is X than change it to O
            activePlayer='O';//If active player is O
        } else { 
            activePlayer='X';//change it to X
        }
        audio('./media/Punch.wav');//play audio for placing X or O
        if(activePlayer==='O') { //checking if its computers turn
            disableClick();//disabling click so computer can make a turn
            setTimeout(function (){ computersTurn(); }, 1000);//function that makes computer wait for 1 second before placing an image and enabling click
        
        }
        return true;//end the loop
    }

    //computers turn function
    function computersTurn() {//This function is for computer to select random square
        let success=false;//boolean for the while loop
        let pickASquare;//Variable that stores number
        while(!success) {//checking if square is selected aleady
            pickASquare=String(Math.floor(Math.random()*9));///A random number between 0 and 8 os selected
            if (placeXOrO(pickASquare)) {//check if the square isnt selected already
                placeXOrO(pickASquare);//call the function
                success=true;//ending the loop
            };
        }
        
    }
}

//check winning condition function

function checkWinConditions() { //Function parces the array to search for win conditions
    //horizontal X 
    //next  3 conditions draw a line when you have 3 x's in the row
    if (arrayIncludes('0X','1X','2X')) {drawWinLine(50, 100,558,100);}
    else if (arrayIncludes('3X','4X','5X')) {drawWinLine(50, 304,558,304);}
    else if (arrayIncludes('6X','7X','8X')) {drawWinLine(50, 508,558,508);}
    //vertical X
    //next  3 conditions draw a line when you have 3 x's in the column
    else if (arrayIncludes('0X','3X','6X')) {drawWinLine(100, 50,100,558);}
    else if (arrayIncludes('1X','4X','7X')) {drawWinLine(304, 50,304,558);}
    else if (arrayIncludes('2X','5X','8X')) {drawWinLine(508, 50,508,558);}
    //diagonal x
    //next  2 conditions draw a line when you have 3 x's in the across
    else if (arrayIncludes('6X','4X','2X')) {drawWinLine(100, 508,510,90);}
    else if (arrayIncludes('0X','4X','8X')) {drawWinLine(100, 100,520,520);}

      //horizontal O
      //next  3 conditions draw a line when you have 3 O's in the Row
    if (arrayIncludes('0O','1O','2O')) {drawWinLine(50, 100,558,100);}
    else if (arrayIncludes('3O','4O','5O')) {drawWinLine(50, 304,558,304);}
    else if (arrayIncludes('6O','7O','8O')) {drawWinLine(50, 508,558,508);}
    //vertical O
    //next  3 conditions draw a line when you have 3 O's in the column
    else if (arrayIncludes('0O','3O','6O')) {drawWinLine(100, 50,100,558);}
    else if (arrayIncludes('1O','4O','7O')) {drawWinLine(304, 50,304,558);}
    else if (arrayIncludes('2O','5O','8O')) {drawWinLine(508, 50,508,558);}
    //diagonal O
    //next  2 conditions draw a line when you have 3 O's in the across
    else if (arrayIncludes('6O','4O','2O')) {drawWinLine(100, 508,510,90);}
    else if (arrayIncludes('0O','4O','8O')) {drawWinLine(100, 100,520,520);}

    //Tie
    else if (selectedSquares.length >=9) {//checks if all squares are selected and there is no winner
    audio('./media/bubble.wav');//plays the sound for when its a tie
    setTimeout(function() {resetGame();},1000); // setting a .3 second timer before calling resetGame function
    }
    function arrayIncludes(squareA,squareB,squareC) {//Checks if an array has 3 strings used to check for the win conidtion
        const a = selectedSquares.includes(squareA);//variable to check for 3 in a row
        const b = selectedSquares.includes(squareB);//variable to check for 3 in a row
        const c = selectedSquares.includes(squareC);//variable to check for 3 in a row
        if (a === true && b===true && c===true) {return true;}//condition to check if 3 sqyares are selected and if it is exectues drwWinLine function
    }
}

//disable clicks function
function disableClick() { // disables click while computer takes turn
    body.style.pointerEvens='none'; //makes it unclickable
    setTimeout(function() {body.style.pointerEvents='auto';},1000);//makes squares clickable after 1second
}

//add audio function
function audio(audioURL) {
    let audio = new Audio (audioURL);// create an audio object 
audio.play();//play method for playing audio sound
}

//DRAW THE LINE FUNCTION !!!!!!

function drawWinLine(coordX1, coordY1, coordX2, coordY2) {//use html canvas to draw win lines
    const canvas = document.getElementById('win-lines') ;//used to access html canvas element
    const c =canvas.getContext('2d');//get access to methods and properties to use on canvas
    let x1 = coordX1, //indicates where start of lines x axis is 
    y1 = coordY1,//indicates where start of lines y axis is 
    x2 =coordX2,//indicates where end of lines x axis is 
    y2=coordY2,//indicates where end of lines y axis is 
    x=x1,//stores temporary x axis data 
    y=y1;//stores temporary y axis data
    function animateLineDrawing() {//function to animate the line
        const animationLoop = requestAnimationFrame(animateLineDrawing);//this variable creates the loop for when the gagme ends it restarts
        c.clearRect(0,0,608,608);//clears the rectangle
        c.beginPath();//starts new path
        c.moveTo(x1,y1);//moves to the starting point for the win line
        c.lineTo(x,y);//indicates an endpoint for the line
        c.lineWidth=10;//line width size
        c.strokeStyle='rgba(70,255,33,.8)'; //color of the line
        c.stroke();//draws what you have assigned
        if(x1 <= x2 && y1 <= y2) {//checks if you have reached endpoint
            if (x < x2) {x +=10;}//adds 10 points to the previous x end point
            if (y < y2) {y += 10;}//adds 10 points to the previous y end point
            if (x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop);}//cancels animation if reach end points

        }
    }
    function clear() { // Functin for clearing the canvas after win line is drawn
        const animationLoop=requestAnimationFrame(clear);// Start animation loop
        c.clearRect(0,0,608,608); //clears the canvas
        cancelAnimationFrame(animationLoop);//Stops the animation loop
    }
    disableClick();//stops from clicking while win sound is playing 
    audio('./media/win_game.wav');//play win sound
    animateLineDrawing();//calls our animation loop
    setTimeout(function() {clear();resetGame();},1000);//stops our animation loop

}
function resetGame() {//game reset function if tie or win
    for (let i=0; i <9; i++) {// loop that iterates through each HTML square element
        let square = document.getElementById(String(i));//gets the htmlelement of i 
        square.style.backgroundImage='';//removes our elements backgoundImage

    }
    selectedSquares=[];//resets array so its empty when game is over
}