/**
 * search
 */
import { MovieActions, MovieActionTypes } from '../actions/movie';
import { ISearchStat } from '../movie.model';

export interface State {
    ids: number[];
    type: string;
    loading: boolean;
    searchStat: ISearchStat;
}

const initialState: State = {
    ids: [],
    type: null,
    loading: false,
    searchStat: {
        page: 0,
        total_results: 0,
        total_pages: 0,
    }
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
                ids: action.payload.results.map(movie => movie.id),
                type: action.payload.type,
                loading: false,
                searchStat: {
                    page: action.payload.page,
                    total_results: action.payload.total_results,
                    total_pages: action.payload.total_pages,
                }
            };

        default:
            return state;
    }
}

export const getSearchStat = ( state: State ) => state.searchStat;
export const getIds = ( state: State ) => state.ids;
export const getType = ( state: State ) => state.type;
export const getLoading = ( state: State ) => state.loading;
