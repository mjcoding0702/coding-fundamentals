const image = document.querySelector('#image')
const userName = document.querySelector('#userName')
const bio = document.querySelector('#bio')
const joinDate = document.querySelector('#joinDate')
const button = document.querySelector('#button')
const input = document.querySelector('#input')



async function getUser(username) {
    const URL = `https://api.github.com/users/${username}`
    const response = await fetch(URL);
    const data = await response.json()

    const avatar = await data.avatar_url
    const name = await data.name
    const bio = await data.bio
    const joinDate = await data.created_at

    return {avatar,name,bio,joinDate}
}

async function getDate(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate()

    return [year,month,day]
}

button.addEventListener('click', async () => {
    const userInput = input.value
    const user = await getUser(userInput)
    const date = user.joinDate;
    const [year,month,day] = await getDate(date)

    //Replace content 
    image.innerHTML = ''
    image.innerHTML += `<img src=${user.avatar}>`

    userName.textContent = user.name;
    bio.textContent  = user.bio
    joinDate.textContent = `Joined at: ${day} ${month} ${year}`;
})

