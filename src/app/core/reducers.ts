/**
 * reducers
 */

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLayout from './layout-store/reducer';

export interface State {
    layout: fromLayout.State;
}

export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer,
};

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowLoader = createSelector(
    getLayoutState,
    fromLayout.getShowLoader
);
