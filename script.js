var searchButtonEl = document.querySelector('#search-button');
var searchInputEl = document.querySelector('#search-input');

searchHandler = function () {
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

searchButtonEl.addEventListener('click', searchHandler);