/**
 * collection
 */

import { Action } from '@ngrx/store';
import { IAlbum } from '../../model';

export enum CollectionActionTypes {
    AddAlbum = '[Album Collection] Add Album',
    AddAlbumSuccess = '[Album Collection] Add Album Success',
    AddAlbumFail = '[Album Collection] Add Album Fail',
    RemoveAlbum = '[Album Collection] Remove Album',
    RemoveAlbumSuccess = '[Album Collection] Remove Album Success',
    RemoveAlbumFail = '[Album Collection] Remove Album Fail',
    Load = '[Album Collection] Load',
    LoadSuccess = '[Album Collection] Load Success',
    LoadFail = '[Album Collection] Load Fail',
}

/**
 * Add Album to Collection Actions
 */
export class AddAlbum implements Action {
    readonly type = CollectionActionTypes.AddAlbum;

    constructor( public payload: IAlbum ) {
    }
}

export class AddAlbumSuccess implements Action {
    readonly type = CollectionActionTypes.AddAlbumSuccess;

    constructor( public payload: IAlbum ) {
    }
}

export class AddAlbumFail implements Action {
    readonly type = CollectionActionTypes.AddAlbumFail;

    constructor( public payload: IAlbum ) {
    }
}

/**
 * Remove Album from Collection Actions
 */
export class RemoveAlbum implements Action {
    readonly type = CollectionActionTypes.RemoveAlbum;

    constructor( public payload: IAlbum ) {
    }
}

export class RemoveAlbumSuccess implements Action {
    readonly type = CollectionActionTypes.RemoveAlbumSuccess;

    constructor( public payload: IAlbum ) {
    }
}

export class RemoveAlbumFail implements Action {
    readonly type = CollectionActionTypes.RemoveAlbumFail;

    constructor( public payload: IAlbum ) {
    }
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
    readonly type = CollectionActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = CollectionActionTypes.LoadSuccess;

    constructor( public payload: IAlbum[] ) {
    }
}

export class LoadFail implements Action {
    readonly type = CollectionActionTypes.LoadFail;

    constructor( public payload: any ) {
    }
}

export type CollectionActions =
    | AddAlbum
    | AddAlbumSuccess
    | AddAlbumFail
    | RemoveAlbum
    | RemoveAlbumSuccess
    | RemoveAlbumFail
    | Load
    | LoadSuccess
    | LoadFail;
