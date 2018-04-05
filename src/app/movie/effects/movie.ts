/**
 * movie
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MovieService } from '../service/movie.service';
import { MovieActionTypes, SearchError, SearchListComplete } from '../actions/movie';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MovieEffect {

    @Effect()
    public searchTopRatedList$ = this.actions$.pipe(
        ofType(MovieActionTypes.SearchTopRatedList),
        switchMap(() => {
            return this.movieService.searchList('top_rated').pipe(
                map(results => new SearchListComplete({results, type: 'top_rated'})),
                catchError(err => of(new SearchError(err)))
            );
        })
    );

    @Effect()
    public searchUpcomingList$ = this.actions$.pipe(
        ofType(MovieActionTypes.SearchTopRatedList),
        switchMap(() => {
            return this.movieService.searchList('upcoming').pipe(
                map(results => new SearchListComplete({results, type: 'upcoming'})),
                catchError(err => of(new SearchError(err)))
            );
        })
    );

    constructor( private actions$: Actions,
                 private movieService: MovieService ) {
    }
}
