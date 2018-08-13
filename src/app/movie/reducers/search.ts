/**
 * search
 */
import { IAudio } from '../../model';
import { SearchMovieActions, SearchMovieActionTypes } from '../actions/search';

export interface State {
    query: string;
    page: number;
    total_pages: number;
    total_results: number;
    results: IAudio[];
    randomIndex: number;
}

const initialState: State = {
    query: null,
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
    randomIndex: 0,
};

export function reducer( state = initialState, action: SearchMovieActions ): State {
    switch (action.type) {
        case SearchMovieActionTypes.GenerateIndex :
            let random: number;
            do {
                random = Math.floor(Math.random() * state.results.length);
            } while (random === state.randomIndex);

            return {
                ...state,
                randomIndex: random
            };

        case SearchMovieActionTypes.SearchComplete:
            return {
                query: action.payload.query,
                page: action.payload.page,
                total_results: action.payload.total_results,
                total_pages: action.payload.total_pages,
                results: action.payload.results,
                randomIndex: Math.floor(Math.random() * action.payload.results.length)
            };

        default:
            return state;
    }
}

export const getSearchResults = ( state: State ) => state.results;
export const getSearchQuery = ( state: State ) => state.query;
export const getPage = ( state: State ) => state.page;
export const getTotalPage = ( state: State ) => state.total_pages;
export const getRandomIndex = ( state: State ) => state.randomIndex;
