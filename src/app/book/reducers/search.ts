/**
 * search
 */
import { IBook } from '../../model';
import { SearchBookActions, SearchBookActionTypes } from '../actions/search';

export interface State {
    query: string;
    page: number;
    total_pages: number;
    total_results: number;
    results: IBook[];
}

const initialState: State = {
    query: null,
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
};

export function reducer( state = initialState, action: SearchBookActions ): State {
    switch (action.type) {
        case SearchBookActionTypes.SearchComplete:
            return {
                query: action.payload.query,
                page: action.payload.page,
                total_results: action.payload.total_results,
                total_pages: action.payload.total_pages,
                results: action.payload.results,
            };

        default:
            return state;
    }
}

export const getSearchResults = ( state: State ) => state.results;
export const getSearchQuery = ( state: State ) => state.query;
export const getPage = ( state: State ) => state.page;
export const getTotalPage = ( state: State ) => state.total_pages;
