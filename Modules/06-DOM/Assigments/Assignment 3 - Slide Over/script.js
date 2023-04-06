const slideOver = document.querySelector('.slide-over-container')
const registerButton = document.querySelector('.register-button')
const closeButton = document.querySelector('.close-button')
const backDrop = document.querySelector('.bg-backdrop')

function slideIn() {
    backDrop.toggleAttribute('hidden')
    slideOver.classList.remove('slide-out')
    slideOver.classList.add('slide-in')
}

function slideOut() {
    slideOver.classList.remove('slide-in')
    slideOver.classList.add('slide-out')
    backDrop.toggleAttribute('hidden')
}

registerButton.addEventListener('click', slideIn)
closeButton.addEventListener('click',slideOut)