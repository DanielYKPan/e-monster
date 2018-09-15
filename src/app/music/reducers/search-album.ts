/**
 * search
 */
import { IAlbum } from '../../model';
import { SearchMusicActions, SearchMusicActionTypes } from '../actions/search';

export interface State {
    query: string;
    page: number;
    total_pages: number;
    total_results: number;
    results: IAlbum[];
}

const initialState: State = {
    query: null,
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: null,
};

export function reducer( state = initialState, action: SearchMusicActions ): State {
    switch (action.type) {
        case SearchMusicActionTypes.SearchAlbumComplete:
            return {
                query: action.payload.search.query,
                page: action.payload.search.page,
                total_results: action.payload.search.total_results,
                total_pages: action.payload.search.total_pages,
                results: action.payload.search.results,
            };

        default:
            return state;
    }
}

export const getSearchResults = ( state: State ) => state.results;
export const getSearchQuery = ( state: State ) => state.query;
export const getPage = ( state: State ) => state.page;
export const getTotalPage = ( state: State ) => state.total_pages;
