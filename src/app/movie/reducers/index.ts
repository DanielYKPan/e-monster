/**
 * index
 */

import * as fromMovies from './movie';
import * as fromVideos from './video';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface MoviesState {
    movies: fromMovies.State;
    videos: fromVideos.State;
}

export interface State extends fromRoot.State {
    movies: MoviesState;
}

export const reducers: ActionReducerMap<MoviesState> = {
    movies: fromMovies.reducer,
    videos: fromVideos.reducer,
};

export const getMoviesState = createFeatureSelector<MoviesState>('movies');

export const getMovieEntityState = createSelector(
    getMoviesState,
    ( state: MoviesState ) => state.movies
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
