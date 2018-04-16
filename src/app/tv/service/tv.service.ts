/**
 * tv.service
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { TMDBService } from '../../tmdb';
import { Observable } from 'rxjs/Observable';
import { IAudio } from '../../model/audio';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TvService extends TMDBService {

    constructor( private http: HttpClient ) {
        super();
    }

    public getTvList( query: string, page: number = 1 ): Observable<IAudio[]> {
        const url = this.base_url + `tv/${query}`;

        return this.getResult(url, [{name: 'page', value: page.toString()}]).pipe(
            map(( res: any ) => {
                return {...res, query: query, type: 'movie'};
            }),
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
