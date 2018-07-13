/**
 * tv-list-exist.guard
 */


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { select, Store } from '@ngrx/store';
import * as fromTvRoot from '../reducers';
import * as fromRoot from '../../reducers';
import { TvService } from '../service/tv.service';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { LoadingStart, SearchListComplete } from '../../search/actions';

@Injectable()
export class TvListExistGuard implements CanActivate {

    constructor( private store: Store<fromTvRoot.State>,
                 private tvService: TvService ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
        const query = route.params['query'];
        const page = route.params['page'] || 1;
        return this.hasTvList(query, page);
    }

    private hasTvList( query: string, page: number ): Observable<boolean> {
        if (!query) {
            query = 'on_the_air';
        }

        return this.hasTvListInStore(query, page).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasTvListInApi(query, page);
            })
        );
    }

    private hasTvListInStore( query: string, page: number ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromRoot.getSearchType), take(1)),
            this.store.pipe(select(fromRoot.getSearchQuery), take(1)),
            this.store.pipe(select(fromRoot.getSearchPage), take(1)),
            this.store.pipe(select(fromRoot.getSearchResults), take(1))
        ).pipe(
            map(( result: any ) => result[0] === 'tv' && result[1] === query && result[2] === page && result[3].length > 0)
        );
    }

    private hasTvListInApi( query: string, page: number ): Observable<boolean> {
        this.store.dispatch(new LoadingStart());
        return this.tvService.getTvList(query, page).pipe(
            map(res => new SearchListComplete(res)),
            tap(action => this.store.dispatch(action)),
            map(res => res.payload.results && res.payload.results.length > 0),
            catchError(() => {
                return of(false); // TODO: navigate to 404 page
            })
        );
    }
}
