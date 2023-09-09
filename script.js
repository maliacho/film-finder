const omdbApiKey = 'a9f162e7'
const youTubeApiKey = 'AIzaSyB7CGQ509hnLe0aZfKS4b5cV4M8UFF5Du8';
const searchButtonEl = document.querySelector('#search-button');
const searchInputEl = document.querySelector('#search-input');
const watchListButtonEl = document.querySelector('#open-watch-list');
const watchListItemsEl = document.querySelector('#watch-list-items');
const searchList = document.querySelector('#search-list');
const errorMessageEl = document.querySelector('#error-message');
const ourPicks = document.querySelector('#suggested-movies')
//array for storing movies into watchlist
let watchlist = [];
let movies = [];

// search on button click (add option for enterkey?)
let buttonClickHandler = function () {
    let searchTerm = searchInputEl.value.trim();
    if (searchTerm) {
        findMovie(searchTerm);
        searchInputEl.value = ''; // clear search field
    }
};
<<<<<<< HEAD
// Search for a movie by name and display results
=======

// search for movie by name and display search list
>>>>>>> 9238f290430cf2f4dbce4eec209577fe8797795e
let findMovie = function (searchTerm) {
    let searchApiUrl = `http://www.omdbapi.com/?&apikey=${omdbApiKey}&s=${searchTerm}`;
    fetch(searchApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.Response === 'True') {
                errorMessageEl.textContent = '';
                console.log(data);
                // clear previous search results
                searchList.innerHTML = ''; 
                const movies = data.Search;
                for (let i = 0; i < movies.length; i++) {
                    // Only show movie results
                    if (movies[i].Type === 'movie') {
                        let imdbIDApiUrl = `http://www.omdbapi.com/?&apikey=${omdbApiKey}&i=${movies[i].imdbID}`
                        fetch(imdbIDApiUrl)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (data) {
                                console.log(data);
                                let movie = data;
                                let searchResultsContainer = document.createElement('div');
                                searchResultsContainer.className = 'search-result-item';
                                searchResultsContainer.setAttribute('id', `${movie.imdbID}`)
                                let titleEl = document.createElement('h2');
                                titleEl.textContent = `${movie.Title} (${movie.Year}) ${movie.Rated}`;
                                let posterEl = document.createElement('img');
                                posterEl.src = movie.Poster;
                                let runtimeEl = document.createElement('p');
                                runtimeEl.textContent = movie.Runtime;
                                let plotEl = document.createElement('p');
                                plotEl.textContent = movie.Plot;
                                let ratingsEl = document.createElement('p');
                                ratingsEl.textContent = `IMDb: ${movie.Ratings[0].Value}`;
                                // Create a link to the movie trailer
                                let trailerLinkEl = document.createElement('a');
                                trailerLinkEl.href = ''; // Replace with the actual trailer URL
                                trailerLinkEl.textContent = 'Watch Trailer';
                                trailerLinkEl.target = '_blank'; // Open in a new tab

                                searchResultsContainer.appendChild(posterEl);
                                searchResultsContainer.appendChild(titleEl);
                                searchResultsContainer.appendChild(runtimeEl)
                                searchResultsContainer.appendChild(ratingsEl);
                                searchResultsContainer.appendChild(plotEl);
                                searchResultsContainer.appendChild(trailerLinkEl); // Append the trailer link
                                searchList.appendChild(searchResultsContainer);
                                
                                // Fetch the trailer URL and set it in the trailer link's href
                                fetchTrailerUrl(movie.Title, trailerLinkEl);
                            })
                    };
                }
            } else {
                errorMessageEl.textContent = 'Movie not found.';
                searchList.innerHTML = '';
            }
        })
        .catch(function (error) {
            errorMessageEl.textContent = 'An error occurred while fetching data.';
            console.error(error);
        });
};

// Function to fetch the trailer URL using the YouTube API
function fetchTrailerUrl(movieTitle, trailerLinkEl) {
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${youTubeApiKey}&q=${movieTitle} official trailer`;

    fetch(youtubeApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.items.length > 0) {
                const videoId = data.items[0].id.videoId;
                const youtubeVideoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                
                // Set the trailer link's href to the YouTube video URL
                trailerLinkEl.href = youtubeVideoUrl;
            } else {
                console.log('Trailer not found.');
            }
        })
        .catch(function (error) {
            console.error('An error occurred while fetching YouTube data:', error);
        });
}


// add movie to watchlist function
function addToWatchlist(movie) {
    // if movie is still in the watchlist
    if (!watchlist.some((item) => item.Title === movie.Title)) {
        watchlist.push(movie);
        renderWatchlist();
    }
}
// remove movie from watch list
function removeFromWatchlist(movieTitle) {
    watchlist = watchlist.filter((item) => item.Title !== movieTitle);
    renderWatchlist();
}
// render watchlist
function renderWatchlist() {
    // clear watchlist
    watchListItemsEl.innerHTML = '';

    // loop thru watchlist and display movies
    watchlist.forEach((movie) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${movie.Title}
            <button class='remove-button' onclick='removeFromWatchlist('${movie.Title}')'>Remove</button>
        `;
        watchListItemsEl.appendChild(listItem);
    });
}

watchListButtonEl.addEventListener('click', renderWatchlist);
searchButtonEl.addEventListener('click', buttonClickHandler);


// event listener for pressing Enter to search
searchInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchButtonEl.click();
    }
});

ourPicks.addEventListener('click', developerFavs);

function developerFavs() {

    let malia = {
        titleEl : 'Pitch Perfect',
        imdbID : 'tt1981677',
    }

    findMovie(malia.titleEl, malia.imdbID);
};   
    
    




