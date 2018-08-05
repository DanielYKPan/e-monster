/**
 * auth.effects
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Authenticate } from '../../model';
import { AuthService } from '../service/auth.service';
import { AuthActionTypes, Login, LoginFailure, LoginSuccess } from '../actions/auth';

@Injectable()
export class AuthEffects {

    @Effect()
    login$ = this.actions$.pipe(
        ofType(AuthActionTypes.Login),
        map(( action: Login ) => action.payload),
        exhaustMap(( auth: Authenticate ) => {
            return this.authService.login(auth)
                .pipe(
                    map(user => new LoginSuccess({user})),
                    catchError(error => of(new LoginFailure(error)))
                );
        })
    );

    @Effect({dispatch: false})
    loginSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        tap(() => this.router.navigate(['/']))
    );

    @Effect({dispatch: false})
    loginRedirect$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
        tap(authed => {
            this.router.navigate(['login']);
        })
    );

    constructor( private actions$: Actions,
                 private authService: AuthService,
                 private router: Router ) {
    }
}
