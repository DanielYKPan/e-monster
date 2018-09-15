/**
 * collection
 */

import { Action } from '@ngrx/store';
import { IMovie } from '../../model';

export enum CollectionActionTypes {
    AddMovie = '[Movie Collection] Add Movie',
    AddMovieSuccess = '[Movie Collection] Add Movie Success',
    AddMovieFail = '[Movie Collection] Add Movie Fail',
    RemoveMovie = '[Movie Collection] Remove Movie',
    RemoveMovieSuccess = '[Movie Collection] Remove Movie Success',
    RemoveMovieFail = '[Movie Collection] Remove Movie Fail',
    Load = '[Movie Collection] Load',
    LoadSuccess = '[Movie Collection] Load Success',
    LoadFail = '[Movie Collection] Load Fail',
}

/**
 * Add Book to Collection Actions
 */
export class AddMovie implements Action {
    readonly type = CollectionActionTypes.AddMovie;

    constructor( public payload: { entity: IMovie } ) {
    }
}

export class AddMovieSuccess implements Action {
    readonly type = CollectionActionTypes.AddMovieSuccess;

    constructor( public payload: { entity: IMovie } ) {
    }
}

export class AddMovieFail implements Action {
    readonly type = CollectionActionTypes.AddMovieFail;

    constructor( public payload: { entity: IMovie } ) {
    }
}

/**
 * Remove Movie from Collection Actions
 */
export class RemoveMovie implements Action {
    readonly type = CollectionActionTypes.RemoveMovie;

    constructor( public payload: { entity: IMovie } ) {
    }
}

export class RemoveMovieSuccess implements Action {
    readonly type = CollectionActionTypes.RemoveMovieSuccess;

    constructor( public payload: { entity: IMovie } ) {
    }
}

export class RemoveMovieFail implements Action {
    readonly type = CollectionActionTypes.RemoveMovieFail;

    constructor( public payload: { entity: IMovie } ) {
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

    constructor( public payload: { entities: IMovie[] } ) {
    }
}

export class LoadFail implements Action {
    readonly type = CollectionActionTypes.LoadFail;

    constructor( public payload: any ) {
    }
}

export type CollectionActions =
    | AddMovie
    | AddMovieSuccess
    | AddMovieFail
    | RemoveMovie
    | RemoveMovieSuccess
    | RemoveMovieFail
    | Load
    | LoadSuccess
    | LoadFail;
