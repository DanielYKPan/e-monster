import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { TvService } from '../service/tv.service';
import * as fromTvRoot from '../reducers';
import * as searchTvActions from '../actions/search';
import * as layoutActions from '../../core/layout-store/actions';

@Injectable({
    providedIn: 'root'
})
export class SearchListExistGuard implements CanActivate {

    constructor( private store: Store<fromTvRoot.State>,
                 private tvService: TvService,
                 private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        const page = next.params['page'] || 1;
        const query = next.params['query'] || 'on_the_air';
        return this.hasSearchResults(query, page);
    }

    private hasSearchResults( query: string, page: number ): Observable<boolean> {
        return this.hasSearchResultsInStore(query, page).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchResultsInApi(query, page);
            })
        );
    }

    private hasSearchResultsInStore( query: string, page: number ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromTvRoot.getPaginatorData), take(1)),
            this.store.pipe(select(fromTvRoot.getSearchResults), take(1)),
        ).pipe(
            map(( result: any ) => result[0].query === query && result[0].page === page && !!result[1])
        );
    }

    private hasSearchResultsInApi( query: string, page: number ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());

        const search = query === 'on_the_air' ?
            this.tvService.getTvList(query, page) :
            this.tvService.searchTvs(query, page);

        return search.pipe(
            map(res => new searchTvActions.SearchComplete(res)),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(res => !!res.payload.results),
            catchError(() => {
                this.store.dispatch(new layoutActions.HideLoader());
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
