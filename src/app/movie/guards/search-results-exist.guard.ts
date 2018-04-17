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
import * as fromRoot from '../../reducers';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { LoadingStart, SearchListComplete } from '../../search/actions';

@Injectable()
export class SearchResultsExistGuard implements CanActivate {

    constructor( private store: Store<fromMoviesRoot.State>,
                 private movieService: MovieService ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
        const query = route.params['query'];
        return this.hasSearchResults(query);
    }

    private hasSearchResults( query: string ): Observable<boolean> {
        if (!query) {
            query = 'now_playing';
        }
        return this.hasSearchResultsInStore(query).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchResultsInApi(query);
            })
        );
    }

    private hasSearchResultsInStore( query: string ): Observable<boolean> {

        return forkJoin(
            this.store.pipe(select(fromRoot.getSearchType), take(1)),
            this.store.pipe(select(fromRoot.getSearchQuery), take(1)),
            this.store.pipe(select(fromRoot.getSearchPage), take(1)),
            this.store.pipe(select(fromRoot.getSearchResults), take(1))
        ).pipe(
            map(( result: any ) => result[0] === 'movie' && result[1] === query && result[2] === 1 && result[3] && result[3].length > 0)
        );
    }

    private hasSearchResultsInApi( query: string ): Observable<boolean> {

        this.store.dispatch(new LoadingStart());
        return this.movieService.searchList(query).pipe(
            map(res => new SearchListComplete(res)),
            tap(action => this.store.dispatch(action)),
            map(res => res.payload.results && res.payload.results.length > 0),
            catchError(() => {
                return of(false); // TODO: navigate to 404 page
            })
        );
    }
}
