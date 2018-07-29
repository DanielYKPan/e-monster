/**
 * tv-list-exist.guard
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { TvService } from '../service/tv.service';
import { LoadingCompleted, LoadingStart } from '../../search-store/actions';
import * as searchTvActions from '../actions/search';
import * as fromTvRoot from '../reducers';

@Injectable()
export class TvListExistGuard implements CanActivate {

    constructor( private store: Store<fromTvRoot.State>,
                 private tvService: TvService,
                 private router: Router ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
        const name = route.params['query'];
        const page = route.params['page'] || 1;
        return this.hasTvList(name, page);
    }

    private hasTvList( name: string, page: number ): Observable<boolean> {
        if (!name) {
            name = 'on_the_air';
        }

        return this.hasTvListInStore(name, page).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasTvListInApi(name, page);
            })
        );
    }

    private hasTvListInStore( name: string, page: number ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromTvRoot.getSearchQuery), take(1)),
            this.store.pipe(select(fromTvRoot.getSearchPage), take(1)),
            this.store.pipe(select(fromTvRoot.getSearchResults), take(1))
        ).pipe(
            map(( result: any ) => result[0] === name && result[1] === page && result[2].length > 0)
        );
    }

    private hasTvListInApi( name: string, page: number ): Observable<boolean> {
        this.store.dispatch(new LoadingStart());
        return this.tvService.getTvList(name, page).pipe(
            map(res => new searchTvActions.SearchComplete(res)),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new LoadingCompleted());
            }),
            map(res => res.payload.results && res.payload.results.length > 0),
            catchError(() => {
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
