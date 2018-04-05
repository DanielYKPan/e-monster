/**
 * movie
 */

import { Action } from '@ngrx/store';
import { IMovie } from '../movie.model';

export enum MovieActionTypes {
    SearchTopRatedList = '[Movies] Search Top Rated List',
    SearchUpcomingList = '[Movies] Search Upcoming List',
    SearchListComplete = '[Movies] Search List Complete',
    SearchError = '[Movies] Search Error',
}

export class SearchTopRatedList implements Action {
    readonly type = MovieActionTypes.SearchTopRatedList;
}

export class SearchUpcomingList implements Action {
    readonly type = MovieActionTypes.SearchUpcomingList;
}

export class SearchListComplete implements Action {
    readonly type = MovieActionTypes.SearchListComplete;

    constructor( public payload: { results: IMovie[], type: string } ) {
    }
}

export class SearchError implements Action {
    readonly type = MovieActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export type MovieActions =
    SearchTopRatedList |
    SearchUpcomingList |
    SearchListComplete |
    SearchError;
