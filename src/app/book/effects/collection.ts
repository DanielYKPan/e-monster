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
    AddBook,
    AddBookFail,
    AddBookSuccess,
    CollectionActionTypes,
    LoadFail,
    LoadSuccess,
    RemoveBook,
    RemoveBookFail,
    RemoveBookSuccess
} from '../actions/collection';
import { IBook } from '../../model';
import * as fromUser from '../../user/reducers';
import * as authActions from '../../user/actions/auth';

@Injectable()
export class CollectionEffects {

    @Effect({dispatch: false})
    openDB$: Observable<any> = defer(() => {
        return this.db.open('book_movie');
    });

    @Effect()
    loadBookCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.Load),
        withLatestFrom(this.store.pipe(select(fromUser.getLoggedIn))),
        switchMap(( [action, isLoggedIn]: [Action, boolean] ) => {
            if (isLoggedIn) {
                return this.db
                    .query('books')
                    .pipe(
                        toArray(),
                        map(( books: IBook[] ) => new LoadSuccess(books)),
                        catchError(error => of(new LoadFail(error)))
                    );
            } else {
                return EMPTY;
            }
        })
    );

    @Effect()
    addBookToCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.AddBook),
        map(( action: AddBook ) => action.payload),
        withLatestFrom(this.store.pipe(select(fromUser.getLoggedIn))),
        mergeMap(( [book, isLoggedIn]: [IBook, boolean] ) => {
            // check loggedIn status before add the book to database
            if (isLoggedIn) {
                return this.db
                    .insert('books', [book])
                    .pipe(
                        tap(() => this.notifier.open('Book added into your collection successfully')),
                        map(() => new AddBookSuccess(book)),
                        catchError(() => of(new AddBookFail(book)))
                    );
            } else {
                return of(new authActions.LoginRedirect(this.router.url));
            }
        })
    );

    @Effect()
    removeBookFromCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.RemoveBook),
        map(( action: RemoveBook ) => action.payload),
        withLatestFrom(this.store.pipe(select(fromUser.getLoggedIn))),
        mergeMap(( [book, isLoggedIn]: [IBook, boolean] ) => {
            // check loggedIn status before remove the book from database
            if (isLoggedIn) {
                return this.db
                    .executeWrite('books', 'delete', [book.id])
                    .pipe(
                        tap(() => this.notifier.open('Book removed from your collection successfully')),
                        map(() => new RemoveBookSuccess(book)),
                        catchError(() => of(new RemoveBookFail(book)))
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
