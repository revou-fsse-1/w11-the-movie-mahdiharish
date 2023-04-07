const searchButton = document.getElementById("searchBtn");
const wishlistButon = document.getElementById("watchlistBtn");

const revealSearchMenu = () => {
  // reveal
  searchMenu.classList.replace("hidden", "flex");
  searchResult.classList.replace("hidden", "grid");
  //   hide
  searchButton.classList.replace("flex", "hidden");
  wishlistButon.classList.replace("flex", "hidden");
};
const closeSearchMenu = () => {
  // hide
  searchMenu.classList.replace("flex", "hidden");
  searchResult.classList.replace("grid", "hidden");
  //   reveal
  searchButton.classList.replace("hidden", "flex");
  wishlistButon.classList.replace("hidden", "flex");
};
