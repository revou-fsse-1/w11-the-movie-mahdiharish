const API_ENDPOINT_MOVIES = "http://localhost:3000/movies";
const searchResult = document.getElementById("searchResult");

const loadSearchResult = async (searchTerm) => {
  try {
    const response = await fetch(API_ENDPOINT_MOVIES);
    const data = await response.json();

    let filteredData = data;
    if (searchTerm) {
      filteredData = data.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    searchResult.innerHTML = "";
    for (let i = 0; i < filteredData.length; i++) {
      searchResult.innerHTML += `
        <a
          class="w-[150px] h-[250px] rounded-lg relative overflow-hidden"
          href="#"
        ><img
          class="w-auto h-[250px] object-cover rounded-lg"
          src="${filteredData[i].image}"
          alt="${filteredData[i].title}"
        />
        <p
          class="text-white/0 hover:text-white hover:bg-black/70 text-5xl font-bold absolute top-0 flex justify-center items-center w-[100%] h-[100%]"
          id ="${filteredData[i].id}"
          onclick="showMovieDetails(this)"
        >
          ${filteredData[i].rating}/10
        </p>
        </a>
      `;
    }
  } catch (error) {
    console.error(error);
  }
};

// Search input event listener
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    const searchTerm = searchInput.value;

    loadSearchResult(searchTerm);
  }
});

// Initial load of all movies
const query = new URLSearchParams(window.location.search).get("query");
loadSearchResult(query);

const showMovieDetails = (e) => {
  const movieId = e.getAttribute("id");
  localStorage.setItem("movieId", `${movieId}`);
  window.location.href = `moviepage.html?id=${movieId}`;
};
