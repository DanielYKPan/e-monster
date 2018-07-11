/**
 * video
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Search, SearchComplete, SearchError, Select, TvVideosActionTypes } from '../actions/video';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromTvRoot from '../reducers';
import { of } from 'rxjs/observable/of';
import { TvService } from '../service/tv.service';

@Injectable()
export class VideoEffect {

    @Effect()
    public search$ = this.actions$.pipe(
        ofType(TvVideosActionTypes.Search),
        withLatestFrom(this.store.pipe(select(fromTvRoot.getTvVideosEntities))),
        map(( [action, entities]: [Search, any] ) => [action.payload, entities]),
        switchMap(( [id, entities] ) => {
            const inStore = entities && !!entities[id];
            let obs;
            if (inStore) {
                obs = of(new Select(id));
            } else {
                obs = this.tvService.getTvVideos(id).pipe(
                    map(( res ) => new SearchComplete(res)),
                    catchError(err => of(new SearchError(err)))
                );
            }
            return obs;
        })
    );

    constructor( private actions$: Actions,
                 private store: Store<fromTvRoot.State>,
                 private tvService: TvService ) {
    }
}
