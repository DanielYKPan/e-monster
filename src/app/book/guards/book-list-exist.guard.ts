import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import * as fromBooksRoot from '../reducers';
import * as fromRoot from '../../reducers';
import { GoogleBookService } from '../book.service';
import { LoadingStart, SearchListComplete } from '../../search-store/actions';

@Injectable({
    providedIn: 'root'
})
export class BookListExistGuard implements CanActivate {

    constructor( private store: Store<fromBooksRoot.State>,
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
            this.store.pipe(select(fromRoot.getSearchType), take(1)),
            this.store.pipe(select(fromRoot.getSearchQuery), take(1)),
            this.store.pipe(select(fromRoot.getSearchPage), take(1)),
            this.store.pipe(select(fromRoot.getSearchResults), take(1))
        ).pipe(
            map(( result: any ) => result[0] === 'book' && result[1] === query && result[2] === 1 && result[3] && result[3].length > 0)
        );
    }

    private hasSearchResultsInApi( query: string ): Observable<boolean> {
        this.store.dispatch(new LoadingStart());

        return this.bookService.getBookList(query).pipe(
            map(res => new SearchListComplete(res)),
            tap(action => this.store.dispatch(action)),
            map(res => res.payload.results && res.payload.results.length > 0),
            catchError(() => {
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
