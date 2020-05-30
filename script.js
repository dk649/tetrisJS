document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const grid = document.querySelector('.grid')
    let squares = Array.from (document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0 // USED IN MINI GRID
    let timerId  // timerId is null if left blank 
    let score = 0

    //console.log(squares)
    //console.log(grid)

    // The Tetrominoes


    const lTetromino = [  //[0][0][0] gives you 1
        [1, width+1, width*2+1,2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1 ,width*2],
        [width, width*2, width*2+1, width*2+2]

    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0,1, width, width+1],
        [0,1, width, width+1],
        [0,1, width, width+1],
        [0,1, width, width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0

    // randomly select 

    //Math.floor(Math.random() * 10);     // returns a random integer from 0 to 9 


    let random = Math.floor(Math.random() * theTetrominoes.length)
    //let number = theTetrominoes.length
    

    //console.log(random) // first random tetromino this is the Tetromino from the array 
    //console.log(number)
    let current  = theTetrominoes[random][currentRotation]// this is the first Array lTetromino  and the first element in that Array (1, width+1, width*2+1,2)
    //console.log(theTetrominoes)
    //console.log(current)

    //Draw shape 
    //  currentPosition is 4 which is set above the index is 0 which is 1 So 4+ 1 = 5 But an array starts at 0 so 0, 1, 2, 3, 4, 5 is = to position 6
    // currentPosition is 4 which is set above the index is 1 which is width+1 = 10+1 = 11 + currentPosition = 15 but array starts at 0 which makes it 16

    function draw() {

        current.forEach(index => {

            squares[currentPosition + index].classList.add('tetromino')
        })

    }


    // add a different function for each Color of tetromino

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    function drawlTetromino() {

        current.forEach(index => {

            squares[currentPosition + index].classList.add('ltetromino')
        })

    }

    function drawzTetromino() {

        current.forEach(index => {

            squares[currentPosition + index].classList.add('ztetromino')
        })

    }

    function drawtTetromino() {

        current.forEach(index => {

            squares[currentPosition + index].classList.add('ttetromino')
        })

    }

    function drawoTetromino() {

        current.forEach(index => {

            squares[currentPosition + index].classList.add('otetromino')
        })

    }

    function drawiTetromino() {

        current.forEach(index => {

            squares[currentPosition + index].classList.add('itetromino')
        })

    }





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   function undraw(){
       current.forEach(index => {

        squares[currentPosition + index].classList.remove('tetromino')
       })
   }



// make the tetromino move down 
//timerId = setInterval(moveDown, 1000) // move down every second

//function keycode

function control(event){

    if(event.keyCode === 37){
        moveLeft()
    } else if(event.keyCode === 38){

        //rotate
        rotate()
    } else if(event.keyCode === 39){
        moveRight()

    }else if(event.keyCode === 40){
        //move Down
        //moveDown()
    }
}

document.addEventListener('keyup', control)

function moveDown() {
    undraw()
    currentPosition += width // width is 10
    draw()
    freeze()
}


//freeze 

function freeze() {

    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start a new tetromino falling
        random = nextRandom // nextRandom gets the new tetromino and assignes it to random
        nextRandom = Math.floor(Math.random() * theTetrominoes.length) // here random is now changed 
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4

        //Add case statement to change colors of the tetrominoes
        draw()
        
        displaShape()
        addScore()
        gameOver()
        //console.log(current)
        //console.log(random) // this picks the second and continues to choose the next tetromino 
    }
}


// move the tetromino left, unless it is at the edge or there is a blockage

function moveLeft() {

    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width ===0) // leaves 0 reminder current is a array of 0 - 4 index is 0 to 4

    if(!isAtLeftEdge) currentPosition -=1 // move closer to the edge 

    //if the square is already take then move back adding 1 
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    currentPosition +=1
    }

    draw()

}


function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)


    if(!isAtRightEdge) currentPosition +=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){

        currentPosition -=1
    }

    draw()
}



// rotate the tetromino 

function rotate(){

    undraw()

    currentRotation ++
    if(currentRotation === current.length) { // if the current rotation is 4 make it go back to 0
        currentRotation = 0


    }

    current = theTetrominoes[random][currentRotation] //changed
    draw()

}


//show  up next tetromino in mini-grid 

const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0


// the Tetrominos without rotations
const upNextTetrominoes = [

    [1, displayWidth+1, displayWidth*2+1,2], //LTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1],  //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2],  //tTetromino
    [0,1, displayWidth, displayWidth+1], //oTetromin
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino


]

// display the shape in mini grid

function displaShape() {

        // remove any tetrormino from mini grid 
    displaySquares.forEach(square => {

        square.classList.remove('tetromino')
    })

  upNextTetrominoes[nextRandom].forEach(index => {

    displaySquares[displayIndex + index].classList.add('tetromino')
  })

}

//console.log(upNextTetrominoes)


startBtn.addEventListener('click', () => {
if (timerId) {

    clearInterval(timerId)
    timerId = null
} else {
    draw()
    timerId = setInterval(moveDown, 1000)
    nextRandom = Math.floor(Math.random()*theTetrominoes.length)
    displaShape()
}

})

// add score 

function addScore(){

    for(let i = 0; i < 199; i += width){

        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if(row.every(index => squares[index].classList.contains('taken'))){
            score +=10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
            })
            const squaresRemove = squares.splice(i, width)
            //console.log(squaresRemove)

            squares = squaresRemove.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }
}

//Game Over
function gameOver(){

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    scoreDisplay.innerHTML = "Game Over !"
    clearInterval(timerId)
    }
}


});
