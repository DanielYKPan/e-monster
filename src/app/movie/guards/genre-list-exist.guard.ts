/**
 * genre-list-exist.guard
 */
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import * as fromMoviesRoot from '../reducers';
import * as MovieActions from '../actions/movie';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { MovieService } from '../service/movie.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class GenreListExistGuard implements CanActivate {

    constructor( private store: Store<fromMoviesRoot.State>,
                 private movieService: MovieService ) {
    }

    public canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        return this.hasGenreList();
    }

    private hasGenreList(): Observable<boolean> {
        return this.hasGenreListInStore().pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.getGenreListFromApi();
            })
        );
    }

    /**
     * Check whether movie genre list in store
     * */
    private hasGenreListInStore(): Observable<boolean> {
        return this.store.pipe(
            select(fromMoviesRoot.getMovieGenreList),
            map(list => list && list.length > 0),
            take(1)
        );
    }

    /**
     * Get movie genre list from API
     * */
    private getGenreListFromApi(): Observable<boolean> {
        return this.movieService.getMovieGenreList().pipe(
            map(list => new MovieActions.GetGenreListComplete(list)),
            tap(( action: MovieActions.GetGenreListComplete ) => this.store.dispatch(action)),
            map(action =>  action.payload && action.payload.length > 0),
            catchError(() => {
                return of(false);
            })
        );
    }
}
