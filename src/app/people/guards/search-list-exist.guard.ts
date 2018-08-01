import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import { ActorService } from '../service/actor.service';
import * as fromPeopleRoot from '../reducers';
import * as searchActorActions from '../actions/search-actor';
import * as searchArtistActions from '../actions/search-artist';
import * as layoutActions from '../../core/layout-store/actions';
import { ArtistService } from '../service/artist.service';

@Injectable({
    providedIn: 'root'
})
export class SearchListExistGuard implements CanActivate {

    constructor( private store: Store<fromPeopleRoot.State>,
                 private actorService: ActorService,
                 private artistService: ArtistService,
                 private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        const page_actor = +next.params['page_actor'] || 1;
        const page_artist = +next.params['page_artist'] || 1;
        const query = next.params['query'] || 'popular';
        return this.hasSearchResults(query, page_actor, page_artist);
    }

    private hasSearchResults( query: string, page_actor: number, page_artist: number ): Observable<boolean> {
        if (query === 'popular') {
            return this.hasPopularInApi();
        }

        return forkJoin(
            this.hasSearchActorResults(query, page_actor),
            this.hasSearchArtistResults(query, page_artist)
        ).pipe(
            map(( results ) => results[0] && results[1])
        );
    }

    private hasSearchActorResults( query: string, page: number ): Observable<boolean> {
        return this.hasSearchActorResultsInStore(query, page).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchActorResultsInApi(query, page);
            })
        );
    }

    private hasSearchActorResultsInStore( query: string, page: number ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromPeopleRoot.getPaginatorData), take(1)),
            this.store.pipe(select(fromPeopleRoot.getSearchActorResults), take(1)),
        ).pipe(
            map(( result: any ) => result[0].actor_query === query && result[0].actor_page === page && !!result[1])
        );
    }

    private hasSearchActorResultsInApi( query: string, page: number ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());

        return this.actorService.searchActors(query, page).pipe(
            map(res => new searchActorActions.SearchComplete(res)),
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

    private hasSearchArtistResults( query: string, page: number ): Observable<boolean> {
        return this.hasSearchArtistResultsInStore(query, page).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchArtistResultsInApi(query, page);
            })
        );
    }

    private hasSearchArtistResultsInStore( query: string, page: number ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromPeopleRoot.getPaginatorData), take(1)),
            this.store.pipe(select(fromPeopleRoot.getSearchArtistResults), take(1)),
        ).pipe(
            map(( result: any ) => result[0].artist_query === query && result[0].artist_page === page && !!result[1])
        );
    }

    private hasSearchArtistResultsInApi( query: string, page: number ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());

        return this.artistService.searchArtist(query, page).pipe(
            map(res => new searchArtistActions.SearchComplete(res)),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(res => !!res.payload.results),
            catchError((res) => {
                this.store.dispatch(new layoutActions.HideLoader());

                // The access token expired
                if (res && res.error && res.status && res.status === 401) {
                    this.artistService.spotify_access_token = '';
                    this.router.navigate(['music']);
                    return of(false);
                } else {
                    this.router.navigate(['page-not-found'], {skipLocationChange: true});
                    return of(false);
                }
            })
        );
    }

    private hasPopularInApi(): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());

        // get popular actors
        const actors = this.actorService.getActorList('popular').pipe(
            map(res => new searchActorActions.SearchComplete(res)),
            catchError(() => {
                this.store.dispatch(new layoutActions.HideLoader());
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );

        // get hipster artists
        const artists = this.artistService.searchArtist('tag:hipster').pipe(
            map(res => new searchArtistActions.SearchComplete(res)),
            catchError((res) => {
                this.store.dispatch(new layoutActions.HideLoader());

                // The access token expired
                if (res && res.error && res.status && res.status === 401) {
                    this.artistService.spotify_access_token = '';
                    this.router.navigate(['music']);
                    return of(false);
                } else {
                    this.router.navigate(['page-not-found'], {skipLocationChange: true});
                    return of(false);
                }
            })
        );

        return forkJoin(actors, artists).pipe(
            tap((actions: any[]) => {
                this.store.dispatch(actions[0]);
                this.store.dispatch(actions[1]);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(res => !!res[0].payload.results || !!res[1].payload.results)
        );
    }
}
