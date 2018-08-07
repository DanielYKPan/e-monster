/**
 * auth.effects
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { OwlNotifierService } from 'owl-ng';

import { Authenticate } from '../../model';
import { AuthService } from '../service/auth.service';
import { AuthActionTypes, Login, LoginFailure, LoginRedirect, LoginSuccess } from '../actions/auth';

@Injectable()
export class AuthEffects {

    @Effect()
    login$ = this.actions$.pipe(
        ofType(AuthActionTypes.Login),
        map(( action: Login ) => action.payload),
        exhaustMap(( auth: Authenticate ) => {
            return this.authService.login(auth)
                .pipe(
                    tap(() => this.notifier.open('Login successfully')),
                    map(user => new LoginSuccess({user})),
                    catchError(error => of(new LoginFailure(error)))
                );
        })
    );

    @Effect({dispatch: false})
    loginSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        tap(() => {
            if (this.authService.redirectUrl) {
                this.router.navigateByUrl(this.authService.redirectUrl);
                this.authService.redirectUrl = null;
            } else {
                this.router.navigate(['/']);
            }
        })
    );

    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
        ofType(AuthActionTypes.Logout),
        exhaustMap(() => {
            return this.authService.logout()
                .pipe(
                    tap(() => {
                        this.notifier.open('Logout successfully');
                        this.router.navigate(['/']);
                    }),
                );
        })
    );

    @Effect({dispatch: false})
    loginRedirect$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoginRedirect),
        map(( action: LoginRedirect ) => action.payload),
        tap(url => {
            this.authService.redirectUrl = url;
            this.router.navigate(['login']);
        })
    );

    constructor( private actions$: Actions,
                 private authService: AuthService,
                 private notifier: OwlNotifierService,
                 private router: Router ) {
    }
}
