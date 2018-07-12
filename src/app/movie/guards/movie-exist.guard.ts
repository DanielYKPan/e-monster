/**
 * movie-exist.guard
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MovieService } from '../service/movie.service';
import { select, Store } from '@ngrx/store';
import * as fromMoviesRoot from '../reducers';
import * as movieActions from '../actions/movie';
import * as videoActions from '../actions/video';
import * as searchActions from '../../search/actions';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MovieExistGuard implements CanActivate {

    constructor( private store: Store<fromMoviesRoot.State>,
                 private movieService: MovieService ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
        return this.hasMovie(route.params['id']);
    }

    private hasMovie( id: number ): Observable<boolean> {
        return this.hasMovieInStore(id).pipe(
            tap(() => {
                this.store.dispatch(new videoActions.SearchVideos(id));
                this.store.dispatch(new searchActions.SetSearchType('movie'));
            }),
            switchMap(inStore => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasMovieInApi(id);
            })
        );
    }

    private hasMovieInStore( id: number ): Observable<boolean> {
        return this.store.pipe(
            select(fromMoviesRoot.getMovieEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    private hasMovieInApi( id: number ): Observable<boolean> {

        this.store.dispatch(new searchActions.LoadingStart());
        return this.movieService.getMovie(id).pipe(
            map(res => new movieActions.Load(res)),
            tap(( action: movieActions.Load ) => {
                this.store.dispatch(action);
                this.store.dispatch(new searchActions.LoadingCompleted());
            }),
            map(movie => !!movie),
            catchError(() => {
                // TODO: navigate to 404
                return of(false);
            })
        );
    }
}
