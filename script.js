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
// search for movie by name and display search list
// let findMovie = function (searchTerm) {
//     let apiUrl = `http://www.omdbapi.com/?type=movie&apikey=${omdbApiKey}&s=${searchTerm}`;
//     fetch(apiUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) { // need to access search array in data
//             if (data.Response === 'True') {
//                 // clear error message if movies found
//                 errorMessageEl.textContent = '';
//                 console.log(data);
//                 searchList.innerHTML = ''; // clear previous search results
//                 const movies = data.Search;
//                 for (let i = 0; i < movies.length; i++) {
//                     if (movies[i].Type === 'movie') {
//                         let searchResultsContainer = document.createElement('div');
//                         searchResultsContainer.className = 'search-result-item';

//                         let titleEl = document.createElement('div');
//                         titleEl.innerText = movies[i].Title + movies[i].Year;

//                         let posterEl = document.createElement('img');
//                         posterEl.src = movies[i].Poster;

//                         searchResultsContainer.appendChild(titleEl);
//                         searchResultsContainer.appendChild(posterEl);
//                         searchList.appendChild(searchResultsContainer);
                        

//                     }
//                 }
//             } else {
//                 // movie not found error message
//                 errorMessageEl.textContent = 'Movie not found.';
//                 // clear previous search results
//                 searchList.innerHTML = '';
//             }
//         })
//         .catch(function (error) {
//             // network error message
//             errorMessageEl.textContent = 'An error occurred while fetching data.';
//             console.error(error);
//         });


// };




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
//         .then(function (data) {
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

function playTrailer(movie) {
    // Links YouTube API and fetches data 
    let youTubeApi = `https://www.googleapis.com/youtube/v3key=${youTubeApiKey}`;
    fetch(youTubeApi)
        .then(function (response) {
            response.json().then(function (data) {
                movieInfo(data);
            })
                .then(function (data) {
                    if (data.response === searchTerm) {

                    }
                })
        });
    // embed movie trailer
    <iframe width="560" height="315" src='https://www.youtube.com/embed/${videoID}' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>;

};

// event listener for pressing Enter to search
searchInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchButtonEl.click();
    }
});


let findMovie = function (searchTerm) {
    let apiUrl = `http://www.omdbapi.com/?type=movie&apikey=${omdbApiKey}&s=${searchTerm}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) { // need to access search array in data
            if (data.Response === 'True') {
                // clear error message if movies found
                errorMessageEl.textContent = '';
                console.log(data);
                searchList.innerHTML = ''; // clear previous search results
                const movies = data.Search;
                for (let i = 0; i < movies.length; i++) {
                    if (movies[i].Type === 'movie') {
                        let searchResultsContainer = document.createElement('div');
                        searchResultsContainer.className = 'search-result-item';

                        searchResultsContainer.innerHTML += `<h2>${movies[i].Title} + ${movies[i].Year}</h2>` // @TODO not displaying as h2 
                        searchResultsContainer.innerHTML += `<p>${movies[i].Poster}</p>`
                        searchResultsContainer.innerHTML += `<p>${movies[i].Ratings}</p>` // @TODO not displaying
                        searchResultsContainer.innerHTML += `<p>${movies[i].Plot}</p>` // @TODO not displaying
                        
                    }
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



