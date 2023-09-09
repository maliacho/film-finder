const omdbApiKey = 'a9f162e7'
const youTubeApiKey = 'AIzaSyB7CGQ509hnLe0aZfKS4b5cV4M8UFF5Du8';
const searchButtonEl = document.querySelector('#search-button');
const searchInputEl = document.querySelector('#search-input');
const watchListButtonEl = document.querySelector('#open-watch-list');
const watchListItemsEl = document.querySelector('#watch-list-items');
const searchList = document.querySelector('#search-list');
const errorMessageEl = document.querySelector('#error-message');
const ourPicks = document.querySelector('#suggested-movies');
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

// search for movie by name and display search list
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
                searchList.innerHTML = '';
                const movies = data.Search;
                for (let i = 0; i < movies.length; i++) {
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
                                ratingsEl.textContent = `IMDb: ${movie.Ratings[0].Value} ${movie.Ratings[1].Source}: ${movie.Ratings[1].Value}`;
                                
                                // Create a link to the movie trailer
                                let trailerLinkEl = document.createElement('a');
                                trailerLinkEl.href = ''; // Replace with the actual trailer URL
                                trailerLinkEl.textContent = 'Watch Trailer';
                                trailerLinkEl.target = '_blank'; // Open in a new tab
                                
                                let addToWatchlistButton = document.createElement('button');
                                addToWatchlistButton.textContent = 'Add to Watchlist';
                                addToWatchlistButton.addEventListener('click', function () {
                                addToWatchlist(movie);
                                });
                                
                                searchResultsContainer.appendChild(posterEl);
                                searchResultsContainer.appendChild(titleEl);
                                searchResultsContainer.appendChild(runtimeEl)
                                searchResultsContainer.appendChild(ratingsEl);
                                searchResultsContainer.appendChild(plotEl);
                                searchResultsContainer.appendChild(trailerLinkEl); // Append the trailer link
                                searchResultsContainer.appendChild(addToWatchlistButton);
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

// Render watchlist
function renderWatchlist() {
    // Clear watchlist
    watchListItemsEl.innerHTML = '';

    // Loop through watchlist and display movies with poster and runtime
    watchlist.forEach((movie) => {
        const listItem = document.createElement('div');
        listItem.className = 'watchlist-movie';
        listItem.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <div class="watchlist-details">
                <p>${movie.Title} (${movie.Year}) ${movie.Rated}</p>
                <p>Runtime: ${movie.Runtime}</p>
            </div>
            <button class='remove-button' onclick='removeFromWatchlist("${movie.Title}")'>Remove</button>
        `;
        watchListItemsEl.appendChild(listItem);
    });
}

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
                trailerLinkEl.textContent = 'Watch Trailer'; // Update the link text
                trailerLinkEl.target = '_blank'; // Open in a new tab
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
    console.log('Adding to watchlist:', movie.Title);
    // if movie is still in the watchlist
    if (!watchlist.some((item) => item.Title === movie.Title)) {
        watchlist.push(movie);
        console.log('Movie added to watchlist:', movie.Title);
        renderWatchlist();

    }
}
// Remove movie from watchlist
function removeFromWatchlist(movieTitle) {
    watchlist = watchlist.filter((item) => item.Title !== movieTitle);
    renderWatchlist();
}

// Event listener for the "Open Watch List" button
watchListButtonEl.addEventListener('click', function () {
    if (watchListItemsEl.classList.contains('hidden')) {
        watchListItemsEl.classList.remove('hidden'); // Show the watchlist
        watchListButtonEl.textContent = 'Close Watch List';
        watchListButtonEl.classList.add('bg-red-500', 'hover:bg-red-700'); // make the button red when clicked
        renderWatchlist();
    } else {
        watchListItemsEl.classList.add('hidden'); // hide the watchlist
        watchListButtonEl.textContent = 'Open Watch List';
        watchListButtonEl.classList.remove('bg-red-500', 'hover:bg-red-700'); // removes red button
    }
});

// Event listener for pressing Enter to search
searchInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        buttonClickHandler();
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
    
    




