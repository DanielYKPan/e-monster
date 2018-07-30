/**
 * index
 */

import * as fromActor from './actor';
import * as fromSearchActor from './search-actor';
import * as fromArtist from './artist';
import * as fromCoreRoot from '../../core/reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface PeopleState {
    actors: fromActor.State;
    searchActors: fromSearchActor.State;
    artists: fromArtist.State;
}

export interface State extends fromCoreRoot.State {
    people: PeopleState;
}

export const reducers: ActionReducerMap<PeopleState> = {
    actors: fromActor.reducer,
    searchActors: fromSearchActor.reducer,
    artists: fromArtist.reducer,
};

export const getPeopleState = createFeatureSelector<PeopleState>('people');

// Actor Entity
export const getActorEntityState = createSelector(
    getPeopleState,
    ( state: PeopleState ) => state.actors
);

export const {
    selectIds: getActorIds,
    selectEntities: getActorEntities,
    selectAll: getAllActors,
    selectTotal: getTotalActors,
} = fromActor.adapter.getSelectors(getActorEntityState);

export const getSelectedActorId = createSelector(
    getActorEntityState,
    fromActor.getSelectedId
);

export const getSelectedActor = createSelector(
    getActorEntities,
    getSelectedActorId,
    ( entities, selectedId ) => {
        return selectedId && entities[selectedId];
    }
);

// Search Movie State
export const getSearchActorState = createSelector(
    getPeopleState,
    ( state: PeopleState ) => state.searchActors
);

export const getSearchPage = createSelector(
    getSearchActorState,
    fromSearchActor.getPage,
);

export const getSearchTotalPage = createSelector(
    getSearchActorState,
    fromSearchActor.getTotalPage,
);

export const getSearchQuery = createSelector(
    getSearchActorState,
    fromSearchActor.getSearchQuery,
);

export const getSearchResults = createSelector(
    getSearchActorState,
    fromSearchActor.getSearchResults,
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

// Artist Entity
export const getArtistEntityState = createSelector(
    getPeopleState,
    ( state: PeopleState ) => state.artists
);

export const {
    selectIds: getArtistIds,
    selectEntities: getArtistEntities,
    selectAll: getAllArtists,
    selectTotal: getTotalArtists,
} = fromArtist.adapter.getSelectors(getArtistEntityState);

export const getSelectedArtistId = createSelector(
    getArtistEntityState,
    fromArtist.getSelectedId
);

export const getSelectedArtist = createSelector(
    getArtistEntities,
    getSelectedArtistId,
    ( entities, selectedId ) => {
        return selectedId && entities[selectedId];
    }
);
