/**
 * auth
 */
import { User } from '../../model';
import { AuthActions, AuthActionTypes } from '../actions/auth';

export interface State {
    loggedIn: boolean;
    user: User | null;
    error: string | null;
    pending: boolean;
}

export const initialState: State = {
    loggedIn: false,
    user: null,
    error: null,
    pending: false,
};

export const reducer = ( state = initialState, action: AuthActions ): State => {
    switch (action.type) {
        case AuthActionTypes.Login: {
            return {
                ...state,
                pending: true,
            };
        }

        case AuthActionTypes.LoginSuccess: {
            return {
                loggedIn: true,
                user: action.payload.user,
                error: null,
                pending: false,
            };
        }

        case AuthActionTypes.LoginFailure: {
            return {
                ...state,
                error: action.payload,
                pending: false,
            };
        }

        case AuthActionTypes.Logout: {
            return initialState;
        }

        default: {
            return state;
        }
    }
};

export const getLoggedIn = ( state: State ) => state.loggedIn;
export const getUser = ( state: State ) => state.user;
export const getError = ( state: State ) => state.error;
export const getPending = ( state: State ) => state.pending;
