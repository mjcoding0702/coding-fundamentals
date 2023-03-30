//Edge cases
// if a > b false, a cannot move backwards
// if a == b false, a would be advancing away in the next move

function possibleBonus (a,b) {
    if (a == b) return false

    if ( (b-a) >= 0 && (b-a) <= 6) return true

    return false
}


//Test Cases
console.log(possibleBonus(3, 7));  //true
console.log(possibleBonus(1, 9));  //false
console.log(possibleBonus(5, 3));  //false

