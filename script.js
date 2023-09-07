const omdbApiKey = 'a9f162e7'
const searchButtonEl = document.querySelector('#search-button');
const searchInputEl = document.querySelector('#search-input');
const watchListButtonEl = document.querySelector('#open-watch-list');
const watchListItemsEl = document.querySelector('#watch-list-items');
const searchList = document.querySelector('#search-list');
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
let findMovie = function (searchTerm){
    let apiUrl = `http://www.omdbapi.com/?type=movie&apikey=${omdbApiKey}&s=${searchTerm}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){ // need to access search array in data
            console.log(data)
            const movies = data.Search;
            for (let i=0; i < movies.length; i++) {
                if (movies[i].Type === 'movie') {
                let searchResultsContainer = document.createElement('div');
                searchResultsContainer.className = 'search-result-item';

                let titleEl = document.createElement('div');
                titleEl.innerText = movies[i].Title + movies[i].Year;

                let posterEl = document.createElement('img');
                posterEl.src = movies[i].Poster;

                searchResultsContainer.appendChild(titleEl);
                searchResultsContainer.appendChild(posterEl);
                searchList.appendChild(searchResultsContainer);
            }}
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
    console.log(response);
        });

    // creates a link to the movie trailer
    let trailerEl = document.createElement('a')
    trailerEl.setAttribute('href', 'https://youtube.com/' + movie + '/trailer');
    trailerEl.setAttribute('target', '_blank');

};




