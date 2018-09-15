/**
 * collection.effects
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { defer, EMPTY, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, toArray, withLatestFrom } from 'rxjs/operators';
import { OwlNotifierService } from 'owl-ng';

import {
    AddTV,
    AddTVFail,
    AddTVSuccess,
    CollectionActionTypes,
    LoadFail,
    LoadSuccess,
    RemoveTV,
    RemoveTVFail,
    RemoveTVSuccess
} from '../actions/collection';
import { ITv } from '../../model';
import * as fromUser from '../../user/reducers';
import * as authActions from '../../user/actions/auth';

@Injectable()
export class CollectionEffects {

    @Effect({dispatch: false})
    openDB$: Observable<any> = defer(() => {
        return this.db.open('book_movie');
    });

    @Effect()
    loadTvCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.Load),
        withLatestFrom(this.store.pipe(select(fromUser.getLoggedIn))),
        switchMap(( [action, isLoggedIn]: [Action, boolean] ) => {
            if (isLoggedIn) {
                return this.db
                    .query('tvs')
                    .pipe(
                        toArray(),
                        map(( tvs: ITv[] ) => new LoadSuccess({entities: tvs})),
                        catchError(error => of(new LoadFail(error)))
                    );
            } else {
                return EMPTY;
            }
        })
    );

    @Effect()
    addTvToCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.AddTV),
        map(( action: AddTV ) => action.payload.entity),
        withLatestFrom(this.store.pipe(select(fromUser.getLoggedIn))),
        mergeMap(( [tv, isLoggedIn]: [ITv, boolean] ) => {
            // check loggedIn status before add the tv to database
            if (isLoggedIn) {
                return this.db
                    .insert('tvs', [tv])
                    .pipe(
                        tap(() => this.notifier.open('TV added into your collection successfully')),
                        map(() => new AddTVSuccess({entity: tv})),
                        catchError(() => of(new AddTVFail({entity: tv})))
                    );
            } else {
                return of(new authActions.LoginRedirect(this.router.url));
            }
        })
    );

    @Effect()
    removeTvFromCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.RemoveTV),
        map(( action: RemoveTV ) => action.payload.entity),
        withLatestFrom(this.store.pipe(select(fromUser.getLoggedIn))),
        mergeMap(( [tv, isLoggedIn]: [ITv, boolean] ) => {
            // check loggedIn status before remove the tv from database
            if (isLoggedIn) {
                return this.db
                    .executeWrite('movies', 'delete', [tv.id])
                    .pipe(
                        tap(() => this.notifier.open('TV removed from your collection successfully')),
                        map(() => new RemoveTVSuccess({entity: tv})),
                        catchError(() => of(new RemoveTVFail({entity: tv})))
                    );
            } else {
                return of(new authActions.LoginRedirect(this.router.url));
            }
        })
    );

    constructor( private actions$: Actions,
                 private store: Store<fromUser.State>,
                 private router: Router,
                 private notifier: OwlNotifierService,
                 private db: Database ) {
    }
}
