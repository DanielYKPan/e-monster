/**
 * index
 */

import * as fromActor from './actor';
import * as fromSearchActor from './search-actor';
import * as fromArtist from './artist';
import * as fromSearchArtist from './search-artist';
import * as fromCoreRoot from '../../core/reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface PeopleState {
    actors: fromActor.State;
    searchActors: fromSearchActor.State;
    artists: fromArtist.State;
    searchArtists: fromSearchArtist.State;
}

export interface State extends fromCoreRoot.State {
    people: PeopleState;
}

export const reducers: ActionReducerMap<PeopleState> = {
    actors: fromActor.reducer,
    searchActors: fromSearchActor.reducer,
    artists: fromArtist.reducer,
    searchArtists: fromSearchArtist.reducer,
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

// Search Actor State
export const getSearchActorState = createSelector(
    getPeopleState,
    ( state: PeopleState ) => state.searchActors
);

export const getSearchActorPage = createSelector(
    getSearchActorState,
    fromSearchActor.getPage,
);

export const getSearchActorTotalPage = createSelector(
    getSearchActorState,
    fromSearchActor.getTotalPage,
);

export const getSearchActorQuery = createSelector(
    getSearchActorState,
    fromSearchActor.getSearchQuery,
);

export const getSearchActorResults = createSelector(
    getSearchActorState,
    fromSearchActor.getSearchResults,
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

// Search Artist State
export const getSearchArtistState = createSelector(
    getPeopleState,
    ( state: PeopleState ) => state.searchArtists
);

export const getSearchArtistPage = createSelector(
    getSearchArtistState,
    fromSearchArtist.getPage,
);

export const getSearchArtistTotalPage = createSelector(
    getSearchArtistState,
    fromSearchArtist.getTotalPage,
);

export const getSearchArtistQuery = createSelector(
    getSearchArtistState,
    fromSearchArtist.getSearchQuery,
);

export const getSearchArtistResults = createSelector(
    getSearchArtistState,
    fromSearchArtist.getSearchResults,
);
