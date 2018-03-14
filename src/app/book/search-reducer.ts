/**
 * search
 */
import { BookActions, BookActionTypes } from './actions/book';

export interface State {
    ids: string[];
    loading: boolean;
    error: string;
    query: string;
}

const initialState: State = {
    ids: [],
    loading: false,
    error: '',
    query: '',
};

export function reducer( state = initialState, action: BookActions ): State {
    switch (action.type) {

        case BookActionTypes.Search:
            const query = action.payload;

            if (query === '') {
                return {
                    ids: [],
                    loading: false,
                    error: '',
                    query,
                };
            }

            return {
                ...state,
                loading: true,
                error: '',
                query,
            };

        case BookActionTypes.SearchComplete:
            return {
                ids: action.payload.map(book => book.id),
                loading: false,
                error: '',
                query: state.query,
            };

        default:
            return state;
    }
}

export const getIds = ( state: State ) => state.ids;

export const getQuery = ( state: State ) => state.query;

export const getLoading = ( state: State ) => state.loading;

export const getError = ( state: State ) => state.error;
