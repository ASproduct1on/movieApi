// import dataBase from "./apiHelper";

import { IMovieData } from "./interfaces";

function createMovieCard (info: IMovieData, isFavorite: boolean): string {
  const {
    id,
    poster_path: image,
    overview: description,
    release_date: date,
  } = info;

  const card = `
    <div class="${isFavorite ? "col-12 p-2" : "col-lg-3 col-md-4 col-12 p-2"}">
      <div class="card shadow-sm" movie-id=${id}>
        <img
          src="https://image.tmdb.org/t/p/original/${image}"
        />
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          stroke="red"
          fill="${isFavorite ? "red" : "#ff000078"}"
          width="50"
          height="50"
          class="bi bi-heart-fill position-absolute p-2"
          movie-id=${id}
          viewBox="0 -2 18 22"
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
        <div class="card-body">
          <p class="card-text truncate">${description}</p>
          <div
            class="
              d-flex
              justify-content-between
              align-items-center
            "
          >
            <small class="text-muted">${date}</small>
          </div>
        </div>
      </div>
    </div>
  `

  return card;
};

export function createMoviesList (movieData: IMovieData[], isFavorite = false): string {
  if (movieData && movieData.length) {
    let movieList = '';
    movieData.forEach( (movie): void => {
      movieList += createMovieCard(movie, isFavorite);
    });
    return movieList;
  } else {
    return 'No movie';
  }
};

export function renderMoviesList (container: HTMLElement, movieData: IMovieData[], page = 1): void {
  if (container && page === 1) {
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', createMoviesList(movieData));
  } else {
    container.insertAdjacentHTML('beforeend', createMoviesList(movieData));
  }
};