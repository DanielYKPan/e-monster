/**
 * movie
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMovie, IMovieGenre } from '../movie.model';
import { MovieActions, MovieActionTypes } from '../actions/movie';

export interface State extends EntityState<IMovie> {
    selectedMovieId: number | null;
    genres: IMovieGenre[];
}

export const adapter: EntityAdapter<IMovie> = createEntityAdapter<IMovie>({
    selectId: movie => movie.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedMovieId: null,
    genres: [],
});

export function reducer( state = initialState, action: MovieActions ): State {
    switch (action.type) {

        case MovieActionTypes.GetGenreListComplete:
            return {
                ...state,
                genres: action.payload
            };

        case MovieActionTypes.SearchListComplete:
            return adapter.addMany(action.payload.results, {
                ...state,
                selectedMovieId: state.selectedMovieId
            });

        default:
            return state;
    }
}

export const getGenreList = (state: State) => state.genres;
