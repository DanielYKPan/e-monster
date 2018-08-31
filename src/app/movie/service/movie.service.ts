/**
 * movie.service
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { IAudio, IGenre, IMovie, IReviews, IVideos } from '../../model';
import { TMDBService } from '../../tmdb';
import { MovieModule } from '../movie.module';

@Injectable({
    providedIn: MovieModule,
})
export class MovieService extends TMDBService {

    constructor( public http: HttpClient ) {
        super(http);
    }

    /**
     * Search Movie List
     * @param{string} query -- list query valid value: 'now_playing', 'popular', 'upcoming', 'anticipated' and 'top_rated'
     * @param{number} page -- page number
     * @return {Observable<IAudio[]>}
     * */
    public searchList( query: string, page: number = 1 ): Observable<IAudio[]> {

        if (query === 'anticipated') {
            return this.getAnticipatedMovieList(page);
        }

        const url = this.base_url + `movie/${query}`;

        return this.getResult(url, [{name: 'page', value: page.toString()}], true).pipe(
            map(( res: any ) => {
                return {...res, query: query, type: 'movie'};
            }),
            catchError(this.handleError)
        );
    }

    /**
     * Search Anticipated Movies
     * Anticipated movies include those are released between now and two years later.
     * @param{number} page
     * @return {Observable<IAudio[]>}
     * */
    public getAnticipatedMovieList( page: number ): Observable<IAudio[]> {
        const start = new Date();
        const end = new Date(start.getFullYear() + 2, start.getMonth(), start.getDate());
        const release_date_gte = start.toISOString().slice(0, 10);
        const release_date_lte = end.toISOString().slice(0, 10);

        const queries = [
            {name: 'language', value: 'en-US'},
            {name: 'sort_by', value: 'popularity.desc'},
            {name: 'include_adult', value: 'false'},
            {name: 'include_video', value: 'false'},
            {name: 'page', value: page.toString()},
            {name: 'release_date.gte', value: release_date_gte},
            {name: 'release_date.lte', value: release_date_lte},
            {name: 'with_release_type', value: '2|3'},
        ];

        return this.discoverMovieList('anticipated', queries);
    }

    /**
     * Discover movies by different types of data like average rating, number of votes, genres and certifications.
     * @param {string} query -- list query
     * @param {Array<any>} queries -- query type
     * @return {Observable<IAudio[]>}
     * */
    public discoverMovieList( query: string, queries: Array<{ name: string, value: string }> ): Observable<IAudio[]> {
        const url = this.base_url + 'discover/movie';

        return this.getResult(url, queries, true).pipe(
            map(( res: any ) => {
                return {...res, query: query, type: 'movie'};
            }),
            catchError(this.handleError)
        );
    }

    public getMovieGenreList(): Observable<IGenre[]> {
        const url = 'https://api.themoviedb.org/3/genre/movie/list';

        return this.getResult(url).pipe(
            map(( res: any ) => res.genres),
            catchError(this.handleError)
        );
    }

    /**
     * Get videos of a specific movie
     * @param {number} id -- movie id
     * @return {Observable<IVideos>}
     * */
    public getMovieVideos( id: number ): Observable<IVideos> {

        const url = this.base_url + `movie/${id}/videos`;

        return this.getResult(url).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Get reviews of a specific movie
     * @param {number} id -- movie id
     * @param {number} page -- page number, default 1
     * @return {Observable<IReviews[]>}
     * */
    public getMovieReviews( id: number, page: number = 1 ): Observable<IReviews[]> {
        const url = this.base_url + `movie/${id}/reviews`;
        return this.getResult(url, [{name: 'page', value: page.toString()}]).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Get the details of a specific movie
     * @param {number} id -- movie id
     * @return {Observable<IMovie>}
     * */
    public getMovie( id: number ): Observable<IMovie> {

        const details_url = this.base_url + `movie/${id}`;
        const queries = [
            {name: 'append_to_response', value: 'credits,reviews,external_ids,similar'},
        ];

        return this.getResult(details_url, queries).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Search for movies
     * @param {string} query -- a text query to search
     * @param {number} page -- specify which page to query
     * @return {Observable<IAudio[]>}
     * */
    public searchMovies( query: string, page: number ): Observable<IAudio[]> {
        const url = this.base_url + 'search/movie';

        const queries = [
            {name: 'page', value: page.toString()},
            {name: 'query', value: query},
        ];

        return this.getResult(url, queries, true).pipe(
            map(( res: any ) => {
                return {...res, query: query, type: 'movie'};
            }),
            catchError(this.handleError)
        );
    }
}
