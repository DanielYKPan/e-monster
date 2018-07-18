/**
 * tv-exist.guard
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromTvRoot from '../reducers';
import * as searchActions from '../../search-store/actions';
import * as tvActions from '../actions/tv';
import * as videoActions from '../actions/video';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { TvService } from '../service/tv.service';

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
        this.store.dispatch(new searchActions.LoadingStart());

        return this.tvService.getTv(id).pipe(
            map(tvEntity => {
                if (tvEntity.id !== id) {
                    throwError('Entity not exists');
                } else {
                    return new tvActions.Load(tvEntity);
                }
            }),
            tap(( action: tvActions.Load ) => {
                this.store.dispatch(action);
                this.store.dispatch(new searchActions.LoadingCompleted());
                this.store.dispatch(new searchActions.SetSearchType('tv'));
            }),
            map(res => !!res.payload),
            catchError(() => {
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
