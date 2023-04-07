// Select the header element
const header = document.querySelector('header')
const navContainer = document.querySelector('.nav__container')


// Event listener: Mouse move                
// When user hovers around the top area, show the header 
header.addEventListener('mouseover', show);

// Event listener: Scroll                
// When user scroll after a certain height, hide the header, else show the header
window.onscroll = function() {
    if (window.scrollY > 200){
        navContainer.onmouseout = hide;  //Make sure it hide when it's scrolled down
        hide();        
    } else {
        navContainer.onmouseout = show; //Make sure it shows even when mouseout when it is not scrolled
        show();
    }
}

//Functions to hide and show
function show() {
    navContainer.style.transform = `translateY(0)`;
}

function hide() {
    navContainer.style.transform = `translateY(-1000px)`;
    navContainer.style.transition = `transform 0.3s ease-in-out`
}