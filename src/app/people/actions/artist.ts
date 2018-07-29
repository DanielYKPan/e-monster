/**
 * artist
 */

import { Action } from '@ngrx/store';
import { IArtistDetails } from '../../model';

export enum ArtistActionTypes {
    Select = '[Artist] Select',
    Load = '[Artist] Load',
}

export class Select implements Action {
    readonly type = ArtistActionTypes.Select;

    constructor( public payload: string ) {
    }
}

export class Load implements Action {
    readonly type = ArtistActionTypes.Load;

    constructor( public payload: IArtistDetails ) {
    }
}

export type ArtistActions =
    Select |
    Load;
