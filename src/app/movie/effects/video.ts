/**
 * video
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { MovieVideosActionTypes, Search, SearchComplete, SearchError, Select } from '../actions/video';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromMovieRoot from '../reducers';
import { MovieService } from '../service/movie.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class VideoEffect {

    @Effect()
    public search$ = this.actions$.pipe(
        ofType(MovieVideosActionTypes.Search),
        withLatestFrom(this.store$.pipe(select(fromMovieRoot.getMovieVideosEntities))),
        map(( [action, entities]: [Search, any] ) => [action.payload, entities]),
        switchMap(( [id, entities] ) => {
            const inStore = entities && !!entities[id];
            let obs;
            if (inStore) {
                obs = of(new Select(id));
            } else {
                obs = this.movieService.getMovieVideos(id).pipe(
                    map(( res ) => new SearchComplete(res)),
                    catchError(err => of(new SearchError(err)))
                );
            }
            return obs;
        })
    );

    constructor( private actions$: Actions,
                 private movieService: MovieService,
                 private store$: Store<fromMovieRoot.State> ) {
    }
}
