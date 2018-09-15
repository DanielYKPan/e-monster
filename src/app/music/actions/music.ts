/**
 * music
 */

import { Action } from '@ngrx/store';
import { IAlbum } from '../../model';

export enum MusicActionTypes {
    Select = '[Music] Select',
    Load = '[Music] Load',
    SetToken = '[Music] Set Token'
}

export class Select implements Action {
    readonly type = MusicActionTypes.Select;

    constructor( public payload: { id: string } ) {
    }
}

export class Load implements Action {
    readonly type = MusicActionTypes.Load;

    constructor( public payload: { entity: IAlbum } ) {
    }
}

export class SetToken implements Action {
    readonly type = MusicActionTypes.SetToken;

    constructor( public payload: { token: string } ) {
    }
}

export type MusicActions =
    Select |
    Load |
    SetToken;
