const squares = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')


let result = 0
let hitPosition
let currentTime = 60

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randSquare = squares[Math.floor(Math.random()*9)]
    randSquare.classList.add('mole')

    hitPosition =  randSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () =>{
        if (square.id == hitPosition){
            result++;
            score.innerHTML = result
            hitPosition = null
        }
    })
})

let timerId = null
function moveMole() {
    timerId = setInterval(randomSquare, 600)
}

moveMole()

function countDown(){
    currentTime--
    timeLeft.textContent = currentTime

    if(currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('GAME OVER! Your score is ' + result)
    }
}

let countDownTimerId = setInterval(countDown, 1000)