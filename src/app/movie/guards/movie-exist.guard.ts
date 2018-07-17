/**
 * movie-exist.guard
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MovieService } from '../service/movie.service';
import { select, Store } from '@ngrx/store';
import * as fromMoviesRoot from '../reducers';
import * as movieActions from '../actions/movie';
import * as videoActions from '../actions/video';
import * as searchActions from '../../search-store/actions';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MovieExistGuard implements CanActivate {

    constructor( private store: Store<fromMoviesRoot.State>,
                 private movieService: MovieService,
                 private router: Router ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
        return this.hasMovie(route.params['id']);
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
            select(fromMoviesRoot.getMovieEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    /**
     * Check whether the movie is in API
     * */
    private hasMovieInApi( id: number ): Observable<boolean> {

        this.store.dispatch(new searchActions.LoadingStart());
        return this.movieService.getMovie(id).pipe(
            map(res => new movieActions.Load(res)),
            tap(( action: movieActions.Load ) => {
                this.store.dispatch(action);
                this.store.dispatch(new searchActions.LoadingCompleted());
                this.store.dispatch(new searchActions.SetSearchType('movie'));
            }),
            map(movie => !!movie),
            catchError(() => {
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
