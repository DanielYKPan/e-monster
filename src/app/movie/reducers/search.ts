/**
 * search
 */
import { MovieActions, MovieActionTypes } from '../actions/movie';
import { IMovieBasic, ISearchStat } from '../movie.model';

export interface State {
    type: string;
    loading: boolean;
    searchStat: ISearchStat;
    searchResults: IMovieBasic[];
}

const initialState: State = {
    type: null,
    loading: false,
    searchStat: {
        page: 0,
        total_results: 0,
        total_pages: 0,
    },
    searchResults: [],
};

export function reducer( state = initialState, action: MovieActions ): State {
    switch (action.type) {

        case MovieActionTypes.SearchList:
            return {
                ...state,
                loading: true
            };

        case MovieActionTypes.SearchListComplete:
            return {
                ...state,
                type: action.payload.type,
                loading: false,
                searchStat: {
                    page: action.payload.page,
                    total_results: action.payload.total_results,
                    total_pages: action.payload.total_pages,
                },
                searchResults: action.payload.results
            };

        default:
            return state;
    }
}

export const getSearchStat = ( state: State ) => state.searchStat;
export const getSearchResults = ( state: State ) => state.searchResults;
export const getType = ( state: State ) => state.type;
export const getLoading = ( state: State ) => state.loading;
