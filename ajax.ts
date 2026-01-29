
document.body.innerHTML = `
<style>
body {
  font-family: Arial;
  background: #f6efe7;
  text-align: center;
}
.search-box {
  width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
}
input, select, button {
  width: 90%;
  padding: 8px;
  margin: 5px 0;
}
.films {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
.film {
  width: 200px;
  border: 1px solid #ccc;
  padding: 10px;
  background: #fff;
}
.film img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}
.pagination button {
  margin: 3px;
}
.modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
}
.modal-content {
  background: #fff;
  width: 600px;
  margin: 50px auto;
  padding: 20px;
}
</style>
<h2>Search:</h2>
<div class="search-box">
  <input id="title" placeholder="Title">
  <select id="type">
    <option value="">Any</option>
    <option value="movie">Movie</option>
    <option value="series">Series</option>
    <option value="episode">Episode</option>
  </select>
  <button id="searchBtn">Search</button>
</div>
<h3>Films:</h3>
<div id="films" class="films"></div>
<div id="pagination" class="pagination"></div>
<div id="modal" class="modal">
  <div class="modal-content">
    <button id="closeModal">Close</button>
    <div id="modalBody"></div>
  </div>
</div>
`;
const API_KEY: string = "YOUR_API_KEY";
let currentPage: number = 1;
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}
const titleInput = document.getElementById("title") as HTMLInputElement;
const typeSelect = document.getElementById("type") as HTMLSelectElement;
const filmsDiv = document.getElementById("films") as HTMLDivElement;
const paginationDiv = document.getElementById("pagination") as HTMLDivElement;
const modal = document.getElementById("modal") as HTMLDivElement;
const modalBody = document.getElementById("modalBody") as HTMLDivElement;
function searchMovies(page: number = 1): void {
  currentPage = page;
  if (!titleInput.value) {
    alert("Enter movie title");
    return;
  }
  let url: string =
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${titleInput.value}&page=${page}`;
  if (typeSelect.value) {
    url += `&type=${typeSelect.value}`;
  }
  fetch(url)
    .then(res => res.json())
    .then((data: SearchResponse) => {
      if (data.Response === "False") {
        filmsDiv.innerHTML = "No results";
        paginationDiv.innerHTML = "";
        return;
      }
      renderFilms(data.Search);
      renderPagination(Number(data.totalResults));
    });
}
function renderFilms(movies: Movie[]): void {
  filmsDiv.innerHTML = "";
  movies.forEach(movie => {
    filmsDiv.innerHTML += `
      <div class="film">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}">
        <b>${movie.Title}</b><br>
        ${movie.Type} (${movie.Year})<br>
        <button onclick="showDetails('${movie.imdbID}')">Details</button>
      </div>
    `;
  });
}
function renderPagination(total: number): void {
  const pages = Math.ceil(total / 10);
  paginationDiv.innerHTML = "";
  if (currentPage > 1) {
    paginationDiv.innerHTML += `<button onclick="searchMovies(${currentPage - 1})"><<</button>`;
  }
  for (let i = 1; i <= pages && i <= 5; i++) {
    paginationDiv.innerHTML += `<button onclick="searchMovies(${i})">${i}</button>`;
  }
  if (currentPage < pages) {
    paginationDiv.innerHTML += `<button onclick="searchMovies(${currentPage + 1})">>></button>`;
  }
}
(window as any).showDetails = function (id: string): void {
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
    .then(res => res.json())
    .then(movie => {
      modalBody.innerHTML = `
        <h3>${movie.Title}</h3>
        <img src="${movie.Poster}" width="200"><br>
        <b>Released:</b> ${movie.Released}<br>
        <b>Genre:</b> ${movie.Genre}<br>
        <b>Country:</b> ${movie.Country}<br>
        <b>Director:</b> ${movie.Director}<br>
        <b>Actors:</b> ${movie.Actors}<br>
        <b>Awards:</b> ${movie.Awards}<br>
        <p>${movie.Plot}</p>
      `;
      modal.style.display = "block";
    });
};
(document.getElementById("searchBtn") as HTMLButtonElement)
  .addEventListener("click", () => searchMovies());
(document.getElementById("closeModal") as HTMLButtonElement)
  .addEventListener("click", () => modal.style.display = "none");
