/**
 * actions
 */

import { Action } from '@ngrx/store';
import { Book } from '../book.model';

export enum BookActionTypes {
    Search = '[Books] Search',
    SearchComplete = '[Books] Search Complete',
    SearchError = '[Books] Search Error',
    Load = '[Books] Load',
    Select = '[Books] Select'
}

export class Search implements Action {
    readonly type = BookActionTypes.Search;

    constructor( public payload: string ) {
    }
}

export class SearchComplete implements Action {
    readonly type = BookActionTypes.SearchComplete;

    constructor( public payload: Book[] ) {
    }
}

export class SearchError implements Action {
    readonly type = BookActionTypes.SearchError;

    constructor( public payload: string ) {
    }
}

export class Load implements Action {
    readonly type = BookActionTypes.Load;

    constructor( public payload: Book ) {
    }
}

export class Select implements Action {
    readonly type = BookActionTypes.Select;

    constructor( public payload: string ) {
    }
}

export type BookActions = Search | SearchComplete | SearchError | Load | Select;
