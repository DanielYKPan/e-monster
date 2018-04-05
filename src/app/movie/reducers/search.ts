/**
 * search
 */
import { MovieActions, MovieActionTypes } from '../actions/movie';

export interface State {
    ids_top_rated: number[];
    ids_upcoming: number[];
}

const initialState: State = {
    ids_top_rated: [],
    ids_upcoming: [],
};

export function reducer( state = initialState, action: MovieActions ): State {
    switch (action.type) {

        case MovieActionTypes.SearchListComplete:
            if (action.payload.type === 'top_rated') {
                return {
                    ...state,
                    ids_top_rated: action.payload.results.map(movie => movie.id),
                };
            } else if (action.payload.type === 'upcoming') {
                return {
                    ...state,
                    ids_upcoming: action.payload.results.map(movie => movie.id),
                };
            }

            return state;

        default:
            return state;
    }
}

export const getTopRatedIds = ( state: State ) => state.ids_top_rated;
export const getUpcomingIds = ( state: State ) => state.ids_upcoming;
