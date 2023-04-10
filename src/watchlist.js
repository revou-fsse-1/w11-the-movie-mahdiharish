// WATCHLIST
const API_ENDPOINT_WATCHLIST = "http://localhost:3000/watchlist";
const watchlist = document.getElementById("watchlist");
const loadWatchlist = async () => {
  try {
    const response = await fetch(API_ENDPOINT_WATCHLIST);
    const data = await response.json();
    console.log(data);
    watchlist.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      watchlist.innerHTML += `
        <a
        class="w-[150px] h-[250px] rounded-lg relative overflow-hidden"
        href="#"
        ><img
          class="w-auto h-[250px] object-cover rounded-lg"
          src="${data[i].image}"
          alt="${data[i]}"
      />
      <p
      class="text-white/0 hover:text-white hover:bg-black/70 text-5xl font-bold absolute top-0 flex justify-center items-center w-[100%] h-[100%]"
      id ="${data[i].id}"
      onclick="showMovieDetails(this)"
    >
      ${data[i].rating}/10
    </p>
      </a>
        `;
    }
  } catch (error) {
    console.error(error);
  }
};
loadWatchlist();

const showMovieDetails = (e) => {
  const movieId = e.getAttribute("id");
  localStorage.setItem("movieId", `${movieId}`);
  window.location.href = `moviepage.html?id=${movieId}`;
};

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput").value;
  window.location.href = `searchpage.html?query=${searchInput}`;
});
