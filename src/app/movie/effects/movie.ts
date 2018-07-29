/**
 * movie
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { MovieService } from '../service/movie.service';
import { Search, SearchMovieActionTypes } from '../actions/search';
import * as searchMovieActions from '../actions/search';

@Injectable()
export class MovieEffect {

    @Effect()
    public searchList$ = this.actions$.pipe(
        ofType(SearchMovieActionTypes.Search),
        map(( action: Search ) => action.payload),
        switchMap(( payload: any ) => {
            return this.movieService.searchList(payload.query, payload.page).pipe(
                map(results => new searchMovieActions.SearchComplete(results)),
                catchError(err => of(new searchMovieActions.SearchError(err)))
            );
        })
    );

    constructor( private actions$: Actions,
                 private movieService: MovieService ) {
    }
}
