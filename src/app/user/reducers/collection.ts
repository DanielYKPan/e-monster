/**
 * collection
 */
import { CollectionActions, CollectionActionTypes } from '../actions/collection';

export interface State {
    loading: boolean;
    movie_ids: number[];
}

const initialState: State = {
    loading: false,
    movie_ids: [],
};

export const reducer = ( state = initialState, action: CollectionActions ): State => {
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
                movie_ids: action.payload.map(movie => movie.id),
            };
        }

        case CollectionActionTypes.AddMovieSuccess:
        case CollectionActionTypes.RemoveMovieFail: {
            if (state.movie_ids.indexOf(action.payload.id) > -1) {
                return state;
            }

            return {
                ...state,
                movie_ids: [...state.movie_ids, action.payload.id],
            };
        }

        case CollectionActionTypes.RemoveMovieSuccess:
        case CollectionActionTypes.AddMovieFail: {
            return {
                ...state,
                movie_ids: state.movie_ids.filter(id => id !== action.payload.id),
            };
        }

        default: {
            return state;
        }
    }
};

export const getLoading = ( state: State ) => state.loading;
export const getMovieIds = ( state: State ) => state.movie_ids;
