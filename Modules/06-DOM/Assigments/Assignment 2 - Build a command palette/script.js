const paletteDiv = document.querySelector('div.palette')
console.log(paletteDiv)

paletteDiv.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'y'){
        paletteDiv.classList.toggle('fade-in')
        paletteDiv.classList.toggle('fade-out')
    }
})