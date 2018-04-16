/**
 * actions
 */

import { Action } from '@ngrx/store';

export enum AudioSearchActionTypes {
    SearchList = '[Audio] Search List',
    SearchListComplete = '[Audio] Search List Complete',
    SearchError = '[Audio] Search Error',
    LoadingStart = '[Search] Loading Start',
    LoadingCompleted = '[Search] Loading Completed',
}

export class SearchList implements Action {
    readonly type = AudioSearchActionTypes.SearchList;

    constructor( public payload: { query: string, page: number } ) {
    }
}

export class SearchListComplete implements Action {
    readonly type = AudioSearchActionTypes.SearchListComplete;

    constructor( public payload: any ) {
    }
}

export class SearchError implements Action {
    readonly type = AudioSearchActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export class LoadingStart implements Action {
    readonly type = AudioSearchActionTypes.LoadingStart;

    constructor() {
    }
}

export class LoadingCompleted implements Action {
    readonly type = AudioSearchActionTypes.LoadingCompleted;

    constructor() {
    }
}

export type AudioSearchActions =
    SearchList |
    SearchListComplete |
    SearchError |
    LoadingStart |
    LoadingCompleted ;
