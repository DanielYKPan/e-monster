/**
 * index
 */
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMovies from './movie';
import * as fromVideos from './video';
import * as fromSearch from './search';
import * as fromCoreRoot from '../../core/reducers';

export interface MoviesState {
    movies: fromMovies.State;
    videos: fromVideos.State;
    search: fromSearch.State;
}

export interface State extends fromCoreRoot.State {
    movies: MoviesState;
}

export const reducers: ActionReducerMap<MoviesState> = {
    movies: fromMovies.reducer,
    videos: fromVideos.reducer,
    search: fromSearch.reducer,
};

export const getMoviesState = createFeatureSelector<MoviesState>('movies');

// Movies Entity State
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

export const getSelectedMovieId = createSelector(
    getMovieEntityState,
    fromMovies.getSelectedId
);

export const getSelectedMovie = createSelector(
    getMovieEntities,
    getSelectedMovieId,
    ( entities, selectedId ) => {
        return selectedId && entities[selectedId];
    }
);

// Movie Videos Entity State
export const getMovieVideosEntityState = createSelector(
    getMoviesState,
    ( state: MoviesState ) => state.videos
);

export const {
    selectIds: getMovieVideosIds,
    selectEntities: getMovieVideosEntities,
    selectAll: getAllMovieVideos,
    selectTotal: getTotalMovieVideos,
} = fromVideos.adapter.getSelectors(getMovieVideosEntityState);

export const getSearchVideoLoader = createSelector(
    getMovieVideosEntityState,
    fromVideos.getLoading,
);

export const getSelectedMovieVideosId = createSelector(
    getMovieVideosEntityState,
    fromVideos.getSelectedId
);

export const getSelectedMovieVideos = createSelector(
    getMovieVideosEntities,
    getSelectedMovieVideosId,
    ( entities, selectedMovieId ) => {
        if (selectedMovieId && entities[selectedMovieId]) {
            return entities[selectedMovieId].results;
        }
    }
);

export const getSelectedMovieTrailer = createSelector(
    getSelectedMovieVideos,
    ( videos ) => {
        if (videos && videos.length > 0) {
            return videos.find(( video ) => video.type === 'Trailer');
        }
    }
);

export const getSelectedMovieTeaser = createSelector(
    getSelectedMovieVideos,
    ( videos ) => {
        if (videos && videos.length > 0) {
            return videos.find(( video ) => video.type === 'Teaser');
        }
    }
);

export const getSelectedMovieVideo = createSelector(
    getSelectedMovieTrailer,
    getSelectedMovieTeaser,
    ( trailer, teaser ) => trailer ? trailer : teaser
);

// Search Movie State
export const getSearchState = createSelector(
    getMoviesState,
    ( state: MoviesState ) => state.search
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

export const getPaginatorData = createSelector(
    getSearchPage,
    getSearchTotalPage,
    getSearchQuery,
    ( page, total_pages, query ) => {
        return {page, total_pages, query};
    }
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
    ( results ) => {
        if (results && results.length) {
            const random = results[Math.floor(Math.random() * results.length)];
            return random.backdrop_path;
        }
    }
);
