/**
 * collection
 */
import { CollectionActions, CollectionActionTypes } from '../actions/collection';

export interface State {
    loading: boolean;
    ids: number[];
}

const initialState: State = {
    loading: false,
    ids: [],
};

export function reducer( state = initialState, action: CollectionActions ): State {
    switch (action.type) {
        case CollectionActionTypes.Load: {
            return {
                ...state,
                loading: true
            };
        }

        case CollectionActionTypes.LoadSuccess: {
            return {
                loading: false,
                ids: action.payload.map(movie => movie.id),
            };
        }

        case CollectionActionTypes.AddTVSuccess:
        case CollectionActionTypes.RemoveTVFail: {
            if (state.ids.indexOf(action.payload.id) > -1) {
                return state;
            }

            return {
                ...state,
                ids: [...state.ids, action.payload.id],
            };
        }

        case CollectionActionTypes.RemoveTVSuccess:
        case CollectionActionTypes.AddTVFail: {
            return {
                ...state,
                ids: state.ids.filter(id => id !== action.payload.id),
            };
        }

        default: {
            return state;
        }
    }
}

export const getLoading = ( state: State ) => state.loading;
export const getIds = ( state: State ) => state.ids;
