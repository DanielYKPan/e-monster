/**
 * movie.service
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { IMovie, IMovieGenre, IMovieVideos } from '../movie.model';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class MovieService {

    private readonly apikey = '0ea0b3ae1ad79cc9e6354410580840c3';

    private readonly region = 'US';

    constructor( private http: HttpClient ) {
    }

    public searchList( query: string, page: number = 1 ): Observable<IMovie[]> {
        const url = `https://api.themoviedb.org/3/movie/${query}`;

        return this.getResult(url, [{name: 'page', value: page.toString()}]).pipe(
            map(( res: any ) => {
                return {...res, query};
            }),
            catchError(this.handleError)
        );
    }

    public getMovieGenreList(): Observable<IMovieGenre[]> {
        const url = 'https://api.themoviedb.org/3/genre/movie/list';

        return this.getResult(url).pipe(
            map(( res: any ) => res.genres),
            catchError(this.handleError)
        );
    }

    public getMovieVideos( id: number ): Observable<IMovieVideos> {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
        return this.getResult(url).pipe(
            catchError(this.handleError)
        );
    }

    private getResult( url: string, queries?: Array<{ name: string, value: string }> ): Observable<any> {
        let params = new HttpParams();

        if (queries) {
            for (const query of queries) {
                params = params.set(query.name, query.value);
            }
        }

        params = params.set('api_key', this.apikey);
        params = params.set('region', this.region);

        return this.http.get(url, {params: params});
    }

    private handleError( error: HttpErrorResponse ) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error.status_message}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(error.error.status_message);
    }
}
