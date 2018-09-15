/**
 * collection
 */

import { Action } from '@ngrx/store';
import { ITv } from '../../model';

export enum CollectionActionTypes {
    AddTV = '[TV Collection] Add TV',
    AddTVSuccess = '[TV Collection] Add TV Success',
    AddTVFail = '[TV Collection] Add TV Fail',
    RemoveTV = '[TV Collection] Remove TV',
    RemoveTVSuccess = '[TV Collection] Remove TV Success',
    RemoveTVFail = '[TV Collection] Remove TV Fail',
    Load = '[Movie Collection] Load',
    LoadSuccess = '[Movie Collection] Load Success',
    LoadFail = '[Movie Collection] Load Fail',
}

/**
 * Add Book to Collection Actions
 */
export class AddTV implements Action {
    readonly type = CollectionActionTypes.AddTV;

    constructor( public payload: { entity: ITv } ) {
    }
}

export class AddTVSuccess implements Action {
    readonly type = CollectionActionTypes.AddTVSuccess;

    constructor( public payload: { entity: ITv } ) {
    }
}

export class AddTVFail implements Action {
    readonly type = CollectionActionTypes.AddTVFail;

    constructor( public payload: { entity: ITv } ) {
    }
}

/**
 * Remove TV from Collection Actions
 */
export class RemoveTV implements Action {
    readonly type = CollectionActionTypes.RemoveTV;

    constructor( public payload: { entity: ITv } ) {
    }
}

export class RemoveTVSuccess implements Action {
    readonly type = CollectionActionTypes.RemoveTVSuccess;

    constructor( public payload: { entity: ITv } ) {
    }
}

export class RemoveTVFail implements Action {
    readonly type = CollectionActionTypes.RemoveTVFail;

    constructor( public payload: { entity: ITv } ) {
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

    constructor( public payload: { entities: ITv[] } ) {
    }
}

export class LoadFail implements Action {
    readonly type = CollectionActionTypes.LoadFail;

    constructor( public payload: any ) {
    }
}

export type CollectionActions =
    | AddTV
    | AddTVSuccess
    | AddTVFail
    | RemoveTV
    | RemoveTVSuccess
    | RemoveTVFail
    | Load
    | LoadSuccess
    | LoadFail;
