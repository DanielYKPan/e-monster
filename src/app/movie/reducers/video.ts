/**
 * video
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { MovieVideosActions, MovieVideosActionTypes } from '../actions/video';
import { IVideos } from '../../model';

export interface State extends EntityState<IVideos> {
    loading: boolean;
    selectedMovieId: number | null;
}

export const adapter: EntityAdapter<IVideos> = createEntityAdapter<IVideos>({
    selectId: movieVideos => movieVideos.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    loading: false,
    selectedMovieId: null
});

export function reducer( state = initialState, action: MovieVideosActions ): State {
    switch (action.type) {

        case MovieVideosActionTypes.SearchVideos: {
            return {
                ...state,
                loading: true
            };
        }

        case MovieVideosActionTypes.SearchVideosCompleted:
            return adapter.addOne(action.payload.result, {
                ...state,
                loading: false,
                selectedMovieId: action.payload.result.id
            });

        case MovieVideosActionTypes.Select:
            return {
                ...state,
                loading: false,
                selectedMovieId: action.payload.movie_id
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedMovieId;
export const getLoading = (state: State) => state.loading;
