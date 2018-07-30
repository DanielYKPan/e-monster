import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import * as fromBookRoot from '../reducers';
import * as searchBookActions from '../actions/search';
import * as layoutActions from '../../core/layout-store/actions';
import { GoogleBookService } from '../book.service';

@Injectable({
    providedIn: 'root'
})
export class BookListExistGuard implements CanActivate {

    constructor( private store: Store<fromBookRoot.State>,
                 private bookService: GoogleBookService,
                 private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        const query = next.params['query'];
        return this.hasSearchResults(query);
    }

    private hasSearchResults( query: string ): Observable<boolean> {
        if (query !== 'combined-print-and-e-book-fiction') {
            this.router.navigate(['page-not-found'], {skipLocationChange: true});
            return of(false);
        }

        return this.hasSearchResultsInStore(query).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchResultsInApi(query);
            })
        );
    }

    private hasSearchResultsInStore( query: string ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromBookRoot.getSearchQuery), take(1)),
            this.store.pipe(select(fromBookRoot.getSearchPage), take(1)),
            this.store.pipe(select(fromBookRoot.getSearchResults), take(1))
        ).pipe(
            map(( result: any ) => result[0] === query && result[1] === 1 && result[2] && result[2].length > 0)
        );
    }

    private hasSearchResultsInApi( query: string ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());

        return this.bookService.getBookList(query).pipe(
            map(res => new searchBookActions.SearchComplete(res)),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(res => res.payload.results && res.payload.results.length > 0),
            catchError(() => {
                this.store.dispatch(new layoutActions.HideLoader());
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
