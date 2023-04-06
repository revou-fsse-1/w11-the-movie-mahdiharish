// SHOW MOVIE DETAILS
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const API_ENDPOINT_MOVIES = `http://localhost:3000/movies/${id}`;
const movieTitle = document.getElementById("movieTitle");
const movieSynopsis = document.getElementById("movieSynopsis");
const moviePoster = document.getElementById("moviePoster");
const movieTrailer = document.getElementById("movieTrailer");
const movieGenre = document.getElementById("movieGenre");
const movieRating = document.getElementById("movieRating");

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
const movieId = new URLSearchParams(window.location.search).get("id");
const addToWatchlistBtn = document.getElementById("addToWatchlistBtn");

addToWatchlistBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`http://localhost:3000/movies/${movieId}`);
    const movieData = await response.json();
    const watchlistData = {
      title: movieData.title,
      image: movieData.image,
      synopsis: movieData.synopsis,
      genre: movieData.genre,
      production: movieData.production,
      trailer: movieData.trailer,
      rating: movieData.rating,
    };
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(watchlistData),
    };
    const postResponse = await fetch(
      "http://localhost:3000/watchlist",
      postOptions
    );
    const postResult = await postResponse.json();
    console.log(postResult);
    alert("Movie added to watchlist!");
  } catch (error) {
    console.error(error);
    alert("Failed to add movie to watchlist!");
  }
});
