// CURRENTLY WATCHING
const API_ENDPOINT_CURRENTLYWATCHING = "http://localhost:3000/currentWatch";
const currentlyWatching = document.getElementById("currentlyWatching");
const loadCurrentlyWatching = async () => {
  try {
    const response = await fetch(API_ENDPOINT_CURRENTLYWATCHING);
    const data = await response.json();
    console.log(data);
    currentlyWatching.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      currentlyWatching.innerHTML += `
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
loadCurrentlyWatching();

// SUGGESTED TO WATCH
const API_ENDPOINT_SUGGESTEDTOWATCH = "http://localhost:3000/isSuggested";
const suggestedToWatch = document.getElementById("suggestedToWatch");
const loadSuggestedToWatch = async () => {
  try {
    const response = await fetch(API_ENDPOINT_SUGGESTEDTOWATCH);
    const data = await response.json();
    console.log(data);
    suggestedToWatch.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      suggestedToWatch.innerHTML += `
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
loadSuggestedToWatch();

// PREVIOUSLY WATCHED
const API_ENDPOINT_PREVIOUSLYWATCHED = "http://localhost:3000/isPrevious";
const previouslyWatched = document.getElementById("previouslyWatched");
const loadPreviouslyWatched = async () => {
  try {
    const response = await fetch(API_ENDPOINT_PREVIOUSLYWATCHED);
    const data = await response.json();
    console.log(data);
    previouslyWatched.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      previouslyWatched.innerHTML += `
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
loadPreviouslyWatched();

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
