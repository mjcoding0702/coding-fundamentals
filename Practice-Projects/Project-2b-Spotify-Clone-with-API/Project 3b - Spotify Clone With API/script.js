// This version uses Authorization Code with PKCE Flow. Link: https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
// 1. Wait for window to be fully loaded, then run functions
window.addEventListener('load', async function() {
    const urlParams = new URLSearchParams(window.location.search); 
    let code = urlParams.get('code'); //Code to request access token

    if (code) {
        await requestAccessToken(code);
        let accessToken = localStorage.getItem('access_token'); //Retrieve the code verifier from local storage
        console.log("Access token completed. Access token is:" + accessToken)

        fetchUserTopItems(accessToken)
        fetchNewReleases(accessToken)
        fetchFeaturedPlayLists(accessToken)
    } else {
        requestAuthorization();
    }
})

// 2. Complete authorization page to get 1.code verifier and 2.code, we need two of these things to request access token 
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
}
  
function requestAuthorization() {
    const clientId = "601f178f88b74337a339236fb189c63f";
    const redirectUri = 'http://127.0.0.1:5500';

    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email user-top-read';

    localStorage.setItem('code_verifier', codeVerifier); //code verifier

    let args = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
    });

    window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
    
}
   
//3. Request for an access token. We need 1. Code verifier and 2. Code
function requestAccessToken(code) {
    const clientId = "601f178f88b74337a339236fb189c63f";
    const redirectUri = 'http://127.0.0.1:5500';
    let codeVerifier = localStorage.getItem('code_verifier'); //Retrieve the code verifier from local storage
    console.log("Code:" + code)
    console.log("Code verifier: " + codeVerifier)

    let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier
    });

    const response = fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('access_token', data.access_token); //Access token is stored locally
    })
    .catch(error => {
        console.error('Error:', error);
    });

}
  
      
// Now we have token, we can use token to fetch from API
// 4. Create functions to fetch data from users (UserTopItems,NewReleases,Featured Playlist)
async function fetchUserTopItems(accessToken){
    const endpoint = "https://api.spotify.com/v1/me/top/tracks";
    const response = await fetch(endpoint + "?limit=6", {
        headers: {
            Authorization: "Bearer " + accessToken,
        }
    });
    const data = await response.json();
    displayUserTopItems(data)
    console.log("User Top Items: ")
    console.log(data)
}

async function fetchNewReleases(accessToken){
    const endpoint = 'https://api.spotify.com/v1/browse/new-releases';
    const response = await fetch(endpoint + '?limit=10', {
        headers: {
            Authorization: "Bearer " + accessToken,
        }
    });
    const data = await response.json();
    displayNewReleases(data)
    console.log("New Releases: ")
    console.log(data)

}

async function fetchFeaturedPlayLists(accessToken) {
    const endpoint = 'https://api.spotify.com/v1/browse/featured-playlists';
    const response = await fetch(endpoint + '?limit=6', {
        headers: {
            Authorization: "Bearer " + accessToken,
        }
    })
    const data = await response.json();
    displayFeaturedPlaylists(data)
    console.log("Featured Playlists: ")
    console.log(data)
}

// 5. Create function to display those data as multiple cards
function displayUserTopItems(data) {
    const section = document.querySelector('#your-top-items');
    const sectionTitle = section.querySelector('.title');
    const sectionSubTitle = section.querySelector('.subtitle');
    const sectionWrapper = section.querySelector('.card-wrapper');
    sectionTitle.textContent = "Your Top Items";
    sectionSubTitle.textContent = "Based on your recent listening";

    for (let i = 0; i < data.items.length; i++) {
        let track = data.items[i];

        let image = track.album.images[1].url;
        let title = track.name;
        let subtitle = track.artists[0].name;
        let href = track.external_urls.spotify;

        sectionWrapper.innerHTML += generateCard(image,title,subtitle,href);
    }
}

function displayNewReleases(data) {
    const section = document.querySelector('#new-releases');
    const sectionTitle = section.querySelector('.title');
    const sectionSubTitle = section.querySelector('.subtitle');
    const sectionWrapper = section.querySelector('.card-wrapper');
    sectionTitle.textContent = "New Releases";
    sectionSubTitle.textContent = "New releases from Spotify";

    for (let i = 0; i < data.albums.items.length; i++) {
        let track = data.albums.items[i];

        let image = track.images[1].url;
        let title = track.name;
        let subtitle = track.artists[0].name;
        let href = track.external_urls.spotify;

        sectionWrapper.innerHTML += generateCard(image,title,subtitle,href);
    }
}

function displayFeaturedPlaylists(data) {
    const section = document.querySelector('#featured-playlists');
    const sectionTitle = section.querySelector('.title');
    const sectionSubTitle = section.querySelector('.subtitle');
    const sectionWrapper = section.querySelector('.card-wrapper');
    sectionTitle.textContent = "New Releases";
    sectionSubTitle.textContent = "New releases from Spotify";

    for (let i = 0; i < data.playlists.items.length; i++) {
        let track = data.playlists.items[i];

        let image = track.images[0].url;
        let title = track.name;
        let subtitle = track.description;
        let href = track.external_urls.spotify;

        sectionWrapper.innerHTML += generateCard(image,title,subtitle,href);
    }
}


function generateCard(image, title, subtitle, href) {
    return `
        <a class="card" href="${href}" target="_blank">
            <img
                src="${image}"
                alt="peaceful piano"
                srcset=""
            />
            <span class="mdi mdi-play mdi-36px"></span>
            <div class=title">${title}</div>
            <div class="subtitle">${subtitle}</div>
        </a>
    `;
  }