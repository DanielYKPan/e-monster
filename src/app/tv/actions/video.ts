/**
 * video
 */

import { Action } from '@ngrx/store';

export enum TvVideosActionTypes {
    Select = '[Tv Videos] Select',
    SearchTvVideos = '[Tv Videos] Search Tv Videos',
    SearchTvVideosCompleted = '[Tv Videos] Search Tv Videos Completed',
    SearchTvVideosError = '[Tv Videos] Search Tv Videos Error',
}

export class Select implements Action {
    readonly type = TvVideosActionTypes.Select;

    constructor( public payload: number ) {
    }
}

export class SearchTvVideos implements Action {
    readonly type = TvVideosActionTypes.SearchTvVideos;

    constructor( public payload: number ) {
    }
}

export class SearchTvVideosCompleted implements Action {
    readonly type = TvVideosActionTypes.SearchTvVideosCompleted;

    constructor( public payload: any ) {
    }
}

export class SearchTvVideosError implements Action {
    readonly type = TvVideosActionTypes.SearchTvVideosError;

    constructor( public payload: any ) {
    }
}

export type TvVideosActions =
    Select |
    SearchTvVideos |
    SearchTvVideosCompleted |
    SearchTvVideosError;
