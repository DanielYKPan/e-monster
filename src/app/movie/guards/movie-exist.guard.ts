/**
 * movie-exist.guard
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { MovieService } from '../service/movie.service';
import * as fromMovieRoot from '../reducers';
import * as movieActions from '../actions/movie';
import * as videoActions from '../actions/video';
import * as layoutActions from '../../core/layout-store/actions';

@Injectable()
export class MovieExistGuard implements CanActivate {

    constructor( private store: Store<fromMovieRoot.State>,
                 private movieService: MovieService,
                 private router: Router ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
        return this.hasMovie(+route.params['id']);
    }

    private hasMovie( id: number ): Observable<boolean> {
        return this.hasMovieInStore(id).pipe(
            tap(() => {
                this.store.dispatch(new videoActions.SearchVideos(id));
            }),
            switchMap(inStore => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasMovieInApi(id);
            })
        );
    }

    /**
     * Check whether the movie is in movie store
     * */
    private hasMovieInStore( id: number ): Observable<boolean> {
        return this.store.pipe(
            select(fromMovieRoot.getMovieEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    /**
     * Check whether the movie is in API
     * */
    private hasMovieInApi( id: number ): Observable<boolean> {

        this.store.dispatch(new layoutActions.ShowLoader());
        return this.movieService.getMovie(id).pipe(
            map(movieEntity => {
                if (movieEntity.id !== id) {
                    throwError('Entity not exists');
                } else  {
                    return new movieActions.Load(movieEntity);
                }
            }),
            tap(( action: movieActions.Load ) => {
                this.store.dispatch(action);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(movie => !!movie),
            catchError(() => {
                this.store.dispatch(new layoutActions.HideLoader());
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
