const addButton = document.querySelector('.add__button')
const closeButton = document.querySelector('.cta__button')
const notificationDiv = document.querySelector('.notification')

function showDiv() {
    notificationDiv.classList.add('show')
}

function hideDiv() {
    notificationDiv.classList.remove('show')
    notificationDiv.classList.add('hidden')
}

addButton.addEventListener('click',showDiv)
closeButton.addEventListener('click',hideDiv)