/**
 * search-results-exist.guard
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { MovieService } from '../service/movie.service';
import { select, Store } from '@ngrx/store';
import * as fromMoviesRoot from '../reducers';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SearchListComplete, LoadingStart } from '../actions/movie';

@Injectable()
export class SearchResultsExistGuard implements CanActivate {

    constructor( private store: Store<fromMoviesRoot.State>,
                 private movieService: MovieService ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
        const type = route.params['type'];
        return this.hasSearchResults(type);
    }

    private hasSearchResults( type: string ): Observable<boolean> {
        if (!type) {
            type = 'now_playing';
        }
        return this.hasSearchResultsInStore(type).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchResultsInApi(type);
            })
        );
    }

    private hasSearchResultsInStore( type: string ): Observable<boolean> {

        return forkJoin(
            this.store.pipe(select(fromMoviesRoot.getSearchType), take(1)),
            this.store.pipe(select(fromMoviesRoot.getSearchStat), take(1)),
            this.store.pipe(select(fromMoviesRoot.getSearchResults), take(1))
        ).pipe(
            map(( result: any ) => type === result[0] && result[1].page === 1 && result[2] && result[2].length > 0)
        );
    }

    private hasSearchResultsInApi( type: string ): Observable<boolean> {

        this.store.dispatch(new LoadingStart());
        return this.movieService.searchList(type).pipe(
            map(res => new SearchListComplete(res)),
            tap(action => this.store.dispatch(action)),
            map(res => res.payload.results && res.payload.results.length > 0),
            catchError(() => {
                return of(false); // TODO: navigate to 404 page
            })
        );
    }
}
