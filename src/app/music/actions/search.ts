/**
 * search
 */

import { Action } from '@ngrx/store';

export enum SearchMusicActionTypes {
    Search = '[Music] Search',
    SearchComplete = '[Music] Search Complete',
    SearchError = '[Music] Search Error'
}

export class Search implements Action {
    readonly type = SearchMusicActionTypes.Search;

    constructor( public payload: { query: string, page: number } ) {
    }
}

export class SearchComplete implements Action {
    readonly type = SearchMusicActionTypes.SearchComplete;

    constructor( public payload: any ) {
    }
}

export class SearchError implements Action {
    readonly type = SearchMusicActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export type SearchMusicActions =
    Search |
    SearchComplete |
    SearchError;
