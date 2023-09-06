const apiKey = 'a9f162e7'
const searchButtonEl = document.querySelector('#search-button');
const searchInputEl = document.querySelector('#search-input');
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




