/**
 * index
 */
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlbums from './album';
import * as fromCoreRoot from '../../core/reducers';
import * as fromSearchAlbum from './search-album';
import * as fromSearchTrack from './search-track';

export interface MusicState {
    albums: fromAlbums.State;
    searchAlbum: fromSearchAlbum.State;
    searchTrack: fromSearchTrack.State;
}

export interface State extends fromCoreRoot.State {
    albums: MusicState;
}

export const reducers: ActionReducerMap<MusicState> = {
    albums: fromAlbums.reducer,
    searchAlbum: fromSearchAlbum.reducer,
    searchTrack: fromSearchTrack.reducer,
};

export const getMusicState = createFeatureSelector<MusicState>('music');

// Album Entity State
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

// Search Album State
export const getSearchAlbumState = createSelector(
    getMusicState,
    ( state: MusicState ) => state.searchAlbum
);

export const getSearchAlbumPage = createSelector(
    getSearchAlbumState,
    fromSearchAlbum.getPage,
);

export const getSearchAlbumTotalPage = createSelector(
    getSearchAlbumState,
    fromSearchAlbum.getTotalPage,
);

export const getSearchAlbumQuery = createSelector(
    getSearchAlbumState,
    fromSearchAlbum.getSearchQuery,
);

export const getSearchAlbumResults = createSelector(
    getSearchAlbumState,
    fromSearchAlbum.getSearchResults,
);

export const getSearchAlbumFeaturedList = createSelector(
    getSearchAlbumResults,
    ( results ) => {
        return results.slice(0, 2);
    }
);

export const getSearchAlbumNonFeaturedList = createSelector(
    getSearchAlbumResults,
    ( results ) => {
        return results.slice(2);
    }
);

// Search Track State
export const getSearchTrackState = createSelector(
    getMusicState,
    ( state: MusicState ) => state.searchTrack
);

export const getSearchTrackPage = createSelector(
    getSearchTrackState,
    fromSearchTrack.getPage,
);

export const getSearchTrackTotalPage = createSelector(
    getSearchTrackState,
    fromSearchTrack.getTotalPage,
);

export const getSearchTrackQuery = createSelector(
    getSearchTrackState,
    fromSearchTrack.getSearchQuery,
);

export const getSearchTrackResults = createSelector(
    getSearchTrackState,
    fromSearchTrack.getSearchResults,
);

export const getPaginatorData = createSelector(
    getSearchAlbumPage,
    getSearchAlbumTotalPage,
    getSearchAlbumQuery,
    getSearchTrackPage,
    getSearchTrackTotalPage,
    getSearchTrackQuery,
    ( album_page, album_total_pages, album_query, track_page, track_total_pages, track_query ) => {
        return {album_page, album_total_pages, album_query, track_page, track_total_pages, track_query};
    }
);
