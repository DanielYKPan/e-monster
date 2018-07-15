/**
 * tv.service
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TMDBService } from '../../tmdb';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { IAudio, ISeason, ITv, IVideos } from '../../model';

@Injectable()
export class TvService extends TMDBService {

    constructor( public http: HttpClient ) {
        super(http);
    }

    public getTvList( query: string, page: number = 1 ): Observable<IAudio[]> {

        if (query === 'anticipated') {
            return this.getAnticipatedTvList(page);
        }

        const url = this.base_url + `tv/${query}`;

        return this.getResult(url, [{name: 'page', value: page.toString()}], true).pipe(
            map(( res: any ) => {
                return {...res, query: query, type: 'tv'};
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

    public discoverTvList( query: string, queries: Array<{ name: string, value: string }> ): Observable<IAudio[]> {
        const url = this.base_url + 'discover/tv';

        return this.getResult(url, queries, true).pipe(
            map(( res: any ) => {
                return {...res, query: query, type: 'tv'};
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

    /**
     * Search for tv shows
     * @param {string} query -- a text query to search
     * @param {number} page -- specify which page to query
     * @return {Observable<IAudio[]>}
     * */
    public searchTvs( query: string, page: number ): Observable<IAudio[]> {
        const url = this.base_url + 'search/tv';

        const queries = [
            {name: 'page', value: page.toString()},
            {name: 'query', value: query},
        ];

        return this.getResult(url, queries, true).pipe(
            map(( res: any ) => {
                return {...res, query: query, type: 'tv'};
            }),
            catchError(this.handleError)
        );
    }
}
