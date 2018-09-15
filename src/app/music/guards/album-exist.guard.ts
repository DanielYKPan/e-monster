import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { MusicService } from '../service/music.service';
import * as fromMusicRoot from '../reducers';
import * as musicActions from '../actions/music';
import * as layoutActions from '../../core/layout-store/actions';

@Injectable({
    providedIn: 'root'
})
export class AlbumExistGuard implements CanActivate {

    constructor( private store: Store<fromMusicRoot.State>,
                 private musicService: MusicService,
                 private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        return this.hasAlbum(next.params['id']);
    }

    private hasAlbum( id: string ): Observable<boolean> {
        return this.hasAlbumInStore(id).pipe(
            switchMap(inStore => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasAlbumInApi(id);
            })
        );
    }

    private hasAlbumInStore( id: string ): Observable<boolean> {
        return this.store.pipe(
            select(fromMusicRoot.getAlbumEntities),
            map(entities => !!entities[id] && !!entities[id].tracks),
            take(1)
        );
    }

    private hasAlbumInApi( id: string ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());
        return this.musicService.getAlbum(id).pipe(
            map(albumEntity => new musicActions.Load({entity: albumEntity})),
            tap(action => {
                this.store.dispatch(action);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(album => !!album),
            catchError(( res ) => {
                this.store.dispatch(new layoutActions.HideLoader());
                // The access token expired
                if (res && res.error && res.status && res.status === 401) {
                    this.musicService.spotify_access_token = '';
                    this.router.navigate(['music/album', id]);
                    return of(false);
                } else {
                    this.router.navigate(['page-not-found'], {skipLocationChange: true});
                    return of(false);
                }
            })
        );
    }
}
