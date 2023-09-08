const omdbApiKey = 'a9f162e7'
const youTubeApiKey = 'AIzaSyB7CGQ509hnLe0aZfKS4b5cV4M8UFF5Du8';
const searchButtonEl = document.querySelector('#search-button');
const searchInputEl = document.querySelector('#search-input');
const watchListButtonEl = document.querySelector('#open-watch-list');
const watchListItemsEl = document.querySelector('#watch-list-items');
const searchList = document.querySelector('#search-list');
const errorMessageEl = document.querySelector('#error-message');
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
// Search for a movie by name and display results
let findMovie = function (searchTerm) {
    let searchApiUrl = `http://www.omdbapi.com/?&apikey=${omdbApiKey}&s=${searchTerm}`;
    fetch(searchApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.Response === 'True') {
                // clear error message if movies found
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
                                if (movie.Ratings[1].Source !== undefined && movie.Ratings[1].Value !== undefined) {
                                ratingsEl.textContent = `IMdb: ${movie.Ratings[0].Value} ${movie.Ratings[1].Source}: ${movie.Ratings[1].Value}`;
                                } else {
                                    ratingsEl.textContent = `IMdb: ${movie.Ratings[0].Value}`
                                }
                                searchResultsContainer.appendChild(posterEl);
                                searchResultsContainer.appendChild(titleEl);
                                searchResultsContainer.appendChild(runtimeEl)
                                searchResultsContainer.appendChild(ratingsEl);
                                searchResultsContainer.appendChild(plotEl);
                                searchList.appendChild(searchResultsContainer);
                            })
                    };
                }
            } else {
                // movie not found error message
                errorMessageEl.textContent = 'Movie not found.';
                // clear previous search results
                searchList.innerHTML = '';
            }
        })
        .catch(function (error) {
            // network error message
            errorMessageEl.textContent = 'An error occurred while fetching data.';
            console.error(error);
        });
};

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


// function movieInfo(imdbID) {
//     let moreInfo = `http://www.omdbapi.com/?&apikey=${omdbApiKey}&i=${imdbID}` // @TODO need to figure out how to isolate imdb key

//     // fetches data from imdb ID
//     fetch(moreInfo)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function(data) {
//             const info = data.movie

//             // creates an unordered list to store the data 
//             let movieInfoResults = document.createElement('ul');

//             // adds values to ul 
//             let ratingEl = document.createElement('li');
//             ratingEl.textContent = info[i].Rated;

//             let plotEl = document.createElement('li');
//             plotEl.textContent = info[i].Plot;

//             let criticsEl = document.createElement('li');
//             criticsEl.textContent = info[i].Ratings

//             movieInfoResults.appendChild(ratingEl);
//             movieInfoResults.appendChild(plotEl);
//             movieInfoResults.appendChild(criticsEl);       
//         });
// };

// function playTrailer(movie) {
//     // Links YouTube API and fetches data 
//     let youTubeApi = `https://www.googleapis.com/youtube/v3key=${youTubeApiKey}`;
//     fetch(youTubeApi)
//         .then(function (response) {
//             response.json().then(function (data) {
//                 movieInfo(data);
//             });
//         });
//     // embed movie trailer
//     <iframe width="560" height="315" src='https://www.youtube.com/embed/${movieTrailer}' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>;

// };

// event listener for pressing Enter to search
searchInputEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchButtonEl.click();
        }
    });

