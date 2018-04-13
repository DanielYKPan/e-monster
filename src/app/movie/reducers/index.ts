/**
 * index
 */

import * as fromMovies from './movie';
import * as fromSearch from './search';
import * as fromVideos from './video';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface MoviesState {
    search: fromSearch.State;
    movies: fromMovies.State;
    videos: fromVideos.State;
}

export interface State extends fromRoot.State {
    movies: MoviesState;
}

export const reducers: ActionReducerMap<MoviesState> = {
    search: fromSearch.reducer,
    movies: fromMovies.reducer,
    videos: fromVideos.reducer,
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

export const getSearchType = createSelector(
    getSearchState,
    fromSearch.getType,
);

export const getSearchLoading = createSelector(
    getSearchState,
    fromSearch.getLoading,
);

export const getSearchResults = createSelector(
    getSearchState,
    fromSearch.getSearchResults
);

export const getMovieEntityState = createSelector(
    getMoviesState,
    ( state: MoviesState ) => state.movies
);

export const getSearchFeaturedMovieList = createSelector(
    getSearchResults,
    ( movies ) => {
        return movies.slice(0, 2);
    }
);

export const getSearchNonFeaturedMovieList = createSelector(
    getSearchResults,
    ( movies ) => {
        return movies.slice(2);
    }
);

export const getRandomMovieBackdrop = createSelector(
    getSearchResults,
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

export const getSelectedMovieDirectors = createSelector(
    getSelectedMovie,
    ( movie ) => {
        if (movie) {
            return movie.crews.filter(( crew ) => crew.job === 'Director');
        }
    }
);

export const getSelectedMovieWriters = createSelector(
    getSelectedMovie,
    ( movie ) => {
        if (movie) {
            return movie.crews.filter(( crew ) => crew.department === 'Writing');
        }
    }
);
