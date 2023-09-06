const apiKey = 'a9f162e7'
const searchButtonEl = document.querySelector('#search-button');
const searchInputEl = document.querySelector('#search-input');
const watchListButtonEl = document.querySelector('#open-watch-list');
const watchListItemsEl = document.querySelector('#watch-list-items');

//array for storing movies into watchlist
let watchlist = [];
const searchList = document.querySelector('#search-list');
let movies = [];

var buttonClickHandler = function () {
    var searchTerm = searchInputEl.value.trim();
    if (searchTerm) {
        findMovie(searchTerm);
        searchInputEl.value = '';
    }
};

var findMovie = function (searchTerm){
    var apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
            console.log(data);
            for (var i=0; i < data.length; i++) {
                var listItem = document.createElement('li');
                listItem.textContent = data[i].title;
                searchList.appendChild(listItem);
            }
        })
};

var displayMovies = function(){

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

function movieInfo(movie) {

    // creates a div in HTML to display movie information
    let resultInfo = document.createElement('div');
    resultInfo.classList.add(); // @TODO CSS parameters needed for styling

    // creates a heading for the result info 'Rating'
    let ratingEl = document.createElement('h3');
    ratingEl.textContent = ('Rating');

    //creates a p tag for the movie rating
    let movieRating = document.createElement('p');
    movieRating.textContent = movie.rated;

    // creates a heading for the result info 'Rotten Tomatoes Score'
    let scoreEl = document.createElement('h3');
    scoreEl.textContent = ('Rotten Tomatoes Score');

    // creates a p tag for the Rotten Tomatoes Score
    let tomatoScore = document.createElement('p');
    tomatoScore.textContent = movie.rotten - tomatoes;

};


function playTrailer(movie) {
    // Links YouTube API and fetches data 
    let youTubeApi = 'https://www.youtube.com/iframe_api' + movie;
    fetch(youTubeApi)
        .then(function(response) {
            response.json().then(function(data){
                movieInfo(data);
            });
        });

    // creates a link to the movie trailer
    let trailerEl = document.createElement('a')
    trailerEl.setAttribute('href', 'https://youtube.com/' + movie + '/trailer');
    trailerEl.setAttribute('target', '_blank');

};

// function redirectUser() {

// }


