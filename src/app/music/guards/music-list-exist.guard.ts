import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as fromMusicRoot from '../reducers';
import * as searchMusicActions from '../actions/search';
import * as layoutActions from '../../core/layout-store/actions';
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
        const page = +next.params['page'] || 1;
        const query = next.params['query'];
        return this.hasSearchResults(query, page);
    }

    private hasSearchResults( query: string, page: number ): Observable<boolean> {
        if (query !== 'new-releases' && query !== 'tag:hipster') {
            this.router.navigate(['page-not-found'], {skipLocationChange: true});
            return of(false);
        }

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
            this.store.pipe(select(fromMusicRoot.getPaginatorData), take(1)),
            this.store.pipe(select(fromMusicRoot.getSearchAlbumResults), take(1))
        ).pipe(
            map(( result: any ) => result[0].album_query === query && result[0].album_page === page && result[1] && result[1].length > 0)
        );
    }

    private hasSearchResultsInApi( query: string, page: number ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());
        const service = query === 'new-releases' ?
            this.musicService.getNewReleases(page) :
            this.musicService.searchAlbum(query, page);
        return service.pipe(
            map(res => new searchMusicActions.SearchAlbumComplete(res)),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(res => res.payload.results && res.payload.results.length > 0),
            catchError(( res ) => {
                this.store.dispatch(new layoutActions.HideLoader());

                // The access token expired
                if (res && res.error && res.status && res.status === 401) {
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
