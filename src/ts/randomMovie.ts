import { IMovieData } from "./interfaces";

const randomMovie = document.getElementById('random-movie');
const randomMovieName = document.getElementById('random-movie-name');
const randomMovieDescription = document.getElementById('random-movie-description');

export function generateRandomMovie (movie: IMovieData): void {
  const {
    title,
    overview,
    backdrop_path: image,
  } = movie;
  randomMovie.style.background = image ? `url(https://image.tmdb.org/t/p/original/${image}) center top / cover` : '';
  randomMovieName.textContent = title;
  randomMovieDescription.textContent = overview;
}