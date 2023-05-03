// This version uses Implicit Grant Flow (not recommended) by Spotify. Link: https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow
// Step 1 - wait for the page to be fully loaded
window.addEventListener('load', function () {
  TOKEN = extractTokenFromURI();
  if (TOKEN) {
      console.log("TOKEN", TOKEN);
      //fetch the endpoints
      fetchUserTopItems();
      fetchNewReleases();
      fetchFeaturedPlayLists();
  } else {
      authorize();
  }

});

// Step 2 - Authorize and get the token
var TOKEN = "";
var client_id = "601f178f88b74337a339236fb189c63f";
var redirect_uri = window.location.origin;
var scope = "user-read-private user-read-email user-top-read" 

function authorize() {
  var url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  window.open(url, "_self");
}

// Step 3 - Store the token in the variable TOKEN
function extractTokenFromURI() {
  var hash = window.location.hash;
  if (hash && hash.includes("access_token")) {
      var url = hash.replace("#access_token=", "");
      var chunks = url.split("&");
      var token = chunks[0];
      return token;
  }
  return null
}

// Step 4 - Start fetching the user's top items using the token
async function fetchUserTopItems() {
  try{
      var endpoint = "https://api.spotify.com/v1/me/top/tracks";
      var response = await fetch(endpoint + "?limit=6", {
          method: "GET",
          headers: {
              Authorization: "Bearer " + TOKEN,
          },
      });
      var data = await response.json();
      displayUserTopItems(data);
      console.log("User top items", data);
  }catch (error) {
      alert("Something went wrong.");
      console.log(error);
  }
}

async function fetchNewReleases() {
  try{
      var endpoint = "https://api.spotify.com/v1/browse/new-releases";
      var response = await fetch(endpoint + "?limit=6", {
          method: "GET",
          headers: {
              Authorization: "Bearer " + TOKEN,
          },
      });
      var data = await response.json();
      displayNewReleases(data);
      console.log("New releases", data);
  }catch (error) {
      alert("Something went wrong.");
      console.log(error);
  }
}

async function fetchFeaturedPlayLists() {
  try{
      var endpoint = "https://api.spotify.com/v1/browse/featured-playlists";
      var response = await fetch(endpoint + "?limit=6", {
          method: "GET",
          headers: {
              Authorization: "Bearer " + TOKEN,
          },
      });
      var data = await response.json();
      displayFeaturedPlaylists(data);
      console.log("Featured playlists", data);
  }catch (error) {
      alert("Something went wrong.");
      console.log(error);
  }
}

// Step 5 - Display the user's top item
function displayUserTopItems(data) {
  var section = document.querySelector('#your-top-items');
  var sectionTitle = section.querySelector(".title");
  var sectionSubtitle = section.querySelector(".subtitle");
  var sectionWrapper = section.querySelector(".card-wrapper");
  sectionTitle.textContent = "Your Top Items";
  sectionSubtitle.textContent = "Based on your recent listening";
  for (let i = 0; i < data.items.length; i++) {
      var track = data.items[i];

      var image = track.album.images[1].url;
      var title = track.name;
      var subtitle = track.artists[0].name
      var href = track.external_urls.spotify;

      sectionWrapper.innerHTML += generateCard(image, title, subtitle, href);
  }
}
function displayNewReleases(data){
  var section = document.querySelector('#new-releases');
  var sectionTitle = section.querySelector(".title");
  var sectionSubtitle = section.querySelector(".subtitle");
  var sectionWrapper = section.querySelector(".card-wrapper");
  sectionTitle.textContent = "New Releases";
  sectionSubtitle.textContent = "New releases from Spotify";
  for (let i = 0; i < data.albums.items.length; i++) {
      var track = data.albums.items[i];

      var image = track.images[1].url;
      var title = track.name;
      var subtitle = track.artists[0].name
      var href = track.external_urls.spotify;

      sectionWrapper.innerHTML += generateCard(image, title, subtitle, href);
  }
}
function displayFeaturedPlaylists(data){
  var section = document.querySelector('#featured-playlists');
  var sectionTitle = section.querySelector(".title");
  var sectionSubtitle = section.querySelector(".subtitle");
  var sectionWrapper = section.querySelector(".card-wrapper");
  sectionTitle.textContent = "Featured Playlists";
  sectionSubtitle.textContent = "Featured playlists from Spotify";
  for (let i = 0; i < data.playlists.items.length; i++) {
      var track = data.playlists.items[i];

      var image = track.images[0].url;
      var title = track.name;
      var subtitle = track.description;
      var href = track.external_urls.spotify;

      sectionWrapper.innerHTML += generateCard(image, title, subtitle, href)
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

// Step 6 - Start fetching the new releases using the token

// Step 7 - Display new releases

// Step 8 - Start fetching featured playlists using the token

// Step 9 - Display featured playlists