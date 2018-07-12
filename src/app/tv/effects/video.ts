/**
 * video
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    SearchTvVideos,
    SearchTvVideosCompleted,
    SearchTvVideosError,
    Select,
    TvVideosActionTypes
} from '../actions/video';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromTvRoot from '../reducers';
import { of } from 'rxjs/observable/of';
import { TvService } from '../service/tv.service';
import { LoadingCompleted } from '../../search/actions';

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
                obs = of(new Select(id)).pipe(
                    tap(() => this.store.dispatch(new LoadingCompleted()))
                );
            } else {
                obs = this.tvService.getTvVideos(id).pipe(
                    map(( res ) => new SearchTvVideosCompleted(res)),
                    catchError(err => of(new SearchTvVideosError(err)))
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
