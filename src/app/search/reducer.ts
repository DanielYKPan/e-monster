/**
 * reducer
 */
import { IAudio } from '../model/audio';
import { SearchActions, SearchActionTypes } from './actions';


export interface State {
    type: string;
    query: string;
    loading: boolean;
    page: number;
    total_results: number;
    total_pages: number;
    searchResults: IAudio[];
}

const initialState: State = {
    type: null,
    query: null,
    loading: false,
    page: 0,
    total_results: 0,
    total_pages: 0,
    searchResults: [],
};

export function reducer( state = initialState, action: SearchActions ): State {
    switch (action.type) {

        case SearchActionTypes.LoadingStart:
        case SearchActionTypes.SearchList:
            return {
                ...state,
                loading: true
            };

        case SearchActionTypes.SearchListComplete:
            return {
                ...state,
                type: action.payload.type,
                query: action.payload.query,
                loading: false,
                page: action.payload.page,
                total_results: action.payload.total_results,
                total_pages: action.payload.total_pages,
                searchResults: action.payload.results,
            };

        case SearchActionTypes.LoadingCompleted:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}

export const getSearchResults = ( state: State ) => state.searchResults;
export const getQuery = ( state: State ) => state.query;
export const getType = (state: State) => state.type;
export const getLoading = ( state: State ) => state.loading;
export const getPage = ( state: State ) => state.page;
export const getTotalPage = ( state: State ) => state.total_pages;
