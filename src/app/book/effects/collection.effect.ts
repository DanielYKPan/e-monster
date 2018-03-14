/**
 * collection.effect
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Database } from '@ngrx/db';
import { Action } from '@ngrx/store';
import {
    AddBook, AddBookFail, AddBookSuccess, CollectionActionTypes, LoadFail, LoadSuccess, RemoveBook, RemoveBookFail,
    RemoveBookSuccess
} from '../actions/collection';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Book } from '../book.model';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

@Injectable()
export class CollectionEffect {

    @Effect({dispatch: false})
    public openDB$: Observable<any> = defer(() => {
        this.db.open('books_db');
    });

    @Effect()
    public loadCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.Load),
        switchMap(() => {
            return this.db.query('books').pipe(
                toArray(),
                map(( books: Book[] ) => new LoadSuccess(books)),
                catchError(( err ) => of(new LoadFail(err)))
            );
        })
    );

    @Effect()
    public addBookToCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.AddBook),
        map(( action: AddBook ) => action.payload),
        mergeMap(( book: Book ) => {
            return this.db.insert('books', [book])
                .pipe(
                    map(() => new AddBookSuccess(book)),
                    catchError(() => of(new AddBookFail(book)))
                );
        })
    );

    @Effect()
    public removeBookFromCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.RemoveBook),
        map(( action: RemoveBook ) => action.payload),
        mergeMap(( book: Book ) => {
            return this.db.executeWrite('books', 'delete', [book.id])
                .pipe(
                    map(() => new RemoveBookSuccess(book)),
                    catchError(() => of(new RemoveBookFail(book)))
                );
        })
    );

    constructor( private db: Database, private actions$: Actions ) {
    }
}
