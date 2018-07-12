/**
 * actions
 */

import { Action } from '@ngrx/store';
import { SearchType } from '../model/search';

export enum SearchActionTypes {
    SearchList = '[Audio] Search List',
    SearchListComplete = '[Audio] Search List Complete',
    SearchError = '[Audio] Search Error',
    SetSearchType = '[Search] Set Search Type',
    LoadingStart = '[Search] Loading Start',
    LoadingCompleted = '[Search] Loading Completed',
}

export class SearchList implements Action {
    readonly type = SearchActionTypes.SearchList;

    constructor( public payload: { query: string, page: number } ) {
    }
}

export class SearchListComplete implements Action {
    readonly type = SearchActionTypes.SearchListComplete;

    constructor( public payload: any ) {
    }
}

export class SearchError implements Action {
    readonly type = SearchActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export class SetSearchType implements Action {
    readonly type = SearchActionTypes.SetSearchType;

    constructor( public payload: SearchType ) {
    }
}

export class LoadingStart implements Action {
    readonly type = SearchActionTypes.LoadingStart;

    constructor() {
    }
}

export class LoadingCompleted implements Action {
    readonly type = SearchActionTypes.LoadingCompleted;

    constructor() {
    }
}

export type SearchActions =
    SearchList |
    SearchListComplete |
    SearchError |
    SetSearchType |
    LoadingStart |
    LoadingCompleted ;
