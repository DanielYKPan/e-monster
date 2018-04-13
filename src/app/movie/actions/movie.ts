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
    Select = '[Movies] Select',
    Load = '[Movies] Load',
}

export class SearchList implements Action {
    readonly type = MovieActionTypes.SearchList;

    constructor( public payload: { type: string, page: number } ) {
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

export class Select implements Action {
    readonly type = MovieActionTypes.Select;

    constructor( public payload: number ) {
    }
}

export class Load implements Action {
    readonly type = MovieActionTypes.Load;

    constructor( public payload: IMovie ) {
    }
}

export type MovieActions =
    SearchList |
    SearchListComplete |
    SearchError |
    GetGenreListComplete |
    Select |
    Load;
