function tetra(n){  
    const tetra = (n * (n+1) * (n+2)) / 6;
    return tetra;
}

console.log(tetra(2) === 4)
console.log(tetra(5) === 35)
console.log(tetra(6) === 56)