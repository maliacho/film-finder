const searchButtonEl = document.querySelector('#search-button');
const searchInputEl = document.querySelector('#search-input');
const watchListButtonEl = document.querySelector('#open-watch-list');
const watchListItemsEl = document.querySelector('#watch-list-items');

//array for storing movies into watchlist
let watchlist = [];

var buttonClickHandler = function () {
    var movieName = searchInputEl.value.trim();
    if (movieName) {
        getMovie(movieName);
        searchInputEl.value = '';
    }
};

var getMovie = function (movie){
    var apiUrl = 'https://www.omdbapi.com/?apikey=27d565fe&s=' + movie;
    fetch(apiUrl)
        .then(function (response) {
            console.log(response);
        })
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

function movieInfo(search) {
    // creates a div in HTML to display movie information
    let resultInfo = document.createElement('div');
    resultInfo.classList.add(); // @@TODO CSS parameters needed for styling

    // creates a heading for the result info 'Rating'
    let ratingEl = document.createElement('h3');
    ratingEl.textContent = ('Rating');

    //creates a p tag for the movie rating
    let movieRating = document.createElement('p');
    movieRating.textContent = search.rated;

    // creates a heading for the result info 'Rotten Tomatoes Score'
    let scoreEl = document.createElement('h3');
    scoreEl.textContent = ('Rotten Tomatoes Score');

    // creates a p tag for the Rotten Tomatoes Score
    let tomatoScore = document.createElement('p');
    tomatoScore.textContent = search.rotten - tomatoes;

};

// function playTrailer() {
//      // creates a link to the movie trailer
//  let trailerEl = document.createElement('href')

// }

function redirectUser() {

}


