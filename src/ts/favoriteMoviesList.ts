import { IMovieData } from "./interfaces";
import { createMoviesList } from "./movieList";
import { setLocalStorage, store } from "./localStorage";
import dataBase from "./apiHelper";

const favoriteMoviesList = document.getElementById('favorite-movies');

export function addToFavoriteMoviesList (favoriteList: IMovieData[]): void {
  favoriteMoviesList ? favoriteMoviesList.innerHTML = '' : null;
  favoriteMoviesList?.insertAdjacentHTML('afterbegin', createMoviesList(favoriteList, true));
};

// function deleteFromFavoriteMoviesList (favoriteList: IMovieData[], id: number): void {
//   if (favoriteList) {

//   }
// }

export async function createFavoriteMoviesList (id: number): Promise<void> {
  const existItem = store.length ? store.some(item => Number(item.id) === id) : false;
  if (existItem) {
    const updateStorage = store.filter(item => Number(item.id) !== id);
    setLocalStorage('favorite', updateStorage);
  } else {
    const favoriteMovie = await dataBase.getMovieById(id);
    console.log(favoriteMovie);
    if (favoriteMovie) {
      store.push(favoriteMovie);
      setLocalStorage('favorite', store);
      addToFavoriteMoviesList(store);
    }
  }
};