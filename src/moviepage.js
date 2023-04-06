// SHOW MOVIE DETAILS
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const movieId = localStorage.getItem("movieId");
const API_ENDPOINT_MOVIES = `http://localhost:3000/movies/${id}`;
const movieTitle = document.getElementById("movieTitle");
const movieSynopsis = document.getElementById("movieSynopsis");
const moviePoster = document.getElementById("moviePoster");
const movieTrailer = document.getElementById("movieTrailer");
const movieGenre = document.getElementById("movieGenre");
const movieRating = document.getElementById("movieRating");
const addToWatchlist = document.getElementById("addToWatchlistBtn");

const loadMovieDetails = async () => {
  try {
    const response = await fetch(API_ENDPOINT_MOVIES);
    const data = await response.json();
    console.log(data);
    movieTitle.innerHTML = `${data.title}`;
    movieSynopsis.innerHTML = `${data.synopsis}`;
    moviePoster.innerHTML = `<img src="${data.image}" alt="${data.title}" class="object-cover w-full h-full ">`;
    movieTrailer.innerHTML = `<embed src="${data.trailer}" class="rounded-lg aspect-video w-full h-full">`;
    movieRating.innerHTML = `⭐ ${data.rating}/10`;
    movieGenre.innerHTML = "";
    for (let i = 0; i < data.genre.length; i++) {
      movieGenre.innerHTML += `<span class="rounded-full w-20 text-center font-medium border border-gray-700">
      ${data.genre[i]}</span>`;
    }
  } catch (error) {
    console.error(error);
  }
};
loadMovieDetails();

// ADD MOVIE TO WATCHLIST
