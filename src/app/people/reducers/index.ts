/**
 * index
 */

import * as fromActor from './actor';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface PeopleState {
    actors: fromActor.State;
}

export interface State extends fromRoot.State {
    people: PeopleState;
}

export const reducers: ActionReducerMap<PeopleState> = {
    actors: fromActor.reducer
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
