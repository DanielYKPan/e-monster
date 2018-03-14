/**
 * book-exist.guard
 */


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import * as fromBooks from '../reducers';
import * as BookActions from '../actions';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { GoogleBookService } from '../book.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class BookExistGuard implements CanActivate {
    constructor( private store: Store<fromBooks.State>,
                 private bookService: GoogleBookService ) {
    }

    public canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {

        return this.waitForCollectionToLoad().pipe(
            switchMap(() => this.hasBook(route.params['id']))
        );
    }

    private waitForCollectionToLoad(): Observable<boolean> {
        return this.store.pipe(
            select(fromBooks.getCollectionLoaded),
            filter(loaded => loaded),
            take(1)
        );
    }

    private hasBook( id: string ): Observable<boolean> {
        return this.hasBookInStore(id).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasBookInApi(id);
            })
        );
    }

    private hasBookInStore( id: string ): Observable<boolean> {
        return this.store.pipe(
            select(fromBooks.getBookEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    private hasBookInApi( id: string ): Observable<boolean> {
        return this.bookService.retrieveBook(id).pipe(
            map(bookEntity => new BookActions.Load(bookEntity)),
            tap(( action: BookActions.Load ) => this.store.dispatch(action)),
            map(book => !!book),
            catchError(() => {
                return of(false);
            })
        );
    }
}
