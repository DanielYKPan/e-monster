/**
 * video
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { MovieVideosActions, MovieVideosActionTypes } from '../actions/video';
import { IVideos } from '../../model';

export interface State extends EntityState<IVideos> {
    selectedMovieId: number | null;
}

export const adapter: EntityAdapter<IVideos> = createEntityAdapter<IVideos>({
    selectId: movieVideos => movieVideos.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedMovieId: null
});

export function reducer( state = initialState, action: MovieVideosActions ): State {
    switch (action.type) {

        case MovieVideosActionTypes.SearchVideosCompleted:
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
