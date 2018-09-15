/**
 * collection
 */

import { Action } from '@ngrx/store';
import { IBook } from '../../model';

export enum CollectionActionTypes {
    AddBook = '[Book Collection] Add Book',
    AddBookSuccess = '[Book Collection] Add Book Success',
    AddBookFail = '[Book Collection] Add Book Fail',
    RemoveBook = '[Book Collection] Remove Book',
    RemoveBookSuccess = '[Book Collection] Remove Book Success',
    RemoveBookFail = '[Book Collection] Remove Book Fail',
    Load = '[Book Collection] Load',
    LoadSuccess = '[Book Collection] Load Success',
    LoadFail = '[Book Collection] Load Fail',
}

/**
 * Add Book to Collection Actions
 */
export class AddBook implements Action {
    readonly type = CollectionActionTypes.AddBook;

    constructor( public payload: { entity: IBook } ) {
    }
}

export class AddBookSuccess implements Action {
    readonly type = CollectionActionTypes.AddBookSuccess;

    constructor( public payload: { entity: IBook } ) {
    }
}

export class AddBookFail implements Action {
    readonly type = CollectionActionTypes.AddBookFail;

    constructor( public payload: { entity: IBook } ) {
    }
}

/**
 * Remove Book from Collection Actions
 */
export class RemoveBook implements Action {
    readonly type = CollectionActionTypes.RemoveBook;

    constructor( public payload: { entity: IBook } ) {
    }
}

export class RemoveBookSuccess implements Action {
    readonly type = CollectionActionTypes.RemoveBookSuccess;

    constructor( public payload: { entity: IBook } ) {
    }
}

export class RemoveBookFail implements Action {
    readonly type = CollectionActionTypes.RemoveBookFail;

    constructor( public payload: { entity: IBook } ) {
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

    constructor( public payload: { entities: IBook[] } ) {
    }
}

export class LoadFail implements Action {
    readonly type = CollectionActionTypes.LoadFail;

    constructor( public payload: any ) {
    }
}

export type CollectionActions =
    | AddBook
    | AddBookSuccess
    | AddBookFail
    | RemoveBookSuccess
    | RemoveBookFail
    | Load
    | LoadSuccess
    | LoadFail;
