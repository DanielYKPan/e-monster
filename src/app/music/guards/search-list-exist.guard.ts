import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { MusicService } from '../service/music.service';
import * as fromMusicRoot from '../reducers';
import * as layoutActions from '../../core/layout-store/actions';
import * as searchMusicActions from '../actions/search';

@Injectable({
    providedIn: 'root'
})
export class SearchListExistGuard implements CanActivate {

    constructor( private store: Store<fromMusicRoot.State>,
                 private musicService: MusicService,
                 private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        const page_album = +next.params['page_album'] || 1;
        const page_track = +next.params['page_track'] || 1;
        const query = next.params['query'] || 'new-releases';
        return this.hasSearchResults(query, page_album, page_track);
    }

    private hasSearchResults( query: string, page_album: number, page_track: number ): Observable<boolean> {

        if (query === 'new-releases') {
            return this.hasNewReleasesInApi();
        }

        return this.hasSameSearchQueryInStore(query).pipe(
            switchMap(( isSame: boolean ) => {
                if (isSame) {
                    return forkJoin(
                        this.hasSearchAlbumResults(query, page_album),
                        this.hasSearchTrackResults(query, page_track),
                    ).pipe(
                        map(( results ) => results[0] && results[1])
                    );
                } else {
                    return this.hasSearchResultsInApi(query);
                }
            })
        );
    }

    private hasSameSearchQueryInStore( query: string ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromMusicRoot.getSearchAlbumQuery), take(1)),
            this.store.pipe(select(fromMusicRoot.getSearchTrackQuery), take(1)),
        ).pipe(
            map(( result: any ) => !!result[0] && !!result[1] && result[0] === result[1] && result[0] === query)
        );
    }

    private hasSearchAlbumResults( query: string, page: number ): Observable<boolean> {
        return this.hasSearchAlbumResultsInStore(query, page).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchAlbumResultsInApi(query, page);
            })
        );
    }

    private hasSearchAlbumResultsInStore( query: string, page: number ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromMusicRoot.getSearchAlbumQuery), take(1)),
            this.store.pipe(select(fromMusicRoot.getSearchAlbumPage), take(1)),
            this.store.pipe(select(fromMusicRoot.getSearchAlbumResults), take(1)),
        ).pipe(
            map(( result: any ) => result[0] === query && result[1] === page && !!result[2])
        );
    }

    private hasSearchAlbumResultsInApi( query: string, page: number ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());
        return this.musicService.searchAlbum(query, page).pipe(
            map(res => new searchMusicActions.SearchAlbumComplete(res)),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(res => !!res.payload.results),
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

    private hasSearchTrackResults( query: string, page: number ): Observable<boolean> {
        return this.hasSearchTrackResultsInStore(query, page).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchTrackResultsInApi(query, page);
            })
        );
    }

    private hasSearchTrackResultsInStore( query: string, page: number ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromMusicRoot.getSearchTrackQuery), take(1)),
            this.store.pipe(select(fromMusicRoot.getSearchTrackPage), take(1)),
            this.store.pipe(select(fromMusicRoot.getSearchTrackResults), take(1)),
        ).pipe(
            map(( result: any ) => result[0] === query && result[1] === page && !!result[2])
        );
    }

    private hasSearchTrackResultsInApi( query: string, page: number ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());
        return this.musicService.searchTrack(query, page).pipe(
            map(res => new searchMusicActions.SearchTrackComplete(res)),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(res => !!res.payload.results),
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

    private hasSearchResultsInApi( query: string ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());

        return this.musicService.searchMusic(query).pipe(
            map(( res: any ) => {
                const action1 = new searchMusicActions.SearchAlbumComplete(res.albums);
                const action2 = new searchMusicActions.SearchTrackComplete(res.tracks);
                return [action1, action2];
            }),
            tap(actions => {
                this.store.dispatch(actions[0]);
                this.store.dispatch(actions[1]);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(actions => !!actions[0].payload.results && !!actions[1].payload.results),
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

    private hasNewReleasesInApi(): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());

        return this.musicService.getNewReleases().pipe(
            map(res => new searchMusicActions.SearchAlbumComplete(res)),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new searchMusicActions.SearchTrackComplete({
                    query: null,
                    page: 0,
                    total_pages: 0,
                    total_results: 0,
                    results: null
                }));
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(res => !!res.payload.results),
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
