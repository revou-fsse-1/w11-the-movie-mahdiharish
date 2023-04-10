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
    moviePoster.innerHTML = `<img src="${data.image}" alt="${data.title}" class="object-cover w-full h-full">`;
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

const updateButton = async () => {
  try {
    const response = await fetch("http://localhost:3000/watchlist");
    const watchlistData = await response.json();

    // Define movieData here
    const movieResponse = await fetch(
      `http://localhost:3000/movies/${movieId}`
    );
    const movieData = await movieResponse.json();

    const movieInWatchlist = watchlistData.find(
      (movie) => movie.title === movieData.title
    );
    if (movieInWatchlist) {
      addToWatchlistBtn.innerHTML = "Remove from Watchlist";
    } else {
      addToWatchlistBtn.innerHTML = "Add to Watchlist";
    }
  } catch (error) {
    console.error(error);
  }
};
updateButton();

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
    const responseRemove = await fetch("http://localhost:3000/watchlist");
    const removeWatchlistData = await responseRemove.json();
    const movieInWatchlist = removeWatchlistData.find(
      (movie) => movie.title === movieData.title
    );
    if (movieInWatchlist) {
      const deleteResponse = await fetch(
        `http://localhost:3000/watchlist/${movieInWatchlist.id}`,
        { method: "DELETE" }
      );
      const deleteResult = await deleteResponse.json();
      console.log(deleteResult);
      alert("Movie removed from watchlist!");
    } else {
      const postResponse = await fetch(
        "http://localhost:3000/watchlist",
        postOptions
      );
      const postResult = await postResponse.json();
      console.log(postResult);
      alert("Movie added to watchlist!");
    }
    updateButton();
  } catch (error) {
    console.error(error);
    alert("Failed to modify watchlist!");
  }
});

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput").value;
  window.location.href = `searchpage.html?query=${searchInput}`;
});
