/**
 * search
 */

import { Action } from '@ngrx/store';
import { ISearchResult } from '../../model';

export enum SearchTvActionTypes {
    Search = '[TV] Search',
    SearchComplete = '[TV] Search Complete',
    SearchError = '[TV] Search Error'
}

export class Search implements Action {
    readonly type = SearchTvActionTypes.Search;

    constructor( public payload: { query: string, page: number } ) {
    }
}

export class SearchComplete implements Action {
    readonly type = SearchTvActionTypes.SearchComplete;

    constructor( public payload: { search: ISearchResult } ) {
    }
}

export class SearchError implements Action {
    readonly type = SearchTvActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export type SearchTvActions =
    Search |
    SearchComplete |
    SearchError;
