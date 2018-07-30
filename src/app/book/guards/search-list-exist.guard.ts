import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import { GoogleBookService } from '../book.service';
import * as fromBookRoot from '../reducers';
import * as searchBookActions from '../actions/search';
import * as layoutActions from '../../core/layout-store/actions';

@Injectable({
    providedIn: 'root'
})
export class SearchListExistGuard implements CanActivate {

    constructor(private store: Store<fromBookRoot.State>,
                private bookService: GoogleBookService,
                private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        const page = next.params['page'] || 1;
        const query = next.params['query'] || 'combined-print-and-e-book-fiction';
        return this.hasSearchResults(query, page);
    }

    private hasSearchResults( query: string, page: number ): Observable<boolean> {
        return this.hasSearchResultsInStore(query, page).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchResultsInApi(query, page);
            })
        );
    }

    private hasSearchResultsInStore( query: string, page: number ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromBookRoot.getSearchQuery), take(1)),
            this.store.pipe(select(fromBookRoot.getSearchPage), take(1)),
            this.store.pipe(select(fromBookRoot.getSearchResults), take(1)),
        ).pipe(
            map(( result: any ) => result[0] === query && result[1] === page && !!result[2])
        );
    }

    private hasSearchResultsInApi( query: string, page: number ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());

        const search = query === 'combined-print-and-e-book-fiction' ?
            this.bookService.getBookList(query) :
            this.bookService.searchBooks(query, page);

        return search.pipe(
            map(res => new searchBookActions.SearchComplete(res)),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(res => !!res.payload.results),
            catchError(() => {
                this.store.dispatch(new layoutActions.HideLoader());
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
