// API Key
const API = "api_key=a6e8a1cfbe0409b5e9682b7051e278c8";

// Base URL
const BASE_URL = "https://api.themoviedb.org/3";

// Banner URL
const BANNER_URL = "https://image.tmdb.org/t/p/original";
const IMG_URL = "https://image.tmdb.org/t/p/w300"; //w300 image size here..

// requests for movies data
const requests = {
    fetchTrending: `${BASE_URL}/trending/all/week?${API}&language=en-US`,
    fetchNetflixOriginals: `${BASE_URL}/discover/tv?${API}&with_networks=213`,
    fetchActionMovies: `${BASE_URL}/discover/movie?${API}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?${API}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?${API}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?${API}&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?${API}&with_genres=99`,
    fetchPopular: `${BASE_URL}/movie/popular?${API}&language=en-US`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?${API}&language=en-US`
};

// Truncating string here...
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Banner
fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        console.log("Netflix Originals data:", data.results);
        const setMovie = data.results[Math.floor(Math.random() * data.results.length)];
        var banner = document.getElementById("banner");
        var banner_title = document.getElementById("banner__title");
        var banner__desc = document.getElementById("banner__description");

        banner.style.backgroundImage = "url(" + BANNER_URL + setMovie.backdrop_path + ")";
        banner__desc.innerText = truncate(setMovie.overview, 150);
        banner_title.innerText = setMovie.name;
    })
    .catch(error => console.error("Error fetching Netflix Originals:", error));

// Movies Row
function fetchAndDisplayMovies(request, rowTitle, rowClass) {
    fetch(request)
        .then((res) => res.json())
        .then((data) => {
            console.log(rowTitle + " data:", data.results);
            const headrow = document.getElementById("headrow");
            const row = document.createElement("div");
            row.className = "row";
            if (rowClass) row.classList.add(rowClass);
            headrow.appendChild(row);

            const title = document.createElement("h2");
            title.className = "row__title";
            title.innerText = rowTitle;
            row.appendChild(title);

            const row_posters = document.createElement("div");
            row_posters.className = "row__posters";
            row.appendChild(row_posters);

            data.results.forEach((movie) => {
                const poster = document.createElement("img");
                poster.className = "row__posterLarge";
                const movieName = movie.name || ''; // Handle undefined movie name
                var s = movieName.replace(/\s+/g, "");
                poster.id = s;
                poster.src = IMG_URL + movie.backdrop_path;
                row_posters.appendChild(poster);
            });
        })
        .catch(error => console.error("Error fetching " + rowTitle + ":", error));
}

fetchAndDisplayMovies(requests.fetchNetflixOriginals, "NETFLIX ORIGINALS", "netflixrow");
fetchAndDisplayMovies(requests.fetchTrending, "Trending", "netflixrow1");
fetchAndDisplayMovies(requests.fetchActionMovies, "Action Movies");
fetchAndDisplayMovies(requests.fetchComedyMovies, "Comedy Movies");
fetchAndDisplayMovies(requests.fetchHorrorMovies, "Horror Movies");
fetchAndDisplayMovies(requests.fetchRomanceMovies, "Romance Movies");
fetchAndDisplayMovies(requests.fetchDocumentaries, "Documentaries");
fetchAndDisplayMovies(requests.fetchPopular, "Popular");
fetchAndDisplayMovies(requests.fetchTopRated, "Top Rated");
