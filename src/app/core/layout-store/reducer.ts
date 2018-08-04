/**
 * reducer
 */
import { LayoutActions, LayoutActionTypes } from './actions';

export interface State {
    showLoader: boolean;
    showSidenav: boolean;
}

const initialState: State = {
    showLoader: false,
    showSidenav: false,
};

export const reducer = ( state = initialState, action: LayoutActions ): State => {
    switch (action.type) {
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

        case LayoutActionTypes.ToggleSidenav:
            return {
                ...state,
                showSidenav: !state.showSidenav
            };

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

        default:
            return state;
    }
};

export const getShowLoader = ( state: State ) => state.showLoader;
export const getShowSidenav = (state: State) => state.showSidenav;
