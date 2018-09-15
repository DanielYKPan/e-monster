/**
 * movie
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { MovieActions, MovieActionTypes } from '../actions/movie';
import { CollectionActions, CollectionActionTypes } from '../actions/collection';
import { IMovie } from '../../model';

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

export function reducer( state = initialState, action: MovieActions | CollectionActions ): State {
    switch (action.type) {
        case CollectionActionTypes.LoadSuccess:
            return adapter.addMany(action.payload.entities, {
                ...state,
                selectedMovieId: state.selectedMovieId
            });

        case MovieActionTypes.Load:
            return adapter.addOne(action.payload.entity, {
                ...state,
                selectedMovieId: state.selectedMovieId
            });

        case MovieActionTypes.Select:
            return {
                ...state,
                selectedMovieId: action.payload.id,
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedMovieId;
