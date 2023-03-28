function factorial(anyNumber){  
    // your code
    let sum = 1;

    for (let i=1; i<=anyNumber; i++){
        sum = sum * i;
    }

    return sum;
}

console.log(factorial(5) === 120)
console.log(factorial(4) === 24)
console.log(factorial(1) === 1)
console.log(factorial(0) === 1)


