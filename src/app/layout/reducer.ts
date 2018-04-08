/**
 * reducer
 */
import { LayoutActions, LayoutActionTypes } from './actions';

export interface State {
    showSidenav: boolean;
    showLoader: boolean;
}

const initialState: State = {
    showSidenav: false,
    showLoader: false,
};

export function reducer( state = initialState, action: LayoutActions ): State {
    switch (action.type) {

        case LayoutActionTypes.OpenSidenav:

            return {
                ...state,
                showSidenav: true
            };

        case LayoutActionTypes.CloseSidenav:

            return {
                ...state,
                showSidenav: false
            };

        case LayoutActionTypes.ToggleSidenav:

            return {
                ...state,
                showSidenav: !state.showSidenav
            };

        case LayoutActionTypes.ShowLoader:

            return {
                ...state,
                showLoader: true
            };

        case LayoutActionTypes.HideLoader:

            return {
                ...state,
                showLoader: false
            };

        default:
            return state;
    }
}

export const getShowSidenav = ( state: State ) => state.showSidenav;
export const getShowLoader = ( state: State ) => state.showLoader;
