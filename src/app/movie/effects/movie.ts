/**
 * movie
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MovieService } from '../service/movie.service';
import { AudioSearchActionTypes, SearchError, SearchList, SearchListComplete } from '../../search/actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MovieEffect {

    @Effect()
    public searchList$ = this.actions$.pipe(
        ofType(AudioSearchActionTypes.SearchList),
        map(( action: SearchList ) => action.payload),
        switchMap(( payload: any ) => {
            return this.movieService.searchList(payload.query, payload.page).pipe(
                map(results => new SearchListComplete(results)),
                catchError(err => of(new SearchError(err)))
            );
        })
    );

    constructor( private actions$: Actions,
                 private movieService: MovieService ) {
    }
}
