import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import { ActorService } from '../service/actor.service';
import * as fromPeopleRoot from '../reducers';
import * as actorActions from '../actions/actor';
import * as layoutActions from '../../core/layout-store/actions';

@Injectable({
    providedIn: 'root'
})
export class ActorExistGuard implements CanActivate {

    constructor( private store: Store<fromPeopleRoot.State>,
                 private peopleService: ActorService,
                 private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        const id = +next.params['id'];
        return this.hasActor(id);
    }

    private hasActor( id: number ): Observable<boolean> {
        return this.hasActorInStore(id).pipe(
            switchMap(inStore => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasActorInApi(id);
            })
        );
    }

    private hasActorInStore( id: number ): Observable<boolean> {
        return this.store.pipe(
            select(fromPeopleRoot.getActorEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    private hasActorInApi( id: number ): Observable<boolean> {
        this.store.dispatch(new layoutActions.ShowLoader());
        return this.peopleService.searchActorDetails(id).pipe(
            map(actorEntity => {
                if (actorEntity.id !== id) {
                    throwError('Entity not exists');
                } else  {
                    return new actorActions.Load(actorEntity);
                }
            }),
            tap((action: actorActions.Load) => {
                this.store.dispatch(action);
                this.store.dispatch(new layoutActions.HideLoader());
            }),
            map(actor =>  !!actor),
            catchError(() => {
                this.store.dispatch(new layoutActions.HideLoader());
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
