import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as fromUserRoot from '../reducers';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor( private store: Store<fromUserRoot.State>,
                 private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkLogin();
    }

    private checkLogin(): Observable<boolean> {
        return this.store.pipe(
            select(fromUserRoot.getLoggedIn),
            switchMap(( loggedIn: boolean ) => {
                if (!loggedIn) {
                    this.router.navigate(['login']);
                }
                return of(loggedIn);
            })
        );
    }
}
