/**
 * video
 */

import { Action } from '@ngrx/store';

export enum MovieVideosActionTypes {
    Select = '[Movie Videos] Select',
}

export class Select implements Action {
    readonly type = MovieVideosActionTypes.Select;

    constructor( public payload: number ) {
    }
}

export type MovieVideosActions = Select;
