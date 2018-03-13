/**
 * book.effect
 */

import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GoogleBookService } from './book.service';
import { catchError, debounceTime, map, skip, switchMap, takeUntil} from 'rxjs/operators';
import { empty } from 'rxjs/observable/empty';
import { BookActionTypes, Search, SearchComplete, SearchError } from './actions';
import { of } from 'rxjs/observable/of';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');

@Injectable()
export class BookEffect {

    @Effect()
    public search$ = this.actions$.pipe(
        ofType(BookActionTypes.Search),
        debounceTime(this.debounce || 300),
        map(( action: Search ) => action.payload),
        switchMap(( query: string ) => {
            if (query === '') {
                return empty();
            }

            const nextSearch$ = this.actions$.pipe(
                ofType(BookActionTypes.Search),
                skip(1)
            );

            return this.bookService.searchBooks(query).pipe(
                takeUntil(nextSearch$),
                map(results => new SearchComplete(results)),
                catchError(err => of(new SearchError(err)))
            );
        }),
    );

    constructor( private actions$: Actions,
                 @Optional() @Inject(SEARCH_DEBOUNCE) private debounce: number,
                 private bookService: GoogleBookService ) {
    }
}
