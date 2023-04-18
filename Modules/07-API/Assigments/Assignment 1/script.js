const quote = document.querySelector('#quote')
const author = document.querySelector('#author_name')
const button = document.querySelector('#button')

async function getQuote() {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();

    return [data.content, data.author]
}

async function displayQuote (){
    const [quoteName,authorName] = await getQuote()
    quote.textContent = quoteName;
    author.textContent = authorName;
}

button.addEventListener('click', () => {
    displayQuote()
})

