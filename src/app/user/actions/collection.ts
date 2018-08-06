/**
 * collection
 */

import { Action } from '@ngrx/store';
import { IMovie } from '../../model';

export enum CollectionActionTypes {
    AddMovie = '[Collection] Add Movie',
    AddMovieSuccess = '[Collection] Add Movie Success',
    AddMovieFail = '[Collection] Add Movie Fail',
    RemoveMovie = '[Collection] Remove Movie',
    RemoveMovieSuccess = '[Collection] Remove Movie Success',
    RemoveMovieFail = '[Collection] Remove Movie Fail',
    Load = '[Collection] Load',
    LoadSuccess = '[Collection] Load Success',
    LoadFail = '[Collection] Load Fail',
}

/**
 * Add Book to Collection Actions
 */
export class AddMovie implements Action {
    readonly type = CollectionActionTypes.AddMovie;

    constructor(public payload: IMovie) {}
}

export class AddMovieSuccess implements Action {
    readonly type = CollectionActionTypes.AddMovieSuccess;

    constructor(public payload: IMovie) {}
}

export class AddMovieFail implements Action {
    readonly type = CollectionActionTypes.AddMovieFail;

    constructor(public payload: IMovie) {}
}

/**
 * Remove Movie from Collection Actions
 */
export class RemoveMovie implements Action {
    readonly type = CollectionActionTypes.RemoveMovie;

    constructor(public payload: IMovie) {}
}

export class RemoveMovieSuccess implements Action {
    readonly type = CollectionActionTypes.RemoveMovieSuccess;

    constructor(public payload: IMovie) {}
}

export class RemoveMovieFail implements Action {
    readonly type = CollectionActionTypes.RemoveMovieFail;

    constructor(public payload: IMovie) {}
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
    readonly type = CollectionActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = CollectionActionTypes.LoadSuccess;

    constructor(public payload: IMovie[]) {}
}

export class LoadFail implements Action {
    readonly type = CollectionActionTypes.LoadFail;

    constructor(public payload: any) {}
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
