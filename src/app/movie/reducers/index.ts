/**
 * index
 */

import * as fromMovies from './movie';
import * as fromSearch from './search';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface MoviesState {
    search: fromSearch.State;
    movies: fromMovies.State;
}

export interface State {
    movies: MoviesState;
}

export const reducers: ActionReducerMap<MoviesState> = {
    search: fromSearch.reducer,
    movies: fromMovies.reducer,
};

export const getMoviesState = createFeatureSelector<MoviesState>('movies');

export const getSearchState = createSelector(
    getMoviesState,
    ( state: MoviesState ) => state.search
);

export const getSearchTopRatedIds = createSelector(
    getSearchState,
    fromSearch.getTopRatedIds
);

export const getSearchUpcomingIds = createSelector(
    getSearchState,
    fromSearch.getUpcomingIds
);

export const getMovieEntityState = createSelector(
    getMoviesState,
    ( state: MoviesState ) => state.movies
);

export const {
    selectIds: getMovieIds,
    selectEntities: getMovieEntities,
    selectAll: getAllMovies,
    selectTotal: getTotalMovies,
} = fromMovies.adapter.getSelectors(getMovieEntityState);

export const getTopRatedMovies = createSelector(
    getMovieEntities,
    getSearchTopRatedIds,
    ( movies, searchIds ) => {
        return searchIds.map(id => movies[id]);
    }
);

export const getUpcomingMovies = createSelector(
    getMovieEntities,
    getSearchUpcomingIds,
    ( movies, searchIds ) => {
        return searchIds.map(id => movies[id]);
    }
);
