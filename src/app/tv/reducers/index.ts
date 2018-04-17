/**
 * index
 */

import * as fromTvs from './tv';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface TvsState {
    tvs: fromTvs.State;
}

export interface State extends fromRoot.State {
    tvs: TvsState;
}

export const reducers: ActionReducerMap<TvsState> = {
    tvs: fromTvs.reducer
};

export const getTvsState = createFeatureSelector<TvsState>('tvs');

export const getTvEntityState = createSelector(
    getTvsState,
    ( state: TvsState ) => state.tvs
);

export const {
    selectIds: getTvIds,
    selectEntities: getTvEntities,
    selectAll: getAllTvs,
    selectTotal: getTotalTvs,
} = fromTvs.adapter.getSelectors(getTvEntityState);

export const getSelectedTvId = createSelector(
    getTvEntityState,
    fromTvs.getSelectedId
);

export const getSelectedTv = createSelector(
    getTvEntities,
    getSelectedTvId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
);
