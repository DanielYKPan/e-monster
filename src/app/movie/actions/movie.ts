/**
 * movie
 */

import { Action } from '@ngrx/store';
import { IMovie } from '../../model';

export enum MovieActionTypes {
    Select = '[Movies] Select',
    Load = '[Movies] Load',
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
    Select |
    Load;
