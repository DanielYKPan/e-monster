/**
 * index
 */

import * as fromMovies from './movie';
import * as fromSearch from './search';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface MoviesState {
    search: fromSearch.State;
    movies: fromMovies.State;
}

export interface State extends fromRoot.State {
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

export const getSearchStat = createSelector(
    getSearchState,
    fromSearch.getSearchStat,
);

export const getSearchQuery = createSelector(
    getSearchState,
    fromSearch.getQuery,
);

export const getSearchLoading = createSelector(
    getSearchState,
    fromSearch.getLoading,
);

export const getSearchIds = createSelector(
    getSearchState,
    fromSearch.getIds,
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

export const getSearchMovieList = createSelector(
    getMovieEntities,
    getSearchIds,
    ( movies, searchIds ) => {
        return searchIds.map(id => movies[id]);
    }
);

export const getSearchFeaturedMovieList = createSelector(
    getSearchMovieList,
    ( movies ) => {
        return movies.slice(0, 2);
    }
);

export const getSearchNonFeaturedMovieList = createSelector(
    getSearchMovieList,
    ( movies ) => {
        return movies.slice(2);
    }
);

export const getRandomMovieBackdrop = createSelector(
    getSearchMovieList,
    ( movies ) => {
        if (movies && movies.length) {
            const random = movies[Math.floor(Math.random() * movies.length)];
            return random.backdrop_path;
        }
    }
);

export const getMovieGenreList = createSelector(
    getMovieEntityState,
    fromMovies.getGenreList
);
