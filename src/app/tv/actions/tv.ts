/**
 * tv
 */

import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ITv } from '../../model';

export enum TvActionTypes {
    Select = '[TV] Select',
    Load = '[TV] Load',
    UpdateTV = '[TV] Update a TV entity',
}

export class Select implements Action {
    readonly type = TvActionTypes.Select;

    constructor( public payload: { tv_id: number, season_number?: number } ) {
    }
}

export class Load implements Action {
    readonly type = TvActionTypes.Load;

    constructor( public payload: ITv ) {
    }
}

export class UpdateTV implements Action {
    readonly type = TvActionTypes.UpdateTV;

    constructor( public payload: { tv: Update<ITv> } ) {
    }
}

export type TvActions =
    Select |
    Load |
    UpdateTV;
