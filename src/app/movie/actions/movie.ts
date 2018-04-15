/**
 * movie
 */

import { Action } from '@ngrx/store';
import { IMovie, IMovieGenre } from '../movie.model';

export enum MovieActionTypes {
    SearchList = '[Movies] Search List',
    SearchListComplete = '[Movies] Search List Complete',
    SearchError = '[Movies] Search Error',
    Select = '[Movies] Select',
    Load = '[Movies] Load',
    LoadingStart = '[Movies] Loading Start',
    LoadingCompleted = '[Movies] Loading Completed',
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

export class LoadingStart implements Action {
    readonly type = MovieActionTypes.LoadingStart;

    constructor() {
    }
}

export class LoadingCompleted implements Action {
    readonly type = MovieActionTypes.LoadingCompleted;

    constructor() {
    }
}

export class SearchError implements Action {
    readonly type = MovieActionTypes.SearchError;

    constructor( public payload: any ) {
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
    Select |
    Load |
    LoadingStart |
    LoadingCompleted;
