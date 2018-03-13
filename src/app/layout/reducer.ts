/**
 * reducer
 */
import { LayoutActions, LayoutActionTypes } from './actions';

export interface State {
    showSidenav: boolean;
}

const initialState: State = {
    showSidenav: false,
};

export function reducer( state = initialState, action: LayoutActions ): State {
    switch (action.type) {

        case LayoutActionTypes.OpenSidenav:

            return {
                showSidenav: true
            };

        case LayoutActionTypes.CloseSidenav:

            return {
                showSidenav: false
            };

        case LayoutActionTypes.ToggleSidenav:

            return {
                showSidenav: !state.showSidenav
            };

        default:
            return state;
    }
}

export const getShowSidenav = ( state: State ) => state.showSidenav;
