/**
 * index
 */
import * as fromAuth from './auth';
import * as fromCoreRoot from '../../core/reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState {
    auth: fromAuth.State;
}

export interface State extends fromCoreRoot.State {
    admin: UserState;
}

export const reducers: ActionReducerMap<UserState> = {
    auth: fromAuth.reducer
};

export const getUserState = createFeatureSelector<UserState>('user');

export const getAuthState = createSelector(
    getUserState,
    ( state: UserState ) => state.auth
);

export const getLoggedIn = createSelector(
    getAuthState,
    fromAuth.getLoggedIn
);

export const getUser = createSelector(
    getAuthState,
    fromAuth.getUser
);

export const getLoggedInUser = createSelector(
    getLoggedIn,
    getUser,
    ( isLoggedIn, user ) => {
        return isLoggedIn ?
            user : null;
    }
);

export const getLoginError = createSelector(
    getAuthState,
    fromAuth.getError
);

export const getLoginPending = createSelector(
    getAuthState,
    fromAuth.getPending
);

