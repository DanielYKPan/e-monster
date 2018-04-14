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
import * as movieVideoActions from '../actions/video';
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
            tap(() => this.store.dispatch(new movieVideoActions.Search(id))),
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

        this.store.dispatch(new movieActions.LoadingStart());
        return this.movieService.getMovie(id).pipe(
            map(res => {
                const movie = res[0];
                movie.casts = res[1].cast;
                movie.crews = res[1].crew;
                movie.reviews = res[2];
                movie.external = res[3];
                movie.similar = res[4].results;
                return new movieActions.Load(movie);
            }),
            tap(( action: movieActions.Load ) => {
                this.store.dispatch(action);
                this.store.dispatch(new movieActions.LoadingCompleted());
            }),
            map(movie => !!movie),
            catchError(() => {
                // TODO: navigate to 404
                return of(false);
            })
        );
    }
}
