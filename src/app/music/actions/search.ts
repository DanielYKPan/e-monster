/**
 * search
 */

import { Action } from '@ngrx/store';

export enum SearchMusicActionTypes {
    SearchAlbum = '[Album] Search',
    SearchAlbumComplete = '[Album] Search Complete',
    SearchTrack = '[Track] Search',
    SearchTrackComplete = '[Track] Search Complete',
    SearchError = '[Music] Search Error'
}

export class SearchAlbum implements Action {
    readonly type = SearchMusicActionTypes.SearchAlbum;

    constructor( public payload: { query: string, page: number } ) {
    }
}

export class SearchAlbumComplete implements Action {
    readonly type = SearchMusicActionTypes.SearchAlbumComplete;

    constructor( public payload: any ) {
    }
}

export class SearchTrack implements Action {
    readonly type = SearchMusicActionTypes.SearchTrack;

    constructor( public payload: { query: string, page: number } ) {
    }
}

export class SearchTrackComplete implements Action {
    readonly type = SearchMusicActionTypes.SearchTrackComplete;

    constructor( public payload: any ) {
    }
}

export class SearchError implements Action {
    readonly type = SearchMusicActionTypes.SearchError;

    constructor( public payload: any ) {
    }
}

export type SearchMusicActions =
    SearchAlbum |
    SearchAlbumComplete |
    SearchTrack |
    SearchTrackComplete |
    SearchError;
