import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as fromPeopleRoot from '../reducers';
import * as searchActions from '../../search-store/actions';
import * as artistActions from '../actions/artist';
import { ArtistService } from '../service/artist.service';

@Injectable({
    providedIn: 'root'
})
export class ArtistExistGuard implements CanActivate {

    constructor( private store: Store<fromPeopleRoot.State>,
                 private peopleService: ArtistService,
                 private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        const id = next.params['id'];
        return this.hasArtist(id);
    }

    private hasArtist( id: string ): Observable<boolean> {
        return this.hasArtistInStore(id).pipe(
            switchMap(inStore => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasArtistInApi(id);
            })
        );
    }

    private hasArtistInStore( id: string ): Observable<boolean> {
        return this.store.pipe(
            select(fromPeopleRoot.getArtistEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    private hasArtistInApi( id: string ): Observable<boolean> {
        this.store.dispatch(new searchActions.LoadingStart());
        return this.peopleService.getArtistDetails(id).pipe(
            map(artistEntity => {
                if (artistEntity.id !== id) {
                    throwError('Entity not exists');
                } else {
                    return new artistActions.Load(artistEntity);
                }
            }),
            tap(( action: artistActions.Load ) => {
                this.store.dispatch(action);
                this.store.dispatch(new searchActions.LoadingCompleted());
                this.store.dispatch(new searchActions.SetSearchType('people'));
            }),
            map(actor => !!actor),
            catchError(( res ) => {
                // The access token expired
                if (res && res.error && res.status && res.status === 401) {
                    this.store.dispatch(new searchActions.LoadingCompleted());
                    this.peopleService.spotify_access_token = '';
                    this.router.navigate(['people/artist', id]);
                    return of(false);
                } else {
                    this.router.navigate(['page-not-found'], {skipLocationChange: true});
                    return of(false);
                }
            })
        );
    }
}
