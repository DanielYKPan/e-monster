/**
 * index
 */

import * as fromAlbums from './album';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface MusicState {
    albums: fromAlbums.State;
}

export interface State extends fromRoot.State {
    albums: MusicState;
};

export const reducers: ActionReducerMap<MusicState> = {
    albums: fromAlbums.reducer
};

export const getMusicState = createFeatureSelector<MusicState>('movies');

export const getAlbumEntityState = createSelector(
    getMusicState,
    ( state: MusicState ) => state.albums
);

export const getAccessToken = createSelector(
    getAlbumEntityState,
    fromAlbums.getAccessToken
);

