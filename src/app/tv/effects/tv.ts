/**
 * tv
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { TvService } from '../service/tv.service';
import * as searchTvActions from '../actions/search';
import { Search, SearchTvActionTypes } from '../actions/search';

@Injectable()
export class TvEffect {

    @Effect()
    public getList$ = this.actions$.pipe(
        ofType(SearchTvActionTypes.Search),
        map(( action: Search ) => action.payload),
        switchMap(( payload: any ) => {
            return this.tvService.getTvList(payload.query, payload.page).pipe(
                map(results => new searchTvActions.SearchComplete({search: results})),
                catchError(err => of(new searchTvActions.SearchError(err)))
            );
        })
    );

    constructor( private actions$: Actions,
                 private tvService: TvService ) {
    }
}
