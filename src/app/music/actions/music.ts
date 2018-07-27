/**
 * music
 */

import { Action } from '@ngrx/store';
import { IAlbum } from '../../model';

export enum MusicActionTypes {
    Select = '[Music] Select',
    Load = '[Music] Load',
    SearchListCompleted = '[Music] Search List Completed',
    SetToken = '[Music] Set Token'
}

export class Select implements Action {
    readonly type = MusicActionTypes.Select;

    constructor( public payload: number ) {
    }
}

export class Load implements Action {
    readonly type = MusicActionTypes.Load;

    constructor( public payload: IAlbum ) {
    }
}

export class SearchListCompleted implements Action {
    readonly type = MusicActionTypes.SearchListCompleted;

    constructor( public payload: IAlbum[] ) {
    }
}

export class SetToken implements Action {
    readonly type = MusicActionTypes.SetToken;

    constructor( public payload: string ) {
    }
}

export type MusicActions =
    Select |
    Load |
    SearchListCompleted |
    SetToken;
