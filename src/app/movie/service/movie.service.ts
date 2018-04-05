/**
 * movie.service
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { IMovie } from '../movie.model';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class MovieService {

    private readonly apikey = '0ea0b3ae1ad79cc9e6354410580840c3';

    constructor( private http: HttpClient ) {
    }

    public searchList( type: string ): Observable<IMovie[]> {
        const url = `https://api.themoviedb.org/3/movie/${type}`;

        return this.getResult(url);
    }

    private getResult<T>( url: string, queries?: Array<{ name: string, value: string }> ): Observable<T> {
        let params = new HttpParams();
        params = params.set('api_key', this.apikey);

        if (queries) {
            for (const query of queries) {
                params = params.append(query.name, query.value);
            }
        }

        return this.http.get(url, {params: params})
            .pipe(
                map(( res: any ) => res.results),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
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
