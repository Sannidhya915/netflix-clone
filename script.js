// API Key
const API = "api_key=a6e8a1cfbe0409b5e9682b7051e278c8"

// Base URL
const BASE_URL = "https://api.themoviedb.org/3"

// Banner URL
const BANNER_URL = "https://image.tmdb.org/t/p/original"
const IMG_URL = "https://image.tmdb.org/t/p/w300" //w300 image size here..


// requests for movies data
const requests = {
    fetchTrending: `${BASE_URL}/trending/all/week?${API}&language=en-US`,
    fetchNetflixOrignals: `${BASE_URL}/discover/ty?${API}&with_networks-213`,
    fetchActionMovies: `${BASE_URL}/discover/movie?${API}&with_genres-28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?${API}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?${API}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?${API}&with_genres-10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?${API}&with_genres=99`,
};

// Truncating string here...
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n-1) + "..." : str
}

// Banner

fetch(requests.fetchNetflixOrignals)
    .then((res) => res.json())

    .then((data)=>{
        console.log(data.results)
    
        // New result on refresh
    
        const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)]
    
        var banner = document .getElementById("banner")
        var banner_title = document.getElementById("banner__title")
        var banner__desc = document.getElementById("banner__description")
    
        banner.style.backgroundImage = "url(" + BANNER_URL + setMovie.backdrop_path + ")"
        banner__desc.innerText = truncate(setMovie.overview, 150)
        banner_title.innerText = setMovie.name
        
    })

    // Movies Row
    fetch(requests.fetchNetflixOrignals)
        .then((res) => res.json())

        .then((data) => {

            const headrow = document.getElementById("headrow")
            const row = document.createElement("div")

            row.className = "row"
            row.classList.add("netflixrow")

            headrow.appendChild(row)

            const title = document.createElement("h2")

            title.className = "row__title"
            title.innerText = "NETFLIX ORIGINALS"

            row.appendChild(title)

            const row_posters = document.createElement("div")
            row_posters.className = "row__posters"
            row.appendChild(row_posters)
        })