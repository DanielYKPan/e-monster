/**
 * collenction-reducer
 */
import { CollectionActions, CollectionActionTypes } from './actions/collection';

export interface State {
    ids: string[];
    loading: boolean;
    loaded: boolean;
}

const initialState: State = {
    ids: [],
    loading: false,
    loaded: false,
};

export function reducer( state = initialState, action: CollectionActions ): State {
    switch (action.type) {
        case CollectionActionTypes.Load:
            return {
                ...state,
                loading: true,
            };

        case CollectionActionTypes.LoadSuccess:
            return {
                loaded: true,
                loading: false,
                ids: action.payload.map(book => book.id),
            };

        case CollectionActionTypes.AddBookSuccess:
        case CollectionActionTypes.RemoveBookFail:
            if (state.ids.indexOf(action.payload.id) > -1) {
                return state;
            }

            return {
                ...state,
                ids: [...state.ids, action.payload.id],
            };

        case CollectionActionTypes.AddBookFail:
        case CollectionActionTypes.RemoveBookSuccess:
            return {
                ...state,
                ids: state.ids.filter(id => id !== action.payload.id),
            };

        default:
            return state;
    }
}

export const getCollectionIds = ( state: State ) => state.ids;

export const getLoaded = ( state: State ) => state.loaded;
