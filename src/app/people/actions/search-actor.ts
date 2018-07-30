/**
 * search
 */

import { Action } from '@ngrx/store';

export enum SearchActorActionTypes {
    Search = '[Actor] Search',
    SearchComplete = '[Actor] Search Complete',
    SearchError = '[Actor] Search Error'
}

export class Search implements Action {
    readonly type = SearchActorActionTypes.Search;

    constructor( public payload: { query: string, page: number } ) {
    }
}

export class SearchComplete implements Action {
    readonly type = SearchActorActionTypes.SearchComplete;

    constructor( public payload: any ) {
    }
}

export class SearchError implements Action {
    readonly type = SearchActorActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export type SearchActorActions =
    Search |
    SearchComplete |
    SearchError;
