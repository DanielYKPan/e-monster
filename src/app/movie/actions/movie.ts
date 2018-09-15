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

    constructor( public payload: { id: number } ) {
    }
}

export class Load implements Action {
    readonly type = MovieActionTypes.Load;

    constructor( public payload: { entity: IMovie } ) {
    }
}

export type MovieActions =
    Select |
    Load;
