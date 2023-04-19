const ENDPOINT = 'https://api.thecatapi.com/v1/breeds'
const imageCards = document.querySelector('.image__cards')


async function getData() {
    const response = await fetch(ENDPOINT)
    const datas = await response.json()


    //Grab all the details from API
    //1. Image
    //2. Name
    //3. Description
    

    console.log(datas)
    for (let data of datas) {
        let image = data.reference_image_id
        const name = data.name
        const description = data.description


        //Replace placeholder with the values grabbed from API
        const content = `
        <div class="image-card">
            <div class="image-container">
                <img src="https://cdn2.thecatapi.com/images/${image}.jpg" alt="cat name" onerror="this.onerror=null; this.src='./missingcat.avif'">
            </div>

            <div class="card-content-container">
                <div class="card-content">
                    <p class="card-name">${name}</p>
                    <p class="card-description">${description}</p>
                </div>

                <div class="card-link">
                    <button class="button">Profile</button>
                </div>
            </div>
        </div>
        `
        imageCards.innerHTML+= content;
    }
    
}

getData()
