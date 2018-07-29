/**
 * search
 */

import { Action } from '@ngrx/store';

export enum SearchBookActionTypes {
    Search = '[Books] Search',
    SearchComplete = '[Books] Search Complete',
    SearchError = '[Books] Search Error'
}

export class Search implements Action {
    readonly type = SearchBookActionTypes.Search;

    constructor( public payload: { query: string, page: number } ) {
    }
}

export class SearchComplete implements Action {
    readonly type = SearchBookActionTypes.SearchComplete;

    constructor( public payload: any ) {
    }
}

export class SearchError implements Action {
    readonly type = SearchBookActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export type SearchBookActions =
    Search |
    SearchComplete |
    SearchError;
