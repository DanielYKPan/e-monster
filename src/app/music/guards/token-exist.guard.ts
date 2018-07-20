import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromMusicRoot from '../reducers';
import { MusicService } from '../service/music.service';

@Injectable({
    providedIn: 'root'
})
export class TokenExistGuard implements CanActivate {

    constructor( private store: Store<fromMusicRoot.State>,
                 private musicService: MusicService,
                 @Inject(DOCUMENT) private document: any ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        const hashString = next.fragment;
        if (hashString) {
            this.musicService.spotify_access_token = hashString.split('&')[0].split('=')[1];
            return true;
        } else {
            const token = this.musicService.spotify_access_token;
            if (token) {
                return true;
            } else {
                this.document.location.href = 'https://accounts.spotify.com/authorize?' +
                    'client_id=ce67a8a0eb964933a536cca6ffc81848&' +
                    'redirect_uri=http:%2F%2Flocalhost:4200/music&' +
                    'scope=user-read-private%20user-read-email&' +
                    'response_type=token&state=123';
            }
        }
        return true;
    }
}
