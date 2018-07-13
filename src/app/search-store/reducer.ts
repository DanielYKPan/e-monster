/**
 * reducer
 */
import { IAudio, SearchType } from '../model';
import { SearchActions, SearchActionTypes } from './actions';
import { TvVideosActions, TvVideosActionTypes } from '../tv/actions/video';
import { MovieVideosActions, MovieVideosActionTypes } from '../movie/actions/video';

export interface State {
    type: SearchType; // Search Type: 'movie', 'tv', 'video'
    loading: boolean; // whether the search process is completed
    searchListResult: {
        name: string;
        page: number;
        total_results: number;
        total_pages: number;
        results: IAudio[]
    };
}

const initialState: State = {
    type: null,
    loading: false,
    searchListResult: {
        name: null,
        page: 0,
        total_results: 0,
        total_pages: 0,
        results: []
    },
};

export function reducer( state = initialState, action: SearchActions | MovieVideosActions | TvVideosActions ): State {
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
                loading: false,
                searchListResult: {
                    name: action.payload.name,
                    page: action.payload.page,
                    total_results: action.payload.total_results,
                    total_pages: action.payload.total_pages,
                    results: action.payload.results,
                }
            };

        case TvVideosActionTypes.SearchTvVideos:
        case MovieVideosActionTypes.SearchVideos:
            return {
                ...state,
                type: 'video',
                loading: true
            };

        case TvVideosActionTypes.SearchVideosCompleted:
        case MovieVideosActionTypes.SearchVideosCompleted:
        case SearchActionTypes.LoadingCompleted:
            return {
                ...state,
                loading: false
            };

        case SearchActionTypes.SetSearchType:
            return {
                ...state,
                type: action.payload
            };

        default:
            return state;
    }
}

export const getSearchResults = ( state: State ) => state.searchListResult.results;
export const getSearchName = ( state: State ) => state.searchListResult.name;
export const getType = ( state: State ) => state.type;
export const getLoading = ( state: State ) => state.loading;
export const getPage = ( state: State ) => state.searchListResult.page;
export const getTotalPage = ( state: State ) => state.searchListResult.total_pages;
