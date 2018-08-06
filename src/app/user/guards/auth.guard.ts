import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as fromUserRoot from '../reducers';
import * as authActions from '../actions/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor( private store: Store<fromUserRoot.State> ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkLogin(state.url);
    }

    private checkLogin( url: string ): Observable<boolean> {
        return this.store.pipe(
            select(fromUserRoot.getLoggedIn),
            switchMap(( loggedIn: boolean ) => {
                if (!loggedIn) {
                    this.store.dispatch(new authActions.LoginRedirect(url));
                }
                return of(loggedIn);
            })
        );
    }
}
