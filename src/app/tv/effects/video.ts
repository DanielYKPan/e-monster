/**
 * video
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromTvRoot from '../reducers';
import { TvService } from '../service/tv.service';
import {
    SearchTvSeasonVideos,
    SearchTvVideos,
    SearchVideosCompleted,
    SearchVideosError,
    Select,
    TvVideosActionTypes
} from '../actions/video';

@Injectable()
export class VideoEffect {

    @Effect()
    public search$ = this.actions$.pipe(
        ofType(TvVideosActionTypes.SearchTvVideos),
        withLatestFrom(this.store.pipe(select(fromTvRoot.getTvVideosEntities))),
        map(( [action, entities]: [SearchTvVideos, any] ) => [action.payload, entities]),
        switchMap(( [id, entities] ) => {
            const inStore = entities && !!entities[id];
            let obs;
            if (inStore) {
                obs = of(new Select(id));
            } else {
                obs = this.tvService.getTvVideos(id).pipe(
                    map(( res ) => new SearchVideosCompleted(res)),
                    catchError(err => of(new SearchVideosError(err)))
                );
            }
            return obs;
        })
    );

    @Effect()
    public searchSeasonVideos$ = this.actions$.pipe(
        ofType(TvVideosActionTypes.SearchTvSeasonVideos),
        withLatestFrom(this.store.pipe(select(fromTvRoot.getTvVideosEntities))),
        map(( [action, entities]: [SearchTvSeasonVideos, any] ) => [action.payload, entities]),
        switchMap(( [inform, entities] ) => {
            const inStore = entities && !!entities[inform.season_id];
            let obs;
            if (inStore) {
                obs = of(new Select(inform.season_id));
            } else {
                obs = this.tvService.getTvSeasonVideos(inform.tv_id, inform.season_number).pipe(
                    map(( res ) => new SearchVideosCompleted(res)),
                    catchError(err => of(new SearchVideosError(err)))
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
