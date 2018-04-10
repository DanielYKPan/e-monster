/**
 * movie-list-exist.guard
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { select, Store } from '@ngrx/store';
import * as fromMoviesRoot from '../reducers';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { MovieService } from '../service/movie.service';
import { SearchListComplete } from '../actions/movie';

@Injectable()
export class MovieListExistGuard implements CanActivate {

    constructor( private store: Store<fromMoviesRoot.State>,
                 private movieService: MovieService ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
        const type = route.params['type'];
        return this.hasMovieList(type);
    }

    private hasMovieList( type: string ): Observable<boolean> {
        return this.hasMovieListInStore(type).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasMovieListInApi(type);
            })
        );
    }

    private hasMovieListInStore( type: string ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromMoviesRoot.getSearchType), take(1)),
            this.store.pipe(select(fromMoviesRoot.getSearchStat), take(1)),
            this.store.pipe(select(fromMoviesRoot.getSearchIds), take(1))
        ).pipe(
            map(( result: any ) => type === result[0] && result[1].page === 1 && result[2] && result[2].length > 0)
        );
    }

    private hasMovieListInApi( type: string ): Observable<boolean> {

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

