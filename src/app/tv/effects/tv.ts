/**
 * tv
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SearchActionTypes, SearchError, SearchList, SearchListComplete } from '../../search-store/actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { TvService } from '../service/tv.service';

@Injectable()
export class TvEffect {

    @Effect()
    public getList$ = this.actions$.pipe(
        ofType(SearchActionTypes.SearchList),
        map((action: SearchList) => action.payload),
        switchMap(( payload: any ) => {
            return this.tvService.getTvList(payload.query, payload.page).pipe(
                map(results => new SearchListComplete(results)),
                catchError(err => of(new SearchError(err)))
            );
        })
    );

    constructor(private actions$: Actions,
                private tvService: TvService) {
    }
}
