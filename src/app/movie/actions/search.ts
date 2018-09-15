/**
 * search
 */

import { Action } from '@ngrx/store';
import { ISearchResult } from '../../model';

export enum SearchMovieActionTypes {
    GenerateIndex = '[Movies] Generate Random Index',
    Search = '[Movies] Search',
    SearchComplete = '[Movies] Search Complete',
    SearchError = '[Movies] Search Error'
}

export class GenerateIndex implements Action {
    readonly type = SearchMovieActionTypes.GenerateIndex;
}

export class Search implements Action {
    readonly type = SearchMovieActionTypes.Search;

    constructor( public payload: { query: string, page: number } ) {
    }
}

export class SearchComplete implements Action {
    readonly type = SearchMovieActionTypes.SearchComplete;

    constructor( public payload: { search: ISearchResult } ) {
    }
}

export class SearchError implements Action {
    readonly type = SearchMovieActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export type SearchMovieActions =
    GenerateIndex |
    Search |
    SearchComplete |
    SearchError;
