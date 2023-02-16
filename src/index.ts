import IMovieData from './ts/interfaces';
import dataBase from './ts/apiHelper';
import { renderMoviesList } from './ts/movieList';
import { addToFavoriteMoviesList } from './ts/favoriteMoviesList';
import { store } from './ts/localStorage';
import { createFavoriteMoviesList } from './ts/favoriteMoviesList';
import { generateRandomMovie } from './ts/randomMovie';

const filmContainer = document.getElementById('film-container');
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('submit');
const popularBox = document.getElementById('popular');
const upcomingBox = document.getElementById('upcoming');
const topRatedBox = document.getElementById('top_rated');
const loadMoreButton = document.getElementById('load-more');

export async function render(): Promise<void> {
    const moviesList: IMovieData[] = await dataBase
        .getPopularMovies()
        .then((response) => response.results);
    const randomNumber = Math.floor(Math.random() * 20);

    generateRandomMovie(moviesList[randomNumber]);
    addToFavoriteMoviesList(store);

    renderMoviesList(filmContainer as HTMLElement, moviesList);

    enum FilterCategory {
        popular,
        upcoming,
        top_rated,
    }

    let page = 1;
    let filter = FilterCategory.popular;

    function loadMoreMovies(filter: FilterCategory): void {
        switch (filter) {
            case FilterCategory.popular:
                page += 1;
                dataBase
                    .getPopularMovies(page)
                    .then((response) =>
                        renderMoviesList(
                            filmContainer as HTMLElement,
                            response.results,
                            page
                        )
                    );
                break;
            case FilterCategory.upcoming:
                page += 1;
                dataBase
                    .getUpcomingMovies(page)
                    .then((response) =>
                        renderMoviesList(
                            filmContainer as HTMLElement,
                            response.results,
                            page
                        )
                    );
                break;
            case FilterCategory.top_rated:
                page += 1;
                dataBase
                    .getTopRateMovies(page)
                    .then((response) =>
                        renderMoviesList(
                            filmContainer as HTMLElement,
                            response.results,
                            page
                        )
                    );
                break;
            default:
                page = 1;
                filter = FilterCategory.popular;
        }
    }

    searchButton?.addEventListener('click', () => {
        const searchText: string = searchInput
            ? (searchInput as HTMLInputElement).value
            : '';
        if (searchText.trim()) {
            dataBase
                .getSearchMovies(searchText, page)
                .then((response) =>
                    renderMoviesList(
                        filmContainer as HTMLElement,
                        response.results
                    )
                );
        }
        (searchInput as HTMLInputElement).value = '';
    });

    popularBox?.addEventListener('click', () => {
        filter = FilterCategory[popularBox.id];
        page = 1;
        dataBase
            .getPopularMovies(page)
            .then((response) =>
                renderMoviesList(filmContainer as HTMLElement, response.results)
            );
    });

    upcomingBox?.addEventListener('click', () => {
        filter = FilterCategory[upcomingBox.id];
        page = 1;
        dataBase
            .getUpcomingMovies(page)
            .then((response) =>
                renderMoviesList(filmContainer as HTMLElement, response.results)
            );
    });

    topRatedBox?.addEventListener('click', () => {
        filter = FilterCategory[topRatedBox.id];
        page = 1;
        dataBase
            .getTopRateMovies(page)
            .then((response) =>
                renderMoviesList(filmContainer as HTMLElement, response.results)
            );
    });

    document.addEventListener('click', (event) => {
        const target = event.target as Element;

        if (target && target.closest('.bi')) {
            const parent = target.closest('.card');
            const svg = target.closest('svg');
            const id = parent?.getAttribute('movie-id');

            if (svg?.getAttribute('fill') === '#ff000078') {
                svg.setAttribute('fill', 'red');
                createFavoriteMoviesList(+id);
            } else {
                svg?.setAttribute('fill', '#ff000078');
            }
        }
    });

    loadMoreButton?.addEventListener('click', () => loadMoreMovies(filter));
}
