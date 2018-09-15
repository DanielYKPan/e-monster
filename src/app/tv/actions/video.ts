/**
 * video
 */

import { Action } from '@ngrx/store';
import { IVideos } from '../../model';

export enum TvVideosActionTypes {
    Select = '[Tv Videos] Select',
    SearchTvVideos = '[Tv Videos] Search Tv Videos',
    SearchTvSeasonVideos = '[Tv Videos] Search Tv Season Videos',
    SearchVideosCompleted = '[Tv Videos] Search Tv Videos Completed',
    SearchVideosError = '[Tv Videos] Search Tv Videos Error',
}

export class Select implements Action {
    readonly type = TvVideosActionTypes.Select;

    constructor( public payload: { tv_id: number } ) {
    }
}

export class SearchTvVideos implements Action {
    readonly type = TvVideosActionTypes.SearchTvVideos;

    constructor( public payload: { tv_id: number } ) {
    }
}

export class SearchTvSeasonVideos implements Action {
    readonly type = TvVideosActionTypes.SearchTvSeasonVideos;

    constructor( public payload: { tv_id: number, season_number: number, season_id: number } ) {
    }
}

export class SearchVideosCompleted implements Action {
    readonly type = TvVideosActionTypes.SearchVideosCompleted;

    constructor( public payload: { result: IVideos } ) {
    }
}

export class SearchVideosError implements Action {
    readonly type = TvVideosActionTypes.SearchVideosError;

    constructor( public payload: any ) {
    }
}

export type TvVideosActions =
    Select |
    SearchTvVideos |
    SearchTvSeasonVideos |
    SearchVideosCompleted |
    SearchVideosError;
