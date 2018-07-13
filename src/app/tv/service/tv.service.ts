/**
 * tv.service
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { TMDBService } from '../../tmdb';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map } from 'rxjs/operators';
import { IAudio, ISeason, ITv, IVideos } from '../../model';

@Injectable()
export class TvService extends TMDBService {

    constructor( private http: HttpClient ) {
        super();
    }

    public getTvList( name: string, page: number = 1 ): Observable<IAudio[]> {

        if (name === 'anticipated') {
            return this.getAnticipatedTvList(page);
        }

        const url = this.base_url + `tv/${name}`;

        return this.getResult(url, [{name: 'page', value: page.toString()}], true).pipe(
            map(( res: any ) => {
                return {...res, name: name, type: 'tv'};
            }),
            catchError(this.handleError)
        );
    }

    public getAnticipatedTvList( page: number ): Observable<IAudio[]> {
        const start = new Date();
        const end = new Date(start.getFullYear() + 2, start.getMonth(), start.getDate());
        const air_date_gte = start.toISOString().slice(0, 10);
        const air_date_lte = end.toISOString().slice(0, 10);

        const queries = [
            {name: 'language', value: 'en-US'},
            {name: 'sort_by', value: 'popularity.desc'},
            {name: 'page', value: page.toString()},
            {name: 'air_date.gte', value: air_date_gte},
            {name: 'air_date.lte', value: air_date_lte},
            {name: 'include_null_first_air_dates', value: 'true'},
        ];

        return this.discoverTvList('anticipated', queries);
    }

    public discoverTvList( name: string, queries: Array<{ name: string, value: string }> ): Observable<IAudio[]> {
        const url = this.base_url + 'discover/tv';

        return this.getResult(url, queries, true).pipe(
            map(( res: any ) => {
                return {...res, name: name, type: 'tv'};
            }),
            catchError(this.handleError)
        );
    }

    public getTv( id: number ): Observable<ITv> {
        const details_url = this.base_url + `tv/${id}`;

        const queries = [
            {name: 'append_to_response', value: 'credits,reviews,external_ids,similar,videos'},
        ];

        return this.getResult(details_url, queries).pipe(
            catchError(this.handleError)
        );
    }

    public getTvSeason( id: number, season_number: number ): Observable<ISeason> {
        const url = this.base_url + `tv/${id}/season/${season_number}`;

        const queries = [
            {name: 'append_to_response', value: 'credits,external_ids,videos'},
        ];

        return this.getResult(url, queries).pipe(
            catchError(this.handleError)
        );
    }

    public getTvVideos( id: number ): Observable<IVideos> {
        const url = this.base_url + `tv/${id}/videos`;

        return this.getResult(url).pipe(
            catchError(this.handleError)
        );
    }

    public getTvSeasonVideos( tv_id: number, season_number: number ): Observable<IVideos> {
        const url = this.base_url + `tv/${tv_id}/season/${season_number}/videos`;

        return this.getResult(url).pipe(
            catchError(this.handleError)
        );
    }

    private getResult( url: string, queries?: Array<{ name: string, value: string }>, setRegion?: boolean ): Observable<any> {
        let params = new HttpParams();

        if (queries) {
            for (const query of queries) {
                params = params.set(query.name, query.value);
            }
        }

        if (setRegion) {
            params = params.set('region', this.region);
        }

        params = params.set('api_key', this.apikey);

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
