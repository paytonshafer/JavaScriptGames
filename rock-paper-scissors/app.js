const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let userChoice
let computerChoice
let result

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice()
    getResults()
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1
    
    if (randomNumber == 1){
        computerChoice = 'rock'
    }
    if (randomNumber == 2){
        computerChoice = 'paper'
    }
    if (randomNumber == 3){
        computerChoice = 'scissors'
    }
    computerChoiceDisplay.innerHTML = computerChoice
}

function getResults(){
    if (computerChoice ===  userChoice){
        result = 'its a draw!'
    }
    if ((computerChoice === 'rock' && userChoice === 'paper') || (computerChoice === 'scissors' && userChoice === 'paper') || (computerChoice === 'paper' && userChoice === 'rock')) {
        result = 'you lost!'
    }
    if ((computerChoice === 'scissors' && userChoice === 'rock') || (computerChoice === 'paper' && userChoice === 'scissors') || (computerChoice === 'rock' && userChoice === 'paper')) {
        result = 'you win!'
    }
    resultDisplay.innerHTML = result
}