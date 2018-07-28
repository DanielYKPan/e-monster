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

export const getMusicState = createFeatureSelector<MusicState>('music');

export const getAlbumEntityState = createSelector(
    getMusicState,
    ( state: MusicState ) => state.albums
);

export const {
    selectIds: getAlbumIds,
    selectEntities: getAlbumEntities,
    selectAll: getAllAlbums,
    selectTotal: getTotalAlbums,
} = fromAlbums.adapter.getSelectors(getAlbumEntityState);

export const getSelectedAlbumId = createSelector(
    getAlbumEntityState,
    fromAlbums.getSelectedId
);

export const getSelectedAlbum = createSelector(
    getAlbumEntities,
    getSelectedAlbumId,
    ( albums, selectedId ) => selectedId && albums[selectedId]
);

export const getAccessToken = createSelector(
    getAlbumEntityState,
    fromAlbums.getAccessToken
);

