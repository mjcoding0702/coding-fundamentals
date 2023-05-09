// Question 1
// Initialize newString variable to store the new string
// Create a for loop that starts from the last index, decrement until 0
// Append last element of string into newString variable
// Return once its done
function reverseString(string) {
    let newString = ''
    for (let i = string.length - 1 ; i >= 0; i--){
        newString += string[i]
    }
    console.log(newString)
    return newString
}

reverseString('Greetings from The Hacker Collective')


// Question 2 
function sameBackAndForth(string) {
    //reverse string
    let reversedString = ''
    for (let i = string.length - 1; i >= 0; i--){
        reversedString += string[i]
    }

    const isEqual = (reversedString === string)? true : false;

    return isEqual
}

console.log(sameBackAndForth('tenet'))


//Question 3
// Parse the integer into string
// reverse it 
// Parse back to integer and return

function reverseInt(num) {
    //Store the sign
    const isNegative = (num < 0) ? true : false;


    // Revert the number through string
    if (isNegative) {num = Math.abs(num)}
    let strNum = num.toString() //num in string format
    let reversedNum = '';
    for (let i = strNum.length - 1; i >= 0; i--){
        reversedNum += strNum[i]
    }

    //Parse string back into integer and restore sign
    num = parseInt(reversedNum)
    if (isNegative) {num *= -1}

    return num

    //Answer provided by chatGPT (super efficient):
    // const sign = Math.sign(num) //-1 if negative
    // num = Math.abs(num).toString().split('').reverse().join('') //string format
    // num = parseInt(num) * sign // restore the sign
    // return num;
}
// console.log(reverseInt(15))
// console.log(reverseInt(981))
// console.log(reverseInt(500))
// console.log(reverseInt(-15))
// console.log(reverseInt(-90))

// Question 4
function sumArr(NumArray) {
    let sumArr = 0;
    for (let i = 0; i < NumArray.length; i++) {
        sumArr += NumArray[i];
    }
    return sumArr
}

console.log(sumArr([1,2,3,4,5]))


// Question 5
function deafGrandma(sentence) {
    let words = sentence.split(' ')

    const yelledSentence = words.map(word => {
        return word.toUpperCase() + '!!';
    });

    return yelledSentence.join(' ')
}

console.log(deafGrandma('I have a bad feeling about this'))

// Question 6
// Hint: asciiCode = char.charCodeAt(0);
// Iterate through every character
// Convert character to lowercase and integer
// Compare with next character. If b-a != 1, then return

function whatIsMissing(string) {
    for (let i = 0; i < string.length - 1; i++){
        const currentChar = string[i].toLowerCase().charCodeAt()
        const nextChar = string[i+1].toLowerCase().charCodeAt()
        const isMissing = ((nextChar - currentChar) != 1)? true: false;

        if (isMissing) {
            return String.fromCharCode(currentChar+1)
        }
    }
    return undefined
}

console.log(whatIsMissing('abcdefgi'))

// Question 7
// Check if first word is UpperCase or not
// Split sentence into words
// Find the index of first argument word
// Use splice to remove that word and add changed word (restore case as well)

function swap(sentence,firstWord,secondWord) {
    const isCapitalized = (firstWord[0] === firstWord[0].toUpperCase())? true : false;
    const words = sentence.split(' ')
    const firstWordIndex = words.indexOf(firstWord)
    
    // secondWord[0] = (isCapitalized)? secondWord[0].toUpperCase() : secondWord[0];
    secondWord = isCapitalized? secondWord.charAt(0).toUpperCase() + secondWord.slice(1) : secondWord;

    words.splice(firstWordIndex,1,secondWord)

    return words
}

console.log(swap("His name is tom", "tom", "john"))