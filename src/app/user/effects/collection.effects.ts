/**
 * collection.effects
 */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';

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
import { Database } from '@ngrx/db';

@Injectable()
export class CollectionEffects {

    @Effect({dispatch: false})
    openDB$: Observable<any> = defer(() => {
        return this.db.open('book_movie');
    });

    @Effect()
    loadCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.Load),
        switchMap(() =>
            this.db
                .query('movies')
                .pipe(
                    toArray(),
                    map(( movies: IMovie[] ) => new LoadSuccess(movies)),
                    catchError(error => of(new LoadFail(error)))
                )
        )
    );

    @Effect()
    addMovieToCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.AddMovie),
        map(( action: AddMovie ) => action.payload),
        mergeMap(movie =>
            this.db
                .insert('movies', [movie])
                .pipe(
                    map(() => new AddMovieSuccess(movie)),
                    catchError(() => of(new AddMovieFail(movie)))
                )
        )
    );

    @Effect()
    removeMovieFromCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.RemoveMovie),
        map(( action: RemoveMovie ) => action.payload),
        mergeMap(movie =>
            this.db
                .executeWrite('movies', 'delete', [movie.id])
                .pipe(
                    map(() => new RemoveMovieSuccess(movie)),
                    catchError(() => of(new RemoveMovieFail(movie)))
                )
        )
    );

    constructor( private actions$: Actions,
                 private db: Database ) {
    }
}
