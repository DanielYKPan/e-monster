import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { LoadingCompleted, LoadingStart } from '../../search-store/actions';
import { MovieService } from '../service/movie.service';
import * as fromMovieRoot from '../reducers';
import * as searchMovieActions from '../actions/search';

@Injectable({
    providedIn: 'root'
})
export class SearchListExistGuard implements CanActivate {

    constructor( private store: Store<fromMovieRoot.State>,
                 private movieService: MovieService,
                 private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        const page = next.params['page'] || 1;
        const query = next.params['query'] || 'now_playing';
        return this.hasSearchResults(query, page);
    }

    private hasSearchResults( query: string, page: number ): Observable<boolean> {
        return this.hasSearchResultsInStore(query, page).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchResultsInApi(query, page);
            })
        );
    }

    private hasSearchResultsInStore( query: string, page: number ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromMovieRoot.getSearchQuery), take(1)),
            this.store.pipe(select(fromMovieRoot.getSearchPage), take(1)),
            this.store.pipe(select(fromMovieRoot.getSearchResults), take(1)),
        ).pipe(
            map(( result: any ) => result[0] === query && result[1] === page && !!result[2])
        );
    }

    private hasSearchResultsInApi( query: string, page: number ): Observable<boolean> {
        this.store.dispatch(new LoadingStart());

        const search = query === 'now_playing' ?
            this.movieService.searchList(query, page) :
            this.movieService.searchMovies(query, page);

        return search.pipe(
            map(res => new searchMovieActions.SearchComplete(res)),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new LoadingCompleted());
            }),
            map(res => !!res.payload.results),
            catchError(() => {
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
