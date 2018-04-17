/**
 * tv
 */

import { Action } from '@ngrx/store';
import { ITv } from '../../model';

export enum TvActionTypes {
    Select = '[TV] Select',
    Load = '[Movies] Load',
}

export class Select implements Action {
    readonly type = TvActionTypes.Select;

    constructor( public payload: number ) {
    }
}

export class Load implements Action {
    readonly type = TvActionTypes.Load;

    constructor( public payload: ITv ) {
    }
}

export type TvActions =
    Select |
    Load;
