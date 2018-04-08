/**
 * movie
 */

import { Action } from '@ngrx/store';
import { IMovie, IMovieGenre } from '../movie.model';

export enum MovieActionTypes {
    SearchList = '[Movies] Search List',
    SearchListComplete = '[Movies] Search List Complete',
    SearchError = '[Movies] Search Error',
    GetGenreListComplete = '[Movies] Get Genre List Complete',
}

export class SearchList implements Action {
    readonly type = MovieActionTypes.SearchList;

    constructor( public payload: { query: string, page: number } ) {
    }
}

export class SearchListComplete implements Action {
    readonly type = MovieActionTypes.SearchListComplete;

    constructor( public payload: any ) {
    }
}

export class SearchError implements Action {
    readonly type = MovieActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export class GetGenreListComplete implements Action {
    readonly type = MovieActionTypes.GetGenreListComplete;

    constructor( public payload: IMovieGenre[] ) {
    }
}

export type MovieActions =
    SearchList |
    SearchListComplete |
    SearchError |
    GetGenreListComplete;
