/* eslint-disable @typescript-eslint/no-explicit-any */
import IMovieData from './interfaces';

const API_KEY = '092b04fe0e27230f7673c46df5986fdd';
const API_URL = 'https://api.themoviedb.org/3';

class ApiHelper {
    sendHttpRequest(url: string): Promise<IMovieData> {
        return fetch(url)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return response.json().then((errData) => {
                        console.log(errData);
                        throw new Error('Something went wrong - server-side!');
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Something went wrong!');
            });
    }

    // async getAllMovies(page = 1): Promise<IMovieData> {
    //     try{
    //       const response = await this.sendHttpRequest(`${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=popularity.desc&include_adult=false&include_video=false`);
    //       return response;
    //     } catch (error: any) {
    //       alert(error.message);
    //       console.log(error.response);
    //     }
    // }

    async getSearchMovies(query: string, page = 1): Promise<IMovieData> {
        try {
            const response = await this.sendHttpRequest(
                `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`
            );
            return response;
        } catch (error: any) {
            alert(error.message);
            console.log(error.response);
        }
    }

    async getPopularMovies(page = 1): Promise<IMovieData> {
        try {
            const response = await this.sendHttpRequest(
                `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=&page=${page}&include_adult=false&sort_by=popularity.desc`
            );
            return response;
        } catch (error: any) {
            alert(error.message);
            console.log(error.response);
        }
    }

    async getTopRateMovies(page = 1): Promise<IMovieData> {
        try {
            const response = await this.sendHttpRequest(
                `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=&page=${page}&include_adult=false`
            );
            return response;
        } catch (error: any) {
            alert(error.message);
            console.log(error.response);
        }
    }

    async getUpcomingMovies(page = 1): Promise<IMovieData> {
        try {
            const response = await this.sendHttpRequest(
                `${API_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=&page=${page}&include_adult=false`
            );
            return response;
        } catch (error: any) {
            alert(error.message);
            console.log(error.response);
        }
    }

    async getMovieById(id: number): Promise<IMovieData> {
        try {
            const response = await this.sendHttpRequest(
                `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
            );
            return response;
        } catch (error: any) {
            alert(error.message);
            console.log(error.response);
        }
    }
}

const dataBase = new ApiHelper();

export default dataBase;
