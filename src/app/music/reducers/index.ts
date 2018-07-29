/**
 * index
 */
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlbums from './album';
import * as fromRoot from '../../reducers';
import * as fromSearch from './search';

export interface MusicState {
    albums: fromAlbums.State;
    search: fromSearch.State;
}

export interface State extends fromRoot.State {
    albums: MusicState;
}

export const reducers: ActionReducerMap<MusicState> = {
    albums: fromAlbums.reducer,
    search: fromSearch.reducer,
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

// Search Music State
export const getSearchState = createSelector(
    getMusicState,
    ( state: MusicState ) => state.search
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
