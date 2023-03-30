// Perimeter of a square: 4 * side.
// Perimeter of a circle: 6.28 * radius.

// You'll need to determine whether the input is for a circle or a square. Can you use any operations to determine this without using an if statement?
// Once you know whether the input is for a circle or a square, you'll need to calculate the perimeter. Can you think of any arithmetic operations that would be helpful here?
// Remember to double-check your formula for calculating the perimeter of a circle or a square to make sure it's correct!

function perimeter (str, num) {
    const isSquare = (str === 's');
    const isCircle = (str === 'c');
    const squarePerimeter = isSquare * (4 * num)
    const circlePerimeter = isCircle * (6.28 * num)

    return squarePerimeter || circlePerimeter || 'Invalid Input'
}

console.log(perimeter('c', 4));
console.log(perimeter('s', 4));
console.log(perimeter('a', 4));

