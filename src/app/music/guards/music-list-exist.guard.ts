import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as fromMusicRoot from '../reducers';
import * as fromRoot from '../../reducers';
import * as musicActions from '../actions/music';
import { LoadingCompleted, LoadingStart, SearchListComplete } from '../../search-store/actions';
import { MusicService } from '../service/music.service';

@Injectable({
    providedIn: 'root'
})
export class MusicListExistGuard implements CanActivate {

    constructor( private store: Store<fromMusicRoot.State>,
                 private musicService: MusicService,
                 private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        console.log('Music List Exist Guard');
        const query = next.params['query'];
        return this.hasSearchResults(query);
    }

    private hasSearchResults( query: string ): Observable<boolean> {
        if (query !== 'new-releases') {
            this.router.navigate(['page-not-found'], {skipLocationChange: true});
            return of(false);
        }

        return this.hasSearchResultsInStore(query).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchResultsInApi(query);
            })
        );
    }

    private hasSearchResultsInStore( query: string ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromRoot.getSearchType), take(1)),
            this.store.pipe(select(fromRoot.getSearchQuery), take(1)),
            this.store.pipe(select(fromRoot.getSearchPage), take(1)),
            this.store.pipe(select(fromRoot.getSearchResults), take(1))
        ).pipe(
            map(( result: any ) => result[0] === 'music' && result[1] === query && result[2] === 1 && result[3] && result[3].length > 0)
        );
    }

    private hasSearchResultsInApi( query: string ): Observable<boolean> {
        this.store.dispatch(new LoadingStart());

        return this.musicService.getNewReleases().pipe(
            map(res => new SearchListComplete(res)),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new musicActions.SearchListCompleted(action.payload.results));
            }),
            map(res => res.payload.results && res.payload.results.length > 0),
            catchError(( res ) => {

                // The access token expired
                if (res && res.error && res.status && res.status === 401) {
                    this.store.dispatch(new LoadingCompleted());
                    this.musicService.spotify_access_token = '';
                    this.router.navigate(['music']);
                    return of(false);
                } else {
                    this.router.navigate(['page-not-found'], {skipLocationChange: true});
                    return of(false);
                }
            })
        );
    }
}
