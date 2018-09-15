/**
 * video
 */

import { Action } from '@ngrx/store';
import { IVideos } from '../../model';

export enum MovieVideosActionTypes {
    Select = '[Movie Videos] Select',
    SearchVideos = '[Movie Videos] Search Movie Videos',
    SearchVideosCompleted = '[Movie Videos] Search Movie Videos Completed',
    SearchVideosError = '[Movie Videos] Search Movie Videos Error',
}

export class Select implements Action {
    readonly type = MovieVideosActionTypes.Select;

    constructor( public payload: { movie_id: number } ) {
    }
}

export class SearchVideos implements Action {
    readonly type = MovieVideosActionTypes.SearchVideos;

    constructor( public payload: { movie_id: number } ) {
    }
}

export class SearchVideosCompleted implements Action {
    readonly type = MovieVideosActionTypes.SearchVideosCompleted;

    constructor( public payload: { result: IVideos } ) {
    }
}

export class SearchVideosError implements Action {
    readonly type = MovieVideosActionTypes.SearchVideosError;

    constructor( public payload: any ) {
    }
}

export type MovieVideosActions =
    Select |
    SearchVideos |
    SearchVideosCompleted |
    SearchVideosError;
