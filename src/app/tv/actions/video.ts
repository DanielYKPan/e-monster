/**
 * video
 */

import { Action } from '@ngrx/store';

export enum TvVideosActionTypes {
    Select = '[Tv Videos] Select',
}

export class Select implements Action {
    readonly type = TvVideosActionTypes.Select;

    constructor( public payload: number ) {
    }
}

export type TvVideosActions = Select;
