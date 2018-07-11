/**
 * video
 */

import { Action } from '@ngrx/store';

export enum TvVideosActionTypes {
    Search = '[Tv Videos] Search',
    SearchComplete = '[Tv Videos] Search Complete',
    SearchError = '[Tv Videos] Search Error',
    Select = '[Tv Videos] Select',
}

export class Search implements Action {
    readonly type = TvVideosActionTypes.Search;

    constructor( public payload: number ) {
    }
}

export class SearchComplete implements Action {
    readonly type = TvVideosActionTypes.SearchComplete;

    constructor( public payload: any ) {
    }
}

export class SearchError implements Action {
    readonly type = TvVideosActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export class Select implements Action {
    readonly type = TvVideosActionTypes.Select;

    constructor( public payload: number ) {
    }
}

export type TvVideosActions =
    Search |
    SearchComplete |
    SearchError |
    Select;
