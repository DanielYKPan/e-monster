/**
 * reducers
 */

import * as fromLayout from './layout/reducer';
import * as fromSearch from './search-store/reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    layout: fromLayout.State;
    search: fromSearch.State;
}

export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer,
    search: fromSearch.reducer,
};

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSidenav = createSelector(
    getLayoutState,
    fromLayout.getShowSidenav
);

export const getShowLoader = createSelector(
    getLayoutState,
    fromLayout.getShowLoader
);

export const getSearchState = createFeatureSelector<fromSearch.State>('search');

export const getSearchLoading = createSelector(
    getSearchState,
    fromSearch.getLoading,
);

export const getSearchPage = createSelector(
    getSearchState,
    fromSearch.getPage,
);

export const getSearchTotalPage = createSelector(
    getSearchState,
    fromSearch.getTotalPage,
);

export const getSearchQuery = createSelector(
    getSearchState,
    fromSearch.getSearchQuery,
);

export const getSearchType = createSelector(
    getSearchState,
    fromSearch.getType,
);

export const getSearchResults = createSelector(
    getSearchState,
    fromSearch.getSearchResults,
);

export const getSearchFeaturedList = createSelector(
    getSearchResults,
    ( results ) => {
        return results.slice(0, 2);
    }
);

export const getSearchNonFeaturedList = createSelector(
    getSearchResults,
    ( results ) => {
        return results.slice(2);
    }
);

export const getRandomMovieBackdrop = createSelector(
    getSearchResults,
    getSearchType,
    ( results, type ) => {
        if (type === 'movie' && results && results.length) {
            const random = results[Math.floor(Math.random() * results.length)];
            return random.backdrop_path;
        }
    }
);

export const getSearchMovieTypeLoader = createSelector(
    getSearchType,
    getSearchLoading,
    (type, loading) => type === 'movie' && loading
);

export const getSearchTvTypeLoader = createSelector(
    getSearchType,
    getSearchLoading,
    (type, loading) => type === 'tv' && loading
);

export const getSearchPeopleTypeLoader = createSelector(
    getSearchType,
    getSearchLoading,
    (type, loading) => type === 'people' && loading
);

export const getSearchBookTypeLoader = createSelector(
    getSearchType,
    getSearchLoading,
    (type, loading) => type === 'book' && loading
);
