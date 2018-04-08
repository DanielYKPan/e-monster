/**
 * reducers
 */

import * as fromLayout from './layout/reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    layout: fromLayout.State;
}

export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer
};

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSidenav = createSelector(
    getLayoutState,
    fromLayout.getShowSidenav
);

export const getShowLoader = createSelector(
    getLayoutState,
    fromLayout.getShowLoader
);
