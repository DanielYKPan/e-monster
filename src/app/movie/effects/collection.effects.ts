/**
 * collection.effects
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { defer, EMPTY, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, toArray, withLatestFrom } from 'rxjs/operators';
import { OwlNotifierService } from 'owl-ng';

import {
    AddMovie,
    AddMovieFail,
    AddMovieSuccess,
    CollectionActionTypes,
    LoadFail,
    LoadSuccess,
    RemoveMovie,
    RemoveMovieFail,
    RemoveMovieSuccess
} from '../actions/collection';
import { IMovie } from '../../model';
import * as fromUser from '../../user/reducers';
import * as authActions from '../../user/actions/auth';

@Injectable()
export class CollectionEffects {

    @Effect({dispatch: false})
    openDB$: Observable<any> = defer(() => {
        return this.db.open('book_movie');
    });

    @Effect()
    loadMovieCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.Load),
        withLatestFrom(this.store.pipe(select(fromUser.getLoggedIn))),
        switchMap(( [action, isLoggedIn]: [Action, boolean] ) => {
            if (isLoggedIn) {
                return this.db
                    .query('movies')
                    .pipe(
                        toArray(),
                        map(( movies: IMovie[] ) => new LoadSuccess(movies)),
                        catchError(error => of(new LoadFail(error)))
                    );
            } else {
                return EMPTY;
            }
        })
    );

    @Effect()
    addMovieToCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.AddMovie),
        map(( action: AddMovie ) => action.payload),
        withLatestFrom(this.store.pipe(select(fromUser.getLoggedIn))),
        mergeMap(( [movie, isLoggedIn]: [IMovie, boolean] ) => {
            // check loggedIn status before add the movie to database
            if (isLoggedIn) {
                return this.db
                    .insert('movies', [movie])
                    .pipe(
                        tap(() => this.notifier.open('Movie added into your collection successfully')),
                        map(() => new AddMovieSuccess(movie)),
                        catchError(() => of(new AddMovieFail(movie)))
                    );
            } else {
                return of(new authActions.LoginRedirect(this.router.url));
            }
        })
    );

    @Effect()
    removeMovieFromCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.RemoveMovie),
        map(( action: RemoveMovie ) => action.payload),
        withLatestFrom(this.store.pipe(select(fromUser.getLoggedIn))),
        mergeMap(( [movie, isLoggedIn]: [IMovie, boolean] ) => {
            // check loggedIn status before remove the movie from database
            if (isLoggedIn) {
                return this.db
                    .executeWrite('movies', 'delete', [movie.id])
                    .pipe(
                        tap(() => this.notifier.open('Movie removed from your collection successfully')),
                        map(() => new RemoveMovieSuccess(movie)),
                        catchError(() => of(new RemoveMovieFail(movie)))
                    );
            } else {
                return of(new authActions.LoginRedirect(this.router.url));
            }
        })
    );

    constructor( private actions$: Actions,
                 private store: Store<fromUser.State>,
                 private router: Router,
                 private notifier: OwlNotifierService,
                 private db: Database ) {
    }
}
