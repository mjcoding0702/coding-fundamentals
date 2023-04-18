let userContent = document.querySelector('.userContent')
const button = document.querySelector('#button')

const ENDPOINT = 'https://gist.githubusercontent.com/mjcoding0702/acb309e5717985ed64f447f4b899ca17/raw/51dc58fc1e92be8993233ac8eae9db08ad576f09/me.json'

async function getUser() {
    const response = await fetch('https://gist.githubusercontent.com/mjcoding0702/acb309e5717985ed64f447f4b899ca17/raw/51dc58fc1e92be8993233ac8eae9db08ad576f09/me.json')
    const data = await response.json()

    return data
}

async function displayDetails(data) {
    const name = data.name;
    const age = data.age;
    const hobbies = data.hobbies

    //Destructure hobbies into a string array
    let hobbyList = ''

    for (let hobby of hobbies){
        hobbyList += `<li>${hobby}</li>`
    }


    //Display to user
    const content = `
        <h1>Name: ${name}</h1>
        <p>Age: ${age}</p>
        <ul>${hobbyList}</ul>
    `
    userContent.innerHTML += content
    
}

button.addEventListener('click', async () => {
    displayDetails(await getUser())
})


