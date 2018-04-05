/**
 * movie
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMovie } from '../movie.model';
import { MovieActions, MovieActionTypes } from '../actions/movie';

export interface State extends EntityState<IMovie> {
}

export const adapter: EntityAdapter<IMovie> = createEntityAdapter<IMovie>({
    selectId: movie => movie.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({});

export function reducer( state = initialState, action: MovieActions ): State {
    switch (action.type) {
        case MovieActionTypes.SearchListComplete:
            return adapter.addMany(action.payload.results, {
                ...state,
            });

        default:
            return state;
    }
}
