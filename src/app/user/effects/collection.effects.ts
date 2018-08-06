/**
 * collection.effects
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { defer, Observable, of, EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray, withLatestFrom } from 'rxjs/operators';

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
import * as fromUser from '../reducers';
import * as authActions from '../actions/auth';

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
                        map(() => new AddMovieSuccess(movie)),
                        catchError(() => of(new AddMovieFail(movie)))
                    );
            } else {
                return of(new authActions.LoginRedirect());
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
                        map(() => new RemoveMovieSuccess(movie)),
                        catchError(() => of(new RemoveMovieFail(movie)))
                    );
            } else {
                return of(new authActions.LoginRedirect());
            }
        })
    );

    constructor( private actions$: Actions,
                 private store: Store<fromUser.State>,
                 private router: Router,
                 private db: Database ) {
    }
}
