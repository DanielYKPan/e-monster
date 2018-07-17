/**
 * search-results-exist.guard
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { MovieService } from '../service/movie.service';
import { select, Store } from '@ngrx/store';
import * as fromMoviesRoot from '../reducers';
import * as fromRoot from '../../reducers';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { LoadingStart, SearchListComplete } from '../../search-store/actions';

@Injectable()
export class MovieListExistGuard implements CanActivate {

    constructor( private store: Store<fromMoviesRoot.State>,
                 private movieService: MovieService,
                 private router: Router ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
        const query = route.params['query'];
        const page = route.params['page'] || 1;
        return this.hasSearchResults(query, page);
    }

    private hasSearchResults( query: string, page: number ): Observable<boolean> {
        if (!query) {
            query = 'now_playing';
        }
        return this.hasSearchResultsInStore(query, page).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchResultsInApi(query, page);
            })
        );
    }

    /**
     * Check whether the search result is already in the search store.
     * */
    private hasSearchResultsInStore( query: string, page: number ): Observable<boolean> {

        return forkJoin(
            this.store.pipe(select(fromRoot.getSearchType), take(1)),
            this.store.pipe(select(fromRoot.getSearchQuery), take(1)),
            this.store.pipe(select(fromRoot.getSearchPage), take(1)),
            this.store.pipe(select(fromRoot.getSearchResults), take(1))
        ).pipe(
            map(( result: any ) => result[0] === 'movie' && result[1] === query && result[2] === page && result[3] && result[3].length > 0)
        );
    }

    /**
     * Check whether there is search result in API.
     * */
    private hasSearchResultsInApi( query: string, page: number ): Observable<boolean> {

        this.store.dispatch(new LoadingStart());
        return this.movieService.searchList(query, page).pipe(
            map(res => new SearchListComplete(res)),
            tap(action => this.store.dispatch(action)),
            map(res => res.payload.results && res.payload.results.length > 0),
            catchError(() => {
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
