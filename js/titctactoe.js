let activePlayer='X';
let selectedSquares=[];

//Place X or O function
function placeXOrO(squareNumber) {
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        let select=document.getElementById(squareNumber);
        if(activePlayer === 'X') {
            select.style.backgroundImage='url("images/x.png")';
        }else {
            select.style.backgroundImage='url("images/O.png")';
        }
        selectedSquares.push(squareNumber+activePlayer);

        //check win condition function
        if (activePlayer=== 'X') {
            activePlayer='O';
        } else {
            activePlayer='X';
        }
        audio('./media/place.mp3');
        if(activePlayer === 'O') {
            disableClick();
            setTimeout(function () { computersTurn(); }, 1000);
        }
        return true;
    }

    //computers turn function
    function computersTurn() {
        let success=false;
        let pickASquare;
        while(!success) {
            pickASquare=String(Math.floor(Math.random()*9));
            if (placeXOrO(pickASquare)) {
                placeXOrO(pickASquare);
                success=true;
            };//Check this later
        }
        
    }
}

//check winning condition function

function checkWinConditions() {
    //horizontal X
    if (arrayIncludes('0X','1X','2X')) {drawWinLine(50, 100,558,100);}
    else if (arrayIncludes('3X','4X','5X')) {drawWinLine(50, 304,558,304);}
    else if (arrayIncludes('6X','7X','8X')) {drawWinLine(50, 508,558,508);}
    //vertical X
    else if (arrayIncludes('0X','3X','6X')) {drawWinLine(100, 50,100,558);}
    else if (arrayIncludes('1X','4X','7X')) {drawWinLine(304, 50,100,558);}
    else if (arrayIncludes('2X','5X','8X')) {drawWinLine(508, 50,508,558);}
    //diagonal x
    else if (arrayIncludes('6X','4X','2X')) {drawWinLine(100, 508,510,90);}
    else if (arrayIncludes('0X','4X','8X')) {drawWinLine(304, 50,100,558);}

      //horizontal O
    if (arrayIncludes('0O','1O','2O')) {drawWinLine(50, 100,558,100);}
    else if (arrayIncludes('3O','4O','5O')) {drawWinLine(50, 304,558,304);}
    else if (arrayIncludes('6O','7O','8O')) {drawWinLine(50, 508,558,508);}
    //vertical O
    else if (arrayIncludes('0O','3O','6O')) {drawWinLine(100, 50,100,558);}
    else if (arrayIncludes('1O','4O','7O')) {drawWinLine(304, 50,100,558);}
    else if (arrayIncludes('2O','5O','8O')) {drawWinLine(508, 50,508,558);}
    //diagonal O
    else if (arrayIncludes('6O','4O','2O')) {drawWinLine(100, 508,510,90);}
    else if (arrayIncludes('0O','4O','8O')) {drawWinLine(304, 50,100,558);}

    //Tie
    else if (selectedSquares.length.length >=9) {
    audio('./media/tie.mp3');
    setTimeout(function() {resetGame();},1000);
    }
    function arrayIncludes(squareA,squareB,squareC) {
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        if (a === true && b===true && c===true) {return true;}
    }
}

//disable clicks function
function disableClick() {
    body.style.pointerEvens='none';
    setTimeout(function() {body.style.pointerEvents='auto';},1000);
}

//add audio function
function audio(audioURL) {
    let audio = new Audio (audioURL);
audio.play();
}

//DRAW THE LINE FUNCTION !!!!!!

function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines')
    const c =canvas.getContext('2d');
    let x1 = coordX1,
    y1 = coordY1,
    x2 =coordX2,
    y2=coordY2,
    x=x1,
    y=y1;
    function animateLineDrawing() {
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        c.clearRect(0,0,608,608);
        c.beginPath();
        c.moveTo(x1,y1);
        c.lineTo(x,y);
        c.lineWidth=10;
        c.strokeStyle='rgba(70,255,33,.8)';
        c.stroke();
        if(x1 <= x2 && y1 <= y2) {
            if (x < x2) {x +=10;}
            if (y > y2) {y += 10;}
            if (x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop);}

        }
    }
    function clear() { 
        const animationLoop=requestAnimationFrame(clear);
        c.clearRect(0,0,608,608);
        cancelAnimationFrame(animationLoop);
    }
    disableClick();
    audio('./media/wingame.mp3');
    animateLineDrawing();
    setTimeout(function() {clear();resetGame90;},1000);

}
function resetGame() {
    for (let i=0; i <9; i++) {
        let square = document.getElementById(string(i));
        square.style.backgroundImage='';

    }
    selectedSquares=[];
}