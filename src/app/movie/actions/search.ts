/**
 * search
 */

import { Action } from '@ngrx/store';

export enum SearchMovieActionTypes {
    Search = '[Movies] Search',
    SearchComplete = '[Movies] Search Complete',
    SearchError = '[Movies] Search Error'
}

export class Search implements Action {
    readonly type = SearchMovieActionTypes.Search;

    constructor( public payload: { query: string, page: number } ) {
    }
}

export class SearchComplete implements Action {
    readonly type = SearchMovieActionTypes.SearchComplete;

    constructor( public payload: any ) {
    }
}

export class SearchError implements Action {
    readonly type = SearchMovieActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export type SearchMovieActions =
    Search |
    SearchComplete |
    SearchError;
