/**
 * search-artist
 */

import { Action } from '@ngrx/store';

export enum SearchArtistActionTypes {
    Search = '[Artist] Search',
    SearchComplete = '[Artist] Search Complete',
    SearchError = '[Artist] Search Error'
}

export class Search implements Action {
    readonly type = SearchArtistActionTypes.Search;

    constructor( public payload: { query: string, page: number } ) {
    }
}

export class SearchComplete implements Action {
    readonly type = SearchArtistActionTypes.SearchComplete;

    constructor( public payload: any ) {
    }
}

export class SearchError implements Action {
    readonly type = SearchArtistActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export type SearchArtistActions =
    Search |
    SearchComplete |
    SearchError;
