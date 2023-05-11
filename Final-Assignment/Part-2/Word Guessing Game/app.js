// DOM Elements
const wordContainer = document.querySelector('.word__container');
const displayText = document.getElementById('displayText');
const displayContainer = document.querySelector('.display__container');

// Generate random words
const words = ['shoes', 'jacket', 'coat', 'tshirt', 'trouser'];
const answer = words[Math.floor(Math.random() * (words.length))]
let answerString = '_'.repeat(answer.length);

// Load empty characters when window starts
window.addEventListener('load', () => {
    updateAnswer(answerString)
})

// Game starts
let count = 10;
let isFirstClicked = true;

// Listen to user clicks
wordContainer.addEventListener('click', (e) => {
    if (isFirstClicked){
        displayText.innerText = '';
        isFirstClicked = false;
    }

    if (e.target.classList.contains('letter-button')){
        let isMatched = false;
        let inputChar = (e.target.innerText).toLowerCase();
        for (let i = 0; i < answer.length; i++){
            let answerArr = answerString.split('')
            if (inputChar === answer[i]){
                answerArr[i] = inputChar;
                answerString = answerArr.join('')
                isMatched = true;
            } 
        }
        (isMatched)? count+=0 : count--
    }

    // Update current string to user
    updateAnswer(answerString)

    // If current string matches answer, they won
    if (answerString === answer){
        displayText.innerText("Congratulations, You Won!")
        return
    }

    // Show how many chances left
    if(count > 0){
        displayText.innerText = `You have (${count}) chances left`
    }

    // If count is 0, they lost
    if (count === 0){
        console.log("Im fired")
        displayText.innerText = `Game over! You ran out of chances!`;
        updateAnswer('gameover')
        wordContainer.style.pointerEvents = 'none';
        wordContainer.style.userSelect = 'none';
        return
    }
})

// Function to update current string to user
function updateAnswer(answerString) {
    if (answerString === 'gameover') {
        displayContainer.innerHTML = ''
        return
    }
    displayContainer.innerHTML = ''
    let answerArr = answerString.split('')
    for (let i = 0; i < answerString.length; i++){
        const buttonChar = `
        <button id="char${i}">${answerArr[i]}</button>
    `
        displayContainer.innerHTML += buttonChar
    }
}




