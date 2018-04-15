/**
 * movie
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMovie } from '../movie.model';
import { MovieActions, MovieActionTypes } from '../actions/movie';

export interface State extends EntityState<IMovie> {
    selectedMovieId: number | null;
}

export const adapter: EntityAdapter<IMovie> = createEntityAdapter<IMovie>({
    selectId: movie => movie.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedMovieId: null,
});

export function reducer( state = initialState, action: MovieActions ): State {
    switch (action.type) {

        case MovieActionTypes.Load:
            return adapter.addOne(action.payload, {
                ...state,
                selectedMovieId: state.selectedMovieId
            });

        case MovieActionTypes.Select:
            return {
                ...state,
                selectedMovieId: action.payload,
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedMovieId;
