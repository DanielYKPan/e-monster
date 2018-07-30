import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { GoogleBookService } from '../book.service';
import * as fromBookRoot from '../reducers';
import * as bookActions from '../actions/book';
import * as layoutActions from '../../core/layout-store/actions';

@Injectable({
    providedIn: 'root'
})
export class BookExistGuard implements CanActivate {

    constructor( private store: Store<fromBookRoot.State>,
                 private bookService: GoogleBookService,
                 private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        return this.hasBook(next.params['id']);
    }

    private hasBook( id: string ): Observable<boolean> {
        return this.hasBookInStore(id).pipe(
            switchMap(inStore => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasBookInApi(id);
            })
        );
    }

    private hasBookInStore( id: string ): Observable<boolean> {
        return this.store.pipe(
            select(fromBookRoot.getBookEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    private hasBookInApi( id: string ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());
        return this.bookService.retrieveBook(id).pipe(
            map(bookEntity => new bookActions.Load(bookEntity)),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(book => !!book),
            catchError(() => {
                this.store.dispatch(new layoutActions.HideLoader());
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
