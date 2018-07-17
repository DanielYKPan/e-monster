import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { PeopleService } from '../service/people.service';
import * as fromRoot from '../../reducers';
import * as fromPeopleRoot from '../reducers';
import * as actorActions from '../actions/actor';
import * as searchActions from '../../search-store/actions';

@Injectable({
    providedIn: 'root'
})
export class ActorExistGuard implements CanActivate {

    constructor( private store: Store<fromRoot.State>,
                 private peopleService: PeopleService ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        const id = next.params['id'];
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
        this.store.dispatch(new searchActions.LoadingStart());
        return this.peopleService.searchActorDetails(id).pipe(
            map(actor => {
                this.store.dispatch(new searchActions.LoadingCompleted());
                this.store.dispatch(new actorActions.Load(actor));
                this.store.dispatch(new actorActions.Select(actor.id));
                this.store.dispatch(new searchActions.SetSearchType('people'));
                return !!actor;
            }),
            catchError(() => {
                // TODO: navigate to 404
                return of(false);
            })
        );
    }
}
