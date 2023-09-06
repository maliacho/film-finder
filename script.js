const searchButtonEl = document.querySelector('#search-button');
const searchInputEl = document.querySelector('#search-input');

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


