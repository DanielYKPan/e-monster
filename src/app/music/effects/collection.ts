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
    AddAlbum,
    AddAlbumFail,
    AddAlbumSuccess,
    CollectionActionTypes,
    LoadFail,
    LoadSuccess,
    RemoveAlbum,
    RemoveAlbumFail,
    RemoveAlbumSuccess
} from '../actions/collection';
import { IAlbum } from '../../model';
import * as fromUser from '../../user/reducers';
import * as authActions from '../../user/actions/auth';

@Injectable()
export class CollectionEffects {

    @Effect({dispatch: false})
    openDB$: Observable<any> = defer(() => {
        return this.db.open('book_movie');
    });

    @Effect()
    loadAlbumCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.Load),
        withLatestFrom(this.store.pipe(select(fromUser.getLoggedIn))),
        switchMap(( [action, isLoggedIn]: [Action, boolean] ) => {
            if (isLoggedIn) {
                return this.db
                    .query('albums')
                    .pipe(
                        toArray(),
                        map(( albums: IAlbum[] ) => new LoadSuccess({entities: albums})),
                        catchError(error => of(new LoadFail(error)))
                    );
            } else {
                return EMPTY;
            }
        })
    );

    @Effect()
    addAlbumToCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.AddAlbum),
        map(( action: AddAlbum ) => action.payload.entity),
        withLatestFrom(this.store.pipe(select(fromUser.getLoggedIn))),
        mergeMap(( [album, isLoggedIn]: [IAlbum, boolean] ) => {
            // check loggedIn status before add the movie to database
            if (isLoggedIn) {
                return this.db
                    .insert('albums', [album])
                    .pipe(
                        tap(() => this.notifier.open('Album added into your collection successfully')),
                        map(() => new AddAlbumSuccess({entity: album})),
                        catchError(() => of(new AddAlbumFail({entity: album})))
                    );
            } else {
                return of(new authActions.LoginRedirect(this.router.url));
            }
        })
    );

    @Effect()
    removeAlbumFromCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.RemoveAlbum),
        map(( action: RemoveAlbum ) => action.payload.entity),
        withLatestFrom(this.store.pipe(select(fromUser.getLoggedIn))),
        mergeMap(( [album, isLoggedIn]: [IAlbum, boolean] ) => {
            // check loggedIn status before remove the movie from database
            if (isLoggedIn) {
                return this.db
                    .executeWrite('albums', 'delete', [album.id])
                    .pipe(
                        tap(() => this.notifier.open('Album removed from your collection successfully')),
                        map(() => new RemoveAlbumSuccess({entity: album})),
                        catchError(() => of(new RemoveAlbumFail({entity: album})))
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
