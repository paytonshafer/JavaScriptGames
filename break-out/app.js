const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
let timerid
let xDirec = -2
let yDirec = 2
let score = 0

const userStart = [230, 10]
let userPosition = userStart

const ballStart = [270, 40]
let ballPosition = ballStart

//create Block
class Block{
    constructor(x, y) {
        this.bottomLeft = [x,y]
        this.bottomRight = [x + blockWidth, y]
        this.topLeft = [x, y + blockHeight]
        this.topRight = [x + blockWidth, y + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

function addBlocks() {
    for(i = 0; i < blocks.length; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}
addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

function drawUser() {
    user.style.left = userPosition[0] + 'px'
    user.style.bottom = userPosition[1] + 'px'
}

function drawBall(){
    ball.style.left = ballPosition[0] + 'px'
    ball.style.bottom = ballPosition[1] +'px'
}

//move user
function moveUser(e) {
    switch(e.key){
        case 'ArrowLeft':
            if (userPosition[0] > 0){
                userPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (userPosition[0] < boardWidth-blockWidth){
                userPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move ball
function moveBall(){
    ballPosition[0] += xDirec
    ballPosition[1] += yDirec
    drawBall()
    collsions()
}

timerid = setInterval(moveBall, 30)

//collsion checker
function collsions() {
    //blocks
    for (i = 0; i < blocks.length; i++){
        if((ballPosition[0] > blocks[i].bottomLeft[0] && ballPosition[0] < blocks[i].bottomRight[0] && (ballPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballPosition[1] < blocks[i].topLeft[0])){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection(false)
            score++
            scoreDisplay.innerHTML = score
        }
    }

    //walls
    if (ballPosition[0] >= (boardWidth - ballDiameter) || ballPosition[0] <= 0 ){
        changeDirection(true)
    }

    //top
    if (ballPosition[1] >= (boardHeight - ballDiameter) ){
        changeDirection(false)
    }

    //paddle
    if((ballPosition[0] > userPosition[0] && ballPosition[0] < userPosition[0] + blockWidth) &&
        (ballPosition[1] > userPosition[1] && ballPosition[1] < userPosition[1] + blockHeight))
    {
        changeDirection(false)
    }

    //gameover
    if (ballPosition[1] <=0){
        clearInterval(timerid)
        scoreDisplay.innerHTML = 'YOU LOSE'
        document.removeEventListener('keydown')
    }

    //check win
    if (blocks.length == 0){
        scoreDisplay.innerHTML = 'YOU WIN!'
        clearInterval(timerid)
        document.removeEventListener('keydown')
    }
}

function changeDirection(wall){
    if(xDirec === 2 && yDirec === 2 && wall){
        xDirec = -2
        return
    }
    if(xDirec === 2 && yDirec === 2 && !wall){
        yDirec = -2
        return
    }
    if(xDirec === 2 && yDirec === -2 && wall){
        xDirec = -2
        return
    }
    if(xDirec === 2 && yDirec === -2 && !wall){
        yDirec = 2
        return
    }
    if(xDirec === -2 && yDirec === -2 && wall){
        xDirec = 2
        return
    }
    if(xDirec === -2 && yDirec === -2 && !wall){
        yDirec = 2
        return
    }
    if(xDirec === -2 && yDirec === 2 && wall){
        xDirec = 2
        return
    }
    if(xDirec === -2 && yDirec === 2 && !wall){
        yDirec = -2
        return
    }
}