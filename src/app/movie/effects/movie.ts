/**
 * movie
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MovieService } from '../service/movie.service';
import { MovieActionTypes, SearchError, SearchList, SearchListComplete } from '../actions/movie';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MovieEffect {

    @Effect()
    public searchList$ = this.actions$.pipe(
        ofType(MovieActionTypes.SearchList),
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
