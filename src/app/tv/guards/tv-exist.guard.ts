/**
 * tv-exist.guard
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { TvService } from '../service/tv.service';
import * as fromTvRoot from '../reducers';
import * as tvActions from '../actions/tv';
import * as videoActions from '../actions/video';
import * as layoutActions from '../../core/layout-store/actions';

@Injectable()
export class TvExistGuard implements CanActivate {
    constructor( private store: Store<fromTvRoot.State>,
                 private tvService: TvService,
                 private router: Router ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
        return this.hasTv(+route.params['id']);
    }

    private hasTv( id: number ): Observable<boolean> {
        return this.hasTvInStore(id).pipe(
            tap(() => {
                this.store.dispatch(new videoActions.SearchTvVideos(id));
            }),
            switchMap(inStore => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasTvInApi(id);
            })
        );
    }

    private hasTvInStore( id: number ): Observable<boolean> {
        return this.store.pipe(
            select(fromTvRoot.getTvEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    private hasTvInApi( id: number ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());

        return this.tvService.getTv(id).pipe(
            map(tvEntity => {
                if (tvEntity.id !== id) {
                    throwError('Entity not exists');
                    return null;
                } else {
                    return tvEntity;
                }
            }),
            tap(( tvEntity ) => {
                this.store.dispatch(new layoutActions.HideLoader());
                if (tvEntity) {
                    this.store.dispatch(new tvActions.Load(tvEntity));
                }
            }),
            map(res => !!res),
            catchError(() => {
                this.store.dispatch(new layoutActions.HideLoader());
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
