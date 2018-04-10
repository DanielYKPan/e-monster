/**
 * video
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMovieVideos } from '../movie.model';
import { MovieVideosActions, MovieVideosActionTypes } from '../actions/video';

export interface State extends EntityState<IMovieVideos> {
    selectedMovieId: number | null;
}

export const adapter: EntityAdapter<IMovieVideos> = createEntityAdapter<IMovieVideos>({
    selectId: movieVideos => movieVideos.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedMovieId: null
});

export function reducer( state = initialState, action: MovieVideosActions ): State {
    switch (action.type) {

        case MovieVideosActionTypes.SearchComplete:
            return adapter.addOne(action.payload, {
                ...state,
                selectedMovieId: action.payload.id
            });

        case MovieVideosActionTypes.Select:
            return {
                ...state,
                selectedMovieId: action.payload
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedMovieId;
