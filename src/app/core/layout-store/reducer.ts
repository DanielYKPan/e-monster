/**
 * reducer
 */
import { LayoutActions, LayoutActionTypes } from './actions';

export interface State {
    showLoader: boolean;
}

const initialState: State = {
    showLoader: false,
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

        default:
            return state;
    }
};

export const getShowLoader = ( state: State ) => state.showLoader;
