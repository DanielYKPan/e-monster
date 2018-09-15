/**
 * collection
 */
import { CollectionActions, CollectionActionTypes } from '../actions/collection';

export interface State {
    loading: boolean;
    ids: string[];
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
                ids: action.payload.entities.map(album => album.id),
            };
        }

        case CollectionActionTypes.AddAlbumSuccess:
        case CollectionActionTypes.RemoveAlbumFail: {
            if (state.ids.indexOf(action.payload.entity.id) > -1) {
                return state;
            }

            return {
                ...state,
                ids: [...state.ids, action.payload.entity.id],
            };
        }

        case CollectionActionTypes.RemoveAlbumSuccess:
        case CollectionActionTypes.AddAlbumFail: {
            return {
                ...state,
                ids: state.ids.filter(id => id !== action.payload.entity.id),
            };
        }

        default: {
            return state;
        }
    }
}

export const getLoading = ( state: State ) => state.loading;
export const getIds = ( state: State ) => state.ids;
