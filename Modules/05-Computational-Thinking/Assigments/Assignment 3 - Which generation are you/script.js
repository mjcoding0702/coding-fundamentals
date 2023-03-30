function generation (x, y){
    //Gender
    if (y == 'm'){
        //Do something
        if (x < -3 || x > 3) return "Invalid number"
        if (x === 0) return "Me!"
        if (x === 1) return "son"
        if (x === 2) return "grandson"
        if (x === 3) return "great grandson"
        if (x === -1) return "father"
        if (x === -2) return "grandfather"
        if (x === -3) return "great grandfather"
    }

    if (y == 'f'){
        //Do something
        if (y === 0) return "Me!"
        if (x < -3 || x > 3) return "Invalid number"
        if (x === 0) return "Me!"
        if (x === 1) return "daughter"
        if (x === 2) return "granddaughter"
        if (x === 3) return "great granddaughter"
        if (x === -1) return "mother"
        if (x === -2) return "grandmother"
        if (x === -3) return "great grandmother"
    }

    return "Enter a valid character"
}

console.log(generation(0, "f")) //granddaughter