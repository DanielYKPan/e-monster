/**
 * video
 */

import { Action } from '@ngrx/store';

export enum MovieVideosActionTypes {
    Search = '[Movie Videos] Search',
    SearchComplete = '[Movie Videos] Search Complete',
    SearchError = '[Movie Videos] Search Error',
    Select = '[Movie Videos] Select',
}

export class Search implements Action {
    readonly type = MovieVideosActionTypes.Search;

    constructor( public payload: number ) {
    }
}

export class SearchComplete implements Action {
    readonly type = MovieVideosActionTypes.SearchComplete;

    constructor( public payload: any ) {
    }
}

export class SearchError implements Action {
    readonly type = MovieVideosActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export class Select implements Action {
    readonly type = MovieVideosActionTypes.Select;

    constructor( public payload: number ) {
    }
}

export type MovieVideosActions =
    Search |
    SearchComplete |
    SearchError |
    Select;
